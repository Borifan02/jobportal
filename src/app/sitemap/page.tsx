import Link from 'next/link';

interface SitemapSection {
    title: string;
    links: { label: string; href: string }[];
}

const sitemapSections: SitemapSection[] = [
    {
        title: "Main Pages",
        links: [
            { label: "Home", href: "/" },
            { label: "Browse Jobs", href: "/jobs" },
            { label: "About Us", href: "/about" },
            { label: "Contact", href: "/contact" },
        ]
    },
    {
        title: "User Account",
        links: [
            { label: "Login", href: "/login" },
            { label: "Sign Up", href: "/signup" },
            { label: "Profile", href: "/profile" },
            { label: "My Applications", href: "/profile#applications" },
        ]
    },
    {
        title: "Information",
        links: [
            { label: "FAQ", href: "/faq" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Cookie Policy", href: "/cookies" },
        ]
    },
    {
        title: "Resources",
        links: [
            { label: "Career Advice", href: "/blog" },
            { label: "Resume Tips", href: "/resources/resume" },
            { label: "Interview Guide", href: "/resources/interview" },
        ]
    }
];

export default function SitemapPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Sitemap</h1>
                    <p className="text-gray-600 mb-8">
                        Navigate through all the pages available on our job portal
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {sitemapSections.map((section, index) => (
                            <div key={index} className="space-y-4">
                                <h2 className="text-xl font-semibold text-gray-900 border-b-2 border-blue-600 pb-2">
                                    {section.title}
                                </h2>
                                <ul className="space-y-2">
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <Link
                                                href={link.href}
                                                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            Need Help Finding Something?
                        </h2>
                        <p className="text-gray-700 mb-4">
                            If you can't find what you're looking for, try using our search feature or contact our support team.
                        </p>
                        <Link
                            href="/contact"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Contact Support →
                        </Link>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <Link
                            href="/"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
