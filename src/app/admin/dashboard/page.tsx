'use client';

import { useAuth } from '@/context/AuthContext';
import { useJobs } from '@/context/JobContext';
import { useState, useMemo } from 'react';
import {
    Trash2, Users, Briefcase, Search, Shield, CheckCircle,
    ArrowLeft, MoreVertical, Filter, UserPlus, UserMinus,
    ShieldCheck, AlertTriangle, Check, X, TrendingUp,
    BarChart3, Globe, Activity, Flag, Award, Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from '@/components/ui/Motion';

export default function AdminDashboard() {
    const { user, allUsers, deleteUser, updateUserRole, toggleUserVerification, toggleUserFlag } = useAuth();
    const { jobs, deleteJob, applications, toggleJobVerification, toggleJobFlag } = useJobs();
    const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'users' | 'moderation'>('overview');
    const [searchTerm, setSearchTerm] = useState('');

    // Check if user is admin
    if (!user || user.role !== 'admin') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950 gap-6 p-4">
                <Shield className="w-16 h-16 text-slate-300 animate-pulse" />
                <h1 className="text-2xl font-black text-slate-900 dark:text-white">Admin Access Restricted</h1>
                <Link href="/login" className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold">Return to Login</Link>
            </div>
        );
    }

    const filteredJobs = useMemo(() => jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
    ), [jobs, searchTerm]);

    const filteredUsers = useMemo(() => allUsers.filter(u =>
        u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    ), [allUsers, searchTerm]);

    const flaggedItems = useMemo(() => {
        const flaggedJobs = jobs.filter(j => j.isFlagged);
        const flaggedUsers = allUsers.filter(u => u.isFlagged);
        return [...flaggedJobs.map(j => ({ ...j, itemType: 'job' })), ...flaggedUsers.map(u => ({ ...u, itemType: 'user' }))];
    }, [jobs, allUsers]);

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-500">
            {/* Sidebar Navigation */}
            <div className="flex flex-col lg:flex-row min-h-screen">
                <aside className="w-full lg:w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-8">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">AdminPortal</span>
                    </div>

                    <nav className="space-y-1">
                        {[
                            { id: 'overview', icon: BarChart3, label: 'Overview' },
                            { id: 'jobs', icon: Briefcase, label: 'Manage Jobs' },
                            { id: 'users', icon: Users, label: 'Manage Users' },
                            { id: 'moderation', icon: Flag, label: 'Moderation', count: flaggedItems.length },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id as any)}
                                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${activeTab === item.id
                                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20'
                                    : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className="w-5 h-5" />
                                    {item.label}
                                </div>
                                {item.count !== undefined && item.count > 0 && (
                                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${activeTab === item.id ? 'bg-white text-blue-600' : 'bg-red-500 text-white'}`}>
                                        {item.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>

                    <div className="mt-auto p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-xs font-black text-slate-500 uppercase tracking-widest">System Online</span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                            V 2.4.0 • Region: Global<br />
                            Last Sync: {new Date().toLocaleTimeString()}
                        </p>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white capitalize tracking-tight">
                                {activeTab} Console
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">Monitoring platform integrity and growth metrics.</p>
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="relative flex-1 md:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Global Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-blue-500/10 dark:text-white font-bold transition-all"
                                />
                            </div>
                        </div>
                    </header>

                    <AnimatePresence mode="wait">
                        {activeTab === 'overview' && (
                            <motion.div
                                key="overview"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-10"
                            >
                                {/* KPI Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {[
                                        { id: 'moderation', label: 'Total Placements', value: applications.length, trend: '+12%', icon: CheckCircle, color: 'emerald' },
                                        { id: 'users', label: 'Active Talents', value: allUsers.length, trend: '+5.4%', icon: Users, color: 'blue' },
                                        { id: 'jobs', label: 'Live Openings', value: jobs.length, trend: '+2.1%', icon: Briefcase, color: 'indigo' },
                                        { id: 'overview', label: 'Platform Health', value: '99.9%', trend: 'Stable', icon: Activity, color: 'purple' },
                                    ].map((stat, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveTab(stat.id as any)}
                                            className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm text-left hover:border-blue-500/50 transition-all cursor-pointer"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <div className={`p-3 rounded-2xl bg-${stat.color}-50 dark:bg-${stat.color}-900/20 text-${stat.color}-600`}>
                                                    <stat.icon className="w-6 h-6" />
                                                </div>
                                                <span className={`text-xs font-black ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-slate-400'}`}>
                                                    {stat.trend}
                                                </span>
                                            </div>
                                            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</h3>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                        </button>
                                    ))}
                                </div>

                                {/* Main Charts (Simulated with Decorative Elements) */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                                        <div className="flex items-center justify-between mb-8">
                                            <h3 className="text-lg font-black text-slate-900 dark:text-white">Engagement Trends</h3>
                                            <TrendingUp className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div className="h-64 flex items-end gap-3 px-2">
                                            {[40, 70, 45, 90, 65, 80, 55, 75, 95, 60, 85, 100].map((h, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${h}%` }}
                                                    transition={{ delay: i * 0.05, duration: 0.8 }}
                                                    className={`flex-1 rounded-t-xl opacity-80 ${i === 11 ? 'bg-blue-600 shadow-lg shadow-blue-600/30' : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-200'}`}
                                                />
                                            ))}
                                        </div>
                                        <div className="flex justify-between mt-6 px-2 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                                            <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Dec</span>
                                        </div>
                                    </div>

                                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                                        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-8">Top Job Sectors</h3>
                                        <div className="space-y-6 flex-1">
                                            {[
                                                { name: 'Engineering', count: '45%', color: 'bg-blue-600' },
                                                { name: 'Design', count: '25%', color: 'bg-purple-600' },
                                                { name: 'Marketing', count: '20%', color: 'bg-emerald-600' },
                                                { name: 'Sales', count: '10%', color: 'bg-orange-500' },
                                            ].map((sector, i) => (
                                                <div key={i} className="space-y-2">
                                                    <div className="flex justify-between text-xs font-extrabold uppercase tracking-widest">
                                                        <span className="text-slate-500">{sector.name}</span>
                                                        <span className="text-slate-900 dark:text-white">{sector.count}</span>
                                                    </div>
                                                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: sector.count }}
                                                            transition={{ duration: 1, delay: i * 0.2 }}
                                                            className={`h-full ${sector.color} rounded-full`}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'jobs' && (
                            <motion.div
                                key="jobs"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
                            >
                                <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Job Listings Library</h3>
                                    <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                                        {filteredJobs.length} Positions Total
                                    </span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                <th className="p-6">Position & Company</th>
                                                <th className="p-6">Trust Level</th>
                                                <th className="p-6">Status</th>
                                                <th className="p-6 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {filteredJobs.map(job => (
                                                <tr key={job.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                                    <td className="p-6">
                                                        <div className="font-bold text-slate-900 dark:text-white">{job.title}</div>
                                                        <div className="text-xs text-slate-500 font-medium">{job.company} • {job.location}</div>
                                                    </td>
                                                    <td className="p-6">
                                                        <button
                                                            onClick={() => toggleJobVerification(job.id)}
                                                            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${job.isVerified
                                                                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 border border-blue-200 dark:border-blue-800'
                                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-transparent grayscale'
                                                                }`}
                                                        >
                                                            <Award className="w-3.5 h-3.5" />
                                                            {job.isVerified ? 'Verified' : 'Pending'}
                                                        </button>
                                                    </td>
                                                    <td className="p-6">
                                                        <button
                                                            onClick={() => toggleJobFlag(job.id)}
                                                            className={`p-2 rounded-xl transition-all ${job.isFlagged ? 'bg-red-50 dark:bg-red-900/30 text-red-600' : 'text-slate-300 hover:text-red-400'}`}
                                                        >
                                                            <Flag className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                    <td className="p-6 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Link
                                                                href={`/jobs/${job.id}`}
                                                                className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-600 rounded-xl transition-all"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </Link>
                                                            <button
                                                                onClick={() => deleteJob(job.id)}
                                                                className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-600 rounded-xl transition-all"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'users' && (
                            <motion.div
                                key="users"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
                            >
                                <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Active Community</h3>
                                    <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                                        {filteredUsers.length} Members
                                    </span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                <th className="p-6">User Details</th>
                                                <th className="p-6">Permissions</th>
                                                <th className="p-6">Vetting</th>
                                                <th className="p-6 text-right">Moderation</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {filteredUsers.map(u => (
                                                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                                    <td className="p-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100">
                                                                <img src={u.avatarUrl} alt="" className="w-full h-full object-cover" />
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                                                    {u.fullName}
                                                                    {u.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />}
                                                                </div>
                                                                <div className="text-xs text-slate-500 font-medium">{u.email}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-6">
                                                        <select
                                                            disabled={u.id === user.id}
                                                            value={u.role}
                                                            onChange={(e) => updateUserRole(u.id, e.target.value as any)}
                                                            className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 p-2 outline-none"
                                                        >
                                                            <option value="candidate">Candidate</option>
                                                            <option value="employer">Employer</option>
                                                            <option value="admin">Admin</option>
                                                        </select>
                                                    </td>
                                                    <td className="p-6">
                                                        <button
                                                            onClick={() => toggleUserVerification(u.id)}
                                                            className={`p-2 rounded-xl transition-all ${u.isVerified ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600' : 'text-slate-300 hover:text-blue-400'}`}
                                                        >
                                                            <ShieldCheck className="w-5 h-5" />
                                                        </button>
                                                    </td>
                                                    <td className="p-6 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                onClick={() => toggleUserFlag(u.id)}
                                                                className={`p-2.5 rounded-xl transition-all ${u.isFlagged ? 'bg-red-50 dark:bg-red-900/30 text-red-600' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-600'}`}
                                                            >
                                                                <Flag className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                disabled={u.id === user.id}
                                                                onClick={() => deleteUser(u.id)}
                                                                className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-600 rounded-xl transition-all disabled:opacity-20"
                                                            >
                                                                <UserMinus className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'moderation' && (
                            <motion.div
                                key="moderation"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-8"
                            >
                                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 p-8 rounded-[2.5rem] flex items-center gap-6">
                                    <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-amber-900/5">
                                        <AlertTriangle className="w-8 h-8 text-amber-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-slate-900 dark:text-white">Moderation Queue</h3>
                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">Review flagged content and potential policy violations reported by members.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {flaggedItems.map((item: any) => (
                                        <div key={item.id} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${item.itemType === 'job' ? 'bg-indigo-50 text-indigo-600' : 'bg-blue-50 text-blue-600'}`}>
                                                        {item.itemType} Flag
                                                    </span>
                                                    <button
                                                        onClick={() => item.itemType === 'job' ? toggleJobFlag(item.id) : toggleUserFlag(item.id)}
                                                        className="text-slate-400 hover:text-slate-900 font-bold text-xs"
                                                    >
                                                        Dismiss
                                                    </button>
                                                </div>
                                                <h4 className="text-lg font-black text-slate-900 dark:text-white mb-1">
                                                    {item.itemType === 'job' ? item.title : item.fullName}
                                                </h4>
                                                <p className="text-xs font-medium text-slate-500">{item.itemType === 'job' ? item.company : item.email}</p>
                                            </div>
                                            <div className="flex gap-3 mt-6">
                                                <button
                                                    onClick={() => item.itemType === 'job' ? deleteJob(item.id) : deleteUser(item.id)}
                                                    className="flex-1 py-3 bg-red-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
                                                >
                                                    Remove Permanent
                                                </button>
                                                <button
                                                    className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                                                >
                                                    Contact Owner
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {flaggedItems.length === 0 && (
                                        <div className="col-span-full p-20 text-center">
                                            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                                            <p className="text-slate-400 font-bold">Queue Empty. Platform is healthy.</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
