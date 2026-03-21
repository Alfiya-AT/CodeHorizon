'use client';
import AppShell from '../../components/Layout/AppShell';

export default function Contact() {
    return (
        <AppShell>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full min-h-[80vh] flex items-center justify-center">
                <div className="w-full max-w-2xl bg-surface-card p-8 md:p-12 rounded-3xl border border-surface-border shadow-2xl relative overflow-hidden">
                    <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-brand-accent/20 rounded-full blur-[50px]"></div>
                    <div className="absolute bottom-[-50px] left-[-50px] w-40 h-40 bg-brand-accent/20 rounded-full blur-[50px]"></div>
                    
                    <div className="relative z-10 text-center mb-10">
                        <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-4">Get in Touch</h1>
                        <p className="text-text-secondary">Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                    </div>

                    <form className="relative z-10 space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully!'); }}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-secondary">First Name</label>
                                <input required type="text" className="w-full bg-background border border-surface-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-secondary">Last Name</label>
                                <input required type="text" className="w-full bg-background border border-surface-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all" placeholder="Doe" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-secondary">Email</label>
                            <input required type="email" className="w-full bg-background border border-surface-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all" placeholder="john@example.com" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-secondary">Message</label>
                            <textarea required rows={5} className="w-full bg-background border border-surface-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all resize-none" placeholder="How can we help you?"></textarea>
                        </div>

                        <button type="submit" className="w-full py-4 bg-brand-accent hover:bg-brand-hover text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </AppShell>
    );
}
