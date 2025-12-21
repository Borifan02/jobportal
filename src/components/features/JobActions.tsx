'use client';

import { useSavedJobs } from '@/hooks/useSavedJobs';
import { Bookmark, Share2 } from 'lucide-react';
import Link from 'next/link';

interface JobActionsProps {
    jobId: string;
}

export default function JobActions({ jobId }: JobActionsProps) {
    const { savedIds, toggleSave } = useSavedJobs();
    const isSaved = savedIds.includes(jobId);

    return (
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 w-full">
            <Link
                href={`/apply/${jobId}`}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/40 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 mb-3"
            >
                Apply Now
            </Link>
            <button
                onClick={() => toggleSave(jobId)}
                className={`w-full py-4 rounded-xl font-bold border transition-colors flex items-center justify-center gap-2 ${isSaved
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
            >
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? 'Saved' : 'Save Job'}
            </button>
        </div>
    );
}

export function MobileJobActions({ jobId }: JobActionsProps) {
    const { savedIds, toggleSave } = useSavedJobs();
    const isSaved = savedIds.includes(jobId);

    return (
        <div className="md:hidden fixed bottom-0 inset-x-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 z-40 flex gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe transition-colors duration-300">
            <button
                onClick={() => toggleSave(jobId)}
                className={`p-3 rounded-xl w-16 flex items-center justify-center border transition-colors ${isSaved
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 flex-shrink-0'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 flex-shrink-0'
                    }`}
            >
                <Bookmark className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <Link
                href={`/apply/${jobId}`}
                className="flex-1 bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20"
            >
                Apply Now
            </Link>
        </div>
    );
}
