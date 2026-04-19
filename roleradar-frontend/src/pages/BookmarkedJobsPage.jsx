import { HiOutlineGlobeAlt, HiOutlineBookmark, HiOutlineArrowTopRightOnSquare, HiOutlineSparkles, HiOutlineTrash, HiOutlineFunnel } from 'react-icons/hi2';

const portals = [
  { id: 'linkedin', name: 'LinkedIn', color: 'bg-blue-500', count: 8 },
  { id: 'naukri', name: 'Naukri', color: 'bg-indigo-500', count: 5 },
  { id: 'instahyre', name: 'Instahyre', color: 'bg-emerald-500', count: 3 },
  { id: 'other', name: 'Other', color: 'bg-surface-500', count: 2 },
];

const bookmarkedJobs = [
  { id: 1, title: 'Staff Engineer - Backend', company: 'Google', portal: 'LinkedIn', portalColor: 'bg-blue-500', url: 'https://linkedin.com/jobs/123', savedAt: '2 hours ago', location: 'Bangalore', salary: '₹45-60 LPA', skills: ['Java', 'Distributed Systems', 'gRPC'], analyzed: true, score: 94 },
  { id: 2, title: 'SDE-3', company: 'Amazon', portal: 'LinkedIn', portalColor: 'bg-blue-500', url: 'https://linkedin.com/jobs/456', savedAt: '5 hours ago', location: 'Hyderabad', salary: '₹35-50 LPA', skills: ['Java', 'AWS', 'System Design'], analyzed: true, score: 88 },
  { id: 3, title: 'Senior Software Engineer', company: 'Flipkart', portal: 'Naukri', portalColor: 'bg-indigo-500', url: 'https://naukri.com/job/789', savedAt: '1 day ago', location: 'Bangalore', salary: '₹30-40 LPA', skills: ['Java', 'Spring Boot', 'Kafka', 'Kubernetes'], analyzed: true, score: 91 },
  { id: 4, title: 'Tech Lead - Platform', company: 'Razorpay', portal: 'Instahyre', portalColor: 'bg-emerald-500', url: 'https://instahyre.com/job/101', savedAt: '1 day ago', location: 'Remote', salary: '₹40-55 LPA', skills: ['Go', 'Kubernetes', 'PostgreSQL'], analyzed: false, score: null },
  { id: 5, title: 'Principal Engineer', company: 'PhonePe', portal: 'LinkedIn', portalColor: 'bg-blue-500', url: 'https://linkedin.com/jobs/202', savedAt: '2 days ago', location: 'Bangalore', salary: '₹50-70 LPA', skills: ['Java', 'Microservices', 'Event Driven'], analyzed: true, score: 79 },
  { id: 6, title: 'Backend Developer', company: 'Cred', portal: 'Naukri', portalColor: 'bg-indigo-500', url: 'https://naukri.com/job/303', savedAt: '3 days ago', location: 'Bangalore', salary: '₹25-35 LPA', skills: ['Kotlin', 'Spring Boot', 'MySQL'], analyzed: false, score: null },
];

function getScoreStyle(score) {
  if (score >= 80) return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' };
  if (score >= 60) return { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' };
  return { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' };
}

export default function BookmarkedJobsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <HiOutlineBookmark className="h-7 w-7 text-primary-400" />
            Bookmarked Jobs
          </h1>
          <p className="mt-1 text-surface-400">
            Jobs saved from external portals via the RoleRadar Chrome Extension
          </p>
        </div>
        <a
          href="#install-extension"
          className="btn-primary text-sm"
        >
          <HiOutlineGlobeAlt className="h-4 w-4" />
          Install Extension
        </a>
      </div>

      {/* Portal Filter Pills */}
      <div className="flex flex-wrap gap-3">
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600/15 text-primary-300 border border-primary-500/20 text-sm font-medium transition-all">
          All Portals
          <span className="bg-primary-500/30 rounded-full px-2 py-0.5 text-xs">{bookmarkedJobs.length}</span>
        </button>
        {portals.map((p) => (
          <button
            key={p.id}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-800/80 text-surface-300 border border-surface-700 text-sm font-medium hover:bg-surface-700 hover:text-white transition-all"
          >
            <div className={`h-2.5 w-2.5 rounded-full ${p.color}`} />
            {p.name}
            <span className="bg-surface-700 rounded-full px-2 py-0.5 text-xs text-surface-400">{p.count}</span>
          </button>
        ))}
      </div>

      {/* Extension CTA Banner */}
      <div className="glass-card p-5 border-primary-500/20 bg-gradient-to-r from-primary-600/5 to-accent-violet/5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-500/15">
            <HiOutlineGlobeAlt className="h-6 w-6 text-primary-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white">Save jobs from any portal with one click</p>
            <p className="text-xs text-surface-400 mt-0.5">
              Install the RoleRadar Chrome Extension to bookmark jobs from LinkedIn, Naukri, Instahyre, and any career page — then analyze them with AI here.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="badge-primary text-xs">Coming Soon</span>
          </div>
        </div>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {bookmarkedJobs.map((job, index) => {
          const scoreStyle = job.score ? getScoreStyle(job.score) : null;
          return (
            <div
              key={job.id}
              className="glass-card p-5 hover:border-primary-500/30 transition-all duration-300 group animate-slide-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4 min-w-0">
                  {/* Company Avatar */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-800 text-sm font-bold text-surface-300 group-hover:bg-primary-600/20 group-hover:text-primary-400 transition-all">
                    {job.company.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    {/* Title + Portal Badge */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-white group-hover:text-primary-300 transition-colors">
                        {job.title}
                      </h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium text-white ${job.portalColor}`}>
                        {job.portal}
                      </span>
                    </div>

                    {/* Company + Meta */}
                    <p className="text-sm text-surface-400 mt-0.5">
                      {job.company} · {job.location} · {job.salary}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {job.skills.map((s) => (
                        <span key={s} className="badge-primary text-xs">{s}</span>
                      ))}
                    </div>

                    {/* Saved time */}
                    <p className="text-xs text-surface-500 mt-2">Saved {job.savedAt}</p>
                  </div>
                </div>

                {/* Right: Score + Actions */}
                <div className="flex flex-col items-end gap-3 shrink-0">
                  {/* AI Score or Analyze button */}
                  {job.analyzed && scoreStyle ? (
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${scoreStyle.border} ${scoreStyle.bg}`}>
                      <HiOutlineSparkles className={`h-3.5 w-3.5 ${scoreStyle.text}`} />
                      <span className={`text-sm font-bold ${scoreStyle.text}`}>{job.score}%</span>
                    </div>
                  ) : (
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-primary-500/30 bg-primary-500/10 text-primary-300 text-xs font-medium hover:bg-primary-500/20 transition-all">
                      <HiOutlineSparkles className="h-3.5 w-3.5" />
                      Analyze
                    </button>
                  )}

                  {/* Action buttons */}
                  <div className="flex items-center gap-1">
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-surface-500 hover:text-primary-400 hover:bg-primary-500/10 transition-all"
                      title="Open on portal"
                    >
                      <HiOutlineArrowTopRightOnSquare className="h-4 w-4" />
                    </a>
                    <button className="p-1.5 rounded-lg text-surface-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all" title="Remove">
                      <HiOutlineTrash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
