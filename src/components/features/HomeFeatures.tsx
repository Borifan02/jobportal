'use client';

import { motion } from 'framer-motion';
import { Code, Palette, BarChart, Globe, Zap, Shield, Users, Trophy, Mail } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Motion';

const CATEGORIES = [
    { name: 'Engineering', icon: Code, count: '1,240 jobs', color: 'blue' },
    { name: 'Design', icon: Palette, count: '850 jobs', color: 'purple' },
    { name: 'Marketing', icon: BarChart, count: '620 jobs', color: 'emerald' },
    { name: 'Sales', icon: Globe, count: '430 jobs', color: 'orange' },
];

const FEATURES = [
    {
        title: 'Verifed Employers',
        desc: 'Every company on our platform is thoroughly vetted for authenticity and safety.',
        icon: Shield,
        color: 'emerald'
    },
    {
        title: 'Lightning Fast',
        desc: 'Apply to jobs in seconds with your saved profile and resume.',
        icon: Zap,
        color: 'blue'
    },
    {
        title: 'Tech-First',
        desc: 'The best opportunities at top startups and big tech legends.',
        icon: Code,
        color: 'indigo'
    }
];

export function Categories() {
    return (
        <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
                            Explore by <span className="text-blue-600">Categories</span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
                            Find the right path for your career. Discover thousands of opportunities across various industries and roles.
                        </p>
                    </FadeIn>
                </div>

                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CATEGORIES.map((cat, i) => (
                        <StaggerItem key={i}>
                            <div className="group p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1">
                                <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center transition-colors ${cat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' :
                                    cat.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' :
                                        cat.color === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' :
                                            'bg-orange-100 dark:bg-orange-900/30 text-orange-600'
                                    }`}>
                                    <cat.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">{cat.name}</h3>
                                <p className="text-slate-500 dark:text-slate-400 font-medium">{cat.count}</p>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}

export function TrustSection() {
    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50 transition-colors border-y border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {[
                        { label: 'Active Jobs', value: '15,000+', icon: Briefcase },
                        { label: 'Candidates', value: '450,000+', icon: Users },
                        { label: 'Employers', value: '12,000+', icon: Trophy },
                        { label: 'Successful Hires', value: '85,000+', icon: Zap }
                    ].map((stat, i) => (
                        <FadeIn key={i} delay={i * 0.1}>
                            <div className="text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                                        <stat.icon className="w-6 h-6 text-blue-600" />
                                    </div>
                                </div>
                                <p className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">{stat.value}</p>
                                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}

const Briefcase = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
);

export function WhyUs() {
    return (
        <section className="py-24 bg-white dark:bg-slate-950 transition-colors overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <FadeIn direction="right">
                            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold mb-6 uppercase tracking-wider">
                                Platform Benefits
                            </span>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-8 leading-tight tracking-tight">
                                We're built for the <span className="text-blue-600 italic">modern</span> workforce
                            </h2>
                            <div className="space-y-8">
                                {FEATURES.map((feature, i) => (
                                    <div key={i} className="flex gap-6 group">
                                        <div className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center transition-all group-hover:scale-110 shadow-lg ${feature.color === 'emerald' ? 'bg-emerald-600 text-white shadow-emerald-500/20' :
                                            feature.color === 'blue' ? 'bg-blue-600 text-white shadow-blue-500/20' :
                                                'bg-indigo-600 text-white shadow-indigo-500/20'
                                            }`}>
                                            <feature.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                                            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                                {feature.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>
                    </div>

                    <div className="lg:w-1/2 relative">
                        <FadeIn direction="left">
                            <div className="relative z-10 p-4 md:p-8 bg-slate-100 dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1522071823991-b967dfc20bca?auto=format&fit=crop&q=80&w=800"
                                    alt="Modern Office"
                                    className="rounded-[2rem] w-full shadow-lg grayscale focus:grayscale-0 hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 max-w-[200px] animate-bounce-slow">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Live Updates</p>
                                    </div>
                                    <p className="text-slate-900 dark:text-white font-extrabold text-lg">24 New Tech Jobs</p>
                                    <p className="text-slate-400 text-xs font-medium">Just posted in San Francisco</p>
                                </div>
                            </div>
                            {/* Decorative background elements */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/10 dark:bg-blue-600/5 blur-3xl rounded-full -z-0"></div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function Newsletter() {
    return (
        <section className="py-24 bg-slate-900 dark:bg-slate-950 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full -ml-32 -mb-32"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto p-12 md:p-16 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl text-center">
                    <FadeIn delay={0.1}>
                        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-600/30">
                            <Mail className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Stay ahead of the curve</h2>
                        <p className="text-slate-400 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                            Subscribe to our newsletter and get new job alerts, hiring trends, and career advice delivered straight to your inbox.
                        </p>

                        <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                required
                                className="flex-1 px-6 py-5 bg-white/10 border border-white/10 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all backdrop-blur-md"
                            />
                            <button className="px-8 py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95">
                                Join Now
                            </button>
                        </form>
                        <p className="text-slate-500 text-sm mt-6 font-medium">
                            Join 50k+ professionals. No spam, ever.
                        </p>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
