'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import CourseSidebar from '../../../../components/Layout/CourseSidebar';
import { useSidebarStore } from '../../../../store/sidebarStore';
import Link from 'next/link';

export default function LearnLayout({ children }: { children: React.ReactNode }) {
    const { subjectId } = useParams();
    const { fetchTree } = useSidebarStore();

    useEffect(() => {
        if (subjectId) {
            fetchTree(Number(subjectId));
        }
    }, [subjectId, fetchTree]);

    return (
        <div className="flex flex-col w-full h-screen bg-[#1c1d1f] text-white font-sans overflow-hidden">
            {/* Header */}
            <header className="h-14 bg-[#1c1d1f] flex items-center justify-between px-4 border-b border-[#2d2f31] shrink-0">
                <div className="flex items-center gap-4">
                    <Link href={`/courses/${subjectId}`} className="text-white font-bold text-xl hover:text-gray-300 transition">
                        ûdemy
                    </Link>
                    <div className="w-[1px] h-6 bg-[#3e4143] mx-2" />
                    <h1 className="text-sm font-bold truncate max-w-md hidden sm:block">Course Content Playback</h1>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-bold hidden sm:block">Your progress</span>
                    <button className="border border-white hover:bg-white/10 px-3 py-1.5 text-sm font-bold rounded flex items-center gap-2">
                        Share <span className="text-xs">➦</span>
                    </button>
                    <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer hover:bg-white/10">
                        <span className="text-sm">⋮</span>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex w-full h-[calc(100vh-56px)]">
                {/* Left Side: Video (Takes up remaining space) */}
                <div className="flex-1 bg-black overflow-y-auto relative hidden-scrollbar flex flex-col">
                    <div className="w-full max-w-5xl mx-auto pt-4 pb-12 flex-1">
                        {children}
                    </div>
                </div>

                {/* Right Side: Sidebar */}
                <CourseSidebar />
            </div>
        </div>
    );
}
