import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { EnvConfigModule } from './config/env.config.module';

@Module({
  imports: [
    EnvConfigModule,
    ConfigModule.forRoot({
      isGlobal:true,
      validationSchema:Joi.object({
        JWT_SECRET: Joi.string().required(),
      }),
    }
    ),
    AuthModule, UsersModule, TasksModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
