'use client';
import { useAuth } from '@/context/AuthContext';
import { useSavedJobs } from '@/hooks/useSavedJobs';
import { JOBS } from '@/lib/mockData';
import JobCard from '@/components/features/JobCard';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    MapPin, Mail, Briefcase, Edit2, Bookmark, Settings
} from 'lucide-react';
import EditProfileModal from '@/components/features/EditProfileModal';
import ProfilePhotoUpload from '@/components/features/ProfilePhotoUpload';
import ResumeUpload from '@/components/features/ResumeUpload';
import AccountSettings from '@/components/features/AccountSettings';

type Tab = 'overview' | 'saved' | 'applications' | 'resume' | 'settings';

export default function CandidateProfilePage() {
    const { user, isLoading, updateProfile, updateAvatar } = useAuth();
    const { savedIds } = useSavedJobs();
    const [activeTab, setActiveTab] = useState<Tab>('overview');
    const [isEditing, setIsEditing] = useState(false);

    const savedJobs = JOBS.filter(job => savedIds.includes(job.id));

    if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!user || user.role !== 'candidate') return <div className="min-h-screen flex items-center justify-center">Access Denied</div>;

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
                <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
                    <div className="absolute -bottom-16 container mx-auto px-4">
                        <img
                            src={user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || 'User')}&background=004eeb&color=fff`}
                            alt={user.fullName}
                            className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
                        />
                    </div>
                </div>

                <div className="container mx-auto px-4 pt-20 pb-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold">{user.fullName}</h1>
                            <p className="text-lg text-blue-600 font-bold">{user.profile.title}</p>
                            <div className="flex gap-4 mt-4 text-sm text-slate-600">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> {user.profile.location}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" /> {user.email}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 flex items-center gap-2"
                        >
                            <Edit2 className="w-4 h-4" /> Edit Profile
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-8 mt-8 border-b">
                        {(['overview', 'saved', 'applications', 'resume', 'settings'] as Tab[]).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 font-bold text-sm relative ${
                                    activeTab === tab ? 'text-blue-600' : 'text-slate-500'
                                }`}
                            >
                                {tab === 'saved' ? `Saved (${savedJobs.length})` : 
                                 tab === 'applications' ? `Applications (${user.applications?.length || 0})` :
                                 tab.charAt(0).toUpperCase() + tab.slice(1)}
                                {activeTab === tab && (
                                    <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
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
                                <h2 className="text-xl font-bold mb-4">About</h2>
                                <p className="text-slate-600">{user.profile.bio}</p>
                            </div>
                        </div>
                        <div>
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6">
                                <h2 className="font-bold mb-4">Skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {(user.profile.skills || []).map(skill => (
                                        <span key={skill} className="bg-slate-100 px-3 py-1 rounded-lg text-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'saved' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedJobs.length > 0 ? (
                            savedJobs.map(job => <JobCard key={job.id} job={job} />)
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <Bookmark className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold">No saved jobs</h3>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'applications' && (
                    <div className="space-y-4">
                        {user.applications?.length ? (
                            user.applications.map(app => (
                                <div key={app.id} className="bg-white rounded-2xl p-6 flex justify-between">
                                    <div>
                                        <h3 className="font-bold">{app.jobTitle}</h3>
                                        <p className="text-slate-600">{app.companyName}</p>
                                    </div>
                                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                                        {app.status}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold">No applications</h3>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'resume' && <ResumeUpload />}
                {activeTab === 'settings' && <AccountSettings />}
            </div>
        </div>
    );
}