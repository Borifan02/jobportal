'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "How do I create an account?",
        answer: "Click on the 'Sign Up' button in the navigation bar and fill out the registration form with your details. You'll receive a confirmation email to verify your account."
    },
    {
        question: "How do I apply for a job?",
        answer: "Browse through available job listings, click on a job that interests you, and click the 'Apply Now' button. Make sure your profile is complete and your resume is uploaded before applying."
    },
    {
        question: "Can I edit my application after submitting it?",
        answer: "Once an application is submitted, you cannot edit it. However, you can contact the employer directly through our messaging system if you need to provide additional information."
    },
    {
        question: "How do I upload my resume?",
        answer: "Go to your profile page and navigate to the 'Resume' tab. There you can upload your resume in PDF or DOCX format. Make sure your resume is up-to-date before applying to jobs."
    },
    {
        question: "How can I track my job applications?",
        answer: "Visit your profile page and click on the 'Applications' tab to see all your submitted applications, their status, and any updates from employers."
    },
    {
        question: "Is my personal information secure?",
        answer: "Yes, we take data security seriously. All personal information is encrypted and stored securely. We never share your information with third parties without your consent."
    },
    {
        question: "How do I delete my account?",
        answer: "You can delete your account by going to your profile settings and clicking on 'Delete Account'. Please note that this action is irreversible and all your data will be permanently removed."
    },
    {
        question: "Can I save jobs to apply later?",
        answer: "Yes, click the bookmark icon on any job listing to save it to your 'Saved Jobs' list. You can access your saved jobs from your profile page."
    },
    {
        question: "How do employers find my profile?",
        answer: "Employers can search for candidates based on skills, experience, and location. Make sure your profile is complete and includes relevant keywords to increase your visibility."
    },
    {
        question: "What should I do if I forgot my password?",
        answer: "Click on the 'Forgot Password' link on the login page. Enter your email address and we'll send you instructions to reset your password."
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h1>
                    <p className="text-gray-600 mb-8">
                        Find answers to common questions about using our job portal
                    </p>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-lg overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
                                >
                                    <span className="font-semibold text-gray-900 pr-4">
                                        {faq.question}
                                    </span>
                                    <svg
                                        className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${openIndex === index ? 'transform rotate-180' : ''
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {openIndex === index && (
                                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                        <p className="text-gray-700">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-6 bg-blue-50 rounded-lg">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            Still have questions?
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Can't find the answer you're looking for? Please reach out to our support team.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Contact Support
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
