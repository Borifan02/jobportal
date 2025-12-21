'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useJobs } from '@/context/JobContext';
import { useAuth } from '@/context/AuthContext';
import { FadeIn } from '@/components/ui/Motion';
import { ArrowLeft, Briefcase, MapPin, DollarSign, Building, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { JobType } from '@/types';

export default function PostJobPage() {
    const router = useRouter();
    const { addJob, isLoading } = useJobs();
    const { user, updateOwnRole } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [roleError, setRoleError] = useState<string | null>(null);
    const [isUpdatingRole, setIsUpdatingRole] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        type: 'Full-time' as JobType,
        salary: '',
        description: '',
        requirements: '',
        responsibilities: '',
        tags: '',
        category: '',
        isRemote: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Process arrays from string inputs (comma separated)
            const requirements = formData.requirements.split('\n').filter(line => line.trim() !== '');
            const responsibilities = formData.responsibilities.split('\n').filter(line => line.trim() !== '');
            const tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

            // Add job
            await addJob({
                title: formData.title,
                company: formData.company,
                location: formData.location,
                type: formData.type,
                salary: formData.salary,
                description: formData.description,
                requirements,
                responsibilities,
                tags,
                category: formData.category,
                isRemote: formData.isRemote
            });

            // Only redirect on success
            router.push('/');
        } catch (error: any) {
            // Check if it's a role error and show upgrade option
            if (error.message && error.message.includes('employer')) {
                setRoleError(error.message);
            }
            setIsSubmitting(false);
        }
    };

    const handleSwitchToEmployer = async () => {
        setIsUpdatingRole(true);
        setRoleError(null);
        try {
            await updateOwnRole('employer');
            // Role updated, try submitting again
            setIsUpdatingRole(false);
        } catch (error: any) {
            setRoleError(error.message || 'Failed to update role. Please try again.');
            setIsUpdatingRole(false);
        }
    };

    if (isLoading) return null;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 transition-colors duration-300">
            <div className="container mx-auto max-w-3xl">
                <Link href="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors font-medium">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Jobs
                </Link>

                <FadeIn text>
                    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden border border-slate-100 dark:border-slate-800 transition-colors">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 md:p-12 text-white">
                            <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">Post a New Job</h1>
                            <p className="text-blue-100 text-lg font-medium opacity-90">Reach thousands of developers and designers instantly.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
                            {/* Role Error Banner */}
                            {roleError && (
                                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 rounded-2xl flex flex-col gap-3">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="font-semibold text-amber-800 dark:text-amber-300">{roleError}</p>
                                            {user && user.role !== 'employer' && (
                                                <button
                                                    type="button"
                                                    onClick={handleSwitchToEmployer}
                                                    disabled={isUpdatingRole}
                                                    className="mt-3 px-4 py-2 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                                                >
                                                    {isUpdatingRole ? 'Updating...' : 'Switch to Employer Account'}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Basic Info */}
                            <div className="space-y-8">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                    <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                                    Basic Information
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Job Title</label>
                                        <div className="relative group">
                                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                            <input
                                                required
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                placeholder="e.g. Senior React Developer"
                                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-900 dark:text-white font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Company Name</label>
                                        <div className="relative group">
                                            <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                            <input
                                                required
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                placeholder="e.g. Acme Corp"
                                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-900 dark:text-white font-medium"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Location</label>
                                        <div className="relative group">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                            <input
                                                required
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                                placeholder="e.g. San Francisco, CA"
                                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-900 dark:text-white font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Salary Range</label>
                                        <div className="relative group">
                                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                            <input
                                                required
                                                name="salary"
                                                value={formData.salary}
                                                onChange={handleChange}
                                                placeholder="e.g. $120k - $150k"
                                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-900 dark:text-white font-medium"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Job Type</label>
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                            className="w-full px-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-900 dark:text-white font-bold cursor-pointer"
                                        >
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Remote">Remote</option>
                                            <option value="Internship">Internship</option>
                                        </select>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Category</label>
                                        <select
                                            required
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full px-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-900 dark:text-white font-bold cursor-pointer"
                                        >
                                            <option value="">Select a category</option>
                                            <option value="Technology">Technology</option>
                                            <option value="Design">Design</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="Sales">Sales</option>
                                            <option value="Operations">Operations</option>
                                            <option value="Finance">Finance</option>
                                            <option value="Human Resources">Human Resources</option>
                                            <option value="Healthcare">Healthcare</option>
                                            <option value="Education">Education</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex items-center pt-2 md:pt-0 ml-1">
                                    <label className="flex items-center gap-4 cursor-pointer group">
                                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${formData.isRemote ? 'bg-blue-600 border-blue-600' : 'border-slate-300 dark:border-slate-600 group-hover:border-blue-400'}`}>
                                            {formData.isRemote && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                                            <input
                                                type="checkbox"
                                                name="isRemote"
                                                className="hidden"
                                                checked={formData.isRemote}
                                                onChange={handleCheckboxChange}
                                            />
                                        </div>
                                        <span className="font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">This is a Remote Position</span>
                                    </label>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-8">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                    <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                                    Job Details
                                </h2>

                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Job Description</label>
                                    <textarea
                                        required
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder="Overview of the role, team, and culture..."
                                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-900 dark:text-white font-medium resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Requirements <span className="text-slate-400 font-normal ml-1">(One per line)</span></label>
                                        <textarea
                                            required
                                            name="requirements"
                                            value={formData.requirements}
                                            onChange={handleChange}
                                            rows={6}
                                            placeholder="- 5+ years of React experience&#10;- Strong Communication skills&#10;- TypeScript proficiency"
                                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-900 dark:text-white font-medium resize-none leading-relaxed"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Responsibilities <span className="text-slate-400 font-normal ml-1">(One per line)</span></label>
                                        <textarea
                                            required
                                            name="responsibilities"
                                            value={formData.responsibilities}
                                            onChange={handleChange}
                                            rows={6}
                                            placeholder="- Lead frontend architecture&#10;- Mentor junior developers&#10;- Collaborate with designers"
                                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-900 dark:text-white font-medium resize-none leading-relaxed"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Tags <span className="text-slate-400 font-normal ml-1">(Comma separated)</span></label>
                                    <input
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleChange}
                                        placeholder="React, TypeScript, Frontend, Senior, Tailwind"
                                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-900 dark:text-white font-bold"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-5 rounded-2xl font-extrabold text-xl text-white shadow-xl shadow-blue-600/30 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-600/40'}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Posting Job...
                                    </>
                                ) : 'Post Job Now'}
                            </button>
                        </form>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}
