import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message =
        typeof res === 'string'
          ? res
          : typeof res === 'object' && 'message' in res
          ? Array.isArray(res['message'])
            ? res['message'].join(', ')
            : String(res['message'])
          : 'Unexpected error';
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      console.error('Unexpected error:', exception);
    }

    response.status(status).json({
      statusCode: status,
      Message: message, 
      path: request.url, // include request path
      timestamp: new Date().toISOString(),
    });
  }
}