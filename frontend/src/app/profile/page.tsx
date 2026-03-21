'use client';

import { useEffect, useState } from 'react';
import AppShell from '../../components/Layout/AppShell';
import AuthGuard from '../../components/Auth/AuthGuard';
import { useAuthStore } from '../../store/authStore';
import { apiClient } from '../../lib/apiClient';
import { Spinner } from '../../components/common/Spinner';
import { BookOpen, User, Medal } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
    const { user } = useAuthStore();
    const [loading, setLoading] = useState(true);
    const [subjects, setSubjects] = useState<any[]>([]);
    const [progresses, setProgresses] = useState<any>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: { subjects: subjs } } = await apiClient.get('/subjects');
                setSubjects(subjs);

                const progMap: any = {};
                for (const s of subjs) {
                    try {
                        const { data } = await apiClient.get(`/progress/subjects/${s.id}`);
                        progMap[s.id] = data;
                    } catch (e) {
                        console.error(`Error loading progress for subject ${s.id}`);
                    }
                }
                setProgresses(progMap);
            } catch (e) {
                console.error('Failed to load profile data', e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <AuthGuard>
            <AppShell>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full min-h-[80vh]">
                    <div className="bg-surface-card rounded-2xl p-8 mb-10 flex flex-col md:flex-row items-center md:items-start justify-between border border-surface-border shadow-md">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="relative">
                                <div className="h-24 w-24 bg-brand-accent/20 text-brand-accent border-2 border-brand-accent rounded-full flex items-center justify-center text-4xl font-display font-bold shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                                    {user?.name?.[0]?.toUpperCase() || 'U'}
                                </div>
                            </div>
                            <div className="text-center md:text-left">
                                <h2 className="text-3xl font-display font-bold text-foreground mb-1">{user?.name}</h2>
                                <p className="text-text-secondary text-sm flex items-center justify-center md:justify-start gap-2">
                                    <User className="w-4 h-4"/> {user?.email}
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 md:mt-0 flex gap-4">
                            <button className="px-5 py-2.5 bg-surface-secondary hover:bg-surface-border text-foreground font-semibold rounded-lg transition-colors text-sm border border-surface-border">Edit Profile</button>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mb-8">
                        <Medal className="w-8 h-8 text-brand-accent" />
                        <h3 className="font-display text-2xl font-bold text-foreground">My Learning Journey</h3>
                    </div>

                    {loading ? (
                        <div className="flex justify-center p-10"><Spinner className="w-8 h-8 text-brand-accent" /></div>
                    ) : (
                        <div className="space-y-6">
                            {subjects.length === 0 && (
                                <div className="bg-surface-card border border-surface-border border-dashed p-10 text-center rounded-2xl text-text-secondary">
                                    No courses available yet. Head over to Free Courses to get started!
                                </div>
                            )}
                            {subjects.map(subject => {
                                const prog = progresses[subject.id];
                                if (!prog) return null;

                                const hasStarted = prog.total_videos > 0;
                                return (
                                    <div key={subject.id} className="bg-surface-card border border-surface-border rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow">
                                        <div className="flex-1">
                                            <h4 className="font-display text-xl font-bold text-foreground mb-2">{subject.title}</h4>
                                            <p className="text-sm text-text-secondary line-clamp-2">{subject.description || "In-depth course curriculum designed for rigorous learning."}</p>
                                        </div>

                                        <div className="w-full md:w-64 shrink-0">
                                            <div className="flex justify-between text-sm font-medium mb-3">
                                                <span className="text-foreground">{Math.round(prog.percent_complete)}% Complete</span>
                                                <span className="text-brand-accent flex items-center gap-1"><BookOpen className="w-4 h-4"/> {prog.completed_videos} / {prog.total_videos} lessons</span>
                                            </div>
                                            <div className="w-full bg-surface-secondary rounded-full h-3 border border-surface-border/50">
                                                <div
                                                    className="bg-brand-accent h-3 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                                                    style={{ width: `${Math.max(0, Math.min(100, prog.percent_complete))}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <Link
                                            href={`/subjects/${subject.id}`}
                                            className="px-6 py-3 bg-brand-accent/10 hover:bg-brand-accent border border-brand-accent/50 hover:text-white text-brand-accent rounded-xl font-bold text-sm text-center shrink-0 transition-all shadow-sm"
                                        >
                                            {prog.completed_videos > 0 ? 'Resume Course' : 'Start Course'}
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </AppShell>
        </AuthGuard>
    );
}
