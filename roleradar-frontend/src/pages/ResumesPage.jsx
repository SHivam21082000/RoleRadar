import { useState, useEffect } from 'react';
import { HiOutlineDocumentPlus, HiOutlineTrash, HiOutlineDocumentText, HiOutlineSparkles } from 'react-icons/hi2';
import { resumeApi } from '../services/api';
import ResumeUploadModal from '../components/resume/ResumeUploadModal';
import ResumeViewerModal from '../components/resume/ResumeViewerModal';

export default function ResumesPage() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [viewingResume, setViewingResume] = useState(null);

  const fetchResumes = async () => {
    try {
      const response = await resumeApi.getAll();
      setResumes(response.data.data);
    } catch (err) {
      console.error('Failed to fetch resumes', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    try {
      await resumeApi.delete(id);
      fetchResumes();
    } catch (err) {
      console.error('Failed to delete resume', err);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Resumes</h1>
          <p className="text-surface-400 text-sm mt-1">Upload and manage your parsed resume profiles.</p>
        </div>
        <button onClick={() => setIsUploadModalOpen(true)} className="btn-primary flex items-center gap-2">
          <HiOutlineDocumentPlus className="h-5 w-5" />
          Upload Resume
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" /></div>
      ) : resumes.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-600/10">
              <HiOutlineDocumentText className="h-8 w-8 text-primary-400" />
            </div>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No resumes yet</h3>
          <p className="text-surface-400 max-w-sm mx-auto mb-6">Upload your PDF resume and let our AI instantly extract your skills and experience.</p>
          <button onClick={() => setIsUploadModalOpen(true)} className="btn-primary inline-flex items-center gap-2">
            <HiOutlineSparkles className="h-5 w-5" />
            AI Extract Resume
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resumes.map(resume => (
            <div key={resume.id} className="glass-card p-5 group relative transition-all hover:-translate-y-1 hover:shadow-glow-sm hover:border-primary-500/30">
              {resume.isPrimary && (
                <span className="absolute top-4 right-4 text-xs font-medium bg-primary-500/20 text-primary-400 px-2 py-1 rounded-md">Primary</span>
              )}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-800">
                  <HiOutlineDocumentText className="h-6 w-6 text-surface-400" />
                </div>
                <div className="truncate">
                  <h3 className="text-sm font-medium text-white truncate">{resume.title}</h3>
                  <p className="text-xs text-surface-400 mt-0.5">Parsed via AI</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {resume.parsedData?.skills?.slice(0, 3).map((skill, i) => (
                  <span key={i} className="text-[10px] font-medium bg-surface-800 text-surface-300 px-2 py-1 rounded-md">
                    {skill}
                  </span>
                ))}
                {resume.parsedData?.skills?.length > 3 && (
                  <span className="text-[10px] font-medium text-surface-500">+{resume.parsedData.skills.length - 3} more</span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-surface-800">
                <div className="flex gap-3">
                  <button onClick={() => setViewingResume(resume)} className="text-xs text-primary-400 hover:text-primary-300 transition-colors font-medium">
                    View AI Insights
                  </button>
                  <a href={resume.fileUrl} target="_blank" rel="noreferrer" className="text-xs text-surface-400 hover:text-white transition-colors">
                    Raw PDF
                  </a>
                </div>
                <button onClick={() => handleDelete(resume.id)} className="text-surface-500 hover:text-rose-400 transition-colors">
                  <HiOutlineTrash className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ResumeUploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        onSuccess={() => {
          setIsUploadModalOpen(false);
          fetchResumes();
        }}
      />

      <ResumeViewerModal 
        isOpen={!!viewingResume} 
        resume={viewingResume} 
        onClose={() => setViewingResume(null)} 
      />
    </div>
  );
}
