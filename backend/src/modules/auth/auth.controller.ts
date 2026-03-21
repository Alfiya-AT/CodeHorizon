import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/db';
import { hashPassword, comparePassword } from '../../utils/password';
import { generateTokens, verifyRefreshToken } from '../../utils/jwt';
import { securityConfig } from '../../config/security';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, name } = req.body;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const passwordHash = await hashPassword(password);
        const user = await prisma.user.create({
            data: { email, passwordHash, name },
        });

        const { accessToken, refreshToken } = generateTokens(user.id.toString());

        // Save fresh token in DB
        const expiresAt = new Date(Date.now() + securityConfig.jwt.refreshExpiresInSeconds * 1000);
        await prisma.refreshToken.create({
            data: {
                userId: user.id,
                tokenHash: refreshToken, // ideally hashed, but storing as is for simplicity in this exercise
                expiresAt
            }
        });

        res.cookie('refresh_token', refreshToken, securityConfig.cookie);

        res.status(201).json({ accessToken, user: { id: user.id.toString(), email: user.email, name: user.name } });
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isValid = await comparePassword(password, user.passwordHash);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const { accessToken, refreshToken } = generateTokens(user.id.toString());

        const expiresAt = new Date(Date.now() + securityConfig.jwt.refreshExpiresInSeconds * 1000);
        await prisma.refreshToken.create({
            data: {
                userId: user.id,
                tokenHash: refreshToken,
                expiresAt
            }
        });

        res.cookie('refresh_token', refreshToken, securityConfig.cookie);

        res.json({ accessToken, user: { id: user.id.toString(), email: user.email, name: user.name } });
    } catch (error) {
        next(error);
    }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.refresh_token;
        if (!token) return res.status(401).json({ error: 'No refresh token provided' });

        let payload;
        try {
            payload = verifyRefreshToken(token);
        } catch {
            return res.status(401).json({ error: 'Invalid or expired refresh token' });
        }

        const dbToken = await prisma.refreshToken.findFirst({
            where: { tokenHash: token, revokedAt: null, expiresAt: { gt: new Date() } }
        });

        if (!dbToken) {
            return res.status(401).json({ error: 'Refresh token invalid or revoked' });
        }

        const user = await prisma.user.findUnique({ where: { id: Number(payload.userId) } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { accessToken, refreshToken: newRefreshToken } = generateTokens(payload.userId);

        // rotate token
        const expiresAt = new Date(Date.now() + securityConfig.jwt.refreshExpiresInSeconds * 1000);
        await prisma.refreshToken.update({
            where: { id: dbToken.id },
            data: { revokedAt: new Date() }
        });

        await prisma.refreshToken.create({
            data: {
                userId: user.id,
                tokenHash: newRefreshToken,
                expiresAt
            }
        });

        res.cookie('refresh_token', newRefreshToken, securityConfig.cookie);
        res.json({ accessToken });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.refresh_token;
        if (token) {
            await prisma.refreshToken.updateMany({
                where: { tokenHash: token },
                data: { revokedAt: new Date() }
            });
        }

        res.clearCookie('refresh_token', { ...securityConfig.cookie, maxAge: 0 });
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
};
