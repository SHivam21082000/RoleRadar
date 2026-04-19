import { Link } from 'react-router-dom';
import { HiOutlineSparkles, HiOutlineArrowRight } from 'react-icons/hi2';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-950 text-white overflow-hidden selection:bg-primary-500/30">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-violet/20 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 shadow-glow">
            <HiOutlineSparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">RoleRadar</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-surface-300 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link to="/register" className="btn-primary text-sm px-5 py-2">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-medium mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
          </span>
          RoleRadar AI is now in Beta
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-scale-in" style={{ animationDelay: '100ms' }}>
          Your Next Job, <br />
          <span className="gradient-text">Found by AI.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-surface-400 max-w-2xl mb-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
          Upload your resume. Let our AI match you with the perfect roles, analyze your skill gaps, and track your applications in one beautiful platform.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <Link to="/register" className="btn-primary flex items-center gap-2 px-8 py-4 text-base">
            Start Your Search <HiOutlineArrowRight className="h-5 w-5" />
          </Link>
          <Link to="/login" className="px-8 py-4 text-base font-medium text-surface-300 hover:text-white transition-colors rounded-xl hover:bg-surface-800">
            I already have an account
          </Link>
        </div>
      </main>

      {/* Feature Preview Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-32 animate-fade-in" style={{ animationDelay: '500ms' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-8 hover:-translate-y-1 transition-transform duration-300">
            <div className="h-12 w-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Smart Resume Parsing</h3>
            <p className="text-sm text-surface-400">Our LLM extracts every skill, role, and achievement from your PDF automatically.</p>
          </div>
          
          <div className="glass-card p-8 hover:-translate-y-1 transition-transform duration-300">
            <div className="h-12 w-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">AI Job Matching</h3>
            <p className="text-sm text-surface-400">Stop scrolling. We score jobs from 0-100 based on your true fit, using vector embeddings.</p>
          </div>

          <div className="glass-card p-8 hover:-translate-y-1 transition-transform duration-300">
            <div className="h-12 w-12 rounded-xl bg-accent-violet/10 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-accent-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Application Tracking</h3>
            <p className="text-sm text-surface-400">Manage your entire pipeline on a beautiful Kanban board. Never drop the ball again.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
