import { create } from 'zustand';

interface VideoState {
    currentVideoId: string | null;
    subjectId: string | null;
    currentTime: number;
    duration: number;
    isPlaying: boolean;
    isCompleted: boolean;
    nextVideoId: string | null;
    prevVideoId: string | null;

    setVideoData: (data: Partial<VideoState>) => void;
    updateTime: (time: number) => void;
    setIsPlaying: (isPlaying: boolean) => void;
}

export const useVideoStore = create<VideoState>((set) => ({
    currentVideoId: null,
    subjectId: null,
    currentTime: 0,
    duration: 0,
    isPlaying: false,
    isCompleted: false,
    nextVideoId: null,
    prevVideoId: null,

    setVideoData: (data) => set((state) => ({ ...state, ...data })),
    updateTime: (time) => set({ currentTime: time }),
    setIsPlaying: (isPlaying) => set({ isPlaying }),
}));
