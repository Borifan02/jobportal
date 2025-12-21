'use client';

import { useState, useRef } from 'react';
import { Upload, FileText, Trash2, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';
import { FadeIn } from '@/components/ui/Motion';

export default function ResumeUpload() {
    const { user, updateProfile } = useAuth();
    const { addNotification } = useNotifications();
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!user) return null;

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileUpload = async (file: File) => {
        // More robust validation
        const validExtensions = ['.pdf', '.doc', '.docx'];
        const fileName = file.name.toLowerCase();
        const isValidExtension = validExtensions.some(ext => fileName.endsWith(ext));

        if (!isValidExtension) {
            addNotification('Invalid File', 'Please upload a PDF or Word document (PDF, DOC, DOCX).', 'error');
            return;
        }

        if (file.size > 1 * 1024 * 1024) {
            addNotification('File too large', 'Resume size must be less than 1MB for local storage.', 'error');
            return;
        }

        setUploading(true);

        try {
            // Convert to Base64 for persistence since we don't have a backend
            const reader = new FileReader();
            const base64Promise = new Promise<string>((resolve) => {
                reader.onerror = () => resolve('');
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(file);
            });

            const base64Content = await base64Promise;

            if (!base64Content) {
                throw new Error('Failed to read file');
            }

            // Simulate slight delay for UX
            await new Promise(resolve => setTimeout(resolve, 800));

            // Update user profile
            try {
                updateProfile({
                    resumeName: file.name,
                    resumeUrl: base64Content
                });
                addNotification('Resume Uploaded', 'Your resume has been successfully saved to your profile.', 'success');
            } catch (authError: any) {
                if (authError.message === 'STORAGE_QUOTA_EXCEEDED') {
                    addNotification('Storage Limit Reached', 'This file is too large for the browser memory. Please try a smaller PDF (under 500KB) or remove your profile photo first.', 'error');
                } else {
                    throw authError; // Re-throw for outer catch
                }
            }
        } catch (error) {
            console.error('Resume upload error:', error);
            addNotification('Upload Failed', 'There was an error processing your file. Try a different format.', 'error');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete your resume?')) {
            updateProfile({
                resumeName: undefined,
                resumeUrl: undefined
            });
            addNotification('Resume Deleted', 'Your resume has been removed.', 'info');
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <FadeIn>
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Resume / CV</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-8">Upload your resume to easily apply for jobs with one click.</p>

                    {user.profile.resumeName ? (
                        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-6 flex items-center justify-between group transition-colors">
                            <div className="flex items-center gap-5">
                                <div className="bg-white dark:bg-slate-800 p-3.5 rounded-xl shadow-sm text-blue-600 dark:text-blue-400 border border-blue-50 dark:border-blue-700/50">
                                    <FileText className="w-9 h-9" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-0.5">{user.profile.resumeName}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-500 flex items-center gap-1.5 font-medium">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        Ready for applications
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <a
                                    href={user.profile.resumeUrl}
                                    download={user.profile.resumeName}
                                    className="p-2.5 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100/50 dark:hover:bg-blue-900/20 rounded-xl transition-all"
                                    title="Download"
                                >
                                    <Upload className="w-5 h-5 rotate-180" />
                                </a>
                                <button
                                    onClick={handleDelete}
                                    className="p-2.5 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                                    title="Delete Resume"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`border-3 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${isDragging
                                ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 scale-[1.01]'
                                : 'border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-slate-50/50 dark:hover:bg-slate-800/30'
                                }`}
                        >
                            <div className="bg-blue-100 dark:bg-blue-900/30 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400 rotate-3 group-hover:rotate-0 transition-transform">
                                {uploading ? (
                                    <Loader2 className="w-10 h-10 animate-spin" />
                                ) : (
                                    <Upload className="w-10 h-10" />
                                )}
                            </div>

                            {uploading ? (
                                <div>
                                    <h3 className="font-extrabold text-slate-900 dark:text-white text-xl mb-2">Uploading...</h3>
                                    <p className="text-slate-500 dark:text-slate-400">Processing your document securely.</p>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="font-extrabold text-slate-900 dark:text-white text-xl mb-2">
                                        Drag & Drop your resume here
                                    </h3>
                                    <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">
                                        Selected files are stored safely in your profile.
                                    </p>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        className="hidden"
                                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                        onChange={handleFileSelect}
                                    />

                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            triggerFileInput();
                                        }}
                                        className="inline-block bg-blue-600 text-white font-bold px-10 py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95"
                                    >
                                        Select File
                                    </button>

                                    <p className="text-slate-400 dark:text-slate-500 text-sm mt-6 flex items-center justify-center gap-2 font-medium">
                                        <AlertCircle className="w-4 h-4" />
                                        PDF, DOC, DOCX up to 2MB
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </FadeIn>
        </div>
    );
}
