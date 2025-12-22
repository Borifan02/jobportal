'use client';

import DynamicAuth from '@/components/features/DynamicAuth';
import { useEffect } from 'react';
import { setupDemoUsers } from '@/lib/demoSetup';

export default function LoginPage() {
    useEffect(() => {
        setupDemoUsers();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 transition-colors duration-300">
            {/* Background decorative elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px]" />
            </div>

            {/* Demo credentials info */}
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl max-w-md w-full">
                <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">Demo Accounts</h3>
                <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <div><strong>Candidate:</strong> candidate@demo.com / password123</div>
                    <div><strong>Employer:</strong> employer@demo.com / password123</div>
                    <div><strong>Admin:</strong> admin@demo.com / admin123</div>
                </div>
            </div>

            <DynamicAuth initialMode="login" />
        </div>
    );
}
