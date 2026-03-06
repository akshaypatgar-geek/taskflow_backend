import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  HttpException,
} from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, params, query } = request;

    const now = Date.now();

    this.logger.log(
      `Incoming Request -> ${method} ${url} | Params: ${JSON.stringify(
        params,
      )} | Query: ${JSON.stringify(query)} | Body: ${JSON.stringify(body)}`,
    );

    return next.handle().pipe(
      tap((response) => {
        const delay = Date.now() - now;

        this.logger.log(
          `Outgoing Response -> ${method} ${url} | Status: ${
            context.switchToHttp().getResponse().statusCode
          } | Time: ${delay}ms | Response: ${JSON.stringify(response)}`,
        );
      }),
      catchError((error) => {
        const delay = Date.now() - now;
        const status =
          error instanceof HttpException
            ? error.getStatus()
            : 500; // default to 500 for unknown errors

        const message =
          error instanceof HttpException
            ? JSON.stringify(error.getResponse())
            : error.message;

        this.logger.error(
          `Error -> ${method} ${url} | Status: ${
            error?.status || 500
          } | ${delay}ms | Message: ${error.message}`,
          error.stack,
        );

        return throwError(() => error);
      }),
    );
  }
}