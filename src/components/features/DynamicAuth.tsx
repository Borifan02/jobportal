'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Mail, Github, ArrowRight, ArrowLeft, Eye, EyeOff, AlertCircle, User, MapPin, Phone, Lock, Briefcase, UserCircle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface DynamicAuthProps {
    initialMode?: 'login' | 'register';
}

export default function DynamicAuth({ initialMode = 'login' }: DynamicAuthProps) {
    const { login, register, socialLogin } = useAuth();
    const [view, setView] = useState<'selection' | 'login' | 'register' | 'social-login'>('selection');
    const [activeProvider, setActiveProvider] = useState<'google' | 'github' | null>(null);
    const [role, setRole] = useState<'candidate' | 'employer'>('candidate');
    const [isLoading, setIsLoading] = useState(false);
    const [isSocialLoading, setIsSocialLoading] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        location: '',
        phoneNumber: ''
    });

    const [socialFormData, setSocialFormData] = useState({
        name: '',
        email: ''
    });

    const handleSocialInit = (provider: 'google' | 'github') => {
        setActiveProvider(provider);
        setView('social-login');
        setError(null);
    };

    const handleSocialLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!activeProvider) return;

        setIsSocialLoading(activeProvider);
        setError(null);
        try {
            await socialLogin(activeProvider, {
                email: socialFormData.email,
                fullName: socialFormData.name,
                role: role
            });
            window.location.href = '/profile';
        } catch (err: any) {
            setError(err.message || `${activeProvider} authentication failed`);
            setIsSocialLoading(null);
        }
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            if (view === 'login') {
                await login(formData.email, formData.password);
            } else {
                if (formData.password.length < 8) {
                    throw new Error('Password must be at least 8 characters');
                }
                await register(formData.name, formData.email, formData.password, formData.location, formData.phoneNumber, role);
            }
            window.location.href = '/profile';
        } catch (err: any) {
            setError(err.message || 'Authentication failed');
            setIsLoading(false);
        }
    };

    const toggleMode = () => {
        setView(view === 'login' ? 'register' : 'login');
        setError(null);
    };

    const RoleSelector = () => (
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-8">
            <button
                onClick={() => setRole('candidate')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all font-bold text-sm ${role === 'candidate'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                    }`}
            >
                <UserCircle className="w-4 h-4" />
                Job Seeker
            </button>
            <button
                onClick={() => setRole('employer')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all font-bold text-sm ${role === 'employer'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                    }`}
            >
                <Briefcase className="w-4 h-4" />
                Employer
            </button>
        </div>
    );

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 transition-all duration-500">
                <div className="p-8">
                    <AnimatePresence mode="wait">
                        {view === 'selection' ? (
                            <motion.div
                                key="selection"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                className="space-y-6"
                            >
                                <div className="text-center mb-8">
                                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
                                        Welcome to JobPortal
                                    </h1>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
                                        Choose your preferred way to continue
                                    </p>
                                </div>

                                <RoleSelector />

                                {error && (
                                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm">
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                        <p className="font-semibold">{error}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 gap-4">
                                    <button
                                        onClick={() => handleSocialInit('google')}
                                        disabled={!!isSocialLoading}
                                        className="group relative flex items-center justify-center gap-3 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold py-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all active:scale-[0.98] shadow-sm"
                                    >
                                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        <span>Continue with Google</span>
                                    </button>

                                    <button
                                        onClick={() => handleSocialInit('github')}
                                        disabled={!!isSocialLoading}
                                        className="group relative flex items-center justify-center gap-3 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-black transition-all active:scale-[0.98] shadow-lg shadow-slate-900/10"
                                    >
                                        <Github className="w-6 h-6" />
                                        <span>Continue with GitHub</span>
                                    </button>

                                    <div className="relative py-4">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
                                        </div>
                                        <div className="relative flex justify-center text-xs">
                                            <span className="px-4 bg-white dark:bg-slate-900 text-slate-400 font-bold uppercase tracking-widest">or</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setView(initialMode)}
                                        className="group relative flex items-center justify-center gap-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold py-4 rounded-2xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all active:scale-[0.98]"
                                    >
                                        <Mail className="w-6 h-6" />
                                        <span>Continue with Email</span>
                                    </button>
                                </div>

                                <p className="text-center text-sm text-slate-500 dark:text-slate-400 pt-4">
                                    By continuing, you agree to our <Link href="/terms" className="text-blue-500 hover:underline">Terms</Link> and <Link href="/privacy" className="text-blue-500 hover:underline">Privacy</Link>.
                                </p>
                            </motion.div>
                        ) : view === 'social-login' ? (
                            <motion.div
                                key="social-login"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                className="space-y-6"
                            >
                                <button
                                    onClick={() => setView('selection')}
                                    className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-bold text-sm mb-4"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Back to options
                                </button>

                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4 border border-slate-100 dark:border-slate-700 shadow-sm">
                                        {activeProvider === 'google' ? (
                                            <svg className="w-10 h-10" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                                        ) : <Github className="w-10 h-10" />}
                                    </div>
                                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white capitalize tracking-tight">
                                        Sign in with {activeProvider}
                                    </h2>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                                        Enter your {activeProvider} account details
                                    </p>
                                </div>

                                <form onSubmit={handleSocialLogin} className="space-y-4">
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            required
                                            value={socialFormData.name}
                                            onChange={(e) => setSocialFormData({ ...socialFormData, name: e.target.value })}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-600 transition-all outline-none font-medium text-slate-900 dark:text-white"
                                        />
                                    </div>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            required
                                            value={socialFormData.email}
                                            onChange={(e) => setSocialFormData({ ...socialFormData, email: e.target.value })}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-600 transition-all outline-none font-medium text-slate-900 dark:text-white"
                                        />
                                    </div>

                                    <div className="bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/20">
                                        <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">Simulated Permissions</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                            JobPortal will receive your name, email address, and profile picture from {activeProvider}.
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={!!isSocialLoading}
                                        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-extrabold py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98] disabled:opacity-70"
                                    >
                                        {isSocialLoading ? (
                                            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>Authorize & Continue</>
                                        )}
                                    </button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="email-form"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <button
                                    onClick={() => setView('selection')}
                                    className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-bold text-sm mb-4"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Back to options
                                </button>

                                <div className="text-center mb-6">
                                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
                                        {view === 'login' ? 'Welcome Back' : 'Create Account'}
                                    </h2>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                                        {view === 'login' ? 'Sign in to your account' : 'Join thousands of job seekers'}
                                    </p>
                                </div>

                                <RoleSelector />

                                {error && (
                                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm">
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                        <p className="font-semibold">{error}</p>
                                    </div>
                                )}

                                <form onSubmit={handleEmailSubmit} className="space-y-4">
                                    {view === 'register' && (
                                        <div className="space-y-4">
                                            <div className="relative group">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                                <input
                                                    type="text"
                                                    placeholder="Full Name"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-600 transition-all outline-none font-medium text-slate-900 dark:text-white"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="relative group">
                                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                                    <input
                                                        type="text"
                                                        placeholder="Location"
                                                        required
                                                        value={formData.location}
                                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-600 transition-all outline-none font-medium text-slate-900 dark:text-white text-sm"
                                                    />
                                                </div>
                                                <div className="relative group">
                                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                                    <input
                                                        type="tel"
                                                        placeholder="Phone"
                                                        value={formData.phoneNumber}
                                                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-600 transition-all outline-none font-medium text-slate-900 dark:text-white text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-600 transition-all outline-none font-medium text-slate-900 dark:text-white"
                                        />
                                    </div>

                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            required
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full pl-12 pr-14 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-600 transition-all outline-none font-medium text-slate-900 dark:text-white"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-extrabold py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98] disabled:opacity-70"
                                    >
                                        {isLoading ? (
                                            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                {view === 'login' ? 'Sign In' : 'Create Account'}
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </form>

                                <div className="text-center pt-4">
                                    <button
                                        onClick={toggleMode}
                                        className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors"
                                    >
                                        {view === 'login' ? (
                                            <>Don't have an account? <span className="text-blue-600 font-extrabold">Sign Up</span></>
                                        ) : (
                                            <>Already have an account? <span className="text-blue-600 font-extrabold">Sign In</span></>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="px-8 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">
                        Trusted by 50,000+ companies globally
                    </p>
                </div>
            </div>
        </div>
    );
}
