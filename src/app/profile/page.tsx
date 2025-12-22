'use client';
import { useAuth } from '@/context/AuthContext';
import { useSavedJobs } from '@/hooks/useSavedJobs';
import { useJobs } from '@/context/JobContext';
import { JOBS } from '@/lib/mockData';
import JobCard from '@/components/features/JobCard';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    MapPin, Globe, Mail, Phone, Calendar,
    Briefcase, GraduationCap, Link as LinkIcon,
    Edit2, Bookmark, Upload, FileText, Trash2, X, CheckCircle,
    Linkedin, Twitter, Github, Settings, Plus
} from 'lucide-react';
import EditProfileModal from '@/components/features/EditProfileModal';
import ProfilePhotoUpload from '@/components/features/ProfilePhotoUpload';
import { UserProfile } from '@/types';
import ShareButton from '@/components/features/ShareButton';
import { FadeIn } from '@/components/ui/Motion';
import ResumeUpload from '@/components/features/ResumeUpload';
import AccountSettings from '@/components/features/AccountSettings';

type CandidateTab = 'overview' | 'saved' | 'applications' | 'resume' | 'settings';
type EmployerTab = 'overview' | 'my-jobs' | 'applications' | 'company' | 'settings';

export default function ProfilePage() {
    const { user, isLoading, updateProfile, updateAvatar } = useAuth();
    const { savedIds } = useSavedJobs();
    const { jobs } = useJobs();
    const isEmployer = user?.role === 'employer' || user?.role === 'admin';
    
    const [candidateTab, setCandidateTab] = useState<CandidateTab>('overview');
    const [employerTab, setEmployerTab] = useState<EmployerTab>('overview');
    const activeTab = isEmployer ? employerTab : candidateTab;
    const setActiveTab = isEmployer 
        ? (tab: EmployerTab) => setEmployerTab(tab)
        : (tab: CandidateTab) => setCandidateTab(tab);
    
    const [isEditing, setIsEditing] = useState(false);

    const calculateProfileStrength = () => {
        if (!user) return 0;
        const profile = user.profile;
        const fields = [
            profile.bio,
            profile.title,
            profile.location,
            (profile.skills || []).length > 0,
            (profile.experience || []).length > 0,
            (profile.education || []).length > 0,
            user.avatarUrl && !user.avatarUrl.includes('placeholder'),
            profile.linkedIn || profile.twitter || profile.github,
            profile.resumeUrl,
            profile.phoneNumber
        ];
        const filledFields = fields.filter(Boolean).length;
        return Math.round((filledFields / fields.length) * 100);
    };

    const strength = calculateProfileStrength();

    const handleSaveProfile = async (data: UserProfile) => {
        updateProfile(data);
    };

    const handlePhotoChange = (photoUrl: string) => {
        updateAvatar(photoUrl);
    };

    if (isLoading) {
        return <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-slate-900 dark:text-white transition-colors">Loading...</div>;
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 transition-colors">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Access Denied</h1>
                <p className="text-slate-600 dark:text-slate-400 mb-6">Please sign in to view your profile.</p>
                <a href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Sign In
                </a>
            </div>
        );
    }

    const savedJobs = JOBS.filter(job => savedIds.includes(job.id));

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors duration-300">
            {isEditing && user && (
                <EditProfileModal
                    isOpen={isEditing}
                    onClose={() => setIsEditing(false)}
                    initialData={user.profile}
                    onSave={handleSaveProfile}
                    userRole={user.role}
                />
            )}
            {/* Header Banner */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
                <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
                    {/* Abstract design elements for banner */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full -ml-10 -mb-10 blur-2xl"></div>
                    </div>

                    <div className="absolute -bottom-16 left-0 right-0 container mx-auto px-4 z-10">
                        <div className="relative inline-block group">
                            <img
                                src={user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=004eeb&color=fff&size=200`}
                                alt={user.fullName}
                                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-slate-800 shadow-xl bg-white dark:bg-slate-800 object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=004eeb&color=fff&size=200`;
                                }}
                            />
                            <ProfilePhotoUpload
                                currentPhoto={user.avatarUrl}
                                userName={user.fullName}
                                onPhotoChange={handlePhotoChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 pt-20 pb-6 transition-all">
                    <div className="mb-8 pl-0 md:pl-48">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            {user.fullName}
                        </h1>
                        <p className="text-lg md:text-xl text-blue-600 dark:text-blue-400 font-bold mt-1">
                            {user.profile.title}
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                        <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-800">
                                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                {user.profile.location}
                            </div>
                            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-800">
                                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                {user.email}
                            </div>
                            {user.profile.phoneNumber && (
                                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-800">
                                    <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    {user.profile.phoneNumber}
                                </div>
                            )}
                            {user.profile.website && (
                                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-800">
                                    <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    <a href={user.profile.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium">
                                        Website
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 w-full md:w-auto">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex-1 md:flex-none justify-center bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] flex items-center gap-2"
                            >
                                <Edit2 className="w-4 h-4" /> Edit Profile
                            </button>
                            <ShareButton
                                title={`${user.fullName} - ${user.profile.title}`}
                                text={`Check out ${user.fullName}'s profile!`}
                                className="flex-1 md:flex-none justify-center border border-slate-300 dark:border-slate-700 px-5 py-2.5 rounded-xl font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2"
                            />
                        </div>
                    </div>

                    {/* Tabs - Different for Candidates vs Employers */}
                    <div className="flex gap-4 md:gap-8 mt-8 border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar">
                        {isEmployer ? (
                            // Employer Tabs
                            <>
                                <button
                                    onClick={() => setActiveTab('overview' as EmployerTab)}
                                    className={`pb-4 px-2 font-bold text-sm transition-all relative flex-shrink-0 ${activeTab === 'overview'
                                        ? 'text-blue-600'
                                        : 'text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                                        }`}
                                >
                                    Overview
                                    {activeTab === 'overview' && (
                                        <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('my-jobs' as EmployerTab)}
                                    className={`pb-4 px-2 font-bold text-sm transition-all relative flex-shrink-0 ${activeTab === 'my-jobs'
                                        ? 'text-blue-600'
                                        : 'text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                                        }`}
                                >
                                    My Jobs ({jobs.filter(j => (j as any).employer?.toString() === user?.id || (j as any).employer === user?.id).length})
                                    {activeTab === 'my-jobs' && (
                                        <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('applications' as EmployerTab)}
                                    className={`pb-4 px-2 font-bold text-sm transition-all relative flex-shrink-0 ${activeTab === 'applications'
                                        ? 'text-blue-600'
                                        : 'text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                                        }`}
                                >
                                    Applications
                                    {activeTab === 'applications' && (
                                        <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('company' as EmployerTab)}
                                    className={`pb-4 px-2 font-bold text-sm transition-all relative flex-shrink-0 ${activeTab === 'company'
                                        ? 'text-blue-600'
                                        : 'text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                                        }`}
                                >
                                    Company Info
                                    {activeTab === 'company' && (
                                        <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('settings' as EmployerTab)}
                                    className={`pb-4 px-2 font-bold text-sm transition-all relative flex-shrink-0 ${activeTab === 'settings'
                                        ? 'text-blue-600'
                                        : 'text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                                        }`}
                                >
                                    <span className="flex items-center gap-1.5"><Settings className="w-3.5 h-3.5" /> Settings</span>
                                    {activeTab === 'settings' && (
                                        <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
                                    )}
                                </button>
                            </>
                        ) : (
                            // Candidate Tabs
                            <>
                                <button
                                    onClick={() => setActiveTab('overview' as CandidateTab)}
                                    className={`pb-4 px-2 font-bold text-sm transition-all relative flex-shrink-0 ${activeTab === 'overview'
                                        ? 'text-blue-600'
                                        : 'text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                                        }`}
                                >
                                    Overview
                                    {activeTab === 'overview' && (
                                        <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('saved' as CandidateTab)}
                                    className={`pb-4 px-2 font-bold text-sm transition-all relative flex-shrink-0 ${activeTab === 'saved'
                                        ? 'text-blue-600'
                                        : 'text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                                        }`}
                                >
                                    Saved Jobs ({savedJobs.length})
                                    {activeTab === 'saved' && (
                                        <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('applications' as CandidateTab)}
                                    className={`pb-4 px-2 font-bold text-sm transition-all relative flex-shrink-0 ${activeTab === 'applications'
                                        ? 'text-blue-600'
                                        : 'text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                                        }`}
                                >
                                    Applications ({user.applications?.length || 0})
                                    {activeTab === 'applications' && (
                                        <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('resume' as CandidateTab)}
                                    className={`pb-4 px-2 font-bold text-sm transition-all relative flex-shrink-0 ${activeTab === 'resume'
                                        ? 'text-blue-600'
                                        : 'text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                                        }`}
                                >
                                    Resume
                                    {activeTab === 'resume' && (
                                        <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('settings' as CandidateTab)}
                                    className={`pb-4 px-2 font-bold text-sm transition-all relative flex-shrink-0 ${activeTab === 'settings'
                                        ? 'text-blue-600'
                                        : 'text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                                        }`}
                                >
                                    <span className="flex items-center gap-1.5"><Settings className="w-3.5 h-3.5" /> Settings</span>
                                    {activeTab === 'settings' && (
                                        <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
                                    )}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-8">
                {isEmployer && activeTab === 'my-jobs' ? (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">My Job Postings</h2>
                            <Link
                                href="/employer/post-job"
                                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
                            >
                                <Plus className="w-5 h-5" /> Post New Job
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {jobs.filter((j: any) => (j.employer?.toString() === user?.id || j.employer === user?.id)).length > 0 ? (
                                jobs.filter((j: any) => (j.employer?.toString() === user?.id || j.employer === user?.id)).map((job: any, idx: number) => (
                                    <FadeIn key={job.id || job._id} delay={idx * 0.05}>
                                        <JobCard job={job} />
                                    </FadeIn>
                                ))
                            ) : (
                                <div className="col-span-full py-24 text-center bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                                    <div className="bg-slate-50 dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100 dark:border-slate-700">
                                        <Briefcase className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                                    </div>
                                    <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-2">No jobs posted yet</h3>
                                    <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs mx-auto">Start posting jobs to find the perfect candidates for your company.</p>
                                    <Link href="/employer/post-job" className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                                        <Plus className="w-5 h-5" /> Post Your First Job
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                ) : isEmployer && activeTab === 'company' ? (
                    <FadeIn>
                        <div className="max-w-3xl mx-auto space-y-6">
                            <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Company Information</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">Company Name</label>
                                        <p className="text-slate-900 dark:text-white text-lg">{user.profile.title || 'Not set'}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">Company Bio</label>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{user.profile.bio || 'No company description added yet.'}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">Location</label>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                            <p className="text-slate-900 dark:text-white">{user.profile.location || 'Not set'}</p>
                                        </div>
                                    </div>
                                    {user.profile.website && (
                                        <div>
                                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">Website</label>
                                            <a href={user.profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2">
                                                <Globe className="w-4 h-4" />
                                                {user.profile.website}
                                            </a>
                                        </div>
                                    )}
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
                                    >
                                        <Edit2 className="w-4 h-4" /> Edit Company Info
                                    </button>
                                </div>
                            </section>
                        </div>
                    </FadeIn>
                ) : activeTab === 'overview' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Info */}
                        <div className="lg:col-span-2 space-y-8">
                            <FadeIn>
                                <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                                        {isEmployer ? 'Company Description' : 'About Me'}
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                                        {user.profile.bio || (isEmployer ? 'No company description added yet.' : 'No personal bio added yet.')}
                                    </p>
                                </section>
                            </FadeIn>

                            {isEmployer ? (
                                // Employer Overview Content
                                <>
                                    <FadeIn delay={0.1}>
                                        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
                                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
                                                <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Recent Job Postings
                                            </h2>
                                            <div className="space-y-4">
                                                {jobs.filter((j: any) => (j.employer?.toString() === user?.id || j.employer === user?.id)).slice(0, 3).length > 0 ? (
                                                    jobs.filter((j: any) => (j.employer?.toString() === user?.id || j.employer === user?.id)).slice(0, 3).map((job: any) => (
                                                        <div key={job.id || job._id} className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                            <h3 className="font-bold text-slate-900 dark:text-white mb-1">{job.title}</h3>
                                                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">{job.location} • {job.type}</p>
                                                            <p className="text-slate-500 dark:text-slate-500 text-xs">Posted {job.postedAt || 'Recently'}</p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-center py-8">
                                                        <Briefcase className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                                                        <p className="text-slate-500 dark:text-slate-400 mb-4">No job postings yet</p>
                                                        <Link href="/employer/post-job" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                                                            Post your first job
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                            {jobs.filter((j: any) => (j.employer?.toString() === user?.id || j.employer === user?.id)).length > 3 && (
                                                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                                                    <button
                                                        onClick={() => setActiveTab('my-jobs' as EmployerTab)}
                                                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm"
                                                    >
                                                        View all {jobs.filter((j: any) => (j.employer?.toString() === user?.id || j.employer === user?.id)).length} jobs →
                                                    </button>
                                                </div>
                                            )}
                                        </section>
                                    </FadeIn>

                                    <FadeIn delay={0.2}>
                                        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
                                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Company Details
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">Industry</label>
                                                    <p className="text-slate-900 dark:text-white">{user.profile.industry || 'Not specified'}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">Company Size</label>
                                                    <p className="text-slate-900 dark:text-white">{user.profile.companySize || 'Not specified'}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">Founded</label>
                                                    <p className="text-slate-900 dark:text-white">{user.profile.founded || 'Not specified'}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">Headquarters</label>
                                                    <p className="text-slate-900 dark:text-white">{user.profile.location || 'Not specified'}</p>
                                                </div>
                                            </div>
                                        </section>
                                    </FadeIn>
                                </>
                            ) : (
                                // Job Seeker Overview Content
                                <>
                                    <FadeIn delay={0.1}>
                                        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
                                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
                                                <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Experience
                                            </h2>
                                            <div className="space-y-10">
                                                {(user.profile.experience || []).length > 0 ? (
                                                    user.profile.experience.map((exp, idx) => (
                                                        <div key={exp.id} className="relative pl-8 border-l-2 border-slate-100 dark:border-slate-800 pb-2 last:pb-0 group">
                                                            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-blue-400 group-hover:scale-110 transition-transform" />
                                                            <div className="flex flex-col md:flex-row justify-between items-start mb-2 gap-2">
                                                                <h3 className="font-bold text-slate-900 dark:text-white text-lg">{exp.title}</h3>
                                                                <span className="text-xs font-bold bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-full text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50">
                                                                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                                                </span>
                                                            </div>
                                                            <p className="text-blue-600 dark:text-blue-400 font-bold mb-3">{exp.company}</p>
                                                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{exp.description}</p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-slate-500 italic py-4">No experience added yet. Click "Edit Profile" to add your work history.</p>
                                                )}
                                            </div>
                                        </section>
                                    </FadeIn>

                                    <FadeIn delay={0.2}>
                                        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
                                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
                                                <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Education
                                            </h2>
                                            <div className="space-y-8">
                                                {(user.profile.education || []).length > 0 ? (
                                                    user.profile.education.map(edu => (
                                                        <div key={edu.id} className="flex gap-5 group">
                                                            <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-700/50 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                                <GraduationCap className="w-7 h-7" />
                                                            </div>
                                                            <div>
                                                                <h3 className="font-bold text-slate-900 dark:text-white text-lg">{edu.school}</h3>
                                                                <p className="text-slate-600 dark:text-slate-400 font-medium">{edu.degree}, {edu.field}</p>
                                                                <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">{edu.startDate} - {edu.endDate}</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-slate-500 italic py-4">No education added yet. Click "Edit Profile" to add your academic background.</p>
                                                )}
                                            </div>
                                        </section>
                                    </FadeIn>
                                </>
                            )}
                        </div>

                        {/* Sidebar Info */}
                        <div className="space-y-8">
                            {isEmployer ? (
                                // Employer Sidebar
                                <>
                                    <FadeIn delay={0.3}>
                                        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
                                            <h2 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">Quick Stats</h2>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                                    <span className="text-slate-600 dark:text-slate-400 font-medium">Active Jobs</span>
                                                    <span className="font-bold text-slate-900 dark:text-white text-lg">
                                                        {jobs.filter((j: any) => (j.employer?.toString() === user?.id || j.employer === user?.id)).length}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                                    <span className="text-slate-600 dark:text-slate-400 font-medium">Total Applications</span>
                                                    <span className="font-bold text-slate-900 dark:text-white text-lg">0</span>
                                                </div>
                                                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                                    <span className="text-slate-600 dark:text-slate-400 font-medium">Profile Views</span>
                                                    <span className="font-bold text-slate-900 dark:text-white text-lg">-</span>
                                                </div>
                                            </div>
                                        </section>
                                    </FadeIn>

                                    <FadeIn delay={0.35}>
                                        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
                                            <h2 className="font-bold text-slate-900 dark:text-white mb-6">Company Links</h2>
                                            <div className="space-y-4">
                                                {user.profile.website ? (
                                                    <a
                                                        href={user.profile.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group border border-transparent hover:border-blue-100 dark:hover:border-blue-900/30"
                                                    >
                                                        <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                            <Globe className="w-6 h-6" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-bold text-slate-900 dark:text-white">Company Website</p>
                                                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate font-medium">Visit Site</p>
                                                        </div>
                                                    </a>
                                                ) : null}
                                                {user.profile.linkedIn ? (
                                                    <a
                                                        href={user.profile.linkedIn}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group border border-transparent hover:border-blue-100 dark:hover:border-blue-900/30"
                                                    >
                                                        <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                            <Linkedin className="w-6 h-6" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-bold text-slate-900 dark:text-white">LinkedIn</p>
                                                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate font-medium">Company Page</p>
                                                        </div>
                                                    </a>
                                                ) : null}
                                                {!user.profile.website && !user.profile.linkedIn && (
                                                    <p className="text-slate-500 text-sm italic py-4 text-center">No company links added yet.</p>
                                                )}
                                            </div>
                                        </section>
                                    </FadeIn>
                                </>
                            ) : (
                                // Job Seeker Sidebar
                                <>
                                    <FadeIn delay={0.3}>
                                        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
                                            <h2 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">Skills</h2>
                                            <div className="flex flex-wrap gap-2.5">
                                                {(user.profile.skills || []).length > 0 ? (
                                                    user.profile.skills.map(skill => (
                                                        <span key={skill} className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-xl text-sm font-bold border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                                                            {skill}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <p className="text-slate-500 text-sm italic">No skills added yet.</p>
                                                )}
                                            </div>
                                        </section>
                                    </FadeIn>

                                    {/* Social Media Links */}
                                    <FadeIn delay={0.35}>
                                        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
                                            <h2 className="font-bold text-slate-900 dark:text-white mb-6">Connect With Me</h2>
                                            <div className="space-y-4">
                                                {user.profile.linkedIn ? (
                                                    <a
                                                        href={user.profile.linkedIn}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group border border-transparent hover:border-blue-100 dark:hover:border-blue-900/30"
                                                    >
                                                        <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                            <Linkedin className="w-6 h-6" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-bold text-slate-900 dark:text-white">LinkedIn</p>
                                                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate font-medium">View Profile</p>
                                                        </div>
                                                    </a>
                                                ) : null}
                                                {user.profile.twitter ? (
                                                    <a
                                                        href={user.profile.twitter}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all group border border-transparent hover:border-sky-100 dark:hover:border-sky-900/30"
                                                    >
                                                        <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center text-sky-600 dark:text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all">
                                                            <Twitter className="w-6 h-6" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-bold text-slate-900 dark:text-white">Twitter/X</p>
                                                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate font-medium">Follow Me</p>
                                                        </div>
                                                    </a>
                                                ) : null}
                                                {user.profile.github ? (
                                                    <a
                                                        href={user.profile.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                                                    >
                                                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:bg-slate-900 dark:group-hover:bg-white dark:group-hover:text-black group-hover:text-white transition-all">
                                                            <Github className="w-6 h-6" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-bold text-slate-900 dark:text-white">GitHub</p>
                                                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate font-medium">Check Repos</p>
                                                        </div>
                                                    </a>
                                                ) : null}
                                                {!user.profile.linkedIn && !user.profile.twitter && !user.profile.github && (
                                                    <p className="text-slate-500 text-sm italic py-4 text-center">No social links added yet.</p>
                                                )}
                                            </div>
                                        </section>
                                    </FadeIn>
                                </>
                            )}

                            <FadeIn delay={0.4}>
                                <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-125 transition-transform duration-700"></div>
                                    <h3 className="font-bold text-xl mb-4 flex items-center gap-2 relative">
                                        {isEmployer ? 'Company Profile' : 'Profile Strength'} <CheckCircle className="w-5 h-5 text-blue-200" />
                                    </h3>
                                    <div className="flex items-end gap-3 mb-4 relative">
                                        <span className="text-5xl font-extrabold">{strength}%</span>
                                        <span className="text-blue-100 mb-2 font-bold">
                                            {strength < 50 ? 'Keep going!' : strength < 80 ? 'Almost there!' : 'Perfect!'}
                                        </span>
                                    </div>
                                    <div className="w-full bg-white/20 h-3 rounded-full mb-6 relative backdrop-blur-sm overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${strength}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className="bg-white h-full rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                                        />
                                    </div>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="w-full bg-white text-blue-600 hover:bg-blue-50 transition-all py-3 rounded-xl font-bold shadow-lg transform active:scale-[0.98] relative text-lg"
                                    >
                                        {isEmployer ? 'Complete Company Profile' : 'Complete Profile'}
                                    </button>
                                </section>
                            </FadeIn>
                        </div>
                    </div>
                ) : activeTab === 'applications' ? (
                    <div className="space-y-4 max-w-3xl mx-auto">
                        {user.applications && user.applications.length > 0 ? (
                            user.applications.map(app => (
                                <FadeIn key={app.id}>
                                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex items-center justify-between shadow-sm hover:shadow-lg transition-all duration-300 group">
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white text-xl mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{app.jobTitle}</h3>
                                            <p className="text-slate-600 dark:text-slate-400 font-bold mb-3">{app.companyName}</p>
                                            <div className="flex items-center gap-4 text-sm text-slate-400 dark:text-slate-500">
                                                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Applied {app.appliedAt}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-3">
                                            <span className={`px-5 py-2 rounded-full text-xs font-extrabold tracking-wider uppercase border-2 shadow-sm ${app.status === 'Applied' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/50' :
                                                app.status === 'Interviewing' ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/50' :
                                                    app.status === 'Offer' ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-100 dark:border-green-900/50' :
                                                        'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-100 dark:border-slate-700'
                                                }`}>
                                                {app.status}
                                            </span>
                                            <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer border border-slate-100 dark:border-slate-700">
                                                <LinkIcon className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))
                        ) : (
                            <div className="py-24 text-center bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 transition-colors shadow-sm">
                                <div className="bg-slate-50 dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100 dark:border-slate-700">
                                    <Briefcase className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                                </div>
                                <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-2">No active applications</h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs mx-auto">Start applying to jobs you're interested in to track them here.</p>
                                <a href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]">
                                    Browse Jobs <ArrowRight className="w-5 h-5" />
                                </a>
                            </div>
                        )}
                    </div>
                ) : activeTab === 'resume' ? (
                    <FadeIn>
                        <ResumeUpload />
                    </FadeIn>
                ) : activeTab === 'settings' ? (
                    <AccountSettings />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {savedJobs.length > 0 ? (
                            savedJobs.map((job, idx) => (
                                <FadeIn key={job.id} delay={idx * 0.05}>
                                    <JobCard job={job} />
                                </FadeIn>
                            ))
                        ) : (
                            <div className="col-span-full py-24 text-center bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 transition-colors">
                                <div className="bg-slate-50 dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100 dark:border-slate-700">
                                    <Bookmark className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                                </div>
                                <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-2">No saved jobs</h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs mx-auto">Bookmark the most interesting jobs to find them later.</p>
                                <a href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                                    Browse Jobs
                                </a>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// Add ArrowRight for empty state links
function ArrowRight({ className }: { className?: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
    )
}
