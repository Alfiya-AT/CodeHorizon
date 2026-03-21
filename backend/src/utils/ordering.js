"use strict";
// ordering.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenVideos = flattenVideos;
exports.getAdjacentVideos = getAdjacentVideos;
exports.isVideoLocked = isVideoLocked;
// Build globally ordered flat list: sort by section.orderIndex, then video.orderIndex
function flattenVideos(sections) {
    return sections
        .sort((a, b) => a.orderIndex - b.orderIndex)
        .flatMap(section => section.videos
        .sort((a, b) => a.orderIndex - b.orderIndex)
        .map(v => ({ ...v, sectionOrderIndex: section.orderIndex })));
}
// Get prev/next video IDs in the global sequence
function getAdjacentVideos(flatVideos, videoId) {
    const idx = flatVideos.findIndex(v => v.id === videoId);
    return {
        previousVideoId: idx > 0 ? flatVideos[idx - 1].id : null,
        nextVideoId: idx < flatVideos.length - 1 ? flatVideos[idx + 1].id : null,
    };
}
// Determine if a video is locked
// Unlocked if: it's the first video, OR the previous video is completed
function isVideoLocked(flatVideos, videoId, completedVideoIds) {
    const idx = flatVideos.findIndex(v => v.id === videoId);
    if (idx === 0)
        return false; // First video always unlocked
    const prevVideo = flatVideos[idx - 1];
    return !completedVideoIds.has(prevVideo.id);
}
//# sourceMappingURL=ordering.js.map