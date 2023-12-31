import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import * as Joi from 'joi';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/data_access/database/database.module';
import { ProjectModule } from './project/project.module';
import { IssueModule } from './issue/issue.module';
import { APP_FILTER } from '@nestjs/core';
import { ApplicationExceptionsFilter } from './infrastructure/filters';
import { TYPES } from './application/constants';
import { ApplicationLogger } from './infrastructure/logger';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ProjectModule,
    IssueModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: ApplicationExceptionsFilter },
    { provide: TYPES.applicationLogger, useClass: ApplicationLogger },
  ],
})
export class AppModule {}
