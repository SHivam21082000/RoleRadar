import { useState, useCallback } from 'react';
import { HiOutlineXMark, HiOutlineArrowUpTray, HiOutlineDocumentText } from 'react-icons/hi2';
import { resumeApi } from '../../services/api';

export default function ResumeUploadModal({ isOpen, onClose, onSuccess }) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    setError('');
    if (selectedFile.type !== 'application/pdf') {
      setError('Only PDF files are supported currently.');
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB.');
      return;
    }
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      await resumeApi.upload(file);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload and parse resume. Please try again.');
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface-900 border border-surface-800 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-surface-800">
          <h2 className="text-lg font-semibold text-white">Upload Resume</h2>
          <button onClick={onClose} disabled={uploading} className="text-surface-400 hover:text-white transition-colors">
            <HiOutlineXMark className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {uploading ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="relative h-16 w-16">
                <div className="absolute inset-0 rounded-full border-2 border-surface-800"></div>
                <div className="absolute inset-0 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-white mb-1">AI is parsing your resume...</p>
                <p className="text-xs text-surface-400">This usually takes about 5-10 seconds.</p>
              </div>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 px-3 py-2 rounded-lg text-xs">
                  {error}
                </div>
              )}

              <div 
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                  isDragging ? 'border-primary-500 bg-primary-500/5' : 'border-surface-700 hover:border-surface-600 bg-surface-800/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input 
                  type="file" 
                  accept=".pdf" 
                  onChange={handleFileChange} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <div className="flex flex-col items-center justify-center pointer-events-none">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl mb-4 transition-colors ${file ? 'bg-primary-600' : 'bg-surface-800 text-surface-400'}`}>
                    {file ? <HiOutlineDocumentText className="h-6 w-6 text-white" /> : <HiOutlineArrowUpTray className="h-6 w-6" />}
                  </div>
                  
                  {file ? (
                    <>
                      <p className="text-sm font-medium text-white">{file.name}</p>
                      <p className="text-xs text-surface-400 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-white mb-1">
                        <span className="text-primary-400">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-surface-500">PDF up to 5MB</p>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button onClick={onClose} className="btn-secondary flex-1">Cancel</button>
                <button 
                  onClick={handleUpload} 
                  disabled={!file} 
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Upload & Parse
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
