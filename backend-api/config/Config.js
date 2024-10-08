import dotenv from 'dotenv';
dotenv.config();
// app config
export const API_PORT = process.env.API_PORT;
export const FRONTEND_PORT = process.env.FRONTEND_PORT;
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
