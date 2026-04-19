import { HiOutlineXMark, HiOutlineBriefcase, HiOutlineAcademicCap, HiOutlineCodeBracketSquare, HiOutlineUser, HiOutlineBuildingOffice, HiOutlineSparkles, HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineChartBar } from 'react-icons/hi2';


export default function ResumeViewerModal({ isOpen, onClose, resume }) {
  if (!isOpen || !resume) return null;

  const { parsedData } = resume;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface-900 border border-surface-800 rounded-2xl w-full max-w-4xl max-h-[90vh] shadow-2xl relative overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-surface-800 bg-surface-900/50 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <HiOutlineUser className="h-6 w-6 text-primary-400" />
              {parsedData?.personal_info?.name || resume.title}
            </h2>
            <p className="text-surface-400 text-sm mt-1">
              {parsedData?.personal_info?.email} • {parsedData?.personal_info?.location}
            </p>
          </div>
          <button onClick={onClose} className="p-2 text-surface-400 hover:text-white hover:bg-surface-800 rounded-lg transition-colors">
            <HiOutlineXMark className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-8">
          
          {/* AI Insights & ATS Score */}
          {parsedData?.feedback && (
            <div className="space-y-6">
              <section className="bg-surface-800/20 border border-surface-800 rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-surface-800 bg-surface-800/30 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white flex items-center gap-2">
                    <HiOutlineSparkles className="h-5 w-5 text-primary-400" />
                    AI Analysis Overview
                  </h3>
                  <div className="flex items-center gap-2 bg-surface-900 px-3 py-1.5 rounded-full border border-surface-700">
                    <span className="text-xs font-medium text-surface-400 uppercase tracking-wider">ATS Score</span>
                    <span className={`text-sm font-bold ${
                      (parsedData.feedback.ats_score || 0) >= 80 ? 'text-emerald-400' : 
                      (parsedData.feedback.ats_score || 0) >= 60 ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {parsedData.feedback.ats_score || 'N/A'}/100
                    </span>
                  </div>
                </div>

                <div className="p-6 grid gap-6 lg:grid-cols-3">
                  {/* Score Visualization */}
                  <div className="flex flex-col items-center justify-center p-4 bg-surface-900/50 rounded-xl border border-surface-800/50">
                    <div className="relative h-24 w-24">
                      <svg className="h-full w-full" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" className="stroke-surface-800" strokeWidth="3" />
                        <circle cx="18" cy="18" r="16" fill="none" 
                          className={`${
                            (parsedData.feedback.ats_score || 0) >= 80 ? 'stroke-emerald-500' : 
                            (parsedData.feedback.ats_score || 0) >= 60 ? 'stroke-amber-500' : 'stroke-rose-500'
                          }`}
                          strokeWidth="3" 
                          strokeDasharray={`${parsedData.feedback.ats_score || 0}, 100`}
                          strokeLinecap="round"
                          transform="rotate(-90 18 18)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-white">{parsedData.feedback.ats_score || 0}%</span>
                      </div>
                    </div>
                    <span className="text-xs text-surface-400 mt-3 font-medium">ATS Compatibility</span>
                  </div>

                  {/* Strong Points & Improvement */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Strong Points</h4>
                        <ul className="space-y-1.5">
                          {parsedData.feedback.strong_points?.map((p, i) => (
                            <li key={i} className="text-sm text-surface-300 flex items-start gap-2">
                              <span className="text-emerald-500 mt-1">•</span>
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">To Improve</h4>
                        <ul className="space-y-1.5">
                          {parsedData.feedback.points_to_improve?.map((p, i) => (
                            <li key={i} className="text-sm text-surface-300 flex items-start gap-2">
                              <span className="text-amber-500 mt-1">•</span>
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ATS Tips */}
                {parsedData.feedback.ats_improvement_tips && (
                  <div className="p-5 bg-primary-500/5 border-t border-surface-800">
                    <h4 className="text-xs font-bold text-primary-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <HiOutlineChartBar className="h-4 w-4" />
                      Tips to Boost ATS Score
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {parsedData.feedback.ats_improvement_tips.map((tip, i) => (
                        <div key={i} className="text-xs bg-surface-900 text-surface-300 px-3 py-1.5 rounded-lg border border-surface-700 flex items-center gap-2">
                          <span className="h-1 w-1 bg-primary-500 rounded-full" />
                          {tip}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            </div>
          )}

          {/* Skills */}
          {parsedData?.skills && parsedData.skills.length > 0 && (
            <section>
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <HiOutlineCodeBracketSquare className="h-5 w-5 text-primary-400" />
                Technical Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {parsedData.skills.map((skill, i) => (
                  <span key={i} className="text-sm font-medium bg-surface-800 text-surface-300 border border-surface-700 px-3 py-1.5 rounded-xl hover:border-primary-500/50 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {parsedData?.experience && parsedData.experience.length > 0 && (
            <section>
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <HiOutlineBriefcase className="h-5 w-5 text-primary-400" />
                Work Experience
              </h3>
              <div className="space-y-4">
                {parsedData.experience.map((exp, i) => (
                  <div key={i} className="relative pl-8 before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-0.5 before:bg-surface-800 last:before:hidden">
                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-surface-900 border-2 border-primary-500 flex items-center justify-center z-10">
                      <div className="w-2 h-2 rounded-full bg-primary-500" />
                    </div>
                    
                    <div className="p-5 rounded-2xl border border-surface-800 bg-surface-800/20 hover:bg-surface-800/40 transition-all duration-300 group">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors">{exp.role}</h4>
                          <div className="flex items-center gap-2 text-surface-400 mt-1">
                            <HiOutlineBuildingOffice className="h-4 w-4" />
                            <span className="text-sm font-medium">{exp.company}</span>
                          </div>
                        </div>
                        <div className="text-xs font-bold text-primary-400 bg-primary-500/10 px-3 py-1.5 rounded-full self-start">
                          {exp.start_date} — {exp.end_date}
                        </div>
                      </div>
                      
                      <p className="text-sm text-surface-300 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                      
                      {exp.technologies_used && exp.technologies_used.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-surface-800/50">
                          {exp.technologies_used.map((tech, j) => (
                            <span key={j} className="text-[10px] font-bold uppercase tracking-wider text-surface-500 bg-surface-900 px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {parsedData?.education && parsedData.education.length > 0 && (
            <section>
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <HiOutlineAcademicCap className="h-5 w-5 text-primary-400" />
                Education
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {parsedData.education.map((edu, i) => (
                  <div key={i} className="p-4 rounded-xl border border-surface-800 bg-surface-800/30">
                    <h4 className="font-semibold text-white">{edu.degree}</h4>
                    <p className="text-sm text-surface-300 mt-1">{edu.institution}</p>
                    <p className="text-xs text-surface-500 mt-2">{edu.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
