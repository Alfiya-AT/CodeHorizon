import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/db';

export const getSubjectProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { subjectId } = req.params;
        const userId = req.user?.userId;

        const subject = await prisma.subject.findUnique({
            where: { id: Number(subjectId) },
            include: {
                sections: {
                    include: { videos: true }
                }
            }
        });

        if (!subject) return res.status(404).json({ error: 'Subject not found' });

        const totalVideos = subject.sections.flatMap(s => s.videos).length;

        const progresses = await prisma.videoProgress.findMany({
            where: {
                userId: Number(userId!),
                video: { section: { subjectId: Number(subjectId) } }
            },
            orderBy: { updatedAt: 'desc' }
        });

        const completedVideos = progresses.filter(p => p.isCompleted).length;
        const percentComplete = totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0;

        const lastVideoId = progresses.length > 0 ? progresses[0].videoId : null;
        const lastPositionSeconds = progresses.length > 0 ? progresses[0].lastPositionSeconds : 0;

        res.json({
            totalVideos,
            completedVideos,
            percentComplete,
            lastVideoId,
            lastPositionSeconds
        });
    } catch (err) { next(err); }
};

export const getVideoProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { videoId } = req.params;
        const userId = req.user?.userId;

        const progress = await prisma.videoProgress.findUnique({
            where: { userId_videoId: { userId: Number(userId!), videoId: Number(videoId) } }
        });

        if (!progress) {
            return res.json({ lastPositionSeconds: 0, isCompleted: false });
        }

        res.json({
            lastPositionSeconds: progress.lastPositionSeconds,
            isCompleted: progress.isCompleted
        });
    } catch (err) { next(err); }
};

export const updateVideoProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { videoId } = req.params;
        const userId = req.user?.userId;
        const { lastPositionSeconds, isCompleted } = req.body;

        const video = await prisma.video.findUnique({ where: { id: Number(videoId) } });
        if (!video) return res.status(404).json({ error: 'Video not found' });

        let cappedPosition = Math.max(0, lastPositionSeconds || 0);
        if (video.durationSeconds && cappedPosition > video.durationSeconds) {
            cappedPosition = video.durationSeconds;
        }

        const progress = await prisma.videoProgress.upsert({
            where: {
                userId_videoId: { userId: Number(userId!), videoId: Number(videoId) }
            },
            update: {
                lastPositionSeconds: cappedPosition,
                isCompleted: isCompleted !== undefined ? isCompleted : undefined,
                completedAt: isCompleted ? new Date() : undefined,
            },
            create: {
                userId: Number(userId!),
                videoId: Number(videoId),
                lastPositionSeconds: cappedPosition,
                isCompleted: isCompleted || false,
                completedAt: isCompleted ? new Date() : null,
            }
        });

        res.json({
            lastPositionSeconds: progress.lastPositionSeconds,
            isCompleted: progress.isCompleted
        });

    } catch (err) { next(err); }
};
