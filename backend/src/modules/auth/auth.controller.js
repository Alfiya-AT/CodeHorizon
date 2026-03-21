"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refresh = exports.login = exports.register = void 0;
const express_1 = require("express");
const db_1 = require("../../config/db");
const password_1 = require("../../utils/password");
const jwt_1 = require("../../utils/jwt");
const security_1 = require("../../config/security");
const register = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        const existingUser = await db_1.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const passwordHash = await (0, password_1.hashPassword)(password);
        const user = await db_1.prisma.user.create({
            data: { email, passwordHash, name },
        });
        const { accessToken, refreshToken } = (0, jwt_1.generateTokens)(user.id.toString());
        // Save fresh token in DB
        const expiresAt = new Date(Date.now() + security_1.securityConfig.jwt.refreshExpiresInSeconds * 1000);
        await db_1.prisma.refreshToken.create({
            data: {
                userId: user.id,
                tokenHash: refreshToken, // ideally hashed, but storing as is for simplicity in this exercise
                expiresAt
            }
        });
        res.cookie('refresh_token', refreshToken, security_1.securityConfig.cookie);
        res.status(201).json({ accessToken, user: { id: user.id.toString(), email: user.email, name: user.name } });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await db_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const isValid = await (0, password_1.comparePassword)(password, user.passwordHash);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const { accessToken, refreshToken } = (0, jwt_1.generateTokens)(user.id.toString());
        const expiresAt = new Date(Date.now() + security_1.securityConfig.jwt.refreshExpiresInSeconds * 1000);
        await db_1.prisma.refreshToken.create({
            data: {
                userId: user.id,
                tokenHash: refreshToken,
                expiresAt
            }
        });
        res.cookie('refresh_token', refreshToken, security_1.securityConfig.cookie);
        res.json({ accessToken, user: { id: user.id.toString(), email: user.email, name: user.name } });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const refresh = async (req, res, next) => {
    try {
        const token = req.cookies.refresh_token;
        if (!token)
            return res.status(401).json({ error: 'No refresh token provided' });
        let payload;
        try {
            payload = (0, jwt_1.verifyRefreshToken)(token);
        }
        catch {
            return res.status(401).json({ error: 'Invalid or expired refresh token' });
        }
        const dbToken = await db_1.prisma.refreshToken.findFirst({
            where: { tokenHash: token, revokedAt: null, expiresAt: { gt: new Date() } }
        });
        if (!dbToken) {
            return res.status(401).json({ error: 'Refresh token invalid or revoked' });
        }
        const user = await db_1.prisma.user.findUnique({ where: { id: Number(payload.userId) } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const { accessToken, refreshToken: newRefreshToken } = (0, jwt_1.generateTokens)(payload.userId);
        // rotate token
        const expiresAt = new Date(Date.now() + security_1.securityConfig.jwt.refreshExpiresInSeconds * 1000);
        await db_1.prisma.refreshToken.update({
            where: { id: dbToken.id },
            data: { revokedAt: new Date() }
        });
        await db_1.prisma.refreshToken.create({
            data: {
                userId: user.id,
                tokenHash: newRefreshToken,
                expiresAt
            }
        });
        res.cookie('refresh_token', newRefreshToken, security_1.securityConfig.cookie);
        res.json({ accessToken });
    }
    catch (error) {
        next(error);
    }
};
exports.refresh = refresh;
const logout = async (req, res, next) => {
    try {
        const token = req.cookies.refresh_token;
        if (token) {
            await db_1.prisma.refreshToken.updateMany({
                where: { tokenHash: token },
                data: { revokedAt: new Date() }
            });
        }
        res.clearCookie('refresh_token', { ...security_1.securityConfig.cookie, maxAge: 0 });
        res.json({ message: 'Logged out successfully' });
    }
    catch (error) {
        next(error);
    }
};
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map