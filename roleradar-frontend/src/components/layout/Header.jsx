import { HiOutlineBars3, HiOutlineBell, HiOutlineMagnifyingGlass } from 'react-icons/hi2';

export default function Header({ onMenuClick }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-surface-800 bg-surface-950/80 backdrop-blur-xl px-6">
      {/* Left — hamburger + search */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-surface-400 hover:text-white transition-colors"
        >
          <HiOutlineBars3 className="h-6 w-6" />
        </button>

        <div className="hidden sm:flex items-center gap-2 rounded-xl bg-surface-800/60 border border-surface-700/50 px-4 py-2 w-80">
          <HiOutlineMagnifyingGlass className="h-4 w-4 text-surface-500" />
          <input
            type="text"
            placeholder="Search jobs, companies, skills..."
            className="flex-1 bg-transparent text-sm text-white placeholder-surface-500 outline-none"
          />
          <kbd className="hidden md:inline-flex items-center gap-0.5 rounded-md bg-surface-700 px-1.5 py-0.5 text-[10px] font-medium text-surface-400">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right — notifications + avatar */}
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-xl text-surface-400 hover:text-white hover:bg-surface-800 transition-all duration-200">
          <HiOutlineBell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary-500 ring-2 ring-surface-950" />
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-surface-800">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">Shivam S.</p>
            <p className="text-xs text-surface-500">Free Plan</p>
          </div>
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-violet flex items-center justify-center text-sm font-bold text-white shadow-glow">
            SS
          </div>
        </div>
      </div>
    </header>
  );
}
