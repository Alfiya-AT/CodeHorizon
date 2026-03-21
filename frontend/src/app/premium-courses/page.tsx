'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiClient } from '../../lib/apiClient';
import { Spinner } from '../../components/common/Spinner';
import AppShell from '../../components/Layout/AppShell';
import { Crown, BookOpen } from 'lucide-react';

export default function PremiumCourses() {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await apiClient.get('/subjects');
                // Filter only premium
                let premium = data.subjects.filter((s: any) => s.price && parseFloat(s.price) > 0);
                if (premium.length === 0) premium = data.subjects; // fallback mock
                setCourses(premium);
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
                    <h1 className="font-display text-4xl md:text-5xl font-extrabold text-[#f97316] mb-4">Premium Certification</h1>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto">Master advanced skills and get certified with in-depth curriculums guided by industry veterans.</p>
                </div>
                {loading ? (
                    <div className="flex justify-center py-20"><Spinner className="w-10 h-10 text-brand-accent" /></div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course, idx) => (
                            <div key={course.id || idx} className="bg-surface-card rounded-2xl overflow-hidden border border-surface-border flex flex-col shadow-xl hover:shadow-[0_10px_30px_rgba(249,115,22,0.15)] transition-shadow">
                                <div className="aspect-video bg-surface-secondary relative flex items-center justify-center group overflow-hidden">
                                    {course.thumbnailUrl ? <img src={course.thumbnailUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/> : <Crown className="w-12 h-12 text-[#f97316]/50"/>}
                                    <div className="absolute top-4 left-4 bg-[#f97316] text-white text-[11px] font-bold px-3 py-1 rounded shadow-lg uppercase tracking-wider flex items-center gap-1"><Crown className="w-3 h-3"/> PREMIUM</div>
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="font-display text-xl font-bold text-foreground mb-4">{course.title}</h3>
                                    <p className="text-sm text-text-secondary line-clamp-2 mb-4">{course.description || "The most comprehensive learning path designed for ambitious professionals."}</p>
                                    <div className="mt-auto pt-6 border-t border-surface-border/50 flex flex-col">
                                        <span className="text-text-secondary text-sm line-through decoration-[#f97316]/50 decoration-2">₹{(Math.random() * 5000 + 5000).toFixed(0)}</span>
                                        <div className="flex justify-between items-end mt-1">
                                            <span className="text-3xl font-display font-bold text-foreground">
                                                ₹{course.price || (Math.random() * 3000 + 1999).toFixed(0)}
                                            </span>
                                            <Link href={`/courses/${course.id}`} className="px-4 py-2 bg-[#f97316]/10 text-[#f97316] hover:bg-[#f97316] hover:text-white rounded-lg font-bold transition-colors text-sm">Enroll Now</Link>
                                        </div>
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
