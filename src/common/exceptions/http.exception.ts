import { HttpStatus } from './http-status.enum';

export class HttpException extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message || 'Something went wrong. Please try again.';
    this.status = status || HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
