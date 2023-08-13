import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import * as fs from 'fs';
import { APIResponseMessage, TYPES } from '../../application/constants';
import { IContextAwareLogger } from '../logger';
import { IGetException } from './exception-response.interface';
import { GraphQLResolveInfo } from 'graphql';

@Catch(HttpException)
export class ApplicationExceptionsFilter implements GqlExceptionFilter {
  constructor(
    @Inject(TYPES.applicationLogger)
    private readonly logger: IContextAwareLogger,
  ) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const info = gqlHost.getInfo<GraphQLResolveInfo>();
    const errorResponse = this.getException(exception);
    this.logErrorMessage(info, errorResponse);
  }

  private getException(exception: any): IGetException {
    let statusCode: number;
    let message: any;
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const errorResponse: string | object = exception.getResponse();
      message = (errorResponse as string) || exception.message;
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = APIResponseMessage.serverError;
    }
    return { statusCode, message, timeStamp: new Date().toLocaleDateString() };
  }

  private logErrorMessage(info: any, error: IGetException) {
    const errorObj = {
      ...error,
      type: info.parentType,
      field: info.fieldName,
    };

    if (errorObj.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `${info.parentType} ${info.fieldName}`,
        JSON.stringify(errorObj),
        'ExceptionFilter',
      );
    } else {
      this.logger.warn(
        `${info.parentType} ${info.fieldName}`,
        JSON.stringify(errorObj),
      );
    }
    this.writeErrorLogToFile(JSON.stringify(errorObj));
  }

  private writeErrorLogToFile(errorLog: string): void {
    fs.appendFile('error.log', errorLog, 'utf8', (err) => {
      if (err) throw err;
    });
  }
}
