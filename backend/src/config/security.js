"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityConfig = void 0;
const env_1 = require("./env");
exports.securityConfig = {
    jwt: {
        accessExpiresIn: '15m',
        refreshExpiresIn: '30d',
        refreshExpiresInSeconds: 30 * 24 * 60 * 60,
    },
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        domain: env_1.env.COOKIE_DOMAIN,
        path: '/',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
    cors: {
        origin: env_1.env.CORS_ORIGIN,
        credentials: true,
    }
};
//# sourceMappingURL=security.js.map