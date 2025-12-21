import { Briefcase, Users, Target, Award, Heart, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        About JobPortal
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        We're on a mission to connect talented professionals with their dream jobs
                        and help companies find the perfect candidates.
                    </p>
                </div>

                {/* Mission */}
                <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white mb-12 shadow-xl">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Target className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
                            <p className="text-blue-100 leading-relaxed text-lg">
                                To revolutionize the job search experience by creating a platform that's
                                simple, transparent, and effective for both job seekers and employers.
                                We believe everyone deserves a job they love.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Our Values</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 mb-2">People First</h3>
                            <p className="text-slate-600 text-sm">
                                We put people at the center of everything we do, creating experiences
                                that respect your time and goals.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                <Zap className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 mb-2">Innovation</h3>
                            <p className="text-slate-600 text-sm">
                                We constantly evolve our platform with cutting-edge technology to
                                make job searching faster and smarter.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                                <Heart className="w-6 h-6 text-emerald-600" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 mb-2">Transparency</h3>
                            <p className="text-slate-600 text-sm">
                                Honest job descriptions, clear salary ranges, and no hidden fees.
                                What you see is what you get.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="mb-12">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                            Our Impact
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-1">10K+</div>
                                <div className="text-sm text-slate-600">Active Jobs</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600 mb-1">50K+</div>
                                <div className="text-sm text-slate-600">Job Seekers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-600 mb-1">2K+</div>
                                <div className="text-sm text-slate-600">Companies</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-orange-600 mb-1">98%</div>
                                <div className="text-sm text-slate-600">Satisfaction</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Story */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-4 text-slate-600 leading-relaxed">
                        <p>
                            JobPortal was founded in 2024 with a simple idea: job searching should be
                            simple, transparent, and accessible to everyone. We noticed that existing
                            platforms were cluttered, confusing, and often didn't respect users' time.
                        </p>
                        <p>
                            Our founders, who experienced the frustrations of job hunting firsthand,
                            decided to build something better. They assembled a team of designers,
                            developers, and HR professionals to create a platform that puts users first.
                        </p>
                        <p>
                            Today, JobPortal serves thousands of job seekers and companies, helping
                            people find meaningful work and businesses find great talent. But we're
                            just getting started.
                        </p>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
                    <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                        Whether you're looking for your next opportunity or searching for top talent,
                        we're here to help.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/jobs"
                            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            <Briefcase className="w-5 h-5" />
                            Find Jobs
                        </Link>
                        <Link
                            href="/employer/post-job"
                            className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
                        >
                            Post a Job
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
