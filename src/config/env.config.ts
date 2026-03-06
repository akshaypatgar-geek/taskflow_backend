// src/config/env.config.ts
import { registerAs } from '@nestjs/config';
import 'dotenv/config';

export default registerAs('env', () => ({
  port: process.env.PORT|| 3000,

  jwt: {
    secret: process.env.JWT_SECRET || 'defaultsecret',
  },

  database: {
    url: process.env.DATABASE_URL || '',
  },
}));