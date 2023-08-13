export interface IExceptionResponse {
  isSuccess: boolean;
  statusCode: number;
  timeStamp: string;
  path: string | number;
  message: string;
  method: string;
  entity: any;
}

export interface IGetException {
  statusCode: number;
  message: any;
  timeStamp: string;
}
