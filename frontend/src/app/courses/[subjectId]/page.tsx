'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiClient } from '../../../lib/apiClient';
import AppShell from '../../../components/Layout/AppShell';
import { Spinner } from '../../../components/common/Spinner';
import { Check, ChevronDown, ChevronUp, PlayCircle, MonitorPlay, FileText, Code } from 'lucide-react';

export default function CourseDetailsPage() {
    const { subjectId } = useParams();
    const router = useRouter();

    const [subject, setSubject] = useState<any>(null);
    const [tree, setTree] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0])); // expand first by default
    const [purchaseType, setPurchaseType] = useState<'subscribe' | 'buy'>('buy');

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                // Fetch subject details and tree in parallel
                const [subjectRes, treeRes] = await Promise.all([
                    apiClient.get(`/subjects/${subjectId}`),
                    apiClient.get(`/subjects/${subjectId}/tree`)
                ]);

                setSubject(subjectRes.data.subject);
                setTree(treeRes.data);
            } catch (e) {
                console.error('Failed to load course details', e);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [subjectId]);

    const toggleSection = (idx: number) => {
        setExpandedSections(prev => {
            const next = new Set(prev);
            if (next.has(idx)) next.delete(idx);
            else next.add(idx);
            return next;
        });
    };

    const expandAll = () => {
        if (!tree?.sections) return;
        setExpandedSections(new Set(tree.sections.map((_: any, i: number) => i)));
    };

    if (loading) {
        return (
            <AppShell>
                <div className="flex justify-center items-center py-32"><Spinner className="w-10 h-10 text-brand-accent" /></div>
            </AppShell>
        );
    }

    if (!subject) {
        return (
            <AppShell>
                <div className="text-center py-32 text-text-secondary">Course not found.</div>
            </AppShell>
        );
    }

    // Calculate totals
    const totalSections = tree?.sections?.length || 0;
    const totalVideos = tree?.sections?.reduce((acc: number, sec: any) => acc + sec.videos.length, 0) || 0;
    // Assuming 5 mins per video average if duration is not explicitly loaded, for display purposes in content header
    const totalLengthMins = totalVideos * 5;

    const formatLength = (mins: number) => {
        const h = Math.floor(mins / 60);
        const m = mins % 60;
        return h > 0 ? `${h}h ${m}m` : `${m}m`;
    };

    return (
        <AppShell>
            {/* Header / Hero Section (Dark Theme matching Udemy) */}
            <div className="bg-[#1c1d1f] text-white pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-surface-border relative">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 relative">
                    <div className="flex-1 lg:pr-[380px] z-10">
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-[#c0c4fc] text-sm font-bold mb-4">
                            <Link href="/courses" className="hover:text-white transition-colors">Development</Link>
                            <span>›</span>
                            <span className="hover:text-white transition-colors cursor-pointer text-[#c0c4fc]">Programming Languages</span>
                            <span>›</span>
                            <span className="hover:text-white transition-colors cursor-pointer text-[#c0c4fc]">{(subject.tags || '').split(',')[0]?.replace(/\w\S*/g, (w: string) => (w.replace(/^\w/, (c) => c.toUpperCase()))) || 'Topic'}</span>
                        </div>

                        {/* Title */}
                        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
                            {subject.title}
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg text-[#f7f9fa] mb-4">
                            {subject.description}
                        </p>

                        {/* Stats Row */}
                        <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
                            {subject.isFeatured && (
                                <span className="bg-[#eceb98] text-[#3d3c0a] px-2 py-0.5 font-bold text-xs rounded-sm">
                                    Bestseller
                                </span>
                            )}
                            <div className="flex items-center gap-1 text-[#f69c08] font-bold">
                                4.7
                                <span className="flex text-[#f69c08]">★★★★★</span>
                            </div>
                            <span className="text-[#c0c4fc] underline cursor-pointer">(1,752,961 ratings)</span>
                            <span>416,349 learners</span>
                        </div>

                        <div className="text-[#f7f9fa] text-sm mb-4">
                            Created by <span className="text-[#c0c4fc] underline cursor-pointer">Dr. Angela Yu, Developer and Lead Instructor</span>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-[#f7f9fa]">
                            <span className="flex items-center gap-1">⚠️ Last updated 3/2026</span>
                            <span className="flex items-center gap-1">🌐 English</span>
                            <span className="flex items-center gap-1">🗣️ Arabic [Auto], Bulgarian [Auto], <span className="text-[#c0c4fc] underline cursor-pointer">29 more</span></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">

                {/* Right Floating Sidebar (Pricing Card) */}
                <div className="lg:absolute lg:top-[-260px] lg:right-8 w-full lg:w-[340px] z-20 mb-10 lg:mb-0">
                    <div className="bg-white text-black border border-[#d1d7dc] shadow-lg flex flex-col">

                        {/* Video Preview */}
                        <div className="relative aspect-video w-full bg-black flex items-center justify-center cursor-pointer group">
                            {subject.thumbnailUrl ? (
                                <img src={subject.thumbnailUrl} alt="Course Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                            ) : (
                                <div className="text-white text-sm">Preview Thumbnail</div>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white/90 rounded-full w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <PlayCircle className="w-8 h-8 text-black" />
                                </div>
                            </div>
                            <div className="absolute bottom-2 left-0 w-full text-center font-bold text-white text-sm drop-shadow-md">
                                Preview this course
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Subscribe Option */}
                            <label className={`block border-2 ${purchaseType === 'subscribe' ? 'border-[#5624d0] bg-[#f7f9fa]' : 'border-transparent'} rounded cursor-pointer p-4 mb-3 transition-colors`}>
                                <div className="flex items-start gap-4">
                                    <input
                                        type="radio"
                                        name="purchaseType"
                                        className="mt-1 w-5 h-5 accent-[#5624d0]"
                                        checked={purchaseType === 'subscribe'}
                                        onChange={() => setPurchaseType('subscribe')}
                                    />
                                    <div>
                                        <div className="font-bold text-base">Subscribe and save</div>
                                        <div className="text-sm mt-1">
                                            From <span className="font-bold">₹800.00</span> <span className="line-through text-gray-500 text-xs">₹1,500.00</span> /month
                                        </div>
                                    </div>
                                </div>
                                {purchaseType === 'subscribe' && (
                                    <div className="mt-4 pl-9 space-y-2 text-sm text-[#1c1d1f]">
                                        <div className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 text-gray-600" /> Access to 26,000+ top-rated courses</div>
                                        <div className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 text-gray-600" /> Cancel anytime</div>
                                        <div className="text-[#5624d0] font-bold mt-2 cursor-pointer hover:underline">Learn more</div>
                                    </div>
                                )}
                            </label>

                            {/* Buy Option */}
                            <label className={`block border-2 ${purchaseType === 'buy' ? 'border-[#5624d0] bg-[#f7f9fa]' : 'border-transparent'} rounded cursor-pointer p-4 mb-4 transition-colors`}>
                                <div className="flex items-start gap-4">
                                    <input
                                        type="radio"
                                        name="purchaseType"
                                        className="mt-1 w-5 h-5 accent-[#5624d0]"
                                        checked={purchaseType === 'buy'}
                                        onChange={() => setPurchaseType('buy')}
                                    />
                                    <div>
                                        <div className="font-bold text-base">Buy individual course</div>
                                        <div className="mt-1 flex items-baseline gap-2">
                                            <span className="font-bold text-lg">₹{subject.price || '459'}</span>
                                            <span className="line-through text-gray-500 text-sm">₹3,199</span>
                                            <span className="text-[#a435f0] text-sm">86% off</span>
                                        </div>
                                    </div>
                                </div>
                            </label>

                            {/* CTA Button */}
                            <button
                                onClick={() => router.push(`/courses/${subjectId}/learn/${tree?.sections[0]?.videos[0]?.id || ''}`)}
                                className="w-full bg-[#a435f0] hover:bg-[#8710d8] text-white font-bold py-3 px-4 rounded transition-colors mb-4"
                            >
                                Start Course
                            </button>

                            {/* Coupon Section */}
                            <div className="text-sm text-gray-600 space-y-3">
                                <div className="flex justify-between items-center text-xs">
                                    <button className="underline font-bold">Apply Coupon</button>
                                </div>
                                <div className="flex gap-0">
                                    <input type="text" placeholder="Enter Coupon" className="flex-1 border border-r-0 border-gray-400 p-2 outline-none focus:border-black" defaultValue="25BBPMXNVD35" />
                                    <button className="bg-[#2d2f31] text-white font-bold px-4 py-2 hover:bg-[#1c1d1f]">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Left Content Column */}
                <div className="lg:pr-[380px]">

                    {/* What you'll learn badge (if premium layout) */}
                    <div className="border border-[#d1d7dc] p-6 bg-[#f7f9fa] mb-10 text-[#1c1d1f] rounded">
                        <h2 className="text-2xl font-bold mb-4 font-display">What you'll learn</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                            {[
                                "Master the programming language by building 100 unique projects over 100 days.",
                                "Learn automation, game, app and web development, data science and machine learning.",
                                "Be able to program professionally.",
                                "Learn Selenium, Beautiful Soup, Request, Flask, Pandas, NumPy, Scikit Learn, Plotly.",
                                "Create a portfolio of 100 projects to apply for developer jobs.",
                                "Be able to build fully fledged websites and web apps."
                            ].map((point, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <Check className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-700" />
                                    <span className="text-sm">{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Course Content Accordion */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 font-display text-foreground">Course content</h2>

                        <div className="flex justify-between items-center text-sm mb-2 text-text-primary">
                            <span>{totalSections} sections • {totalVideos} lectures • {formatLength(totalLengthMins)} total length</span>
                            <button onClick={expandAll} className="text-[#a855f7] hover:text-[#9333ea] font-bold">Expand all sections</button>
                        </div>

                        <div className="border border-[#2a2a2a] bg-[#1a1a1a] rounded">
                            {tree?.sections?.map((section: any, idx: number) => {
                                const isOpen = expandedSections.has(idx);
                                const sectionVideos = section.videos || [];
                                const sectionDuration = sectionVideos.reduce((acc: number, v: any) => acc + (v.durationSeconds || 300), 0);

                                return (
                                    <div key={section.id} className="border-b border-[#2a2a2a] last:border-b-0">
                                        {/* Accordion Header */}
                                        <button
                                            onClick={() => toggleSection(idx)}
                                            className="w-full flex items-center justify-between p-4 bg-[#252525] hover:bg-[#2d2d2d] transition-colors text-left"
                                        >
                                            <div className="flex items-center gap-3">
                                                {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                                                <span className="font-bold text-white text-base">{section.title}</span>
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                {sectionVideos.length} lectures • {Math.floor(sectionDuration / 60)}min
                                            </div>
                                        </button>

                                        {/* Accordion Body */}
                                        {isOpen && (
                                            <div className="p-4 bg-[#1a1a1a]">
                                                {sectionVideos.map((video: any, vIdx: number) => {
                                                    // Determine icon based on index/randomness for variety
                                                    let Icon = MonitorPlay;
                                                    if (vIdx % 4 === 1) Icon = FileText;
                                                    else if (vIdx % 4 === 2) Icon = Code;

                                                    return (
                                                        <div key={video.id} className="flex justify-between items-start py-2 group">
                                                            <div className="flex items-start gap-4">
                                                                <Icon className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
                                                                <Link href={`/courses/${subjectId}/learn/${video.id}`} className="text-sm text-[#c0c4fc] group-hover:underline underline-offset-2">
                                                                    {video.title}
                                                                </Link>
                                                            </div>
                                                            <div className="text-sm text-gray-400">
                                                                {video.durationSeconds ? `${Math.floor(video.durationSeconds / 60)}:${String(video.durationSeconds % 60).padStart(2, '0')}` : '5:00'}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
