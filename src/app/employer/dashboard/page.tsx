'use client';

import { useState } from 'react';
import { useJobs } from '@/context/JobContext';
import { useAuth } from '@/context/AuthContext';
import { Briefcase, Users, CheckCircle, Plus, Eye, Edit2, Trash2, LayoutDashboard, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Motion';

export default function EmployerDashboard() {
    const { jobs, deleteJob } = useJobs();
    const { user } = useAuth();

    // Filter jobs by current employer (in a real app, we'd use employerId)
    const [showAll, setShowAll] = useState(false);
    const employerJobs = showAll ? jobs : jobs.slice(0, 3);

    const stats = [
        { label: 'Active Jobs', value: employerJobs.length, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/30' },
        { label: 'Total Applications', value: '48', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/30' },
        { label: 'Hired Candidates', value: '12', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/30' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
                <div className="container mx-auto px-4 py-8 md:py-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <FadeIn direction="right">
                                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3 tracking-tight">
                                    <LayoutDashboard className="w-8 h-8 md:w-10 h-10 text-blue-600" />
                                    Employer Dashboard
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Manage your job postings and applicants efficiently.</p>
                            </FadeIn>
                        </div>
                        <FadeIn direction="left">
                            <Link
                                href="/employer/post-job"
                                className="inline-flex items-center bg-blue-600 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/40 transition-all transform hover:-translate-y-1 active:scale-95 gap-2"
                            >
                                <Plus className="w-5 h-5" /> Post a New Job
                            </Link>
                        </FadeIn>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {stats.map((stat, idx) => (
                        <StaggerItem key={idx}>
                            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
                                <div className={`${stat.bg} ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <stat.icon className="w-8 h-8" />
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-xs mb-2">{stat.label}</p>
                                <p className="text-4xl font-extrabold text-slate-900 dark:text-white">{stat.value}</p>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                <FadeIn>
                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Active Job Postings</h2>
                            <div className="flex gap-3 w-full md:w-auto">
                                <div className="relative flex-1 md:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search jobs..."
                                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 text-sm outline-none dark:text-white font-medium"
                                    />
                                </div>
                                <button className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl hover:text-blue-600 transition-colors">
                                    <Filter className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/50">
                                        <th className="p-6 text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Job Title</th>
                                        <th className="p-6 text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Applications</th>
                                        <th className="p-6 text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Status</th>
                                        <th className="p-6 text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {employerJobs.map(job => (
                                        <tr key={job.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                            <td className="p-6">
                                                <div className="font-bold text-slate-900 dark:text-white text-lg">{job.title}</div>
                                                <div className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">{job.location} • {job.type}</div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-slate-900 dark:text-white">12</span>
                                                    <span className="text-slate-400 text-sm font-medium">New: 4</span>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <span className="px-4 py-1.5 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-extrabold rounded-full border border-green-100 dark:border-green-900/50 tracking-wider">
                                                    ACTIVE
                                                </span>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={`/jobs/${job.id}`}
                                                        className="p-2.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all"
                                                        title="View Job"
                                                    >
                                                        <Eye className="w-5 h-5" />
                                                    </Link>
                                                    <button
                                                        className="p-2.5 text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-xl transition-all"
                                                        title="Edit Job"
                                                    >
                                                        <Edit2 className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteJob(job.id)}
                                                        className="p-2.5 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all"
                                                        title="Delete Job"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {!showAll && jobs.length > 3 && (
                            <div className="p-8 bg-slate-50 dark:bg-slate-800/50 text-center">
                                <button
                                    onClick={() => setShowAll(true)}
                                    className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                                >
                                    View All Postings
                                </button>
                            </div>
                        )}
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}
