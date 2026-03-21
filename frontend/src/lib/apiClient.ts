import axios from 'axios';
import { config } from './config';
import { useAuthStore } from '../store/authStore';

export const apiClient = axios.create({
    baseURL: config.API_BASE_URL,
    withCredentials: true,
});

apiClient.interceptors.request.use((req) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

apiClient.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/refresh') {
            originalRequest._retry = true;
            try {
                const { data } = await axios.post(`${config.API_BASE_URL}/auth/refresh`, {}, { withCredentials: true });
                useAuthStore.getState().setAccessToken(data.accessToken);
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
                return apiClient(originalRequest);
            } catch (err) {
                useAuthStore.getState().logout();
                window.location.href = '/auth/login';
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);
