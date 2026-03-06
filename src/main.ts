import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all.exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { SwaggerDocumentOptions } from '@nestjs/swagger/dist/interfaces/swagger-document-options.interface';
import { AllResponseTransformInterceptor } from './common/interceptors/all.response.validator.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('TaskFlow')
    .setDescription('Task management application')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Task')
    .build();
    const options: SwaggerDocumentOptions =  {
  operationIdFactory: (
    controllerKey: string,
    methodKey: string
  ) => methodKey
};
    const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true,
    transform:true,
  }));
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new LoggingInterceptor(),new AllResponseTransformInterceptor(reflector));
  app.useGlobalFilters(new AllExceptionsFilter());
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('env.port') || 3000);
}
bootstrap();
