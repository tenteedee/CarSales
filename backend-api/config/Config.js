import dotenv from 'dotenv';
dotenv.config();
//mail config
export const MAIL_MAILER = process.env.MAIL_MAILER || '';
export const MAIL_HOST = process.env.MAIL_HOST || '';
export const MAIL_PORT = process.env.MAIL_PORT || 465;
export const MAIL_USERNAME = process.env.MAIL_USERNAME || '';
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD || '';
export const MAIL_ENCRYPTION = process.env.MAIL_ENCRYPTION || 'tls';
export const MAIL_FROM_ADDRESS = process.env.MAIL_FROM_ADDRESS || '';
export const MAIL_FROM_NAME = process.env.MAIL_FROM_NAME || '';

// app config
export const API_PORT = process.env.API_PORT || 3001;
export const APP_URL =
  process.env.APP_URL || 'http://localhost:' + API_PORT + '/';
export const BACKEND_HOME_URL =
  process.env.BACKEND_HOME_URL || 'http://localhost';
export const FRONTEND_HOME_URL =
  process.env.FRONTEND_HOME_URL || 'http://localhost';

export const JWT_SECRET = process.env.JWT_SECRET || '1fhjsdvar672fgj';
export const SESSION_SECRET = process.env.JWT_SECRET || '1fhjsdvar672fgj';
// OAuth
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// Exporting database configuration
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_USERNAME = process.env.DB_USERNAME || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_CONNECTION = process.env.DB_CONNECTION || 'mysql';
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const env = process.env;

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const TOGETHER_AI_API_KEY = process.env.TOGETHER_AI_API_KEY;