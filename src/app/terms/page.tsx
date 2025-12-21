import { FileText, CheckCircle, XCircle, AlertTriangle, Scale } from 'lucide-react';

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                            <FileText className="w-6 h-6 text-purple-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-slate-900">Terms of Service</h1>
                    </div>
                    <p className="text-slate-600">
                        Last updated: December 16, 2024
                    </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-8">
                    {/* Agreement */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Agreement to Terms</h2>
                        <p className="text-slate-600 leading-relaxed">
                            By accessing and using JobPortal, you accept and agree to be bound by the terms and
                            provision of this agreement. If you do not agree to these Terms of Service, please do
                            not use our services.
                        </p>
                    </section>

                    {/* User Accounts */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <h2 className="text-2xl font-bold text-slate-900">User Accounts</h2>
                        </div>
                        <div className="space-y-3 text-slate-600">
                            <p><strong>Account Registration:</strong> You may be required to register for an account to access certain features. You must:</p>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                                <li>Provide accurate and complete information</li>
                                <li>Maintain the security of your account credentials</li>
                                <li>Promptly update any changes to your information</li>
                                <li>Accept responsibility for all activities under your account</li>
                            </ul>
                        </div>
                    </section>

                    {/* Acceptable Use */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Scale className="w-5 h-5 text-blue-600" />
                            <h2 className="text-2xl font-bold text-slate-900">Acceptable Use</h2>
                        </div>
                        <div className="space-y-3 text-slate-600">
                            <p><strong>You agree not to:</strong></p>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                                <li>Post false, inaccurate, or misleading information</li>
                                <li>Impersonate any person or entity</li>
                                <li>Violate any laws or regulations</li>
                                <li>Upload malicious code or viruses</li>
                                <li>Spam or harass other users</li>
                                <li>Scrape or harvest data from our platform</li>
                            </ul>
                        </div>
                    </section>

                    {/* Job Postings */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Job Postings</h2>
                        <div className="space-y-3 text-slate-600">
                            <p><strong>For Employers:</strong></p>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                                <li>Job postings must be legitimate employment opportunities</li>
                                <li>You must have the authority to post jobs on behalf of your company</li>
                                <li>No discriminatory job postings are allowed</li>
                                <li>You are responsible for the accuracy of job descriptions</li>
                            </ul>
                            <p className="mt-4"><strong>For Job Seekers:</strong></p>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                                <li>Provide truthful information in applications</li>
                                <li>Do not apply to jobs you're not qualified for in bad faith</li>
                                <li>Respect employer communication preferences</li>
                            </ul>
                        </div>
                    </section>

                    {/* Intellectual Property */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Intellectual Property</h2>
                        <p className="text-slate-600 leading-relaxed">
                            The Service and its original content, features, and functionality are owned by JobPortal
                            and are protected by international copyright, trademark, patent, trade secret, and other
                            intellectual property laws.
                        </p>
                    </section>

                    {/* Limitation of Liability */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <XCircle className="w-5 h-5 text-red-600" />
                            <h2 className="text-2xl font-bold text-slate-900">Limitation of Liability</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            JobPortal shall not be liable for any indirect, incidental, special, consequential, or
                            punitive damages resulting from your use of or inability to use the service. We do not
                            guarantee employment outcomes or endorse any particular employer or job seeker.
                        </p>
                    </section>

                    {/* Termination */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="w-5 h-5 text-orange-600" />
                            <h2 className="text-2xl font-bold text-slate-900">Termination</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            We may terminate or suspend your account and access to the Service immediately, without
                            prior notice or liability, for any reason, including breach of these Terms. Upon
                            termination, your right to use the Service will immediately cease.
                        </p>
                    </section>

                    {/* Changes to Terms */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to Terms</h2>
                        <p className="text-slate-600 leading-relaxed">
                            We reserve the right to modify or replace these Terms at any time. We will provide notice
                            of any significant changes. By continuing to access or use our Service after revisions
                            become effective, you agree to be bound by the revised terms.
                        </p>
                    </section>

                    {/* Contact */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
                        <p className="text-slate-600 leading-relaxed">
                            If you have any questions about these Terms, please contact us at{' '}
                            <a href="mailto:legal@jobportal.com" className="text-blue-600 hover:text-blue-700 font-medium">
                                legal@jobportal.com
                            </a>
                        </p>
                    </section>

                    {/* Note */}
                    <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                        <p className="text-sm text-purple-800">
                            <strong>Demo Notice:</strong> This is a demonstration website. These Terms of Service are
                            generic and should be customized by legal professionals for your specific jurisdiction
                            and business needs before use in production.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
