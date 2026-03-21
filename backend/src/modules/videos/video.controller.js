"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideo = void 0;
const express_1 = require("express");
const db_1 = require("../../config/db");
const getVideo = async (req, res, next) => {
    try {
        const { videoId } = req.params;
        const userId = req.user?.userId;
        const video = await db_1.prisma.video.findUnique({
            where: { id: Number(videoId) },
            include: {
                section: {
                    include: {
                        subject: {
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
                        }
                    }
                }
            }
        });
        if (!video)
            return res.status(404).json({ error: 'Video not found' });
        const subject = video.section.subject;
        const flattened = subject.sections.flatMap(s => s.videos);
        const videoIndex = flattened.findIndex(v => v.id === video.id);
        let previousVideoId = null;
        let nextVideoId = null;
        let locked = false;
        let unlockReason = null;
        if (videoIndex > 0) {
            previousVideoId = flattened[videoIndex - 1].id;
            // Check if previous is completed
            const prevProgress = await db_1.prisma.videoProgress.findUnique({
                where: {
                    userId_videoId: { userId: Number(userId), videoId: previousVideoId }
                }
            });
            if (!prevProgress?.isCompleted) {
                locked = true;
                unlockReason = 'Complete previous video';
            }
        }
        if (videoIndex < flattened.length - 1) {
            nextVideoId = flattened[videoIndex + 1].id;
        }
        res.json({
            id: video.id,
            title: video.title,
            description: video.description,
            youtubeVideoId: video.youtubeVideoId,
            orderIndex: video.orderIndex,
            durationSeconds: video.durationSeconds,
            sectionId: video.section.id,
            sectionTitle: video.section.title,
            subjectId: subject.id,
            subjectTitle: subject.title,
            previousVideoId,
            nextVideoId,
            locked,
            unlockReason
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getVideo = getVideo;
//# sourceMappingURL=video.controller.js.map