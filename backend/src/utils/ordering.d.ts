export interface VideoNode {
    id: number;
    sectionId: number;
    orderIndex: number;
}
export interface FlatVideo extends VideoNode {
    sectionOrderIndex: number;
}
export declare function flattenVideos(sections: Array<{
    id: number;
    orderIndex: number;
    videos: VideoNode[];
}>): FlatVideo[];
export declare function getAdjacentVideos(flatVideos: FlatVideo[], videoId: number): {
    previousVideoId: number | null;
    nextVideoId: number | null;
};
export declare function isVideoLocked(flatVideos: FlatVideo[], videoId: number, completedVideoIds: Set<number>): boolean;
//# sourceMappingURL=ordering.d.ts.map