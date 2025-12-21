'use client';

import { useState, useMemo } from 'react';
import { Job } from '@/types';
import JobCard from '@/components/features/JobCard';
import { Search, MapPin, Filter, X, Zap, Sparkles, TrendingUp, Building2 } from 'lucide-react';
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem } from '@/components/ui/Motion';
import { useAuth } from '@/context/AuthContext';
import { useJobs } from '@/context/JobContext';
import Recommendations from '@/components/features/Recommendations';

export default function JobSearchContainer() {
    const { user } = useAuth();
    const { jobs: initialJobs, isLoading } = useJobs();
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');

    // Filter Logic
    const filteredJobs = useMemo(() => {
        return initialJobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.company.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLocation = locationFilter ?
                job.location.toLowerCase().includes(locationFilter.toLowerCase()) : true;
            const matchesType = typeFilter === 'All' ? true :
                typeFilter === 'Remote' ? job.isRemote :
                    job.type === typeFilter;

            return matchesSearch && matchesLocation && matchesType;
        });
    }, [initialJobs, searchTerm, locationFilter, typeFilter]);

    return (
        <div>
            {/* Hero Section */}
            <section className="relative min-h-[600px] flex items-center pt-24 pb-32 px-4 overflow-hidden bg-slate-950">
                {/* Complex Animated Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] -mr-96 -mt-96 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] -ml-48 -mb-48"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950"></div>
                </div>

                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="flex flex-col items-center text-center mb-16">
                        <FadeIn>
                            <div className="inline-flex items-center gap-2 py-2 px-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl mb-8 group hover:bg-white/10 transition-colors cursor-default">
                                <Sparkles className="w-4 h-4 text-blue-400 group-hover:rotate-12 transition-transform" />
                                <span className="text-sm font-black text-blue-100/80 uppercase tracking-widest">Discover Your Future Career</span>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.1}>
                            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9] max-w-4xl mx-auto">
                                The next generation <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">job platform</span>
                            </h1>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <p className="text-slate-400 text-lg md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                                Join 50,000+ professionals finding exceptional opportunities at the world's most innovative companies.
                            </p>
                        </FadeIn>

                        {/* Premium Search Bar */}
                        <ScaleIn delay={0.3} className="w-full max-w-5xl">
                            <div className="bg-white/5 dark:bg-white/5 p-2 rounded-[2.5rem] border border-white/10 backdrop-blur-3xl shadow-2xl flex flex-col md:flex-row gap-2 transition-all hover:bg-white/10 group">
                                <div className="flex-1 flex items-center px-6 h-16 md:h-20 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 focus-within:ring-4 focus-within:ring-blue-500/20 transition-all">
                                    <Search className="w-6 h-6 text-slate-400 mr-4 flex-shrink-0" />
                                    <input
                                        type="text"
                                        placeholder="Job title or company..."
                                        className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400 text-lg font-bold"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="flex-1 flex items-center px-6 h-16 md:h-20 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 focus-within:ring-4 focus-within:ring-blue-500/20 transition-all">
                                    <MapPin className="w-6 h-6 text-slate-400 mr-4 flex-shrink-0" />
                                    <input
                                        type="text"
                                        placeholder="City, State or Remote..."
                                        className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400 text-lg font-bold"
                                        value={locationFilter}
                                        onChange={(e) => setLocationFilter(e.target.value)}
                                    />
                                </div>
                                <button
                                    className="bg-blue-600 hover:bg-blue-500 text-white font-black px-10 h-16 md:h-20 rounded-[2rem] transition-all shadow-xl shadow-blue-600/30 active:scale-95 flex items-center justify-center gap-3 text-xl"
                                    onClick={() => {
                                        const results = document.getElementById('results-section');
                                        if (results) results.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }}
                                >
                                    Search Jobs
                                </button>
                            </div>
                        </ScaleIn>

                        {/* Quick Stats/Tags */}
                        <FadeIn delay={0.4} className="mt-12 flex flex-wrap justify-center gap-4 text-slate-500">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 text-sm font-bold">
                                <Zap className="w-4 h-4 text-amber-400" /> Fast Response
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 text-sm font-bold">
                                <TrendingUp className="w-4 h-4 text-emerald-400" /> High Salary
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 text-sm font-bold">
                                <Building2 className="w-4 h-4 text-purple-400" /> Top Companies
                            </div>
                        </FadeIn>
                    </div>
                </div>

                {/* Wave Separator */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent"></div>
            </section>

            <div id="results-section" className="bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
                <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row gap-12 items-start">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-80 flex-shrink-0 sticky top-32 space-y-8">
                        <FadeIn direction="right">
                            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs flex items-center gap-2">
                                        <Filter className="w-4 h-4 text-blue-600" /> Search Filters
                                    </h3>
                                    {(typeFilter !== 'All' || locationFilter || searchTerm) && (
                                        <button
                                            onClick={() => { setTypeFilter('All'); setLocationFilter(''); setSearchTerm(''); }}
                                            className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-black uppercase tracking-widest px-3 py-1.5 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all"
                                        >
                                            Reset
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white ml-1">Employment Type</h4>
                                    <div className="space-y-3">
                                        {['All', 'Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'].map(type => (
                                            <button
                                                key={type}
                                                onClick={() => setTypeFilter(type)}
                                                className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all font-bold text-left ${typeFilter === type ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 text-blue-600' : 'border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-slate-500 hover:border-slate-200 dark:hover:border-slate-700'}`}
                                            >
                                                {type === 'All' ? 'All Roles' : type}
                                                {typeFilter === type && <Check className="w-4 h-4" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 space-y-12">
                        <FadeIn>
                            <Recommendations user={user} jobs={initialJobs} />
                        </FadeIn>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Featured Opportunities
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 font-bold mt-1">
                                    {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} available currently
                                </p>
                            </div>
                            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <span className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 pl-3">Sort:</span>
                                <select className="bg-transparent font-black text-sm text-slate-900 dark:text-white border-none outline-none cursor-pointer pr-4">
                                    <option className="bg-white dark:bg-slate-900">Newest First</option>
                                    <option className="bg-white dark:bg-slate-900">Highest Salary</option>
                                    <option className="bg-white dark:bg-slate-900">Top Rated</option>
                                </select>
                            </div>
                        </div>

                        <StaggerContainer className="grid grid-cols-1 gap-6">
                            {filteredJobs.map((job, index) => (
                                <StaggerItem key={job.id || `job-${index}`}>
                                    <JobCard job={job} />
                                </StaggerItem>
                            ))}
                        </StaggerContainer>

                        {filteredJobs.length === 0 && (
                            <FadeIn>
                                <div className="text-center py-32 bg-white dark:bg-slate-900 rounded-[3rem] border-4 border-dashed border-slate-100 dark:border-slate-800 transition-colors">
                                    <div className="bg-blue-50 dark:bg-blue-900/20 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-100 dark:border-blue-900/30">
                                        <Search className="w-12 h-12 text-blue-400" />
                                    </div>
                                    <h3 className="text-slate-900 dark:text-white font-black text-3xl mb-4">No matches found</h3>
                                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-12 text-lg font-medium">
                                        We couldn't find any jobs matching your current search criteria. Try broadening your keywords.
                                    </p>
                                    <button
                                        onClick={() => { setSearchTerm(''); setLocationFilter(''); setTypeFilter('All'); }}
                                        className="bg-blue-600 text-white font-black px-12 py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/40 active:scale-95"
                                    >
                                        Reset All Filters
                                    </button>
                                </div>
                            </FadeIn>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Check({ className }: { className?: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
    )
}
