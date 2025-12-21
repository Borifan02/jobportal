'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ApplyForm from '@/components/features/ApplyForm';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useJobs } from '@/context/JobContext';
import { Job } from '@/types';
import { FadeIn } from '@/components/ui/Motion';

export default function ApplyPage() {
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
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (!job && !isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 gap-4 px-4 text-center transition-colors">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Job Not Found</h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md">The job you are trying to apply for does not exist or has been removed from our listings.</p>
                <Link href="/" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                    Browse All Jobs
                </Link>
            </div>
        );
    }

    if (!job) return null;

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-16 px-4 transition-colors duration-300">
            <div className="container mx-auto max-w-3xl">
                <FadeIn direction="right">
                    <Link href={`/jobs/${job.id}`} className="inline-flex items-center text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 font-bold text-sm uppercase tracking-wider mb-8 transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Job Details
                    </Link>
                </FadeIn>

                <FadeIn>
                    <ApplyForm job={job} />
                </FadeIn>
            </div>
        </div>
    );
}
