'use client';

import { useState, useRef } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfilePhotoUploadProps {
    currentPhoto?: string;
    userName: string;
    onPhotoChange: (photoUrl: string) => void;
}

export default function ProfilePhotoUpload({ currentPhoto, userName, onPhotoChange }: ProfilePhotoUploadProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.onload = () => {
                    // Create a canvas to resize/compress the image
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 400;
                    const MAX_HEIGHT = 400;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);

                    // Convert to webp/jpeg with 0.8 quality to keep size small
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                    setPreview(dataUrl);
                };
                img.src = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        if (preview) {
            onPhotoChange(preview);
            setIsOpen(false);
            setPreview(null);
        }
    };

    const handleCancel = () => {
        setPreview(null);
        setIsOpen(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg border border-slate-100 text-slate-600 hover:text-blue-600 hover:scale-110 transition-all"
                title="Change profile photo"
            >
                <Camera className="w-4 h-4" />
            </button>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCancel}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 z-10"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-slate-900">Update Profile Photo</h2>
                                <button
                                    onClick={handleCancel}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-slate-400" />
                                </button>
                            </div>

                            {/* Photo Preview */}
                            <div className="mb-6">
                                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-slate-100 shadow-lg bg-slate-50">
                                    <img
                                        src={preview || currentPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&size=200`}
                                        alt="Profile preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Upload Area */}
                            <div className="mb-6">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                    id="photo-upload"
                                />
                                <label
                                    htmlFor="photo-upload"
                                    className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-500 hover:bg-blue-50/50 cursor-pointer transition-colors"
                                >
                                    <Upload className="w-10 h-10 text-slate-400 mb-3" />
                                    <p className="text-sm font-medium text-slate-700 mb-1">
                                        Click to upload new photo
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        JPG, PNG or GIF (Max 5MB)
                                    </p>
                                </label>
                            </div>

                            {/* Note */}
                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                                <p className="text-xs text-blue-800">
                                    <strong>Note:</strong> Without a backend, the photo will only be stored in your browser.
                                    It won't sync across devices and will be lost if you clear browser data.
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                                <button
                                    onClick={handleCancel}
                                    className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={!preview}
                                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Save Photo
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
