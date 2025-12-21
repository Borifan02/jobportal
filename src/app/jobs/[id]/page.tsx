'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Clock, DollarSign, Globe, CheckCircle } from 'lucide-react';
import JobActions, { MobileJobActions } from '@/components/features/JobActions';
import ShareButton from '@/components/features/ShareButton';
import { FadeIn } from '@/components/ui/Motion';
import { useJobs } from '@/context/JobContext';
import { Job } from '@/types';

export default function JobDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const { jobs, isLoading } = useJobs();
    const [job, setJob] = useState<Job | undefined>(undefined);

    useEffect(() => {
        if (!isLoading && id) {
            const foundJob = jobs.find(j => j.id === id);
            setJob(foundJob);
        }
    }, [id, jobs, isLoading]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!job && !isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 gap-4">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Job Not Found</h1>
                <p className="text-slate-600 dark:text-slate-400">The job you are looking for does not exist or has been removed.</p>
                <Link href="/" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                    Back to Jobs
                </Link>
            </div>
        );
    }

    if (!job) return null;

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-24 md:pb-12 transition-colors duration-300">
            {/* Header Banner */}
            <div className="bg-slate-900 h-64 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
                <div className="absolute top-0 right-0 p-12 opacity-10">
                    <Globe className="w-64 h-64 text-white" />
                </div>

                <div className="container mx-auto px-4 h-full flex items-center pt-8">
                    <Link href="/" className="text-white/60 hover:text-white flex items-center gap-2 mb-12 font-medium transition-colors">
                        &larr; Back to Jobs
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-32 relative z-10">
                {/* Job Header Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-xl border border-slate-100 dark:border-slate-800 mb-8">
                    <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                        <div className="flex items-start gap-4 md:gap-6 w-full">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-3xl font-bold text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 flex-shrink-0">
                                {job.company[0]}
                            </div>
                            <div className="flex-1">
                                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">{job.title}</h1>
                                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-slate-500 dark:text-slate-400 font-medium text-sm md:text-base">
                                    <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                                        <Globe className="w-4 h-4" /> {job.company}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4" /> {job.location}
                                    </span>
                                    <span className="flex items-center gap-1.5 text-slate-400">
                                        • {job.postedAt}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-3 w-full md:w-auto">
                            <ShareButton
                                title={`Check out this ${job.title} job at ${job.company}`}
                                text={`I found this great job opportunity for a ${job.title} at ${job.company}. Check it out!`}
                                className="h-12 px-6 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-2 transition-colors"
                            />
                            <Link
                                href={`/apply/${job.id}`}
                                className="h-12 px-8 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/40 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                            >
                                Apply Now
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6 md:space-y-8">
                        <FadeIn delay={0.1}>
                            <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                    <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
                                    Job Description
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line text-lg">
                                    {job.description}
                                </p>
                            </section>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                    <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
                                    Responsibilities
                                </h2>
                                <ul className="space-y-4">
                                    {job.responsibilities?.map((item, i) => (
                                        <li key={i} className="flex items-start gap-4 text-slate-600 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                                            <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                                            <span className="leading-relaxed font-medium">{item}</span>
                                        </li>
                                    )) || <p className="text-slate-500 italic">No specific responsibilities listed.</p>}
                                </ul>
                            </section>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                    <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
                                    Requirements
                                </h2>
                                <ul className="space-y-4">
                                    {job.requirements?.map((item, i) => (
                                        <li key={i} className="flex items-start gap-4 text-slate-600 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                                            <div className="w-6 h-6 rounded-full border-2 border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-bold mt-0.5 flex-shrink-0">
                                                {i + 1}
                                            </div>
                                            <span className="leading-relaxed font-medium">{item}</span>
                                        </li>
                                    )) || <p className="text-slate-500 italic">No specific requirements listed.</p>}
                                </ul>
                            </section>
                        </FadeIn>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <FadeIn delay={0.4} className="sticky top-24">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <h3 className="font-bold text-slate-900 dark:text-white mb-6">Job Overview</h3>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                                        <div className="p-2.5 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                                            <DollarSign className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">Salary</p>
                                            <p className="text-slate-900 dark:text-white font-bold">{job.salary}</p>
                                            <p className="text-xs text-slate-400 dark:text-slate-500">Yearly salary</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                                        <div className="p-2.5 bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">Location</p>
                                            <p className="text-slate-900 dark:text-white font-bold">{job.location}</p>
                                            <p className="text-xs text-slate-400 dark:text-slate-500">On-site / Remote</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                                        <div className="p-2.5 bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                                            <Clock className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">Job Type</p>
                                            <p className="text-slate-900 dark:text-white font-bold">{job.type}</p>
                                            <p className="text-xs text-slate-400 dark:text-slate-500">Full-time role</p>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                                        <JobActions jobId={job.id} />
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky CTA */}
            <MobileJobActions jobId={job.id} />
        </div>
    );
}

