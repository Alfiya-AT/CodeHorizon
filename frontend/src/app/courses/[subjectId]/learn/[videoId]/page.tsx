'use client';

import { useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import VideoPlayer from '../../../../../components/Video/VideoPlayer';
import { useSidebarStore } from '../../../../../store/sidebarStore';
import { createProgressSaver } from '../../../../../lib/progress';
import { apiClient } from '../../../../../lib/apiClient';

export default function VideoPage() {
    const { subjectId, videoId } = useParams<{ subjectId: string; videoId: string }>();
    const router = useRouter();
    const { markVideoCompleted } = useSidebarStore();

    // Fetch video metadata
    const { data: video, isLoading: videoLoading } = useQuery({
        queryKey: ['video', videoId],
        queryFn: () => apiClient.get(`/videos/${videoId}`).then(r => r.data),
    });

    // Fetch existing progress (for resume)
    const { data: progress } = useQuery({
        queryKey: ['progress', videoId],
        queryFn: () => apiClient.get(`/progress/videos/${videoId}`).then(r => r.data),
        enabled: !!video && !video.locked,
    });

    // Debounced progress saver
    const progressSaver = useRef(createProgressSaver(Number(videoId)));
    useEffect(() => {
        progressSaver.current = createProgressSaver(Number(videoId));
    }, [videoId]);

    const handleProgress = (currentTime: number) => {
        progressSaver.current(currentTime);
    };

    const handleCompleted = async () => {
        // 1. Save completion to backend
        await apiClient.post(`/progress/videos/${videoId}`, {
            lastPositionSeconds: video?.durationSeconds ?? 0,
            isCompleted: true,
        });

        // 2. Optimistically update sidebar checklist
        markVideoCompleted(Number(videoId));

        // 3. Auto-navigate to next video after 2s
        if (video?.nextVideoId) {
            setTimeout(() => {
                router.push(`/courses/${subjectId}/learn/${video.nextVideoId}`);
            }, 2000);
        }
    };

    if (videoLoading) return <div className="aspect-video bg-[#1a1a1a] animate-pulse rounded-xl" />;

    return (
        <div className="flex flex-col gap-6">
            <VideoPlayer
                youtubeVideoId={video?.youtubeVideoId}
                startPositionSeconds={progress?.lastPositionSeconds ?? 0}
                isLocked={video?.locked ?? false}
                previousVideoId={video?.previousVideoId}
                onProgress={handleProgress}
                onCompleted={handleCompleted}
            />

            {/* Video Metadata */}
            <div>
                <h1 className="text-2xl font-bold text-white mb-2">{video?.title}</h1>
                {video?.description && (
                    <p className="text-[#a0a0a0] leading-relaxed">{video.description}</p>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#2a2a2a]">
                {video?.previousVideoId ? (
                    <button
                        onClick={() => router.push(`/courses/${subjectId}/learn/${video.previousVideoId}`)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#333] transition-colors"
                    >
                        ← Previous
                    </button>
                ) : <div />}

                {video?.nextVideoId && (
                    <button
                        onClick={() => router.push(`/courses/${subjectId}/learn/${video.nextVideoId}`)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#a855f7] text-white rounded-lg hover:bg-[#9333ea] transition-colors"
                    >
                        Next →
                    </button>
                )}
            </div>
        </div>
    );
}
