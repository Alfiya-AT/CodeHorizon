import { create } from 'zustand';
import { apiClient } from '../lib/apiClient';

interface VideoInTree {
    id: number;
    title: string;
    orderIndex: number;
    durationSeconds?: number;
    isCompleted: boolean;
    locked: boolean;
}

interface SectionWithVideos {
    id: number;
    title: string;
    orderIndex: number;
    videos: VideoInTree[];
}

interface SidebarStore {
    tree: SectionWithVideos[] | null;
    loading: boolean;
    fetchTree: (subjectId: number) => Promise<void>;
    markVideoCompleted: (videoId: number) => void;
}

export const useSidebarStore = create<SidebarStore>((set, get) => ({
    tree: null,
    loading: false,

    fetchTree: async (subjectId: number) => {
        set({ loading: true });
        try {
            const { data } = await apiClient.get(`/subjects/${subjectId}/tree`);
            set({ tree: data.sections, loading: false });
        } catch {
            set({ loading: false });
        }
    },

    markVideoCompleted: (videoId: number) => {
        const { tree } = get();
        if (!tree) return;

        // Build flat list to find next video
        const flatVideos = tree.flatMap(s => s.videos);
        const completedIdx = flatVideos.findIndex(v => v.id === videoId);

        const updatedTree = tree.map(section => ({
            ...section,
            videos: section.videos.map((video, _, arr) => {
                if (video.id === videoId) {
                    return { ...video, isCompleted: true };
                }
                // Unlock the next video
                if (completedIdx >= 0 && flatVideos[completedIdx + 1]?.id === video.id) {
                    return { ...video, locked: false };
                }
                return video;
            }),
        }));

        set({ tree: updatedTree });
    },
}));
