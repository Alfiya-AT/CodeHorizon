import dotenv from 'dotenv';

dotenv.config();

export const env = {
    PORT: process.env.PORT || 5000,
    DATABASE_URL: process.env.DATABASE_URL || '',
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'access_secret',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || 'localhost',
};
