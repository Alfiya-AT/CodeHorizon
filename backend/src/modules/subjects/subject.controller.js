"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstVideo = exports.getSubjectTree = exports.getSubject = exports.getSubjects = void 0;
const express_1 = require("express");
const db_1 = require("../../config/db");
const getSubjects = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const q = req.query.q;
        const subjects = await db_1.prisma.subject.findMany({
            where: {
                isPublished: true,
                ...(q && { title: { contains: q } })
            },
            skip: (page - 1) * pageSize,
            take: pageSize,
        });
        res.json({ subjects });
    }
    catch (err) {
        next(err);
    }
};
exports.getSubjects = getSubjects;
const getSubject = async (req, res, next) => {
    try {
        const { subjectId } = req.params;
        const subject = await db_1.prisma.subject.findUnique({
            where: { id: Number(subjectId), isPublished: true }
        });
        if (!subject)
            return res.status(404).json({ error: 'Subject not found' });
        res.json({ subject });
    }
    catch (err) {
        next(err);
    }
};
exports.getSubject = getSubject;
const getSubjectTree = async (req, res, next) => {
    try {
        const { subjectId } = req.params;
        const userId = req.user?.userId;
        const subject = await db_1.prisma.subject.findUnique({
            where: { id: Number(subjectId) },
            include: {
                sections: {
                    orderBy: { orderIndex: 'asc' },
                    include: {
                        videos: {
                            orderBy: { orderIndex: 'asc' }
                        }
                    }
                }
            }
        });
        if (!subject)
            return res.status(404).json({ error: 'Subject not found' });
        // Fetch user progress for all videos in this subject
        const progresses = userId ? await db_1.prisma.videoProgress.findMany({
            where: {
                userId: Number(userId),
                video: { section: { subjectId: Number(subjectId) } }
            }
        }) : [];
        const progressMap = new Map();
        if (progresses) {
            for (const p of progresses) {
                progressMap.set(p.videoId, p.isCompleted);
            }
        }
        // Determine locking logic
        const flattened = subject.sections.flatMap(s => s.videos);
        const treeSections = subject.sections.map(section => ({
            id: section.id,
            title: section.title,
            orderIndex: section.orderIndex,
            videos: section.videos.map(video => {
                const isCompleted = progressMap.get(video.id) || false;
                let locked = false;
                const videoIndex = flattened.findIndex(v => v.id === video.id);
                if (videoIndex > 0) {
                    const prevVideo = flattened[videoIndex - 1];
                    const prevCompleted = progressMap.get(prevVideo.id) || false;
                    if (!prevCompleted)
                        locked = true;
                }
                return {
                    id: video.id,
                    title: video.title,
                    orderIndex: video.orderIndex,
                    isCompleted,
                    locked
                };
            })
        }));
        res.json({
            id: subject.id,
            title: subject.title,
            sections: treeSections
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getSubjectTree = getSubjectTree;
const getFirstVideo = async (req, res, next) => {
    try {
        const { subjectId } = req.params;
        const userId = req.user?.userId;
        // Fetch tree to determine the first locked/unlocked
        const subject = await db_1.prisma.subject.findUnique({
            where: { id: Number(subjectId) },
            include: {
                sections: {
                    orderBy: { orderIndex: 'asc' },
                    include: { videos: { orderBy: { orderIndex: 'asc' } } }
                }
            }
        });
        if (!subject)
            return res.status(404).json({ error: 'Subject not found' });
        const flattened = subject.sections.flatMap(s => s.videos);
        if (flattened.length === 0)
            return res.status(404).json({ error: 'No videos currently' });
        const progresses = userId ? await db_1.prisma.videoProgress.findMany({
            where: { userId: Number(userId), video: { section: { subjectId: Number(subjectId) } } }
        }) : [];
        const progressMap = new Map();
        progresses.forEach(p => progressMap.set(p.videoId, p.isCompleted));
        let targetVideoId = flattened[0].id;
        for (let i = 0; i < flattened.length; i++) {
            const v = flattened[i];
            if (!progressMap.get(v.id)) {
                targetVideoId = v.id;
                break;
            }
        }
        res.json({ videoId: targetVideoId });
    }
    catch (err) {
        next(err);
    }
};
exports.getFirstVideo = getFirstVideo;
//# sourceMappingURL=subject.controller.js.map