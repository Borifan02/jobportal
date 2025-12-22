'use client';
import { useAuth } from '@/context/AuthContext';
import { useJobs } from '@/context/JobContext';
import JobCard from '@/components/features/JobCard';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    MapPin, Mail, Globe, Briefcase, Edit2, Plus, Settings, Building
} from 'lucide-react';
import EditProfileModal from '@/components/features/EditProfileModal';
import ProfilePhotoUpload from '@/components/features/ProfilePhotoUpload';
import AccountSettings from '@/components/features/AccountSettings';

type Tab = 'overview' | 'jobs' | 'applications' | 'company' | 'settings';

export default function EmployerProfilePage() {
    const { user, isLoading, updateProfile, updateAvatar } = useAuth();
    const { jobs } = useJobs();
    const [activeTab, setActiveTab] = useState<Tab>('overview');
    const [isEditing, setIsEditing] = useState(false);

    const myJobs = jobs.filter((job: any) => job.employer === user?.id);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!user || user.role !== 'employer') return <div className="min-h-screen flex items-center justify-center">Access Denied</div>;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
            {isEditing && (
                <EditProfileModal
                    isOpen={isEditing}
                    onClose={() => setIsEditing(false)}
                    initialData={user.profile}
                    onSave={updateProfile}
                />
            )}

            {/* Header */}
            <div className="bg-white dark:bg-slate-900 border-b">
                <div className="h-48 bg-gradient-to-r from-indigo-600 to-purple-600 relative">
                    <div className="absolute -bottom-16 container mx-auto px-4">
                        <img
                            src={user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || 'Company')}&background=6366f1&color=fff`}
                            alt={user.fullName}
                            className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
                        />
                    </div>
                </div>

                <div className="container mx-auto px-4 pt-20 pb-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold">{user.fullName}</h1>
                            <p className="text-lg text-indigo-600 font-bold flex items-center gap-2">
                                <Building className="w-5 h-5" /> {user.profile.title || 'Company'}
                            </p>
                            <div className="flex gap-4 mt-4 text-sm text-slate-600">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> {user.profile.location}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" /> {user.email}
                                </div>
                                {user.profile.website && (
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-4 h-4" /> 
                                        <a href={user.profile.website} target="_blank" className="hover:text-indigo-600">
                                            Website
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href="/employer/post-job"
                                className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" /> Post Job
                            </Link>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="border border-slate-300 px-6 py-2.5 rounded-xl font-bold hover:bg-slate-50 flex items-center gap-2"
                            >
                                <Edit2 className="w-4 h-4" /> Edit
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-8 mt-8 border-b">
                        {(['overview', 'jobs', 'applications', 'company', 'settings'] as Tab[]).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 font-bold text-sm relative ${
                                    activeTab === tab ? 'text-indigo-600' : 'text-slate-500'
                                }`}
                            >
                                {tab === 'jobs' ? `Jobs (${myJobs.length})` : 
                                 tab.charAt(0).toUpperCase() + tab.slice(1)}
                                {activeTab === tab && (
                                    <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-8">
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8">
                                <h2 className="text-xl font-bold mb-4">Company Overview</h2>
                                <p className="text-slate-600">{user.profile.bio || 'No company description available.'}</p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6">
                                <h2 className="font-bold mb-4">Quick Stats</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Active Jobs</span>
                                        <span className="font-bold">{myJobs.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Total Applications</span>
                                        <span className="font-bold">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'jobs' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">My Job Postings</h2>
                            <Link
                                href="/employer/post-job"
                                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 flex items-center gap-2"
                            >
                                <Plus className="w-5 h-5" /> Post New Job
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myJobs.length > 0 ? (
                                myJobs.map(job => <JobCard key={job.id} job={job} />)
                            ) : (
                                <div className="col-span-full text-center py-12 bg-white rounded-2xl border-2 border-dashed">
                                    <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold mb-2">No jobs posted</h3>
                                    <p className="text-slate-500 mb-6">Start posting jobs to find candidates</p>
                                    <Link
                                        href="/employer/post-job"
                                        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold"
                                    >
                                        <Plus className="w-5 h-5" /> Post Your First Job
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'company' && (
                    <div className="max-w-3xl">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8">
                            <h2 className="text-xl font-bold mb-6">Company Information</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="text-sm font-bold text-slate-700 mb-2 block">Company Name</label>
                                    <p className="text-lg">{user.profile.title || 'Not set'}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-slate-700 mb-2 block">Description</label>
                                    <p className="text-slate-600">{user.profile.bio || 'No description added.'}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-slate-700 mb-2 block">Location</label>
                                    <p>{user.profile.location || 'Not set'}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-slate-700 mb-2 block">Industry</label>
                                    <p>{user.profile.skills && user.profile.skills.length > 0 ? user.profile.skills.join(', ') : 'Not specified'}</p>
                                    <pre className="text-xs text-gray-500 mt-1">Debug: {JSON.stringify(user.profile.skills)}</pre>
                                </div>
                                {user.profile.website && (
                                    <div>
                                        <label className="text-sm font-bold text-slate-700 mb-2 block">Website</label>
                                        <a href={user.profile.website} target="_blank" className="text-indigo-600 hover:underline">
                                            {user.profile.website}
                                        </a>
                                    </div>
                                )}
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700"
                                >
                                    Edit Company Info
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'applications' && (
                    <div className="text-center py-12">
                        <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold">Applications</h3>
                        <p className="text-slate-500">View applications for your job postings</p>
                    </div>
                )}

                {activeTab === 'settings' && <AccountSettings />}
            </div>
        </div>
    );
}