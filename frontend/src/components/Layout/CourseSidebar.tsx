'use client';

import { useSidebarStore } from '../../store/sidebarStore';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Lock, ChevronDown, ChevronUp, X, CheckSquare, Square, MonitorPlay } from 'lucide-react';
import { useState } from 'react';

export default function CourseSidebar() {
    const { subjectId, videoId: currentVideoId } = useParams();
    const { tree, loading } = useSidebarStore();
    const [openSections, setOpenSections] = useState<Set<number>>(new Set([0]));

    const toggleSection = (idx: number) => {
        setOpenSections(prev => {
            const next = new Set(prev);
            next.has(idx) ? next.delete(idx) : next.add(idx);
            return next;
        });
    };

    // Calculate overall progress
    const allVideos = tree?.flatMap(s => s.videos) ?? [];
    const completedCount = allVideos.filter(v => v.isCompleted).length;
    const totalCount = allVideos.length;
    const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return (
        <aside className="w-[350px] lg:w-[400px] h-full bg-white text-[#1c1d1f] border-l border-[#d1d7dc] flex flex-col shrink-0 z-10">
            {/* Header */}
            <div className="p-4 border-b border-[#d1d7dc] flex justify-between items-center font-bold text-base bg-white shrink-0">
                Course content
                <X className="w-5 h-5 cursor-pointer text-gray-500 hover:text-black" />
            </div>

            {/* Section List */}
            <div className="flex-1 overflow-y-auto hidden-scrollbar">
                {loading && (
                    <div className="p-4 space-y-3">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-10 bg-[#2a2a2a] rounded animate-pulse" />
                        ))}
                    </div>
                )}

                {tree?.map((section, sectionIdx) => {
                    const sectionCompleted = section.videos.filter(v => v.isCompleted).length;
                    const isOpen = openSections.has(sectionIdx);

                    return (
                        <div key={section.id} className="border-b border-[#d1d7dc]">
                            {/* Section Header */}
                            <button
                                onClick={() => toggleSection(sectionIdx)}
                                className="w-full flex items-start justify-between p-4 bg-[#f7f9fa] hover:bg-[#e3e7ea] transition-colors text-left"
                            >
                                <div className="flex-1 pr-4">
                                    <p className="text-sm font-bold text-[#1c1d1f] mb-1">Section {sectionIdx + 1}: {section.title}</p>
                                    <p className="text-xs text-[#6a6f73]">
                                        {sectionCompleted} / {section.videos.length} | {Math.floor(section.videos.reduce((acc, v) => acc + (v.durationSeconds ?? 0), 0) / 60)}min
                                    </p>
                                </div>
                                {isOpen ? (
                                    <ChevronUp className="w-5 h-5 text-[#1c1d1f] flex-shrink-0 mt-1" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-[#1c1d1f] flex-shrink-0 mt-1" />
                                )}
                            </button>

                            {/* Video List */}
                            {isOpen && (
                                <div className="bg-white">
                                    {section.videos.map((video, vIdx) => {
                                        const isCurrent = String(video.id) === String(currentVideoId);
                                        const isLocked = video.locked;
                                        const isCompleted = video.isCompleted;

                                        return (
                                            <div key={video.id}>
                                                {isLocked ? (
                                                    <div className="flex items-start gap-3 px-4 py-3 opacity-50 cursor-not-allowed border-b border-[#d1d7dc] last:border-b-0 bg-white">
                                                        <Lock className="w-4 h-4 text-[#6a6f73] mt-0.5 flex-shrink-0" />
                                                        <div>
                                                            <p className="text-sm text-[#1c1d1f] line-clamp-2">{vIdx + 1}. {video.title}</p>
                                                            {video.durationSeconds && (
                                                                <p className="text-xs text-[#6a6f73] mt-0.5 flex items-center gap-1">
                                                                    <MonitorPlay className="w-3 h-3" />
                                                                    {Math.floor(video.durationSeconds / 60)}min
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <Link
                                                        href={`/courses/${subjectId}/learn/${video.id}`}
                                                        className={`flex items-start gap-3 px-4 py-3 transition-colors border-b border-[#d1d7dc] last:border-b-0 ${isCurrent ? 'bg-[#d1d7dc] cursor-default' : 'hover:bg-[#f7f9fa] bg-white'}`}
                                                    >
                                                        {isCompleted ? (
                                                            <CheckSquare className="w-4 h-4 text-[#1c1d1f] mt-0.5 flex-shrink-0" />
                                                        ) : (
                                                            <Square className="w-4 h-4 text-[#1c1d1f] mt-0.5 flex-shrink-0" />
                                                        )}
                                                        <div>
                                                            <p className={`text-sm line-clamp-2 ${isCurrent ? 'text-[#1c1d1f] font-bold' : 'text-[#1c1d1f]'}`}>
                                                                {vIdx + 1}. {video.title}
                                                            </p>
                                                            {video.durationSeconds && (
                                                                <p className="text-xs text-[#6a6f73] mt-0.5 flex items-center gap-1">
                                                                    <MonitorPlay className="w-3 h-3" />
                                                                    {Math.floor(video.durationSeconds / 60)}min
                                                                </p>
                                                            )}
                                                        </div>
                                                    </Link>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </aside>
    );
}
