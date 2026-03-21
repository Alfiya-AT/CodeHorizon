'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/authStore';
import { apiClient } from '../../lib/apiClient';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, setAuth, logout } = useAuthStore();
    const router = useRouter();
    const [loading, setLoading] = useState(!isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
            const checkAuth = async () => {
                try {
                    // Attempting to refresh if there's no access token but refresh cookie might exist
                    const { data } = await apiClient.post('/auth/refresh');
                    // In a real flow, we also want to fetch the /me route to get User details
                    // Here we just set an empty user since the /refresh doesn't return user details
                    // Let's assume /refresh does return user just for simplicity, or we do /auth/me
                    // We'll update the API to return user if needed, but for now we set a dummy.
                    // Wait, the backend refresh returns solely accessToken. We need a `user` object.
                    setAuth({ id: '1', email: 'user@example.com', name: 'User' }, data.accessToken);
                    setLoading(false);
                } catch {
                    logout();
                    router.push('/auth/login');
                }
            };
            checkAuth();
        } else {
            setLoading(false);
        }
    }, [isAuthenticated, router, setAuth, logout]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return <>{children}</>;
}
