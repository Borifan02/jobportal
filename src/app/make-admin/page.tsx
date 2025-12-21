'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Shield, Sparkles, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MakeAdminPage() {
    const { user, updateUserRole } = useAuth();
    const [upgraded, setUpgraded] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleUpgrade = async () => {
        if (!user) return;

        setIsProcessing(true);
        // Simulate a "Handshake" or authority check
        await new Promise(resolve => setTimeout(resolve, 2000));

        updateUserRole(user.id, 'admin');
        setUpgraded(true);
        setIsProcessing(false);

        // Redirect after success
        setTimeout(() => {
            window.location.href = '/admin/dashboard';
        }, 2500);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl"
            >
                <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-10 lg:p-16 overflow-hidden relative">
                    {/* Background glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -mr-32 -mt-32" />

                    <div className="relative z-10 text-center">
                        <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-600/20 rotate-12">
                            <Shield className="w-10 h-10 text-white" />
                        </div>

                        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                            Elevate Account Authority
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium mb-10 text-lg">
                            Activate administrative protocols for your current session.
                        </p>

                        {!user ? (
                            <div className="space-y-6">
                                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700 flex items-center gap-4 text-left">
                                    <AlertCircle className="w-6 h-6 text-slate-400" />
                                    <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
                                        Identification Required. Please sign in to an existing account to begin the elevation process.
                                    </p>
                                </div>
                                <a
                                    href="/login"
                                    className="block w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-5 rounded-2xl font-black hover:scale-[1.02] transition-all shadow-xl shadow-slate-900/10 active:scale-95"
                                >
                                    Proceed to Login
                                </a>
                            </div>
                        ) : (
                            <AnimatePresence mode="wait">
                                {upgraded ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center"
                                    >
                                        <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                                        </div>
                                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Authority Granted</h2>
                                        <p className="text-slate-500 font-bold mb-8">Synchronizing permissions with the management console...</p>
                                        <div className="flex justify-center gap-2">
                                            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" />
                                            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div key="action" className="space-y-8">
                                        <div className="p-6 bg-blue-50/50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-800/50 text-left">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Sparkles className="w-4 h-4 text-blue-600" />
                                                <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Active Identity</span>
                                            </div>
                                            <p className="text-lg font-black text-slate-900 dark:text-white truncate">
                                                {user.email}
                                            </p>
                                            <p className="text-sm font-bold text-slate-400 capitalize">
                                                Current Status: <span className="text-blue-600 dark:text-blue-400">{user.role}</span>
                                            </p>
                                        </div>

                                        <button
                                            onClick={handleUpgrade}
                                            disabled={isProcessing}
                                            className="w-full relative bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/20 group active:scale-[0.98] disabled:opacity-50"
                                        >
                                            <span className="flex items-center justify-center gap-3">
                                                {isProcessing ? (
                                                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <>
                                                        Activate Admin Status
                                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </span>
                                        </button>

                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            Internal developer tool • Authorized Use Only
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
