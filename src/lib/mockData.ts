import { Job } from '@/types';

export const JOBS: Job[] = [
    {
        id: '1',
        title: 'Senior Frontend Engineer',
        company: 'TechFlow',
        location: 'San Francisco, CA',
        type: 'Full-time',
        salary: '$140k - $180k',
        postedAt: '2 days ago',
        description: 'We are looking for an experienced Frontend Engineer to lead our core product team. You will be working with React, Next.js, and TypeScript to build scalable and performant user interfaces.',
        requirements: [
            '5+ years of experience with React and modern JavaScript',
            'Strong understanding of web performance and accessibility',
            'Experience with state management (Redux, Zustand, or Context)',
            'Familiarity with server-side rendering (Next.js)'
        ],
        responsibilities: [
            'Architect and build reusable UI components',
            'Collaborate with designers to implement high-fidelity mockups',
            'Mentor junior engineers and conduct code reviews',
            'Optimize application for maximum speed and scalability'
        ],
        tags: ['React', 'TypeScript', 'Frontend', 'Senior'],
        isRemote: true
    },
    {
        id: '2',
        title: 'Product Designer',
        company: 'Creative Studio',
        location: 'New York, NY',
        type: 'Full-time',
        salary: '$110k - $150k',
        postedAt: '4 hours ago',
        description: 'Join our award-winning design team. We need someone who breathes UX/UI and cares deeply about crafting beautiful user experiences.',
        requirements: [
            'Portfolio demonstrating strong visual design skills',
            'Proficiency in Figma and prototyping tools',
            'Understanding of HTML/CSS is a plus',
            'Ability to communicate design decisions clearly'
        ],
        responsibilities: [
            'Create user flows, wireframes, and prototypes',
            'Conduct user research and usability testing',
            'Work closely with engineers to ensure design fidelity',
            'Maintain and evolve our design system'
        ],
        tags: ['Design', 'Figma', 'UX/UI', 'Creative'],
        isRemote: false
    },
    {
        id: '3',
        title: 'Backend Developer (Go)',
        company: 'StreamLine',
        location: 'Austin, TX',
        type: 'Contract',
        salary: '$80/hr',
        postedAt: '1 week ago',
        description: 'We are scaling our real-time data processing pipeline. Looking for a Go expert to help us optimize throughput and reliability.',
        requirements: [
            '3+ years experience with Go (Golang)',
            'Experience with distributed systems and microservices',
            'Knowledge of Kafka or NATS',
            'Familiarity with Docker and Kubernetes'
        ],
        responsibilities: [
            'Design and implement high-performance APIs',
            'Optimize database queries and data models',
            'Troubleshoot production issues in a distributed environment',
            'Write comprehensive unit and integration tests'
        ],
        tags: ['Go', 'Backend', 'Microservices', 'Contract'],
        isRemote: true
    },
    {
        id: '4',
        title: 'Marketing Manager',
        company: 'GrowthHackers',
        location: 'Chicago, IL',
        type: 'Part-time',
        salary: '$40k - $60k',
        postedAt: '3 days ago',
        description: 'Looking for a data-driven marketer to manage our paid acquisition channels.',
        requirements: [
            'Proven track record in managing ad spend >$50k/mo',
            'Expertise in Google Ads and Facebook Ads',
            'Strong analytical skills (GA4, Mixpanel)',
            'Excellent copywriting skills'
        ],
        responsibilities: [
            'Plan and execute paid marketing campaigns',
            'Analyze campaign performance and optimize ROI',
            'Collaborate with content team for ad creatives',
            'Report weekly metrics to leadership'
        ],
        tags: ['Marketing', 'Ads', 'Growth', 'Part-time'],
        isRemote: true
    },
    {
        id: '5',
        title: 'Junior React Developer',
        company: 'StartUp Inc',
        location: 'Remote',
        type: 'Full-time',
        salary: '$70k - $90k',
        postedAt: 'Just now',
        description: 'Great opportunity for a junior developer to learn from the best. You will work on our customer-facing dashboard.',
        requirements: [
            '1+ years experience (or strong portfolio) with React',
            'Basic understanding of Git and version control',
            'Willingness to learn and ask questions',
            'CSS/Tailwind knowledge'
        ],
        responsibilities: [
            'Fix bugs and implement small features',
            'Participate in daily standups',
            'Write clean and documented code',
            'Assist in testing and QA'
        ],
        tags: ['React', 'Junior', 'Entry Level', 'Remote'],
        isRemote: true
    }
];

export const getJobs = async (): Promise<Job[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return JOBS;
};

export const getJobById = async (id: string): Promise<Job | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return JOBS.find(job => job.id === id);
};
