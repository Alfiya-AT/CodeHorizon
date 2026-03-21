import { apiClient } from './apiClient';

export const createProgressSaver = (videoId: number) => {
    let lastSavedPosition = -1;

    return async (currentTime: number) => {
        // Only save if progress has moved by ~5 seconds
        if (Math.abs(currentTime - lastSavedPosition) >= 5) {
            lastSavedPosition = currentTime;
            try {
                await apiClient.post(`/progress/videos/${videoId}`, {
                    lastPositionSeconds: Math.floor(currentTime),
                });
            } catch (e) {
                console.error('Failed to save progress', e);
            }
        }
    };
};
