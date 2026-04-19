import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineSparkles, HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-950 px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md animate-scale-in">
        <div className="glass-card p-8 space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 shadow-glow">
                <HiOutlineSparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">RoleRadar</span>
            </div>
            <h1 className="text-xl font-semibold text-white">Create your account</h1>
            <p className="text-sm text-surface-400 mt-1">Start your AI-powered job search</p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="text-xs font-medium text-surface-400 mb-1.5 block">Full Name</label>
              <input type="text" className="input-field" placeholder="John Doe" />
            </div>
            <div>
              <label className="text-xs font-medium text-surface-400 mb-1.5 block">Email</label>
              <input type="email" className="input-field" placeholder="you@example.com" />
            </div>
            <div>
              <label className="text-xs font-medium text-surface-400 mb-1.5 block">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} className="input-field pr-10" placeholder="Min 8 characters" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500 hover:text-white">
                  {showPassword ? <HiOutlineEyeSlash className="h-4 w-4" /> : <HiOutlineEye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn-primary w-full">Create Account</button>
          </form>

          <p className="text-center text-sm text-surface-400">
            Already have an account? <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
