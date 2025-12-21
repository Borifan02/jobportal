'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserProfile, JobApplication } from '@/types';

const API_URL = 'http://localhost:5000/api';

// Mock initial user data
const MOCK_USER: User = {
    id: 'u1',
    email: 'john.doe@example.com',
    fullName: 'John Doe',
    avatarUrl: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
    profile: {
        title: 'Senior Frontend Developer',
        location: 'San Francisco, CA',
        bio: 'Passionate frontend developer with 5+ years of experience in React and Next.js.',
        skills: ['React', 'Next.js', 'Typescript', 'Tailwind CSS', 'Node.js'],
        experience: [
            {
                id: 'e1',
                title: 'Senior Frontend Engineer',
                company: 'TechCorp Inc.',
                startDate: '2022-01',
                current: true,
                description: 'Leading the frontend team in rebuilding the core product dashboard.'
            },
            {
                id: 'e2',
                title: 'Frontend Developer',
                company: 'WebSolutions',
                startDate: '2019-06',
                endDate: '2021-12',
                current: false,
                description: 'Developed responsive web applications for various clients.'
            }
        ],
        education: [
            {
                id: 'edu1',
                school: 'University of Technology',
                degree: 'Bachelor of Science',
                field: 'Computer Science',
                startDate: '2015',
                endDate: '2019'
            }
        ]
    },
    applications: [],
    savedJobs: [],
    role: 'candidate', // Default role
};

// Admin email list - users with these emails get admin role
const ADMIN_EMAILS = ['admin@jobportal.com', 'admin@example.com'];

interface AuthContextType {
    user: User | null;
    allUsers: User[]; // Add this
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password?: string) => Promise<void>;
    register: (name: string, email: string, password?: string, location?: string, phoneNumber?: string, role?: 'candidate' | 'employer') => Promise<void>;
    logout: () => void;
    updateProfile: (profile: Partial<UserProfile>) => void;
    updateAvatar: (avatarUrl: string) => void;
    submitApplication: (jobId: string, jobTitle: string, companyName: string) => Promise<void>;
    // Saved Jobs persisted in user profile
    toggleSaveJob: (jobId: string) => void;
    updatePassword: (current: string, next: string) => Promise<void>;
    updateOwnRole: (role: 'candidate' | 'employer') => Promise<void>;
    socialLogin: (provider: 'google' | 'github', userData: { email: string, fullName: string, role: 'candidate' | 'employer', avatarUrl?: string }) => Promise<void>;
    // Admin Only
    deleteUser: (userId: string) => void;
    updateUserRole: (userId: string, role: User['role']) => void;
    toggleUserVerification: (userId: string) => void;
    toggleUserFlag: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [allUsers, setAllUsers] = useState<User[]>([]);

    // Helper to get local "users database"
    const getLocalUsers = (): (User & { password?: string })[] => {
        const stored = localStorage.getItem('jobportal_all_users');
        return stored ? JSON.parse(stored) : [];
    };

    // Helper to save local "users database"
    const saveLocalUsers = (users: (User & { password?: string })[]) => {
        localStorage.setItem('jobportal_all_users', JSON.stringify(users));
        setAllUsers(users.map(({ password, ...user }) => user as User));
    };

    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('jobportal_token');
            if (token) {
                try {
                    const res = await fetch(`${API_URL}/auth/profile`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    // Check if response is JSON
                    const contentType = res.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        if (res.ok) {
                            const data = await res.json();
                            setUser(data);
                        } else {
                            localStorage.removeItem('jobportal_token');
                        }
                    } else {
                        // Non-JSON response, likely server error
                        console.error('Non-JSON response from profile endpoint');
                        localStorage.removeItem('jobportal_token');
                    }
                } catch (error) {
                    console.error('Check Profile Error:', error);
                    localStorage.removeItem('jobportal_token');
                }
            }
            setIsLoading(false);
        };

        checkLoggedIn();

        // Admin Only: Fetch all users if admin
        const fetchAllUsers = async () => {
            const token = localStorage.getItem('jobportal_token');
            if (token) {
                try {
                    const res = await fetch(`${API_URL}/users`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setAllUsers(data);
                    }
                } catch (error) {
                    console.error('Fetch Users Error:', error);
                }
            }
        };

        if (user?.role === 'admin') {
            fetchAllUsers();
        }
    }, [user?.role]);

    const login = async (email: string, password?: string) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            // Check if response is JSON
            const contentType = res.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await res.text();
                console.error('Non-JSON response:', text.substring(0, 200));
                throw new Error('Server returned non-JSON response. Please check if the backend server is running.');
            }

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('jobportal_token', data.token);
            setUser(data);
        } catch (error: any) {
            console.error('Login Error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (name: string, email: string, password?: string, location?: string, phoneNumber?: string, selectedRole: 'candidate' | 'employer' = 'candidate') => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: name,
                    email,
                    password,
                    location,
                    phoneNumber,
                    role: selectedRole
                })
            });

            // Check if response is JSON
            const contentType = res.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await res.text();
                console.error('Non-JSON response:', text.substring(0, 200));
                throw new Error('Server returned non-JSON response. Please check if the backend server is running.');
            }

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            localStorage.setItem('jobportal_token', data.token);
            setUser(data);
        } catch (error: any) {
            console.error('Registration Error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('jobportal_token');
    };

    const updateProfile = async (updates: Partial<UserProfile>) => {
        if (!user) return;

        const token = localStorage.getItem('jobportal_token');
        if (!token) return;

        try {
            const res = await fetch(`${API_URL}/auth/profile`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ profile: updates })
            });

            if (res.ok) {
                const updatedUser = await res.json();
                setUser(updatedUser);
            } else {
                const data = await res.json();
                throw new Error(data.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Update Profile Error:', error);
            throw error;
        }
    };

    const updateAvatar = async (avatarUrl: string) => {
        if (!user) return;

        const token = localStorage.getItem('jobportal_token');
        if (!token) return;

        try {
            const res = await fetch(`${API_URL}/auth/profile`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ avatarUrl })
            });

            if (res.ok) {
                const updatedUser = await res.json();
                setUser(updatedUser);
            }
        } catch (error) {
            console.error('Update Avatar Error:', error);
        }
    };

    const updateOwnRole = async (role: 'candidate' | 'employer') => {
        const token = localStorage.getItem('jobportal_token');
        if (!token) {
            throw new Error('You must be logged in to update your role');
        }

        try {
            const res = await fetch(`${API_URL}/users/me/role`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ role })
            });

            if (res.ok) {
                const updatedUser = await res.json();
                setUser({
                    ...user!,
                    role: updatedUser.role
                });
            } else {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to update role');
            }
        } catch (error: any) {
            console.error('Update Role Error:', error);
            throw error;
        }
    };

    // Admin Only Methods
    const deleteUser = (userId: string) => {
        if (user?.role !== 'admin') return;
        const users = getLocalUsers().filter(u => u.id !== userId);
        saveLocalUsers(users);
    };

    const updateUserRole = (userId: string, role: User['role']) => {
        if (user?.role !== 'admin') return;
        const users = getLocalUsers();
        const index = users.findIndex(u => u.id === userId);
        if (index !== -1) {
            users[index].role = role;
            saveLocalUsers(users);
        }
    };

    const toggleUserVerification = (userId: string) => {
        if (user?.role !== 'admin') return;
        const users = getLocalUsers();
        const index = users.findIndex(u => u.id === userId);
        if (index !== -1) {
            users[index].isVerified = !users[index].isVerified;
            saveLocalUsers(users);
        }
    };

    const toggleUserFlag = (userId: string) => {
        if (user?.role !== 'admin') return;
        const users = getLocalUsers();
        const index = users.findIndex(u => u.id === userId);
        if (index !== -1) {
            users[index].isFlagged = !users[index].isFlagged;
            saveLocalUsers(users);
        }
    };

    const updateUserInList = (updatedUser: User) => {
        const users = getLocalUsers();
        const index = users.findIndex(u => u.id === updatedUser.id);

        if (index !== -1) {
            const password = users[index].password;
            users[index] = { ...updatedUser, password };
        } else {
            users.push(updatedUser);
        }
        saveLocalUsers(users);
    };

    const submitApplication = async (jobId: string, jobTitle: string, companyName: string) => {
        if (!user) return;

        await new Promise(resolve => setTimeout(resolve, 1000));

        const newApplication: JobApplication = {
            id: Math.random().toString(36).substr(2, 9),
            jobId,
            jobTitle,
            companyName,
            appliedAt: new Date().toLocaleDateString(),
            status: 'Applied'
        };

        const updatedUser = {
            ...user,
            applications: [...(user.applications || []), newApplication]
        };

        updateUserInList(updatedUser);
        setUser(updatedUser);
        localStorage.setItem('jobportal_user', JSON.stringify(updatedUser));
    };

    const toggleSaveJob = (jobId: string) => {
        if (!user) return;

        const currentSaved = user.savedJobs || [];
        const isSaved = currentSaved.includes(jobId);

        let newSaved;
        if (isSaved) {
            newSaved = currentSaved.filter(id => id !== jobId);
        } else {
            newSaved = [...currentSaved, jobId];
        }

        const updatedUser = {
            ...user,
            savedJobs: newSaved
        };

        updateUserInList(updatedUser);
        setUser(updatedUser);
        localStorage.setItem('jobportal_user', JSON.stringify(updatedUser));
    };

    const updatePassword = async (currentPassword: string, newPassword: string) => {
        if (!user) return;

        await new Promise(resolve => setTimeout(resolve, 800));

        const users = getLocalUsers();
        const index = users.findIndex(u => u.id === user.id);

        if (index === -1) throw new Error('User not found');

        const storedPassword = users[index].password;
        if (storedPassword && storedPassword !== currentPassword) {
            throw new Error('Current password is incorrect');
        }

        users[index].password = newPassword;
        saveLocalUsers(users);
    };

    const socialLogin = async (provider: 'google' | 'github', userData: { email: string, fullName: string, role: 'candidate' | 'employer', avatarUrl?: string }) => {
        setIsLoading(true);
        // Simulate OAuth redirect and callback delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const users = getLocalUsers();
        let foundUser = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());

        if (!foundUser) {
            // Auto-register social user with provided data
            foundUser = {
                id: `${provider}-${Date.now()}`,
                email: userData.email,
                fullName: userData.fullName,
                avatarUrl: userData.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.fullName)}&background=random`,
                role: userData.role,
                profile: {
                    title: userData.role === 'employer' ? 'Hiring Manager' : 'Job Seeker',
                    location: 'Remote',
                    bio: `Signed in via ${provider}`,
                    skills: [],
                    experience: [],
                    education: [],
                },
                applications: [],
                savedJobs: [],
            } as User;
            users.push(foundUser);
            saveLocalUsers(users);
        } else {
            // If user exists, we might want to ensure the session reflects their stored role
            // but for a mock, we'll just log them in.
        }

        setUser(foundUser);
        localStorage.setItem('jobportal_user', JSON.stringify(foundUser));

        // Ensure shared persistence
        updateUserInList(foundUser);

        setIsLoading(false);
    };

    return (
        <AuthContext.Provider value={{
            user,
            allUsers,
            isAuthenticated: !!user,
            isLoading,
            login,
            register,
            logout,
            updateProfile,
            updateAvatar,
            submitApplication,
            toggleSaveJob,
            updatePassword,
            updateOwnRole,
            socialLogin,
            deleteUser,
            updateUserRole,
            toggleUserVerification,
            toggleUserFlag
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
