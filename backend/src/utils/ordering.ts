// ordering.ts

export interface VideoNode {
    id: number;
    sectionId: number;
    orderIndex: number;
}

export interface FlatVideo extends VideoNode {
    sectionOrderIndex: number;
}

// Build globally ordered flat list: sort by section.orderIndex, then video.orderIndex
export function flattenVideos(
    sections: Array<{ id: number; orderIndex: number; videos: VideoNode[] }>
): FlatVideo[] {
    return sections
        .sort((a, b) => a.orderIndex - b.orderIndex)
        .flatMap(section =>
            section.videos
                .sort((a, b) => a.orderIndex - b.orderIndex)
                .map(v => ({ ...v, sectionOrderIndex: section.orderIndex }))
        );
}

// Get prev/next video IDs in the global sequence
export function getAdjacentVideos(flatVideos: FlatVideo[], videoId: number) {
    const idx = flatVideos.findIndex(v => v.id === videoId);
    return {
        previousVideoId: idx > 0 ? flatVideos[idx - 1].id : null,
        nextVideoId: idx < flatVideos.length - 1 ? flatVideos[idx + 1].id : null,
    };
}

// Determine if a video is locked
// Unlocked if: it's the first video, OR the previous video is completed
export function isVideoLocked(
    flatVideos: FlatVideo[],
    videoId: number,
    completedVideoIds: Set<number>
): boolean {
    const idx = flatVideos.findIndex(v => v.id === videoId);
    if (idx === 0) return false; // First video always unlocked
    const prevVideo = flatVideos[idx - 1];
    return !completedVideoIds.has(prevVideo.id);
}
