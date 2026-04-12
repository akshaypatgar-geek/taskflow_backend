// src/config/env.config.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envConfig from './env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,   
      load: [envConfig],
      
    }),
  ],
  exports: [ConfigModule], // export for other modules to use
})
export class EnvConfigModule {}