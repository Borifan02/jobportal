import { getJobs } from '@/lib/mockData';
import JobSearchContainer from '@/components/features/JobSearchContainer';
import { Categories, TrustSection, WhyUs, Newsletter } from '@/components/features/HomeFeatures';

export default function Home() {
  return (
    <div className="flex flex-col">
      <JobSearchContainer />
      <TrustSection />
      <Categories />
      <WhyUs />
      <Newsletter />
    </div>
  );
}
