import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadGatewayException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Reflector } from '@nestjs/core';
import { RESPONSE_DTO_KEY } from '../dto/response.dto';

@Injectable()
export class AllResponseTransformInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dto = this.reflector.get(RESPONSE_DTO_KEY, context.getHandler());

    return next.handle().pipe(
      map((data) => {
        if (!dto) return data;

        const instance = plainToInstance(dto, data);
        const errors = validateSync(instance);

        if (errors.length) {
          throw new BadGatewayException('Response validation failed');
        }

        return instance;
      }),
    );
  }
}