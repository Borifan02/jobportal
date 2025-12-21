'use client';

import { useSavedJobs } from '@/hooks/useSavedJobs';
import { useJobs } from '@/context/JobContext';
import JobCard from '@/components/features/JobCard';
import { Bookmark, Search, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Motion';

export default function SavedPage() {
    const { savedIds, isLoaded } = useSavedJobs();
    const { jobs } = useJobs();

    const savedJobs = useMemo(() => {
        return jobs.filter(job => savedIds.includes(job.id));
    }, [savedIds, jobs]);

    if (!isLoaded) {
        return <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors" />;
    }

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-16 px-4 transition-colors duration-300">
            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <FadeIn direction="right">
                            <Link href="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 mb-4 transition-colors font-bold text-sm uppercase tracking-wider">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to browse
                            </Link>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white flex items-center gap-4 tracking-tight">
                                <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/20">
                                    <Bookmark className="w-8 h-8 text-white" />
                                </div>
                                Saved Jobs
                                <span className="text-slate-400 dark:text-slate-500 text-2xl font-bold ml-2">({savedJobs.length})</span>
                            </h1>
                        </FadeIn>
                    </div>
                </div>

                {savedJobs.length > 0 ? (
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {savedJobs.map(job => (
                            <StaggerItem key={job.id}>
                                <JobCard job={job} />
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                ) : (
                    <FadeIn className="max-w-2xl mx-auto">
                        <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors">
                            <div className="bg-slate-50 dark:bg-slate-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100 dark:border-slate-700">
                                <Bookmark className="w-12 h-12 text-slate-300 dark:text-slate-600" />
                            </div>
                            <h3 className="text-slate-900 dark:text-white font-extrabold text-3xl mb-4">Your list is empty</h3>
                            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-10 text-lg leading-relaxed">
                                You haven't saved any jobs yet. Start exploring thousands of opportunities and bookmark your favorites!
                            </p>
                            <Link
                                href="/"
                                className="inline-flex bg-blue-600 text-white font-extrabold px-10 py-4 rounded-2xl shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/40 transition-all transform hover:-translate-y-1 active:scale-95"
                            >
                                Start Browsing
                            </Link>
                        </div>
                    </FadeIn>
                )}
            </div>
        </div>
    );
}
