import { useState } from 'react';
import { HiOutlineMagnifyingGlass, HiOutlineAdjustmentsHorizontal, HiOutlineMapPin, HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineBookmark } from 'react-icons/hi2';

const mockJobs = [
  { id: 1, title: 'Senior Java Developer', company: 'XYZ Corp', location: 'Bangalore', type: 'Full-time', salary: '₹25-35 LPA', posted: '2 days ago', skills: ['Java', 'Spring Boot', 'MySQL', 'Redis'], description: 'Looking for an experienced Java developer with strong backend skills...' },
  { id: 2, title: 'Full Stack Engineer', company: 'InnovateLab', location: 'Remote', type: 'Full-time', salary: '₹20-30 LPA', posted: '1 day ago', skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'], description: 'Join our team building next-gen SaaS products...' },
  { id: 3, title: 'Backend Developer', company: 'FinEdge', location: 'Hyderabad', type: 'Full-time', salary: '₹18-25 LPA', posted: '3 days ago', skills: ['Java', 'Kafka', 'Docker', 'Kubernetes'], description: 'Build scalable microservices for our fintech platform...' },
  { id: 4, title: 'Platform Engineer', company: 'CloudScale', location: 'Pune', type: 'Remote', salary: '₹22-28 LPA', posted: '5 hours ago', skills: ['Go', 'Terraform', 'AWS', 'Docker'], description: 'Design and maintain cloud infrastructure...' },
  { id: 5, title: 'Software Engineer II', company: 'DataFlow', location: 'Remote', type: 'Contract', salary: '₹15-22 LPA', posted: '1 week ago', skills: ['Python', 'Django', 'PostgreSQL', 'Redis'], description: 'Work on data pipelines and analytics...' },
  { id: 6, title: 'React Developer', company: 'UIWorks', location: 'Mumbai', type: 'Full-time', salary: '₹12-18 LPA', posted: '4 days ago', skills: ['React', 'TypeScript', 'Tailwind', 'Next.js'], description: 'Create beautiful user interfaces...' },
];

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Job Search</h1>
        <p className="mt-1 text-surface-400">Browse and discover jobs from multiple platforms</p>
      </div>

      {/* Search & Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 rounded-xl bg-surface-800/80 border border-surface-700 px-4 py-3">
            <HiOutlineMagnifyingGlass className="h-5 w-5 text-surface-500" />
            <input
              type="text"
              placeholder="Search by title, company, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-surface-500 outline-none text-sm"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary ${showFilters ? 'border-primary-500 text-primary-300' : ''}`}
          >
            <HiOutlineAdjustmentsHorizontal className="h-4 w-4" />
            Filters
          </button>
          <button className="btn-primary">Search</button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-surface-800 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-slide-down">
            <div>
              <label className="text-xs font-medium text-surface-400 mb-1.5 block">Location</label>
              <select className="input-field text-sm">
                <option value="">All Locations</option>
                <option>Bangalore</option>
                <option>Mumbai</option>
                <option>Remote</option>
                <option>Hyderabad</option>
                <option>Pune</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-surface-400 mb-1.5 block">Job Type</label>
              <select className="input-field text-sm">
                <option value="">All Types</option>
                <option>Full-time</option>
                <option>Contract</option>
                <option>Remote</option>
                <option>Part-time</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-surface-400 mb-1.5 block">Salary Range</label>
              <select className="input-field text-sm">
                <option value="">Any Salary</option>
                <option>₹10-20 LPA</option>
                <option>₹20-30 LPA</option>
                <option>₹30-50 LPA</option>
                <option>₹50+ LPA</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-surface-400">
          Showing <span className="text-white font-medium">{mockJobs.length}</span> jobs
        </p>
        <select className="bg-surface-800 border border-surface-700 rounded-lg px-3 py-1.5 text-sm text-surface-300 outline-none">
          <option>Most Recent</option>
          <option>Relevancy</option>
          <option>Salary: High to Low</option>
        </select>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {mockJobs.map((job, index) => (
          <div
            key={job.id}
            className="glass-card p-6 hover:border-primary-500/30 transition-all duration-300 cursor-pointer group animate-slide-up"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4 min-w-0">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-800 text-lg font-bold text-surface-300 group-hover:bg-primary-600/20 group-hover:text-primary-400 transition-all">
                  {job.company.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-white group-hover:text-primary-300 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-sm text-surface-400 mt-0.5">{job.company}</p>

                  <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-surface-400">
                    <span className="flex items-center gap-1">
                      <HiOutlineMapPin className="h-3.5 w-3.5" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <HiOutlineBriefcase className="h-3.5 w-3.5" /> {job.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <HiOutlineBanknotes className="h-3.5 w-3.5" /> {job.salary}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {job.skills.map((skill) => (
                      <span key={skill} className="badge-primary">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                <button className="p-2 rounded-lg text-surface-500 hover:text-primary-400 hover:bg-primary-500/10 transition-all">
                  <HiOutlineBookmark className="h-5 w-5" />
                </button>
                <span className="text-xs text-surface-500">{job.posted}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
