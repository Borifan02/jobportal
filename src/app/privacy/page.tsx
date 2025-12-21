import { Shield, Eye, Lock, Database, Cookie, UserX } from 'lucide-react';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Shield className="w-6 h-6 text-blue-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-slate-900">Privacy Policy</h1>
                    </div>
                    <p className="text-slate-600">
                        Last updated: December 16, 2024
                    </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-8">
                    {/* Introduction */}
                    <section>
                        <p className="text-slate-600 leading-relaxed">
                            At JobPortal, we take your privacy seriously. This Privacy Policy explains how we collect,
                            use, disclose, and safeguard your information when you visit our website and use our services.
                        </p>
                    </section>

                    {/* Information We Collect */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Database className="w-5 h-5 text-blue-600" />
                            <h2 className="text-2xl font-bold text-slate-900">Information We Collect</h2>
                        </div>
                        <div className="space-y-4 text-slate-600">
                            <div>
                                <h3 className="font-bold text-slate-900 mb-2">Personal Information</h3>
                                <p>When you register for an account, we may collect:</p>
                                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                                    <li>Name and email address</li>
                                    <li>Professional information (job title, experience, education)</li>
                                    <li>Resume and cover letter</li>
                                    <li>Profile photo</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-2">Usage Data</h3>
                                <p>We automatically collect certain information when you visit our site:</p>
                                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                                    <li>IP address and browser type</li>
                                    <li>Pages viewed and time spent</li>
                                    <li>Referring website addresses</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* How We Use Your Information */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Eye className="w-5 h-5 text-blue-600" />
                            <h2 className="text-2xl font-bold text-slate-900">How We Use Your Information</h2>
                        </div>
                        <ul className="space-y-2 text-slate-600 ml-6 list-disc">
                            <li>To provide and maintain our services</li>
                            <li>To match you with relevant job opportunities</li>
                            <li>To communicate with you about your account and applications</li>
                            <li>To improve our platform and user experience</li>
                            <li>To comply with legal obligations</li>
                        </ul>
                    </section>

                    {/* Data Security */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="w-5 h-5 text-blue-600" />
                            <h2 className="text-2xl font-bold text-slate-900">Data Security</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            We implement appropriate technical and organizational security measures to protect your
                            personal information. However, no method of transmission over the Internet is 100% secure,
                            and we cannot guarantee absolute security.
                        </p>
                    </section>

                    {/* Cookies */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Cookie className="w-5 h-5 text-blue-600" />
                            <h2 className="text-2xl font-bold text-slate-900">Cookies and Tracking</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            We use cookies and similar tracking technologies to track activity on our service and
                            store certain information. You can instruct your browser to refuse all cookies or to
                            indicate when a cookie is being sent.
                        </p>
                    </section>

                    {/* Your Rights */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <UserX className="w-5 h-5 text-blue-600" />
                            <h2 className="text-2xl font-bold text-slate-900">Your Rights</h2>
                        </div>
                        <div className="space-y-2 text-slate-600">
                            <p>You have the right to:</p>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                                <li>Access and receive a copy of your personal data</li>
                                <li>Rectify inaccurate personal data</li>
                                <li>Request deletion of your personal data</li>
                                <li>Object to processing of your personal data</li>
                                <li>Request restriction of processing your personal data</li>
                                <li>Data portability</li>
                            </ul>
                        </div>
                    </section>

                    {/* Contact */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
                        <p className="text-slate-600 leading-relaxed">
                            If you have any questions about this Privacy Policy, please contact us at{' '}
                            <a href="mailto:privacy@jobportal.com" className="text-blue-600 hover:text-blue-700 font-medium">
                                privacy@jobportal.com
                            </a>
                        </p>
                    </section>

                    {/* Note */}
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                        <p className="text-sm text-blue-800">
                            <strong>Demo Notice:</strong> This is a demonstration website. In a production environment,
                            this Privacy Policy would be reviewed by legal experts and tailored to your specific
                            jurisdiction and business practices.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
