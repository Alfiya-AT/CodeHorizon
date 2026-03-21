'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiClient } from '../../lib/apiClient';
import { Spinner } from '../../components/common/Spinner';
import AppShell from '../../components/Layout/AppShell';
import { Youtube, BookOpen } from 'lucide-react';

export default function FreeCourses() {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await apiClient.get('/subjects');
                // Filter only free
                const free = data.subjects.filter((s: any) => !s.price || parseFloat(s.price) === 0);
                if (free.length === 0) setCourses(data.subjects); // fallback if no free courses explicitly
                else setCourses(free);
            } catch (e) {
                console.error(e);
            } finally { setLoading(false); }
        };
        fetchCourses();
    }, []);

    return (
        <AppShell>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full min-h-[70vh]">
                <div className="mb-12 text-center">
                    <h1 className="font-display text-4xl md:text-5xl font-extrabold text-brand-accent mb-4">100+ Free Courses</h1>
                    <p className="text-xl text-text-secondary">Start learning immediately at zero cost. Upgrade anytime.</p>
                </div>
                {loading ? (
                    <div className="flex justify-center py-20"><Spinner className="w-10 h-10 text-brand-accent" /></div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.length === 0 ? (
                            <div className="col-span-full text-center py-20 text-text-secondary bg-surface-card rounded-2xl border border-surface-border">
                                No free courses found right now. Check back later!
                            </div>
                        ) : courses.map(course => (
                            <div key={course.id} className="bg-surface-card rounded-2xl overflow-hidden border border-surface-border flex flex-col shadow-lg hover:-translate-y-1 transition-transform">
                                <div className="aspect-video bg-surface-secondary relative flex items-center justify-center">
                                    {course.thumbnailUrl ? <img src={course.thumbnailUrl} className="w-full h-full object-cover"/> : <Youtube className="w-12 h-12 text-brand-accent/50"/>}
                                    <div className="absolute top-4 left-4 bg-success text-white text-[11px] font-bold px-3 py-1 rounded shadow-lg uppercase tracking-wider">FREE</div>
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="font-display text-xl font-bold text-foreground mb-4">{course.title}</h3>
                                    <p className="text-sm text-text-secondary line-clamp-2 mb-4">{course.description || "Learn the foundational concepts and build real-world confidence."}</p>
                                    <div className="mt-auto pt-6 border-t border-surface-border/50 flex justify-between items-center">
                                        <div className="flex items-center gap-2 text-sm text-text-secondary bg-surface-secondary px-3 py-1 rounded-lg">
                                            <BookOpen className="w-4 h-4"/> {Math.floor(Math.random()*40)+10} Lessons
                                        </div>
                                        <Link href={`/courses/${course.id}`} className="text-brand-accent font-semibold hover:underline">Start Learning &rarr;</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}
