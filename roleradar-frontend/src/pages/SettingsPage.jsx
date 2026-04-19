export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-surface-400">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <div className="glass-card p-6 space-y-4">
        <h2 className="text-lg font-semibold text-white">Profile</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-surface-400 mb-1.5 block">Full Name</label>
            <input className="input-field" defaultValue="Shivam Shukla" />
          </div>
          <div>
            <label className="text-xs font-medium text-surface-400 mb-1.5 block">Email</label>
            <input className="input-field" defaultValue="shivam@example.com" disabled />
          </div>
        </div>
        <button className="btn-primary">Save Changes</button>
      </div>

      {/* Preferences */}
      <div className="glass-card p-6 space-y-4">
        <h2 className="text-lg font-semibold text-white">Job Preferences</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-surface-400 mb-1.5 block">Preferred Roles</label>
            <input className="input-field" placeholder="e.g., Backend Developer, Full Stack" />
          </div>
          <div>
            <label className="text-xs font-medium text-surface-400 mb-1.5 block">Preferred Locations</label>
            <input className="input-field" placeholder="e.g., Bangalore, Remote" />
          </div>
          <div>
            <label className="text-xs font-medium text-surface-400 mb-1.5 block">Min Salary (LPA)</label>
            <input className="input-field" type="number" placeholder="15" />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="h-4 w-4 rounded border-surface-600 bg-surface-800 text-primary-500 focus:ring-primary-500" />
              <span className="text-sm text-surface-300">Remote only</span>
            </label>
          </div>
        </div>
        <button className="btn-primary">Update Preferences</button>
      </div>

      {/* Danger */}
      <div className="glass-card p-6 border-rose-500/20">
        <h2 className="text-lg font-semibold text-rose-400">Danger Zone</h2>
        <p className="text-sm text-surface-400 mt-1">Permanently delete your account and all data.</p>
        <button className="mt-4 px-4 py-2 bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded-xl text-sm font-medium hover:bg-rose-500/20 transition-all">
          Delete Account
        </button>
      </div>
    </div>
  );
}
