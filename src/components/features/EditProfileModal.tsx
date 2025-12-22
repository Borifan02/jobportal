'use client';

import { useState, useEffect } from 'react';
import { UserProfile } from '@/types';
import { X, Loader2, Plus, Trash2, Briefcase, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: UserProfile;
    onSave: (data: UserProfile) => Promise<void>;
    userRole?: string; // Add user role prop
}

export default function EditProfileModal({ isOpen, onClose, initialData, onSave, userRole }: EditProfileModalProps) {
    const [formData, setFormData] = useState<UserProfile>(initialData);
    const [skillsInput, setSkillsInput] = useState(initialData.skills.join(', '));
    const [isLoading, setIsLoading] = useState(false);
    
    const isEmployer = userRole === 'employer' || userRole === 'admin';

    useEffect(() => {
        if (isOpen) {
            setFormData(initialData);
            setSkillsInput(initialData.skills.join(', '));
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const updatedData = {
            ...formData,
            skills: skillsInput.split(',').map(s => s.trim()).filter(Boolean)
        };

        await onSave(updatedData);
        setIsLoading(false);
        onClose();
    };

    const addExperience = () => {
        const newExp = {
            id: Math.random().toString(36).substr(2, 9),
            title: '',
            company: '',
            startDate: '',
            endDate: '',
            current: false,
            description: ''
        };
        setFormData({ ...formData, experience: [...(formData.experience || []), newExp] });
    };

    const removeExperience = (id: string) => {
        setFormData({
            ...formData,
            experience: formData.experience.filter(exp => exp.id !== id)
        });
    };

    const updateExperience = (id: string, updates: any) => {
        setFormData({
            ...formData,
            experience: formData.experience.map(exp => exp.id === id ? { ...exp, ...updates } : exp)
        });
    };

    const addEducation = () => {
        const newEdu = {
            id: Math.random().toString(36).substr(2, 9),
            school: '',
            degree: '',
            field: '',
            startDate: '',
            endDate: ''
        };
        setFormData({ ...formData, education: [...(formData.education || []), newEdu] });
    };

    const removeEducation = (id: string) => {
        setFormData({
            ...formData,
            education: formData.education.filter(edu => edu.id !== id)
        });
    };

    const updateEducation = (id: string, updates: any) => {
        setFormData({
            ...formData,
            education: formData.education.map(edu => edu.id === id ? { ...edu, ...updates } : edu)
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden relative z-10 border border-slate-200 dark:border-slate-800 my-4"
            >
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30 flex-shrink-0">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        {isEmployer ? 'Edit Company Profile' : 'Edit Profile'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                    <div className="p-6 space-y-4 overflow-y-auto flex-1 dark:bg-slate-900">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                {isEmployer ? 'Company Name' : 'Job Title'}
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none transition-all"
                                placeholder={isEmployer ? "e.g. Tech Solutions Inc." : "e.g. Senior Frontend Developer"}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                    {isEmployer ? 'Headquarters' : 'Location'}
                                </label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none transition-all"
                                    placeholder="e.g. New York, NY"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                    {isEmployer ? 'Contact Number' : 'Phone Number'}
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phoneNumber || ''}
                                    onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none transition-all"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                {isEmployer ? 'Company Website' : 'Website/Portfolio'} (Optional)
                            </label>
                            <input
                                type="url"
                                value={formData.website || ''}
                                onChange={e => setFormData({ ...formData, website: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none transition-all"
                                placeholder="https://example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                {isEmployer ? 'Company Description' : 'Bio'}
                            </label>
                            <textarea
                                value={formData.bio}
                                onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none transition-all min-h-[100px]"
                                placeholder={isEmployer ? "Tell us about your company, mission, and values..." : "Tell us about your experience..."}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                {isEmployer ? 'Industry/Specialties' : 'Skills'} (comma separated)
                            </label>
                            <input
                                type="text"
                                value={skillsInput}
                                onChange={e => setSkillsInput(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none transition-all"
                                placeholder={isEmployer ? "Technology, Healthcare, Finance" : "React, TypeScript, Node.js"}
                            />
                        </div>

                        {isEmployer && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Company Size</label>
                                    <select
                                        value={formData.companySize || ''}
                                        onChange={e => setFormData({ ...formData, companySize: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none transition-all"
                                    >
                                        <option value="">Select company size</option>
                                        <option value="1-10">1-10 employees</option>
                                        <option value="11-50">11-50 employees</option>
                                        <option value="51-200">51-200 employees</option>
                                        <option value="201-500">201-500 employees</option>
                                        <option value="501-1000">501-1000 employees</option>
                                        <option value="1000+">1000+ employees</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Founded Year</label>
                                    <input
                                        type="number"
                                        min="1800"
                                        max={new Date().getFullYear()}
                                        value={formData.founded || ''}
                                        onChange={e => setFormData({ ...formData, founded: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none transition-all"
                                        placeholder="e.g. 2010"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Social Media Links */}
                        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                                <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                                {isEmployer ? 'Company Links' : 'Social Media Links'}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider">LinkedIn</label>
                                    <input
                                        type="url"
                                        value={formData.linkedIn || ''}
                                        onChange={e => setFormData({ ...formData, linkedIn: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none transition-all text-sm"
                                        placeholder={isEmployer ? "https://linkedin.com/company/..." : "https://linkedin.com/in/..."}
                                    />
                                </div>
                                {!isEmployer && (
                                    <>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Twitter/X</label>
                                            <input
                                                type="url"
                                                value={formData.twitter || ''}
                                                onChange={e => setFormData({ ...formData, twitter: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none transition-all text-sm"
                                                placeholder="https://twitter.com/..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider">GitHub</label>
                                            <input
                                                type="url"
                                                value={formData.github || ''}
                                                onChange={e => setFormData({ ...formData, github: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none transition-all text-sm"
                                                placeholder="https://github.com/..."
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Experience Section - Only for Job Seekers */}
                        {!isEmployer && (
                            <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            <Briefcase className="w-5 h-5 text-blue-600" />
                                            Work Experience
                                        </h3>
                                        <p className="text-xs text-slate-500 mt-0.5">Add your professional history</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addExperience}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl text-sm font-bold hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all border border-blue-100 dark:border-blue-800/50"
                                    >
                                        <Plus className="w-4 h-4" /> Add
                                    </button>
                                </div>

                            <div className="space-y-6">
                                {(formData.experience || []).map((exp, index) => (
                                    <div key={exp.id} className="relative p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="absolute -top-3 left-6 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-slate-200 dark:border-slate-700">
                                            Position #{index + 1}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeExperience(exp.id)}
                                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                                            title="Remove item"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                                            <div className="md:col-span-2">
                                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1">Job Title</label>
                                                <input
                                                    placeholder="e.g. Senior Software Engineer"
                                                    value={exp.title}
                                                    onChange={e => updateExperience(exp.id, { title: e.target.value })}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1">Company</label>
                                                <input
                                                    placeholder="e.g. Google"
                                                    value={exp.company}
                                                    onChange={e => updateExperience(exp.id, { company: e.target.value })}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 transition-all"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1">Period</label>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="month"
                                                        value={exp.startDate}
                                                        onChange={e => updateExperience(exp.id, { startDate: e.target.value })}
                                                        className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-500"
                                                    />
                                                    <input
                                                        type="month"
                                                        disabled={exp.current}
                                                        value={exp.current ? '' : (exp.endDate || '')}
                                                        onChange={e => updateExperience(exp.id, { endDate: e.target.value })}
                                                        className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-500 disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-slate-900"
                                                    />
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50">
                                                <input
                                                    type="checkbox"
                                                    id={`current-${exp.id}`}
                                                    checked={exp.current}
                                                    onChange={e => updateExperience(exp.id, { current: e.target.checked })}
                                                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <label htmlFor={`current-${exp.id}`} className="text-xs text-slate-600 dark:text-slate-400 font-medium cursor-pointer">I am currently working here</label>
                                            </div>
                                            <div className="md:col-span-2">
                                                <textarea
                                                    placeholder="Description"
                                                    value={exp.description}
                                                    onChange={e => updateExperience(exp.id, { description: e.target.value })}
                                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-500 min-h-[80px]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {(formData.experience || []).length === 0 && (
                                    <div className="text-center py-6 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl">
                                        <p className="text-slate-400 text-xs font-medium italic">No experience added yet</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        )}

                        {/* Education Section - Only for Job Seekers */}
                        {!isEmployer && (
                        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <GraduationCap className="w-4 h-4 text-blue-600" />
                                    Education
                                </h3>
                                <button
                                    type="button"
                                    onClick={addEducation}
                                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                                >
                                    <Plus className="w-3 h-3" /> Add Education
                                </button>
                            </div>
                            <div className="space-y-4">
                                {(formData.education || []).map((edu) => (
                                    <div key={edu.id} className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/20 relative group">
                                        <button
                                            type="button"
                                            onClick={() => removeEducation(edu.id)}
                                            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="md:col-span-2">
                                                <input
                                                    placeholder="School/University"
                                                    value={edu.school}
                                                    onChange={e => updateEducation(edu.id, { school: e.target.value })}
                                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-500"
                                                />
                                            </div>
                                            <input
                                                placeholder="Degree"
                                                value={edu.degree}
                                                onChange={e => updateEducation(edu.id, { degree: e.target.value })}
                                                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-500"
                                            />
                                            <input
                                                placeholder="Field of Study"
                                                value={edu.field}
                                                onChange={e => updateEducation(edu.id, { field: e.target.value })}
                                                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-500"
                                            />
                                            <div className="flex gap-2">
                                                <input
                                                    type="month"
                                                    value={edu.startDate}
                                                    onChange={e => updateEducation(edu.id, { startDate: e.target.value })}
                                                    className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-500"
                                                />
                                                <input
                                                    type="month"
                                                    value={edu.endDate}
                                                    onChange={e => updateEducation(edu.id, { endDate: e.target.value })}
                                                    className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {(formData.education || []).length === 0 && (
                                    <div className="text-center py-6 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl">
                                        <p className="text-slate-400 text-xs font-medium italic">No education added yet</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        )}
                    </div>

                    <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex gap-3 flex-shrink-0 bg-slate-50/50 dark:bg-slate-800/30">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 bg-blue-600 text-white font-bold px-4 py-2.5 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
