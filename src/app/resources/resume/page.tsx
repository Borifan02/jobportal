import Link from 'next/link';

export default function ResumeTipsPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Resume Writing Guide</h1>

                    <p className="text-gray-600 mb-8">
                        Craft a compelling resume that stands out to recruiters and hiring managers. Follow these
                        expert tips to showcase your skills and experience effectively.
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Essential Resume Sections</h2>

                        <div className="space-y-6">
                            <div className="border-l-4 border-blue-600 pl-4">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Contact Information</h3>
                                <p className="text-gray-700 mb-2">Include:</p>
                                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                                    <li>Full name</li>
                                    <li>Phone number</li>
                                    <li>Professional email address</li>
                                    <li>LinkedIn profile URL</li>
                                    <li>City and state (optional)</li>
                                </ul>
                            </div>

                            <div className="border-l-4 border-blue-600 pl-4">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Professional Summary</h3>
                                <p className="text-gray-700 mb-2">
                                    Write a compelling 3-4 sentence summary highlighting your key qualifications,
                                    years of experience, and your career goals. Tailor it to each job application.
                                </p>
                            </div>

                            <div className="border-l-4 border-blue-600 pl-4">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Work Experience</h3>
                                <p className="text-gray-700 mb-2">
                                    List in reverse chronological order. For each position include:
                                </p>
                                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                                    <li>Job title and company name</li>
                                    <li>Employment dates</li>
                                    <li>3-5 bullet points describing achievements (not just duties)</li>
                                    <li>Quantifiable results when possible (e.g., "Increased sales by 25%")</li>
                                </ul>
                            </div>

                            <div className="border-l-4 border-blue-600 pl-4">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">4. Education</h3>
                                <p className="text-gray-700 mb-2">
                                    Include degree, institution name, graduation year, and relevant honors or GPA
                                    (if recent graduate with 3.5+).
                                </p>
                            </div>

                            <div className="border-l-4 border-blue-600 pl-4">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">5. Skills</h3>
                                <p className="text-gray-700 mb-2">
                                    List both technical and soft skills relevant to the position. Use keywords
                                    from the job description to pass ATS (Applicant Tracking Systems).
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Resume Best Practices</h2>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
                            <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                DO
                            </h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>✓ Use action verbs (achieved, developed, led, implemented)</li>
                                <li>✓ Quantify accomplishments with numbers and percentages</li>
                                <li>✓ Keep it to 1-2 pages (1 page for entry-level, 2 for experienced)</li>
                                <li>✓ Use a clean, professional format with consistent styling</li>
                                <li>✓ Proofread multiple times for spelling and grammar</li>
                                <li>✓ Save and send as PDF to preserve formatting</li>
                                <li>✓ Customize your resume for each job application</li>
                            </ul>
                        </div>

                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                            <h3 className="font-semibold text-red-800 mb-3 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                DON'T
                            </h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>✗ Include personal information (age, marital status, photo)</li>
                                <li>✗ Use generic objectives like "seeking a challenging position"</li>
                                <li>✗ List job duties instead of achievements</li>
                                <li>✗ Use unprofessional email addresses</li>
                                <li>✗ Include references on your resume (provide separately when asked)</li>
                                <li>✗ Use fancy fonts or excessive formatting</li>
                                <li>✗ Leave gaps in employment unexplained</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">ATS Optimization Tips</h2>
                        <p className="text-gray-700 mb-4">
                            Many companies use Applicant Tracking Systems (ATS) to screen resumes. Here's how to make
                            sure your resume gets through:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Use standard section headings (Work Experience, Education, Skills)</li>
                            <li>Include keywords from the job description</li>
                            <li>Avoid headers, footers, tables, and text boxes</li>
                            <li>Use standard fonts (Arial, Calibri, Times New Roman)</li>
                            <li>Submit in PDF or Word format as requested</li>
                        </ul>
                    </section>

                    <div className="bg-blue-50 rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">Ready to Upload Your Resume?</h2>
                        <p className="text-gray-700 mb-4">
                            Once you've perfected your resume, upload it to your profile to start applying to jobs.
                        </p>
                        <Link
                            href="/profile"
                            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Go to Profile
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
