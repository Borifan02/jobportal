'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';
import { useState, useEffect } from 'react';
import { Menu, X, Briefcase, User, LogOut, LayoutDashboard, Bookmark, Bell, Check, Trash2, Shield, Plus, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Header() {
    const { user, isAuthenticated, logout } = useAuth();
    const { notifications, unreadCount, markAsRead, clearAll } = useNotifications();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-lg shadow-blue-900/5 py-2' : 'bg-white dark:bg-slate-900 border-b border-transparent py-4'}`}>
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-600/30 group-hover:rotate-12 transition-transform duration-300">
                        <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">JobPortal</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-2">
                    <Link href="/jobs" className="px-5 py-2 text-slate-600 dark:text-slate-400 font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl">Find Jobs</Link>
                    <Link href={isAuthenticated ? "/profile?tab=saved" : "/saved"} className="px-5 py-2 text-slate-600 dark:text-slate-400 font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl">
                        Saved Jobs
                    </Link>
                    {isAuthenticated && user?.role === 'employer' && (
                        <Link href="/employer/dashboard" className="px-5 py-2 text-slate-600 dark:text-slate-400 font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl">
                            Dashboard
                        </Link>
                    )}
                </nav>

                {/* Desktop Action Area */}
                <div className="hidden lg:flex items-center gap-5">
                    <ThemeToggle />

                    <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

                    {isAuthenticated && user ? (
                        <div className="flex items-center gap-4">
                            {/* Notifications */}
                            <div className="relative">
                                <button
                                    onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}
                                    className={`p-2.5 rounded-xl transition-all relative ${isNotifOpen ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                                >
                                    <Bell className="w-5 h-5 font-bold" />
                                    {unreadCount > 0 && (
                                        <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm animate-pulse"></span>
                                    )}
                                </button>

                                <AnimatePresence>
                                    {isNotifOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                            className="absolute right-0 top-full mt-3 w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden z-[60]"
                                        >
                                            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                                                <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-xs">Notifications</h3>
                                                {notifications.length > 0 && (
                                                    <button onClick={clearAll} className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-600 flex items-center gap-1.5 transition-colors">
                                                        <Trash2 className="w-3.5 h-3.5" /> Clear All
                                                    </button>
                                                )}
                                            </div>
                                            <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                                                {notifications.length === 0 ? (
                                                    <div className="p-12 text-center">
                                                        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 dark:border-slate-700">
                                                            <Bell className="w-6 h-6 text-slate-300" />
                                                        </div>
                                                        <p className="text-slate-400 font-bold">Nothing to show yet</p>
                                                    </div>
                                                ) : (
                                                    notifications.map(note => (
                                                        <div
                                                            key={note.id}
                                                            className={`p-5 border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer ${!note.read ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}
                                                            onClick={() => markAsRead(note.id)}
                                                        >
                                                            <div className="flex items-start gap-4">
                                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${!note.read ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                                                                    <Check className="w-5 h-5" />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className={`text-sm tracking-tight ${!note.read ? 'font-black text-slate-900 dark:text-white' : 'font-bold text-slate-600 dark:text-slate-400'}`}>{note.title}</p>
                                                                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 line-clamp-2 leading-relaxed font-medium">{note.message}</p>
                                                                    <p className="text-[10px] text-slate-400 dark:text-slate-600 mt-2 font-black uppercase tracking-widest">{new Date(note.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                                </div>
                                                                {!note.read && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0 mt-1 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />}
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Post Job Button */}
                            <Link
                                href="/employer/post-job"
                                className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-xl font-black text-sm hover:scale-105 transition-all shadow-xl shadow-slate-900/10 dark:shadow-white/5 active:scale-95 flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" /> Post a Job
                            </Link>

                            {/* Profile Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
                                    className={`flex items-center gap-3 p-1 rounded-2xl transition-all border-2 ${isProfileOpen ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/20' : 'border-slate-100 dark:border-slate-800 bg-transparent hover:border-blue-200'}`}
                                >
                                    <div className="relative">
                                        <img
                                            src={user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || 'User')}&background=004eeb&color=fff`}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-xl object-cover shadow-sm bg-white"
                                        />
                                        {user.role === 'admin' && (
                                            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-indigo-600 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center shadow-lg">
                                                <Shield className="w-2.5 h-2.5 text-white" />
                                            </div>
                                        )}
                                    </div>
                                    <span className="hidden xl:block text-sm font-black text-slate-900 dark:text-white pr-2">{user.fullName?.split(' ')[0] || 'User'}</span>
                                </button>

                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                            className="absolute right-0 top-full mt-3 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden z-[60]"
                                        >
                                            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                                <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Signed in as</p>
                                                <p className="text-sm font-black text-slate-900 dark:text-white truncate">{user.email}</p>
                                            </div>
                                            <div className="p-3 space-y-1">
                                                <Link onClick={() => setIsProfileOpen(false)} href="/profile" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all">
                                                    <User className="w-4 h-4" /> My Profile
                                                </Link>
                                                {user.role === 'admin' && (
                                                    <Link onClick={() => setIsProfileOpen(false)} href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all">
                                                        <Shield className="w-4 h-4" /> Admin Console
                                                    </Link>
                                                )}
                                                <Link onClick={() => setIsProfileOpen(false)} href="/employer/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all">
                                                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                                                </Link>
                                                <Link onClick={() => setIsProfileOpen(false)} href="/profile?tab=settings" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all">
                                                    <Settings className="w-4 h-4" /> Settings
                                                </Link>
                                                <div className="h-px bg-slate-100 dark:bg-slate-800 my-2 mx-2"></div>
                                                <button
                                                    onClick={() => { logout(); setIsProfileOpen(false); }}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                                                >
                                                    <LogOut className="w-4 h-4" /> Sign Out
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link href="/login" className="px-6 py-2.5 text-sm font-black text-slate-900 dark:text-white hover:text-blue-600 transition-colors">
                                Sign In
                            </Link>
                            <Link
                                href="/register"
                                className="bg-blue-600 text-white px-8 py-2.5 rounded-xl text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 hover:-translate-y-1 active:scale-95"
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-4 lg:hidden">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`p-2.5 rounded-xl transition-all ${isMenuOpen ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 overflow-hidden shadow-2xl"
                    >
                        <div className="container mx-auto px-4 py-8 flex flex-col gap-2">
                            <Link href="/jobs" className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-black" onClick={() => setIsMenuOpen(false)}>
                                Find Jobs <Briefcase className="w-5 h-5 opacity-40" />
                            </Link>
                            <Link href="/saved" className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-black" onClick={() => setIsMenuOpen(false)}>
                                Saved Jobs <Bookmark className="w-5 h-5 opacity-40" />
                            </Link>

                            {isAuthenticated && user && (
                                <>
                                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-4"></div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Link href="/profile" className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-black text-center" onClick={() => setIsMenuOpen(false)}>
                                            <User className="w-6 h-6" /> Profile
                                        </Link>
                                        <Link href="/employer/dashboard" className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 font-black text-center" onClick={() => setIsMenuOpen(false)}>
                                            <LayoutDashboard className="w-6 h-6" /> Dashboard
                                        </Link>
                                        {user?.role === 'admin' && (
                                            <Link href="/admin/dashboard" className="col-span-2 flex items-center justify-center gap-3 p-6 rounded-2xl bg-slate-900 text-white font-black text-center" onClick={() => setIsMenuOpen(false)}>
                                                <Shield className="w-6 h-6" /> Admin Console
                                            </Link>
                                        )}
                                    </div>
                                    <Link href="/employer/post-job" className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-5 rounded-2xl font-black text-center mt-3" onClick={() => setIsMenuOpen(false)}>
                                        Post a Job
                                    </Link>
                                    <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full p-5 rounded-2xl font-black text-red-600 border border-slate-100 dark:border-slate-800 mt-4 leading-none">
                                        Sign Out
                                    </button>
                                </>
                            )}

                            {!isAuthenticated && (
                                <div className="flex flex-col gap-4 mt-4">
                                    <Link href="/login" className="w-full p-5 rounded-2xl font-black text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 text-center" onClick={() => setIsMenuOpen(false)}>
                                        Sign In
                                    </Link>
                                    <Link href="/register" className="w-full p-5 rounded-2xl font-black text-white bg-blue-600 text-center shadow-xl shadow-blue-600/30" onClick={() => setIsMenuOpen(false)}>
                                        Create Account
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
