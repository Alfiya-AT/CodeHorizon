'use client';
import { useAuthStore } from '../../store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AppShell from '../../components/Layout/AppShell';
import { BookOpen, Trophy, Clock, PlayCircle } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
    const { user, isAuthenticated } = useAuthStore();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (mounted && !isAuthenticated) {
            router.push('/auth/login');
        }
    }, [isAuthenticated, mounted, router]);

    if (!mounted || !isAuthenticated) return (
        <AppShell>
            <div className="flex justify-center py-20 min-h-[80vh] items-center">
                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent"></div>
            </div>
        </AppShell>
    );

    const stats = [
        { icon: BookOpen, label: 'Enrolled Courses', value: '4' },
        { icon: Trophy, label: 'Certificates Earned', value: '1' },
        { icon: Clock, label: 'Learning Hours', value: '42' },
    ];

    return (
        <AppShell>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full min-h-[80vh]">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <h1 className="font-display text-4xl font-extrabold text-foreground mb-2">Welcome back, {user?.name || 'Student'}!</h1>
                        <p className="text-text-secondary">Ready to continue your learning journey?</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-surface-card p-6 flex flex-col items-center justify-center text-center rounded-2xl border border-surface-border shadow-sm">
                            <stat.icon className="w-10 h-10 text-brand-accent mb-4" />
                            <h3 className="text-3xl font-display font-bold text-foreground mb-1">{stat.value}</h3>
                            <p className="text-sm font-medium text-text-secondary uppercase tracking-wider">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <h2 className="font-display text-2xl font-bold text-foreground mb-8">Continue Learning</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[1, 2].map((i) => (
                        <div key={i} className="bg-surface-card rounded-2xl overflow-hidden border border-surface-border flex flex-col sm:flex-row shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow">
                            <div className="aspect-video sm:w-48 bg-surface-secondary relative flex items-center justify-center border-b sm:border-b-0 sm:border-r border-surface-border/50">
                                <PlayCircle className="w-12 h-12 text-brand-accent/50" />
                            </div>
                            <div className="p-6 flex flex-col flex-1 justify-center">
                                <h3 className="font-display text-lg font-bold text-foreground mb-2">Professional {i === 1 ? 'Web' : 'Data'} Architecture</h3>
                                <div className="w-full bg-surface-secondary rounded-full h-2 mb-2 mt-4">
                                    <div className="bg-brand-accent h-2 rounded-full transition-all duration-1000" style={{ width: `${i * 35}%` }}></div>
                                </div>
                                <p className="text-xs text-text-secondary text-right">{i * 35}% Complete</p>
                                <Link href="#" className="mt-4 px-4 py-2 bg-brand-accent/10 border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white rounded-lg font-bold transition-all text-sm w-max">Continue Course</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppShell>
    );
}
