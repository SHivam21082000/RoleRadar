import {
  HiOutlineBriefcase,
  HiOutlineDocumentText,
  HiOutlineSparkles,
  HiOutlineArrowTrendingUp,
  HiOutlineArrowUpRight,
} from 'react-icons/hi2';

const stats = [
  { name: 'Jobs Matched',    value: '247',  change: '+12%', icon: HiOutlineBriefcase,     color: 'from-primary-500 to-primary-700' },
  { name: 'Applications',    value: '38',   change: '+8%',  icon: HiOutlineDocumentText,  color: 'from-emerald-500 to-emerald-700' },
  { name: 'Match Score Avg', value: '78%',  change: '+5%',  icon: HiOutlineSparkles,      color: 'from-amber-500 to-amber-700' },
  { name: 'Interviews',      value: '6',    change: '+2',   icon: HiOutlineArrowTrendingUp, color: 'from-cyan-500 to-cyan-700' },
];

const recentMatches = [
  { id: 1, title: 'Senior Backend Developer',   company: 'TechCorp',    score: 92, location: 'Remote',    salary: '₹25-35 LPA' },
  { id: 2, title: 'Full Stack Engineer',         company: 'InnovateLab', score: 87, location: 'Bangalore', salary: '₹20-30 LPA' },
  { id: 3, title: 'Java Developer',              company: 'FinEdge',     score: 81, location: 'Hyderabad', salary: '₹18-25 LPA' },
  { id: 4, title: 'Software Engineer II',        company: 'CloudScale',  score: 76, location: 'Remote',    salary: '₹22-28 LPA' },
  { id: 5, title: 'Platform Engineer',           company: 'DataFlow',    score: 73, location: 'Pune',      salary: '₹20-26 LPA' },
];

function getScoreColor(score) {
  if (score >= 80) return 'score-high';
  if (score >= 60) return 'score-medium';
  return 'score-low';
}

function getScoreBg(score) {
  if (score >= 80) return 'bg-emerald-500/10 border-emerald-500/20';
  if (score >= 60) return 'bg-amber-500/10 border-amber-500/20';
  return 'bg-rose-500/10 border-rose-500/20';
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Welcome back, <span className="gradient-text">Shivam</span> 👋
        </h1>
        <p className="mt-2 text-surface-400">
          Here's what's happening with your job search today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="glass-card p-5 group hover:border-primary-500/30 transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-surface-400">{stat.name}</p>
                <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs">
              <HiOutlineArrowUpRight className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400 font-medium">{stat.change}</span>
              <span className="text-surface-500">vs last week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Matches */}
      <div className="glass-card overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-surface-800">
          <div>
            <h2 className="text-lg font-semibold text-white">Top Job Matches</h2>
            <p className="text-sm text-surface-400">AI-curated jobs based on your profile</p>
          </div>
          <a href="/matches" className="btn-ghost text-sm text-primary-400 hover:text-primary-300">
            View all →
          </a>
        </div>

        <div className="divide-y divide-surface-800">
          {recentMatches.map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between px-6 py-4 hover:bg-surface-800/40 transition-colors duration-200 cursor-pointer group"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-800 text-sm font-bold text-surface-300 group-hover:bg-primary-600/20 group-hover:text-primary-400 transition-all">
                  {job.company.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-white truncate group-hover:text-primary-300 transition-colors">
                    {job.title}
                  </p>
                  <p className="text-sm text-surface-400">
                    {job.company} · {job.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0 ml-4">
                <span className="hidden sm:block text-sm text-surface-400">{job.salary}</span>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${getScoreBg(job.score)}`}>
                  <HiOutlineSparkles className={`h-3.5 w-3.5 ${getScoreColor(job.score)}`} />
                  <span className={`text-sm font-semibold ${getScoreColor(job.score)}`}>
                    {job.score}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
