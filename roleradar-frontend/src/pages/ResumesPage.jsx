import { HiOutlineDocumentArrowUp, HiOutlinePlusCircle, HiOutlineSparkles, HiOutlinePencilSquare, HiOutlineTrash, HiOutlineCheckBadge } from 'react-icons/hi2';

const resumes = [
  { id: 1, title: 'Full Stack Developer Resume', updatedAt: '2 days ago', isPrimary: true, skills: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Docker'], score: 85 },
  { id: 2, title: 'Backend Focused Resume', updatedAt: '1 week ago', isPrimary: false, skills: ['Java', 'Kafka', 'Redis', 'MySQL', 'Kubernetes'], score: 78 },
];

export default function ResumesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Resumes</h1>
          <p className="mt-1 text-surface-400">Manage your resumes for better matches</p>
        </div>
        <button className="btn-primary"><HiOutlinePlusCircle className="h-5 w-5" /> New Resume</button>
      </div>

      <div className="glass-card border-2 border-dashed border-surface-700 hover:border-primary-500/50 transition-all p-10 text-center cursor-pointer group">
        <div className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-500/10 group-hover:bg-primary-500/20 mb-4">
            <HiOutlineDocumentArrowUp className="h-8 w-8 text-primary-400" />
          </div>
          <p className="text-lg font-medium text-white">Upload your resume</p>
          <p className="mt-1 text-sm text-surface-400">Drag & drop PDF or DOCX, or click to browse</p>
        </div>
      </div>

      <div className="space-y-4">
        {resumes.map((r) => (
          <div key={r.id} className="glass-card p-6 hover:border-primary-500/30 transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-500/10">
                  <HiOutlineDocumentArrowUp className="h-6 w-6 text-primary-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">{r.title}</h3>
                    {r.isPrimary && <span className="badge-primary flex items-center gap-1"><HiOutlineCheckBadge className="h-3.5 w-3.5" /> Primary</span>}
                  </div>
                  <p className="text-sm text-surface-400 mt-1">Updated {r.updatedAt}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {r.skills.map((s) => <span key={s} className="badge-primary">{s}</span>)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <HiOutlineSparkles className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400">{r.score}%</span>
                <button className="p-2 rounded-lg text-surface-500 hover:text-white hover:bg-surface-800"><HiOutlinePencilSquare className="h-4 w-4" /></button>
                <button className="p-2 rounded-lg text-surface-500 hover:text-rose-400 hover:bg-rose-500/10"><HiOutlineTrash className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
