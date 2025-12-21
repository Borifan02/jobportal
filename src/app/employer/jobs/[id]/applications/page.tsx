'use client';

import { useJobs } from '@/context/JobContext';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Mail, FileText, CheckCircle, XCircle, Clock, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { FadeIn } from '@/components/ui/Motion';

export default function JobApplicationsPage() {
    const { id } = useParams();
    const { jobs, applications, updateApplicationStatus } = useJobs();
    const router = useRouter();

    const job = jobs.find(j => j.id === id);
    const jobApps = applications.filter(app => app.jobId === id);

    if (!job) {
        return <div className="p-10 text-center">Job not found</div>;
    }

    const handleStatusChange = (appId: string, newStatus: any) => {
        updateApplicationStatus(appId, newStatus);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Applied': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'Screening': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
            case 'Interviewing': return 'bg-purple-50 text-purple-600 border-purple-100';
            case 'Offer': return 'bg-green-50 text-green-600 border-green-100';
            case 'Rejected': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-slate-50 text-slate-600';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-8">
                    <Link href="/employer/dashboard" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-4 font-medium">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                    </Link>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">{job.title}</h1>
                            <p className="text-slate-600">Managing {jobApps.length} Application{jobApps.length !== 1 ? 's' : ''}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-8">
                {jobApps.length > 0 ? (
                    <div className="grid gap-4">
                        {jobApps.map((app, index) => (
                            <FadeIn key={app.id} delay={index * 0.05}>
                                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex flex-col md:flex-row justify-between gap-6">
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                                                <UserIcon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 text-lg">{app.applicantName}</h3>
                                                <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                                                    <span className="flex items-center gap-1.5">
                                                        <Mail className="w-3.5 h-3.5" /> {app.applicantEmail}
                                                    </span>
                                                    <span>•</span>
                                                    <span>Applied on {app.appliedAt}</span>
                                                </div>

                                                {app.coverLetter && (
                                                    <div className="mt-4 bg-slate-50 p-4 rounded-lg text-slate-600 text-sm italic max-w-2xl">
                                                        "{app.coverLetter}"
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-3 min-w-[200px]">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-semibold text-slate-500">Status:</span>
                                                <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getStatusColor(app.status)}`}>
                                                    {app.status}
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap justify-end gap-2 mt-2">
                                                {app.status !== 'Interviewing' && app.status !== 'Offer' && app.status !== 'Rejected' && (
                                                    <button
                                                        onClick={() => handleStatusChange(app.id, 'Interviewing')}
                                                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                                                    >
                                                        Interview
                                                    </button>
                                                )}
                                                {app.status === 'Interviewing' && (
                                                    <button
                                                        onClick={() => handleStatusChange(app.id, 'Offer')}
                                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                                                    >
                                                        Make Offer
                                                    </button>
                                                )}
                                                {app.status !== 'Rejected' && app.status !== 'Offer' && (
                                                    <button
                                                        onClick={() => handleStatusChange(app.id, 'Rejected')}
                                                        className="border border-red-200 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                                                    >
                                                        Reject
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-200">
                        <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-slate-900 font-bold mb-1">No applications yet</h3>
                        <p className="text-slate-500">Wait for candidates to apply.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
