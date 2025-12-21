import Link from 'next/link';

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    readTime: string;
}

const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "10 Tips for Writing a Standout Resume in 2025",
        excerpt: "Learn the latest strategies for creating a resume that catches recruiters' attention and gets you more interviews.",
        date: "December 10, 2025",
        category: "Resume Tips",
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "How to Ace Your Virtual Job Interview",
        excerpt: "Master the art of video interviews with these proven techniques for making a great impression remotely.",
        date: "December 5, 2025",
        category: "Interview Guide",
        readTime: "7 min read"
    },
    {
        id: 3,
        title: "The Ultimate Guide to Career Transitions",
        excerpt: "Thinking about switching careers? Here's everything you need to know to make a successful transition.",
        date: "November 28, 2025",
        category: "Career Advice",
        readTime: "10 min read"
    },
    {
        id: 4,
        title: "Networking Strategies That Actually Work",
        excerpt: "Build meaningful professional connections with these effective networking strategies and tips.",
        date: "November 20, 2025",
        category: "Career Development",
        readTime: "6 min read"
    },
    {
        id: 5,
        title: "Understanding Job Benefits: What to Look For",
        excerpt: "Beyond salary—learn what benefits package components matter most and how to evaluate them.",
        date: "November 15, 2025",
        category: "Job Search",
        readTime: "8 min read"
    },
    {
        id: 6,
        title: "LinkedIn Profile Optimization Guide",
        excerpt: "Transform your LinkedIn profile into a powerful job search tool with these optimization strategies.",
        date: "November 8, 2025",
        category: "Personal Branding",
        readTime: "6 min read"
    }
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Career Blog</h1>
                    <p className="text-xl text-gray-600">
                        Expert advice, tips, and insights to help you succeed in your career
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <article
                            key={post.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                        {post.category}
                                    </span>
                                    <span className="text-sm text-gray-500">{post.readTime}</span>
                                </div>

                                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                    {post.title}
                                </h2>

                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">{post.date}</span>
                                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                                        Read More →
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">More articles coming soon!</p>
                    <Link
                        href="/"
                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
