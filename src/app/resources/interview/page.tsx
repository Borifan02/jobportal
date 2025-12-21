import Link from 'next/link';

export default function InterviewGuidePage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Interview Preparation Guide</h1>

                    <p className="text-gray-600 mb-8">
                        Master the art of job interviews with this comprehensive guide. Learn how to prepare,
                        what to expect, and how to make a lasting impression on your potential employer.
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Before the Interview</h2>

                        <div className="space-y-4">
                            <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Research the Company</h3>
                                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                                    <li>Study the company website, mission, and values</li>
                                    <li>Review recent news and press releases</li>
                                    <li>Understand their products, services, and competitors</li>
                                    <li>Check employee reviews on sites like Glassdoor</li>
                                    <li>Research the interviewer on LinkedIn</li>
                                </ul>
                            </div>

                            <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Prepare Your Answers</h3>
                                <p className="text-gray-700 mb-2">Practice answers to common questions using the STAR method:</p>
                                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                                    <li><strong>S</strong>ituation: Set the context</li>
                                    <li><strong>T</strong>ask: Describe your responsibility</li>
                                    <li><strong>A</strong>ction: Explain what you did</li>
                                    <li><strong>R</strong>esult: Share the outcome</li>
                                </ul>
                            </div>

                            <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Plan Your Logistics</h3>
                                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                                    <li>Confirm the date, time, and location/platform</li>
                                    <li>Plan your route and arrive 10-15 minutes early</li>
                                    <li>For virtual interviews, test your tech setup</li>
                                    <li>Prepare professional attire</li>
                                    <li>Print extra copies of your resume</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Common Interview Questions</h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">1. "Tell me about yourself"</h3>
                                <p className="text-gray-700 ml-4">
                                    Provide a 2-minute professional summary highlighting your background, key achievements,
                                    and why you're interested in this role.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">2. "What are your strengths and weaknesses?"</h3>
                                <p className="text-gray-700 ml-4">
                                    Choose strengths relevant to the job and a genuine weakness you're actively working to improve.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">3. "Why do you want to work here?"</h3>
                                <p className="text-gray-700 ml-4">
                                    Show you've researched the company and explain how your goals align with their mission and culture.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">4. "Describe a challenge you've overcome"</h3>
                                <p className="text-gray-700 ml-4">
                                    Use the STAR method to describe a specific situation and how you successfully resolved it.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">5. "Where do you see yourself in 5 years?"</h3>
                                <p className="text-gray-700 ml-4">
                                    Demonstrate ambition while showing commitment to growing with the company.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">During the Interview</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-green-50 rounded-lg p-6">
                                <h3 className="font-semibold text-green-800 mb-3">Body Language Tips</h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li>✓ Maintain eye contact</li>
                                    <li>✓ Sit up straight</li>
                                    <li>✓ Smile and be personable</li>
                                    <li>✓ Give a firm handshake</li>
                                    <li>✓ Take notes</li>
                                </ul>
                            </div>

                            <div className="bg-purple-50 rounded-lg p-6">
                                <h3 className="font-semibold text-purple-800 mb-3">Communication Tips</h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li>✓ Listen carefully</li>
                                    <li>✓ Ask for clarification</li>
                                    <li>✓ Be concise and specific</li>
                                    <li>✓ Show enthusiasm</li>
                                    <li>✓ Be authentic</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Questions to Ask the Interviewer</h2>
                        <p className="text-gray-700 mb-4">
                            Always prepare thoughtful questions to ask. This shows interest and helps you evaluate the opportunity:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>What does success look like in this role during the first 90 days?</li>
                            <li>How would you describe the team culture?</li>
                            <li>What are the biggest challenges facing the team right now?</li>
                            <li>What opportunities for professional development does the company offer?</li>
                            <li>What are the next steps in the interview process?</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">After the Interview</h2>

                        <div className="space-y-4">
                            <div className="border-l-4 border-blue-600 pl-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Send a Thank-You Email</h3>
                                <p className="text-gray-700">
                                    Within 24 hours, send a personalized thank-you note to each interviewer. Mention specific
                                    topics discussed and reiterate your interest in the position.
                                </p>
                            </div>

                            <div className="border-l-4 border-blue-600 pl-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Follow Up Appropriately</h3>
                                <p className="text-gray-700">
                                    If you haven't heard back within the stated timeframe, send a polite follow-up email
                                    expressing continued interest.
                                </p>
                            </div>

                            <div className="border-l-4 border-blue-600 pl-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Reflect and Learn</h3>
                                <p className="text-gray-700">
                                    Take notes on what went well and what could be improved for future interviews.
                                </p>
                            </div>
                        </div>
                    </section>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">Virtual Interview Tips</h2>
                        <ul className="space-y-2 text-gray-700">
                            <li>✓ Test your camera, microphone, and internet connection beforehand</li>
                            <li>✓ Choose a quiet, well-lit location with a clean background</li>
                            <li>✓ Dress professionally (even if off-camera)</li>
                            <li>✓ Look at the camera, not the screen, when speaking</li>
                            <li>✓ Have a backup plan (phone number to call) in case of technical issues</li>
                            <li>✓ Close unnecessary applications to avoid distractions</li>
                        </ul>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                        <h3 className="font-semibold text-yellow-800 mb-2">Pro Tip</h3>
                        <p className="text-gray-700">
                            Keep track of all your applications and interviews in your profile. This helps you stay
                            organized and follow up at the right times.
                        </p>
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
