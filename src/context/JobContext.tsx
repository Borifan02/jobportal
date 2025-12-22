'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Job, CandidateApplication } from '@/types';
import { useNotifications } from './NotificationContext';

const API_URL = '/api';

interface JobContextType {
    jobs: Job[];
    addJob: (job: Omit<Job, 'id' | 'postedAt'>) => void;
    deleteJob: (id: string) => void;

    // Application Management
    applications: CandidateApplication[];
    submitApplication: (app: Omit<CandidateApplication, 'id' | 'appliedAt' | 'status'>) => void;
    updateApplicationStatus: (appId: string, status: CandidateApplication['status']) => void;

    toggleJobVerification: (jobId: string) => void;
    toggleJobFlag: (jobId: string) => void;

    isLoading: boolean;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobProvider({ children }: { children: React.ReactNode }) {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [applications, setApplications] = useState<CandidateApplication[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { addNotification } = useNotifications(); // Use hook

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch(`${API_URL}/jobs`);
                
                // Check if response is JSON
                const contentType = res.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    const text = await res.text();
                    console.error('Non-JSON response:', text.substring(0, 200));
                    throw new Error('Server returned non-JSON response');
                }
                
                const data = await res.json();
                if (res.ok) {
                    // Transform backend jobs: map _id to id and handle other transformations
                    const transformedJobs = data.map((job: any) => ({
                        ...job,
                        id: job._id || job.id,
                        postedAt: job.postedAt || new Date().toISOString(),
                        requirements: job.requirements || [],
                        responsibilities: job.responsibilities || [],
                        tags: job.tags || []
                    }));
                    setJobs(transformedJobs);
                }
            } catch (error) {
                console.error('Fetch Jobs Error:', error);
                // Set empty array on error to prevent crashes
                setJobs([]);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchApplications = async () => {
            const token = localStorage.getItem('jobportal_token');
            if (token) {
                try {
                    // Try candidate endpoint first
                    const res = await fetch(`${API_URL}/applications/my`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    // Check if response is JSON
                    const contentType = res.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        if (res.ok) {
                            const data = await res.json();
                            setApplications(data);
                        }
                    } else {
                        console.error('Non-JSON response from applications endpoint');
                    }
                } catch (error) {
                    console.error('Fetch Apps Error:', error);
                }
            }
        };

        fetchJobs();
        fetchApplications();
    }, []);

    const addJob = async (jobData: Omit<Job, 'id' | 'postedAt'>) => {
        const token = localStorage.getItem('jobportal_token');
        if (!token) {
            addNotification('Error', 'You must be logged in to post a job', 'error');
            return;
        }

        try {
            const res = await fetch(`${API_URL}/jobs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(jobData)
            });

            // Check if response is JSON
            const contentType = res.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await res.text();
                console.error('Non-JSON response:', text.substring(0, 200));
                throw new Error('Server returned non-JSON response. Please check if the backend server is running.');
            }

            if (res.ok) {
                const newJob = await res.json();
                // Transform backend job: map _id to id
                const transformedJob = {
                    ...newJob,
                    id: newJob._id || newJob.id,
                    postedAt: newJob.postedAt || new Date().toISOString(),
                    requirements: newJob.requirements || [],
                    responsibilities: newJob.responsibilities || [],
                    tags: newJob.tags || []
                };
                setJobs(prev => [transformedJob, ...prev]);
                addNotification('Success', 'Job posted successfully!', 'info');
            } else {
                const errorData = await res.json();
                let errorMessage = errorData.message || 'Failed to post job. Please try again.';
                
                // Provide helpful message for employer role error
                if (errorMessage.includes('Not authorized as an employer')) {
                    errorMessage = 'You need an employer account to post jobs. Please update your account role or register with the employer role.';
                }
                
                addNotification('Error', errorMessage, 'error');
                console.error('Add Job Error:', errorMessage);
                throw new Error(errorMessage);
            }
        } catch (error: any) {
            const errorMessage = error.message || 'Failed to post job. Please check your connection and try again.';
            addNotification('Error', errorMessage, 'error');
            console.error('Add Job Error:', error);
            throw error;
        }
    };

    const deleteJob = (jobId: string) => {
        setJobs(prev => {
            const updated = prev.filter(job => job.id !== jobId);
            localStorage.setItem('jobportal_all_jobs', JSON.stringify(updated));
            return updated;
        });
    };

    const submitApplication = async (appData: Omit<CandidateApplication, 'id' | 'appliedAt' | 'status'>) => {
        const token = localStorage.getItem('jobportal_token');
        if (!token) return;

        try {
            const res = await fetch(`${API_URL}/applications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    jobId: appData.jobId,
                    coverLetter: appData.coverLetter,
                    resumeUrl: appData.resumeUrl || ''
                })
            });

            if (res.ok) {
                const newApp = await res.json();
                setApplications(prev => [newApp, ...prev]);
                addNotification('Application Sent', 'Your application has been submitted successfully!', 'info');
            } else {
                const data = await res.json();
                throw new Error(data.message || 'Failed to submit application');
            }
        } catch (error: any) {
            console.error('Submit App Error:', error);
            throw error;
        }
    };

    const updateApplicationStatus = (appId: string, status: CandidateApplication['status']) => {
        setApplications(prev => {
            const updated = prev.map(app =>
                app.id === appId ? { ...app, status } : app
            );

            // Find the app to notify
            const app = prev.find(a => a.id === appId);
            if (app) {
                addNotification(
                    'Application Update',
                    `Your application for ${app.jobTitle} at ${app.companyName} has been moved to ${status}.`,
                    'info'
                );
            }

            localStorage.setItem('jobportal_applications', JSON.stringify(updated));
            return updated;
        });
    };

    const toggleJobVerification = (jobId: string) => {
        setJobs(prev => {
            const updated = prev.map(job =>
                job.id === jobId ? { ...job, isVerified: !job.isVerified } : job
            );
            localStorage.setItem('jobportal_all_jobs', JSON.stringify(updated));
            return updated;
        });
    };

    const toggleJobFlag = (jobId: string) => {
        setJobs(prev => {
            const updated = prev.map(job =>
                job.id === jobId ? { ...job, isFlagged: !job.isFlagged } : job
            );
            localStorage.setItem('jobportal_all_jobs', JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <JobContext.Provider value={{
            jobs,
            addJob,
            deleteJob,
            applications,
            submitApplication,
            updateApplicationStatus,
            toggleJobVerification,
            toggleJobFlag,
            isLoading
        }}>
            {children}
        </JobContext.Provider>
    );
}

export function useJobs() {
    const context = useContext(JobContext);
    if (context === undefined) {
        throw new Error('useJobs must be used within a JobProvider');
    }
    return context;
}
