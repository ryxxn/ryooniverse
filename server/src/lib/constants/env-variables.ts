import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;

export const DATABASE_URL = process.env.DATABASE_URL;
export const POSTGRES_HOST = process.env.POSTGRES_HOST;
export const POSTGRES_PORT = process.env.POSTGRES_PORT;
export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
export const POSTGRES_DB = process.env.POSTGRES_DB;

export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = process.env.REDIS_PORT;

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
