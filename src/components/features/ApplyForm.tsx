'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useJobs } from '@/context/JobContext';
import { Job } from '@/types';
import { ArrowLeft, Upload, CheckCircle, AlertCircle, Loader2, FileText } from 'lucide-react';
import Link from 'next/link';

export default function ApplyForm({ job }: { job: Job }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        coverLetter: '',
        resume: null as File | null
    });

    const { user, submitApplication: submitToUser } = useAuth();

    if (!user) {
        return (
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center max-w-lg mx-auto border border-slate-100">
                <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-10 h-10 text-blue-500 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Sign in to Apply</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                    You need to be logged in to apply for this position.
                </p>
                <div className="space-y-3">
                    <Link
                        href="/login"
                        className="block w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
                    >
                        Sign In / Register
                    </Link>
                    <Link
                        href="/"
                        className="block w-full py-4 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors"
                    >
                        Cancel
                    </Link>
                </div>
            </div>
        );
    }

    const { submitApplication: submitToEmployer } = useJobs();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
        if (!formData.coverLetter.trim()) newErrors.coverLetter = 'Cover letter is required';
        // Resume optional for demo or validate? "Resume upload (UI only)"

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        setIsSubmitting(true);

        // 1. Submit to User Profile (AuthContext)
        await submitToUser(job.id, job.title, job.company);

        // 2. Submit to Global/Employer DB (JobContext)
        if (user) {
            submitToEmployer({
                jobId: job.id,
                jobTitle: job.title,
                companyName: job.company,
                applicantId: user.id,
                applicantName: formData.fullName,
                applicantEmail: formData.email,
                coverLetter: formData.coverLetter
            });
        }

        setIsSubmitting(false);
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center max-w-lg mx-auto border border-green-100">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Application Sent!</h2>
                <p className="text-slate-600 mb-8 max-w-sm mx-auto">
                    Your application for <span className="font-bold text-slate-900">{job.title}</span> at <span className="font-bold text-slate-900">{job.company}</span> has been submitted successfully. Good luck!
                </p>
                <div className="space-y-3">
                    <Link
                        href="/"
                        className="block w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transitionMain-colors shadow-lg shadow-blue-600/30"
                    >
                        Find More Jobs
                    </Link>
                    <Link
                        href={`/jobs/${job.id}`}
                        className="block w-full py-4 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors"
                    >
                        Back to Job Details
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden max-w-3xl mx-auto">
            <div className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 p-6 md:p-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Apply for {job.title}</h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">at {job.company}</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Full Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            autoComplete="name"
                            className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-100'} bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-4 transition-all`}
                            placeholder="e.g. John Doe"
                            value={formData.fullName}
                            onChange={e => {
                                setFormData({ ...formData, fullName: e.target.value });
                                if (errors.fullName) setErrors({ ...errors, fullName: '' });
                            }}
                        />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.fullName}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address <span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            autoComplete="email"
                            className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-100'} bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-4 transition-all`}
                            placeholder="e.g. john@example.com"
                            value={formData.email}
                            onChange={e => {
                                setFormData({ ...formData, email: e.target.value });
                                if (errors.email) setErrors({ ...errors, email: '' });
                            }}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Phone Number (Optional)</label>
                    <input
                        type="tel"
                        autoComplete="tel"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                        placeholder="e.g. +1 (555) 000-0000"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Resume / CV <span className="text-slate-400 dark:text-slate-500 font-normal">(Optional if profile resume exists)</span></label>
                    <input
                        type="file"
                        id="resume-apply"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setFormData({ ...formData, resume: e.target.files[0] });
                            }
                        }}
                    />
                    {user.profile.resumeName || formData.resume ? (
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <FileText className="w-6 h-6 text-blue-600" />
                                <div>
                                    <p className="font-bold text-slate-900 text-sm">{formData.resume?.name || user.profile.resumeName}</p>
                                    <p className="text-xs text-slate-500">Resume attached</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setFormData({ ...formData, resume: null });
                                    setTimeout(() => {
                                        document.getElementById('resume-apply')?.click();
                                    }, 0);
                                }}
                                className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-100 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg transition-colors border border-blue-200 dark:border-blue-700"
                            >
                                Change File
                            </button>
                        </div>
                    ) : (
                        <label
                            htmlFor="resume-apply"
                            className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all text-center cursor-pointer group block"
                        >
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all">
                                <Upload className="w-6 h-6" />
                            </div>
                            <p className="text-slate-900 dark:text-white font-bold mb-1">Click to upload or drag and drop</p>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">PDF, DOCX up to 10MB</p>
                        </label>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Cover Letter <span className="text-red-500">*</span></label>
                    <textarea
                        className={`w-full px-4 py-3 rounded-xl border ${errors.coverLetter ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-100'} bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-4 transition-all min-h-[180px] text-lg leading-relaxed`}
                        placeholder="Tell the employer why you are a perfect fit for this role..."
                        value={formData.coverLetter}
                        onChange={e => {
                            setFormData({ ...formData, coverLetter: e.target.value });
                            if (errors.coverLetter) setErrors({ ...errors, coverLetter: '' });
                        }}
                    />
                    {errors.coverLetter && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.coverLetter}</p>}
                </div>

                <div className="pt-6 flex flex-col md:flex-row items-center gap-4">
                    <Link
                        href={`/jobs/${job.id}`}
                        className="w-full md:w-auto px-8 py-4 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-center"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex-1 bg-blue-600 text-white font-bold py-4 rounded-xl shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/40 transform hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2 text-lg"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" /> Submitting Application...
                            </>
                        ) : (
                            'Submit Application'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
