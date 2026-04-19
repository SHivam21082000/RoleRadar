import { NavLink, useLocation } from 'react-router-dom';
import {
  HiOutlineHome,
  HiOutlineBriefcase,
  HiOutlineSparkles,
  HiOutlineDocumentText,
  HiOutlineViewColumns,
  HiOutlineChartBarSquare,
  HiOutlineCog6Tooth,
  HiOutlineXMark,
  HiOutlineBookmark,
  HiOutlineChartPie,
  HiOutlineCog8Tooth,
} from 'react-icons/hi2';

const navigation = [
  { name: 'Dashboard',    href: '/dashboard',              icon: HiOutlineHome },
  { name: 'Matches',      href: '/dashboard/matches',       icon: HiOutlineSparkles },
  { name: 'Jobs',         href: '/dashboard/jobs',          icon: HiOutlineBriefcase },
  { name: 'Resumes',      href: '/dashboard/resumes',       icon: HiOutlineDocumentText },
  { name: 'Applications', href: '/dashboard/applications',  icon: HiOutlineChartBarSquare },
  { name: 'Bookmarked',   href: '/dashboard/bookmarks',     icon: HiOutlineBookmark },
  { name: 'Analytics',    href: '/dashboard/analytics',     icon: HiOutlineChartPie },
  { name: 'Settings',     href: '/dashboard/settings',      icon: HiOutlineCog8Tooth },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 transform 
          bg-surface-900/95 backdrop-blur-xl border-r border-surface-800
          transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 lg:w-64
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-surface-800">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 shadow-glow">
              <HiOutlineSparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">RoleRadar</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-surface-400 hover:text-white transition-colors"
          >
            <HiOutlineXMark className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => {
            const isActive =
              item.href === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.href);

            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200 group
                  ${
                    isActive
                      ? 'bg-primary-600/15 text-primary-300 border border-primary-500/20 shadow-inner-glow'
                      : 'text-surface-400 hover:text-white hover:bg-surface-800/80'
                  }
                `}
              >
                <item.icon
                  className={`h-5 w-5 transition-colors ${
                    isActive ? 'text-primary-400' : 'text-surface-500 group-hover:text-surface-300'
                  }`}
                />
                {item.name}
                {isActive && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-400 animate-pulse-slow" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-surface-800">
          <div className="glass-card p-4">
            <p className="text-xs font-medium text-surface-400 mb-1">Pro Tip</p>
            <p className="text-xs text-surface-500 leading-relaxed">
              Upload your resume to get AI-powered job matches with relevancy scores.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
