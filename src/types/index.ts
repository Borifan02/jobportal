export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';

export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    type: JobType;
    salary: string;
    postedAt: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
    tags: string[]; // e.g. "Remote", "Junior", "React"
    isRemote?: boolean;
    isVerified?: boolean;
    isFlagged?: boolean;
}

export interface SavedJob extends Job {
    savedAt: string;
}

export interface Application {
    fullName: string;
    email: string;
    phone: string;
    coverLetter: string;
    resume?: File;
}

export interface Experience {
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
}

export interface Education {
    id: string;
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
}

export interface UserProfile {
    bio: string;
    title: string;
    location: string;
    phoneNumber?: string;
    website?: string;
    resumeUrl?: string;
    resumeName?: string;
    skills: string[];
    experience: Experience[];
    education: Education[];
    // Social Media Links
    linkedIn?: string;
    twitter?: string;
    github?: string;
    // Employer-specific fields
    companySize?: string;
    founded?: string;
}

export interface JobApplication {
    id: string;
    jobId: string;
    appliedAt: string;
    status: 'Applied' | 'Screening' | 'Interviewing' | 'Offer' | 'Rejected';
    companyName: string;
    jobTitle: string;
}

export interface CandidateApplication extends JobApplication {
    applicantId: string;
    applicantName: string;
    applicantEmail: string;
    coverLetter?: string;
    resumeUrl?: string;
}

export interface User {
    id: string;
    email: string;
    fullName: string;
    avatarUrl?: string;
    profile: UserProfile;
    applications: JobApplication[];
    savedJobs: string[];
    role: 'candidate' | 'admin' | 'employer'; // Role field
    isVerified?: boolean;
    isFlagged?: boolean;
}
