import { HiOutlineSparkles, HiOutlineXMark, HiOutlineBookmark, HiOutlineExclamationTriangle } from 'react-icons/hi2';

const matches = [
  { id: 1, title: 'Senior Java Developer', company: 'XYZ Corp', score: 92, location: 'Remote', salary: '₹25-35 LPA', reasons: ['Strong Spring Boot match', '3+ years experience match', 'Remote preference match'], missingSkills: ['Kafka'] },
  { id: 2, title: 'Full Stack Engineer', company: 'InnovateLab', score: 87, location: 'Bangalore', salary: '₹20-30 LPA', reasons: ['Full-stack skill alignment', 'Location preference match'], missingSkills: ['GraphQL', 'Next.js'] },
  { id: 3, title: 'Backend Developer', company: 'FinEdge', score: 81, location: 'Hyderabad', salary: '₹18-25 LPA', reasons: ['Strong Java fundamentals', 'Fintech domain fit'], missingSkills: ['Kubernetes', 'Kafka'] },
  { id: 4, title: 'Software Engineer II', company: 'CloudScale', score: 76, location: 'Remote', salary: '₹22-28 LPA', reasons: ['System design skills', 'Remote role'], missingSkills: ['Go', 'Terraform'] },
  { id: 5, title: 'Platform Engineer', company: 'DataFlow', score: 68, location: 'Pune', salary: '₹20-26 LPA', reasons: ['Cloud experience match'], missingSkills: ['Docker', 'AWS CDK', 'Pulumi'] },
];

function getScoreColor(score) {
  if (score >= 80) return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', ring: 'ring-emerald-500/30' };
  if (score >= 60) return { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', ring: 'ring-amber-500/30' };
  return { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', ring: 'ring-rose-500/30' };
}

export default function MatchesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <HiOutlineSparkles className="h-7 w-7 text-primary-400" />
          AI Job Matches
        </h1>
        <p className="mt-1 text-surface-400">Personalized job recommendations based on your resume and preferences</p>
      </div>

      <div className="space-y-4">
        {matches.map((job, index) => {
          const colors = getScoreColor(job.score);
          return (
            <div
              key={job.id}
              className="glass-card p-6 hover:border-primary-500/30 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-5">
                {/* Score Circle */}
                <div className={`flex flex-col items-center justify-center h-20 w-20 shrink-0 rounded-2xl border-2 ${colors.border} ${colors.bg}`}>
                  <span className={`text-2xl font-bold ${colors.text}`}>{job.score}</span>
                  <span className={`text-[10px] font-medium ${colors.text} opacity-70`}>MATCH</span>
                </div>

                {/* Job Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                      <p className="text-sm text-surface-400">{job.company} · {job.location} · {job.salary}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button className="p-2 rounded-lg text-surface-500 hover:text-primary-400 hover:bg-primary-500/10 transition-all">
                        <HiOutlineBookmark className="h-5 w-5" />
                      </button>
                      <button className="p-2 rounded-lg text-surface-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all">
                        <HiOutlineXMark className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Match Reasons */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {job.reasons.map((reason) => (
                      <span key={reason} className="badge-success text-xs">
                        ✓ {reason}
                      </span>
                    ))}
                  </div>

                  {/* Missing Skills */}
                  {job.missingSkills.length > 0 && (
                    <div className="mt-3 flex items-center gap-2">
                      <HiOutlineExclamationTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                      <span className="text-xs text-surface-400">Missing skills:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {job.missingSkills.map((skill) => (
                          <span key={skill} className="badge-warning text-xs">{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
