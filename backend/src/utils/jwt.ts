import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { securityConfig } from '../config/security';

export const generateTokens = (userId: string) => {
    const accessToken = jwt.sign({ userId }, env.JWT_ACCESS_SECRET, {
        expiresIn: securityConfig.jwt.accessExpiresIn,
    });

    const refreshToken = jwt.sign({ userId }, env.JWT_REFRESH_SECRET, {
        expiresIn: securityConfig.jwt.refreshExpiresIn,
    });

    return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, env.JWT_ACCESS_SECRET) as { userId: string };
};

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, env.JWT_REFRESH_SECRET) as { userId: string };
};
