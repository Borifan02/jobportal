// Demo users for testing
const demoUsers = [
    {
        id: 'demo_candidate_1',
        email: 'candidate@demo.com',
        fullName: 'John Candidate',
        password: 'password123',
        role: 'candidate',
        avatarUrl: 'https://ui-avatars.com/api/?name=John+Candidate&background=0D8ABC&color=fff',
        profile: {
            title: 'Senior Frontend Developer',
            location: 'San Francisco, CA',
            phoneNumber: '+1 (555) 123-4567',
            bio: 'Passionate frontend developer with 5+ years of experience in React and Next.js.',
            skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
            experience: [
                {
                    id: 'e1',
                    title: 'Senior Frontend Engineer',
                    company: 'TechCorp Inc.',
                    startDate: '2022-01',
                    current: true,
                    description: 'Leading the frontend team in rebuilding the core product dashboard.'
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
        savedJobs: []
    },
    {
        id: 'demo_employer_1',
        email: 'employer@demo.com',
        fullName: 'Sarah Employer',
        password: 'password123',
        role: 'employer',
        avatarUrl: 'https://ui-avatars.com/api/?name=Sarah+Employer&background=DC2626&color=fff',
        profile: {
            title: 'TechCorp Solutions',
            location: 'New York, NY',
            phoneNumber: '+1 (555) 987-6543',
            bio: 'Leading technology company specializing in innovative software solutions.',
            skills: ['Technology', 'Software Development', 'Innovation'],
            companySize: '201-500',
            founded: '2015',
            experience: [],
            education: []
        },
        applications: [],
        savedJobs: []
    },
    {
        id: 'demo_admin_1',
        email: 'admin@demo.com',
        fullName: 'Admin User',
        password: 'admin123',
        role: 'admin',
        avatarUrl: 'https://ui-avatars.com/api/?name=Admin+User&background=059669&color=fff',
        profile: {
            title: 'System Administrator',
            location: 'Remote',
            phoneNumber: '+1 (555) 000-0000',
            bio: 'JobPortal system administrator.',
            skills: ['Administration', 'Management'],
            experience: [],
            education: []
        },
        applications: [],
        savedJobs: []
    }
];

// Function to setup demo users
function setupDemoUsers() {
    const existingUsers = localStorage.getItem('jobportal_all_users');
    if (!existingUsers) {
        localStorage.setItem('jobportal_all_users', JSON.stringify(demoUsers));
        console.log('Demo users created successfully!');
        console.log('Available demo accounts:');
        console.log('- Candidate: candidate@demo.com / password123');
        console.log('- Employer: employer@demo.com / password123');
        console.log('- Admin: admin@demo.com / admin123');
    } else {
        console.log('Demo users already exist');
    }
}

// Auto-setup on page load
if (typeof window !== 'undefined') {
    setupDemoUsers();
}

export { setupDemoUsers, demoUsers };