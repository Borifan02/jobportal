import Link from 'next/link';

export default function CookiesPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Cookie Policy</h1>

                    <p className="text-gray-600 mb-4">
                        Last updated: December 16, 2025
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">What Are Cookies</h2>
                        <p className="text-gray-700 mb-4">
                            Cookies are small text files that are placed on your computer or mobile device when you visit our website.
                            They are widely used to make websites work more efficiently and provide information to the site owners.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Cookies</h2>
                        <p className="text-gray-700 mb-4">
                            We use cookies for the following purposes:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Authentication - to keep you logged in during your session</li>
                            <li>Preferences - to remember your settings and preferences</li>
                            <li>Security - to protect your account and detect fraudulent activity</li>
                            <li>Analytics - to understand how visitors use our website</li>
                            <li>Performance - to improve the speed and functionality of our site</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Types of Cookies We Use</h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Essential Cookies</h3>
                                <p className="text-gray-700">
                                    These cookies are necessary for the website to function properly. They enable basic functions
                                    like page navigation and access to secure areas of the website.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Functional Cookies</h3>
                                <p className="text-gray-700">
                                    These cookies enable enhanced functionality and personalization, such as remembering your
                                    preferences and choices.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Analytics Cookies</h3>
                                <p className="text-gray-700">
                                    These cookies help us understand how visitors interact with our website by collecting and
                                    reporting information anonymously.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Managing Cookies</h2>
                        <p className="text-gray-700 mb-4">
                            You can control and manage cookies in your browser settings. Please note that removing or blocking
                            cookies may impact your user experience and some features may no longer be fully functional.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                        <p className="text-gray-700">
                            If you have any questions about our use of cookies, please contact us at{' '}
                            <Link href="/contact" className="text-blue-600 hover:underline">
                                our contact page
                            </Link>.
                        </p>
                    </section>

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
