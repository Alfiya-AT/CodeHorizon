'use client';

import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube';
import { useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface VideoPlayerProps {
    youtubeVideoId: string;
    startPositionSeconds: number;
    isLocked: boolean;
    previousVideoId?: number | null;
    onProgress: (currentTime: number) => void;
    onCompleted: () => void;
}

export default function VideoPlayer({
    youtubeVideoId,
    startPositionSeconds,
    isLocked,
    previousVideoId,
    onProgress,
    onCompleted,
}: VideoPlayerProps) {
    const playerRef = useRef<YouTubePlayer | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const hasCompletedRef = useRef(false);

    const stopInterval = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const startInterval = useCallback(() => {
        stopInterval();
        intervalRef.current = setInterval(async () => {
            if (playerRef.current) {
                const currentTime = await playerRef.current.getCurrentTime();
                const duration = await playerRef.current.getDuration();
                onProgress(currentTime);

                // Auto-complete when 90% watched
                if (!hasCompletedRef.current && duration > 0 && currentTime / duration >= 0.9) {
                    hasCompletedRef.current = true;
                    onCompleted();
                }
            }
        }, 5000); // every 5 seconds
    }, [onProgress, onCompleted, stopInterval]);

    useEffect(() => {
        hasCompletedRef.current = false;
        return () => stopInterval();
    }, [youtubeVideoId, stopInterval]);

    if (isLocked) {
        return (
            <div className="aspect-video bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl flex flex-col items-center justify-center gap-4">
                <div className="text-6xl">🔒</div>
                <h3 className="text-xl font-semibold text-white">This video is locked</h3>
                <p className="text-[#a0a0a0] text-center max-w-sm">
                    Complete the previous video to unlock this lesson.
                </p>
                {previousVideoId && (
                    <Link
                        href={`../learn/${previousVideoId}`}
                        className="px-6 py-2 bg-[#a855f7] text-white rounded-lg hover:bg-[#9333ea] transition-colors"
                    >
                        ← Go to Previous Video
                    </Link>
                )}
            </div>
        );
    }

    return (
        <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
            <YouTube
                videoId={youtubeVideoId}
                className="w-full h-full"
                iframeClassName="w-full h-full"
                opts={{
                    width: '100%',
                    height: '100%',
                    playerVars: {
                        autoplay: 1,
                        start: Math.floor(startPositionSeconds),
                        rel: 0,           // No related videos
                        modestbranding: 1, // Minimal YouTube branding
                        iv_load_policy: 3, // No annotations
                        cc_load_policy: 0,
                    },
                }}
                onReady={(e: YouTubeEvent) => { playerRef.current = e.target; }}
                onPlay={startInterval}
                onPause={stopInterval}
                onEnd={() => {
                    stopInterval();
                    if (!hasCompletedRef.current) {
                        hasCompletedRef.current = true;
                        onCompleted();
                    }
                }}
            />
        </div>
    );
}
