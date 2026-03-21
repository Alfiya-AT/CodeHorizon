'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiClient } from '../../lib/apiClient';
import { Spinner } from '../../components/common/Spinner';
import AppShell from '../../components/Layout/AppShell';

export default function CoursesCatalog() {
    const [subjects, setSubjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                setLoading(true);
                // Note: For testing, we fetch all subjects. Production would use ?q=search&level=filter
                const { data } = await apiClient.get(`/subjects`);
                let filtered = data.subjects;
                if (search) {
                    filtered = filtered.filter((s: any) => s.title.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase()));
                }
                if (activeFilter !== 'All') {
                    filtered = filtered.filter((s: any) => s.level?.toUpperCase() === activeFilter.toUpperCase());
                }
                setSubjects(filtered);
            } catch (e) {
                console.error('Failed to load subjects', e);
            } finally {
                setLoading(false);
            }
        };

        // Simple debounce timeout
        const timeout = setTimeout(() => {
            fetchSubjects();
        }, 300);
        return () => clearTimeout(timeout);
    }, [search, activeFilter]);

    return (
        <AppShell>
            <div className="w-full bg-surface-secondary border-b border-surface-border sticky top-[72px] z-40 backdrop-blur-md bg-opacity-70">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="flex gap-2 text-sm">
                        {['All', 'Beginner', 'Intermediate', 'Advanced'].map(filter => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-4 py-2 rounded-full font-medium transition-colors ${activeFilter === filter ? 'bg-brand-accent text-white' : 'bg-surface-card hover:bg-surface-border text-text-secondary hover:text-foreground border border-surface-border'}`}>
                                {filter}
                            </button>
                        ))}
                    </div>

                    <div className="w-full sm:w-80 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-border text-lg pointer-events-none">🔍</span>
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search courses, skills..."
                            className="w-full bg-background border border-surface-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1">
                <div className="mb-10">
                    <h1 className="font-display text-4xl font-extrabold text-foreground mb-4">Course Catalog</h1>
                    <p className="text-xl text-text-secondary">Discover thousands of expert-led courses.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center p-20"><Spinner className="w-8 h-8 text-brand-accent" /></div>
                ) : (
                    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 xl:gap-x-8">
                        {subjects.length === 0 ? (
                            <div className="col-span-full py-20 text-center text-text-secondary border border-surface-border border-dashed rounded-xl bg-surface-card/50">
                                <p className="text-lg">No courses found matching your criteria.</p>
                                <button onClick={() => { setSearch(''); setActiveFilter('All'); }} className="mt-4 text-brand-hover underline">Clear Filters</button>
                            </div>
                        ) : subjects.map((subject) => (
                            <div key={subject.id} className="premium-card rounded-2xl p-5 transition-all hover:-translate-y-1 group flex flex-col h-full bg-surface-card shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-surface-border">
                                <div className="relative aspect-video w-full bg-surface-secondary rounded-lg mb-4 overflow-hidden border border-surface-border/50 group-hover:border-surface-border transition-colors">
                                    {subject.thumbnailUrl ? (
                                        <img src={subject.thumbnailUrl} alt={subject.title} className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-text-secondary text-sm">Preview</div>
                                    )}
                                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-background shadow backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-widest text-text-primary z-10 border border-surface-border">
                                        {subject.level || 'Beginner'}
                                    </div>
                                </div>

                                <h3 className="font-display text-lg font-bold text-foreground mb-1 group-hover:text-brand-accent transition-colors leading-tight">
                                    <Link href={`/courses/${subject.id}`}>
                                        <span className="absolute inset-0" />
                                        {subject.title}
                                    </Link>
                                </h3>

                                <p className="text-sm text-text-secondary mb-4 line-clamp-2 leading-relaxed flex-1">
                                    {subject.description}
                                </p>

                                <div className="flex items-center gap-1 text-sm text-warning font-medium mb-3">
                                    ⭐ 4.8 <span className="text-text-secondary font-normal">(1.2k)</span>
                                </div>

                                <div className="border-t border-surface-border pt-4 flex items-center justify-between mt-auto">
                                    <span className="font-bold text-lg text-foreground tracking-tight">
                                        {subject.price && parseFloat(subject.price) > 0 ? `₹${subject.price}` : 'Free'}
                                    </span>
                                    <span className="text-brand-accent text-sm font-semibold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                        Enroll <span aria-hidden="true">&rarr;</span>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}
