'use client';

import { MapPin, Clock, DollarSign, Bookmark } from 'lucide-react';
import { Job } from '@/types';
import Link from 'next/link';
import { useSavedJobs } from '@/hooks/useSavedJobs';

interface JobCardProps {
    job: Job;
}

export default function JobCard({ job }: JobCardProps) {
    const { savedIds, toggleSave } = useSavedJobs();
    const isSaved = savedIds.includes(job.id);

    if (job.isFlagged) return null; // Moderation: hide flagged content

    return (
        <Link
            href={`/jobs/${job.id}`}
            className="block group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500 hover:-translate-y-1 relative overflow-hidden"
        >
            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl border border-blue-100 dark:border-blue-800/50">
                        {job.company.substring(0, 1)}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                                {job.title}
                            </h3>
                            {job.isVerified && (
                                <div className="bg-blue-600 text-white p-0.5 rounded-full" title="Verified Employer">
                                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                                </div>
                            )}
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{job.company}</p>
                    </div>
                </div>
                <button
                    className={`p-2 -mr-2 -mt-2 rounded-full transition-colors z-20 ${isSaved ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30' : 'text-slate-400 dark:text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}
                    onClick={(e) => {
                        e.preventDefault();
                        toggleSave(job.id);
                    }}
                    title={isSaved ? "Remove from saved" : "Save job"}
                >
                    <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-semibold bg-slate-50 dark:bg-slate-800 px-2.5 py-1.5 rounded-md border border-slate-100 dark:border-slate-800">
                    <MapPin className="w-3.5 h-3.5" />
                    {job.location}
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-semibold bg-slate-50 dark:bg-slate-800 px-2.5 py-1.5 rounded-md border border-slate-100 dark:border-slate-800">
                    <Clock className="w-3.5 h-3.5" />
                    {job.type}
                </div>
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-green-400 text-xs font-semibold bg-green-50/50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2.5 py-1.5 rounded-md border border-green-100/50 dark:border-green-900/30">
                    <DollarSign className="w-3.5 h-3.5" />
                    {job.salary}
                </div>
            </div>

            <div className="flex items-center justify-between text-xs font-medium text-slate-400 dark:text-slate-500 border-t border-slate-50 dark:border-slate-800 pt-4 mt-auto relative z-10">
                <span>{job.postedAt}</span>
                <span className="font-semibold text-blue-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex items-center gap-1">
                    View Details &rarr;
                </span>
            </div>
        </Link>
    );
}
