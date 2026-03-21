import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { securityConfig } from './config/security';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';

import authRoutes from './modules/auth/auth.routes';
import healthRoutes from './modules/health/health.routes';
import subjectRoutes from './modules/subjects/subject.routes';
import videoRoutes from './modules/videos/video.routes';
import progressRoutes from './modules/progress/progress.routes';
import { getSubjects } from './modules/subjects/subject.controller'; // Ensure it doesn't need auth

const app = express();

app.use(cors(securityConfig.cors));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/progress', progressRoutes);

// BigInt JSON serialization fix
(BigInt.prototype as any).toJSON = function () {
    return this.toString();
};

app.use(errorHandler);

export default app;
