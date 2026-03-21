'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiClient } from '../lib/apiClient';
import { Spinner } from '../components/common/Spinner';
import AppShell from '../components/Layout/AppShell';
import { Youtube, Crown, Lock, BookOpen } from 'lucide-react';

export default function Home() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const { data } = await apiClient.get('/subjects');
        setSubjects(data.subjects);
      } catch (e) {
        console.error('Failed to load subjects', e);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  return (
    <AppShell>
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden flex flex-col justify-center min-h-[600px] border-b border-surface-border/50">
        {/* Background abstract layer matching OnlineGuru blur / gradients */}
        <div className="absolute inset-0 bg-background overflow-hidden z-0">
          <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-brand-accent/20 rounded-full mix-blend-screen filter blur-[100px] opacity-60"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-[#f97316]/10 rounded-full mix-blend-screen filter blur-[120px] opacity-40"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 z-10 flex flex-col items-center justify-center text-center">
          <div className="bg-surface-card/60 backdrop-blur-xl border border-surface-border p-12 md:p-16 rounded-3xl shadow-2xl max-w-4xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight tracking-tight">
              Unlock Your Potential with OnlineGuru
            </h1>
            <p className="text-lg md:text-xl text-text-secondary mb-10 font-sans max-w-2xl mx-auto">
              Join 100,000+ learners mastering in-demand skills through expertly crafted courses and hands-on projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/free-courses" className="w-full sm:w-auto px-8 py-3.5 rounded-lg border border-brand-accent text-brand-accent hover:bg-brand-accent/10 transition-colors font-semibold text-lg">
                Free Courses
              </Link>
              <Link href="/premium-courses" className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-brand-accent text-white hover:bg-brand-hover transition-colors shadow-[0_0_20px_rgba(99,102,241,0.5)] font-semibold text-lg">
                Premium Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose OnlineGuru Features */}
      <section className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
            Why Choose <span className="text-brand-accent">OnlineGuru?</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface-card rounded-2xl p-8 border border-surface-border shadow-lg transition-transform hover:-translate-y-1">
              <Youtube className="w-12 h-12 text-foreground mb-6" />
              <h3 className="font-display text-xl font-bold text-foreground mb-4">100+ Free Courses</h3>
              <p className="text-text-secondary leading-relaxed">
                Learn from industry professionals at no cost. Build a strong foundation completely free.
              </p>
            </div>
            
            <div className="bg-surface-card rounded-2xl p-8 border border-surface-border shadow-lg transition-transform hover:-translate-y-1">
              <Crown className="w-12 h-12 text-foreground mb-6" />
              <h3 className="font-display text-xl font-bold text-foreground mb-4">Premium Certification</h3>
              <p className="text-text-secondary leading-relaxed">
                Advanced courses with professional certification to showcase your specialized skills.
              </p>
            </div>

            <div className="bg-surface-card rounded-2xl p-8 border border-surface-border shadow-lg transition-transform hover:-translate-y-1">
              <Lock className="w-12 h-12 text-foreground mb-6" />
              <h3 className="font-display text-xl font-bold text-foreground mb-4">Secure Payments</h3>
              <p className="text-text-secondary leading-relaxed">
                Multiple payment options with bank details protection. Fully encrypted & safe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Premium Courses */}
      <section className="bg-surface-secondary/30 py-24 border-t border-surface-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-left text-foreground mb-12">
            Featured Premium Courses
          </h2>

          {loading ? (
            <div className="flex justify-center p-20"><Spinner className="w-10 h-10 text-brand-accent" /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {(subjects.length > 0 ? subjects.slice(0, 3) : [1,2,3]).map((subject: any, idx: number) => (
                <div key={subject.id || idx} className="bg-surface-card rounded-2xl overflow-hidden border border-surface-border flex flex-col shadow-xl hover:shadow-[0_10px_30px_rgba(99,102,241,0.15)] transition-shadow">
                  {/* Thumbnail area */}
                  <div className="w-full aspect-video bg-surface-secondary relative overflow-hidden group">
                    {subject.thumbnailUrl ? (
                      <img src={subject.thumbnailUrl} alt={subject.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                        <span className="text-brand-accent/50 font-display font-bold text-2xl">OnlineGuru</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-[#f97316] text-white text-[11px] font-bold px-3 py-1 rounded shadow-lg uppercase tracking-wider flex items-center gap-1">
                      <Crown className="w-3 h-3" /> PREMIUM
                    </div>
                  </div>

                  {/* Content area */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-xl font-bold text-foreground mb-4 leading-tight">
                      {subject.title || `Premium Course ${idx + 1}`}
                    </h3>

                    <div className="flex items-center gap-2 mb-6 text-sm text-text-secondary bg-surface-secondary w-fit px-3 py-1.5 rounded-lg border border-surface-border/50">
                      <BookOpen className="w-4 h-4 text-brand-accent" />
                      <span>{Math.floor(Math.random() * 50) + 20} Lessons</span>
                    </div>

                    <div className="mt-auto border-t border-surface-border/50 pt-6 flex flex-col space-y-2">
                       <span className="text-text-secondary text-sm line-through decoration-brand-accent/50 decoration-2">₹{(Math.random() * 5000 + 5000).toFixed(0)}</span>
                       <span className="text-3xl font-display font-bold text-foreground">
                         ₹{subject.price || (Math.random() * 3000 + 1999).toFixed(0)}<span className="text-sm font-sans text-text-secondary font-medium tracking-normal ml-2">+ 18% GST</span>
                       </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center">
             <Link href="/courses" className="px-8 py-3.5 rounded-lg bg-brand-accent/10 border border-brand-accent/30 text-brand-accent hover:bg-brand-accent hover:text-white transition-all font-semibold text-base shadow-lg hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                View All Premium Courses
             </Link>
          </div>
        </div>
      </section>

    </AppShell>
  );
}
