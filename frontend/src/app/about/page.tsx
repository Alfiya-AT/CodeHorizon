'use client';
import AppShell from '../../components/Layout/AppShell';
import { Target, Users, Zap } from 'lucide-react';

export default function About() {
    return (
        <AppShell>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full min-h-[70vh]">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="font-display text-4xl md:text-6xl font-extrabold text-foreground mb-6 leading-tight">
                        Empowering the <span className="text-brand-accent">Next Generation</span> of Engineers
                    </h1>
                    <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                        OnlineGuru is committed to breaking down traditional learning barriers by providing production-grade standard curriculum, completely accessible and deeply focused on real-world outcomes.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-surface-card p-10 rounded-3xl border border-surface-border text-center">
                        <div className="w-16 h-16 bg-brand-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Target className="w-8 h-8 text-brand-accent" />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                        <p className="text-text-secondary leading-relaxed">To make world-class tech education accessible to everyone, everywhere, at any stage of their career.</p>
                    </div>

                    <div className="bg-surface-card p-10 rounded-3xl border border-surface-border text-center">
                        <div className="w-16 h-16 bg-[#f97316]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Users className="w-8 h-8 text-[#f97316]" />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-foreground mb-4">Community</h3>
                        <p className="text-text-secondary leading-relaxed">We foster a vibrant environment of over 100,000+ passionate learners who collaborate, build, and grow together.</p>
                    </div>

                    <div className="bg-surface-card p-10 rounded-3xl border border-surface-border text-center">
                        <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Zap className="w-8 h-8 text-success" />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-foreground mb-4">Innovation</h3>
                        <p className="text-text-secondary leading-relaxed">Staying ahead of the curve with courses built around the most modern and performant technologies available.</p>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
