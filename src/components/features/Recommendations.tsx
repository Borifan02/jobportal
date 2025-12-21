import { Job, User } from '@/types';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Motion';

interface RecommendationsProps {
    user: User | null;
    jobs: Job[];
}

export default function Recommendations({ user, jobs }: RecommendationsProps) {
    if (!user || !user.profile.skills || user.profile.skills.length === 0) {
        return null;
    }

    // Simple matching algorithm: Count matching skills
    const recommendedJobs = jobs
        .map(job => {
            const matchCount = job.tags.filter(tag =>
                user.profile.skills.some(skill =>
                    skill.toLowerCase().includes(tag.toLowerCase()) ||
                    tag.toLowerCase().includes(skill.toLowerCase())
                )
            ).length;
            return { ...job, matchCount };
        })
        .filter(job => job.matchCount > 0)
        .sort((a, b) => b.matchCount - a.matchCount)
        .slice(0, 3); // Take top 3

    if (recommendedJobs.length === 0) return null;

    return (
        <FadeIn>
            <section className="mb-12 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 rounded-2xl p-6 md:p-8 border border-blue-100 dark:border-blue-900/30">
                <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recommended for you</h2>
                </div>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {recommendedJobs.map(job => (
                        <StaggerItem key={job.id}>
                            <Link href={`/jobs/${job.id}`} className="block h-full group">
                                <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col relative overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                                        {job.matchCount} matched skills
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">{job.title}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{job.company}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {job.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="text-xs bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-md border border-slate-100 dark:border-slate-700">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </section>
        </FadeIn>
    );
}
