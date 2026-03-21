import { env } from './env';

export const securityConfig = {
    jwt: {
        accessExpiresIn: '15m' as const,
        refreshExpiresIn: '30d' as const,
        refreshExpiresInSeconds: 30 * 24 * 60 * 60,
    },
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' as const : 'lax' as const,
        domain: env.COOKIE_DOMAIN,
        path: '/',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
    cors: {
        origin: env.CORS_ORIGIN,
        credentials: true,
    }
};
