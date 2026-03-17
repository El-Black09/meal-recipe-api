import { EnvConfig } from 'src/interfaces/env.interface';

export const ENV: EnvConfig = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
};
