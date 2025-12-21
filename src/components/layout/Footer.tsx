'use client';

import Link from 'next/link';
import { Briefcase, Mail, MapPin, Phone, Linkedin, Twitter, Github, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-slate-300 mt-auto">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-blue-600 p-1.5 rounded-lg">
                                <Briefcase className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">JobPortal</span>
                        </div>
                        <p className="text-sm leading-relaxed mb-4">
                            Your trusted platform for finding dream jobs and top talent.
                            Connecting job seekers with opportunities worldwide.
                        </p>
                        <div className="flex gap-3">
                            <a href="http://www.linkedin.com/in/borifan-dabasa-a5191036b/" target="_blank" rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-colors">
                                <Linkedin className="w-4 h-4" />
                            </a>


                            <a href="https://www.instagram.com/borifandabasa" target="_blank" rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-pink-600 flex items-center justify-center transition-colors">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="https://www.github.com/Borifan02" target="_blank" rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-gray-600 flex items-center justify-center transition-colors">
                                <Github className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">For Job Seekers</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/jobs" className="hover:text-white transition-colors">
                                    Browse Jobs
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile" className="hover:text-white transition-colors">
                                    My Profile
                                </Link>
                            </li>
                            <li>
                                <Link href="/saved" className="hover:text-white transition-colors">
                                    Saved Jobs
                                </Link>
                            </li>
                            <li>
                                <Link href="/register" className="hover:text-white transition-colors">
                                    Create Account
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Employers */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">For Employers</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/employer/post-job" className="hover:text-white transition-colors">
                                    Post a Job
                                </Link>
                            </li>
                            <li>
                                <Link href="/employer/dashboard" className="hover:text-white transition-colors">
                                    Employer Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white transition-colors">
                                    Contact Sales
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-400" />
                                <a href="mailto:support@jobportal.com" className="hover:text-white transition-colors">
                                    dabasaborifa@gmail.com
                                </a>
                            </li>
                            <li className="flex items-start gap-2">
                                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-400" />
                                <a href="tel:+11234567890" className="hover:text-white transition-colors">
                                    +251965844287
                                </a>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-400" />
                                <span>123 Job Street<br />Addis Ababa, Ethiopia</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                        <p className="text-slate-400">
                            © {currentYear} JobPortal. All rights reserved.
                        </p>
                        <div className="flex flex-wrap gap-6 justify-center">
                            <Link href="/privacy" className="hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="/cookies" className="hover:text-white transition-colors">
                                Cookie Policy
                            </Link>
                            <Link href="/sitemap" className="hover:text-white transition-colors">
                                Sitemap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
