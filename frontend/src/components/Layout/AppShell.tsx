import Link from 'next/link';
import { useAuthStore } from '../../store/authStore';
import { GraduationCap, Settings, Building2, CreditCard, Banknote } from 'lucide-react';

export default function AppShell({ children }: { children: React.ReactNode }) {
    const { user, isAuthenticated, logout } = useAuthStore();

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground font-sans w-full selection:bg-brand-accent/30">
            <header className="h-[72px] border-b border-surface-border bg-background/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-50 sticky top-0 transition-all">
                <Link href="/" className="font-display font-extrabold text-2xl tracking-tight text-brand-accent flex items-center gap-2">
                    <GraduationCap className="w-8 h-8 text-brand-accent" />
                    CodeHorizon
                </Link>

                <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-text-secondary">
                    <Link href="/" className="text-brand-accent border-b-2 border-brand-accent py-5 -mb-[2px] transition-colors">Home</Link>
                    <Link href="/about" className="hover:text-foreground py-5 transition-colors">About</Link>
                    <Link href="/free-courses" className="hover:text-foreground py-5 transition-colors">Free Courses</Link>
                    <Link href="/premium-courses" className="hover:text-foreground py-5 transition-colors">Premium Courses</Link>
                    <Link href="/contact" className="hover:text-foreground py-5 transition-colors">Contact</Link>
                </div>

                <nav className="flex items-center gap-4 text-sm font-medium">
                    <button className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-card hover:bg-surface-border transition-colors text-text-secondary hover:text-foreground">
                        <Settings className="w-5 h-5" />
                    </button>
                    {isAuthenticated ? (
                        <>
                            <Link href="/dashboard" className="text-text-secondary hover:text-foreground transition-colors">Dashboard</Link>
                            <Link href="/profile" className="w-10 h-10 rounded-full bg-surface-secondary border border-surface-border flex items-center justify-center hover:border-brand-accent transition-colors overflow-hidden">
                                {user?.avatarUrl ? (
                                    <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    user?.name?.charAt(0).toUpperCase() || "U"
                                )}
                            </Link>
                            <button onClick={logout} className="text-sm px-4 py-2 border border-surface-border bg-surface-card rounded-md hover:bg-surface-secondary transition-all">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/login" className="px-5 py-2 rounded-lg border border-surface-border bg-transparent text-foreground hover:bg-surface-secondary transition-colors hidden sm:block">Login</Link>
                            <Link href="/auth/register" className="bg-brand-accent text-white px-5 py-2.5 rounded-lg hover:bg-brand-hover transition shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                                Sign Up
                            </Link>
                        </>
                    )}
                </nav>
            </header>

            <main className="flex-1 flex flex-col w-full min-h-[calc(100vh-72px)] overflow-y-auto">
                {children}
            </main>

            <footer className="w-full border-t border-surface-border/50 bg-[#0f172a] pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    <div>
                        <Link href="/" className="font-display font-extrabold text-2xl text-brand-accent flex items-center gap-2 mb-4">
                            <GraduationCap className="w-8 h-8" />
                            CodeHorizon
                        </Link>
                        <p className="text-sm text-text-secondary">Empowering learners worldwide.</p>
                    </div>
                    <div>
                        <h4 className="font-display text-lg font-bold text-brand-accent mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-text-secondary">
                            <li><Link href="/" className="hover:text-brand-accent transition-colors">Home</Link></li>
                            <li><Link href="/about" className="hover:text-brand-accent transition-colors">About</Link></li>
                            <li><Link href="/free-courses" className="hover:text-brand-accent transition-colors">Free Courses</Link></li>
                            <li><Link href="/premium-courses" className="hover:text-brand-accent transition-colors">Premium Courses</Link></li>
                            <li><Link href="/contact" className="hover:text-brand-accent transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-display text-lg font-bold text-brand-accent mb-6">Payment Methods</h4>
                        <ul className="space-y-4 text-sm text-text-secondary">
                            <li className="flex items-center gap-3"><Building2 className="w-5 h-5 text-foreground" /> Bank Transfer</li>
                            <li className="flex items-center gap-3"><CreditCard className="w-5 h-5 text-foreground" /> Credit/Debit Card</li>
                            <li className="flex items-center gap-3"><Banknote className="w-5 h-5 text-foreground" /> UPI</li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-surface-border/50 text-sm text-text-secondary text-center">
                    <p>© 2026 CodeHorizon. All payments are secure and encrypted.</p>
                </div>
            </footer>
        </div>
    );
}
