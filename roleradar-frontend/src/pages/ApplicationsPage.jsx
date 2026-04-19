export default function ApplicationsPage() {
  const columns = [
    { id: 'SAVED', title: 'Saved', color: 'border-surface-500', items: [
      { id: 1, title: 'Platform Engineer', company: 'DataFlow', score: 73 },
      { id: 2, title: 'React Developer', company: 'UIWorks', score: 65 },
    ]},
    { id: 'APPLIED', title: 'Applied', color: 'border-primary-500', items: [
      { id: 3, title: 'Senior Java Developer', company: 'XYZ Corp', score: 92 },
      { id: 4, title: 'Backend Developer', company: 'FinEdge', score: 81 },
    ]},
    { id: 'INTERVIEW', title: 'Interview', color: 'border-amber-500', items: [
      { id: 5, title: 'Full Stack Engineer', company: 'InnovateLab', score: 87 },
    ]},
    { id: 'OFFERED', title: 'Offered', color: 'border-emerald-500', items: [] },
    { id: 'REJECTED', title: 'Rejected', color: 'border-rose-500', items: [
      { id: 6, title: 'Software Engineer II', company: 'CloudScale', score: 76 },
    ]},
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Application Tracker</h1>
        <p className="mt-1 text-surface-400">Track your job applications across stages</p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((col) => (
          <div key={col.id} className="flex-shrink-0 w-64">
            <div className={`flex items-center gap-2 mb-3 pb-2 border-b-2 ${col.color}`}>
              <h3 className="text-sm font-semibold text-surface-300">{col.title}</h3>
              <span className="text-xs bg-surface-800 text-surface-400 rounded-full px-2 py-0.5">
                {col.items.length}
              </span>
            </div>
            <div className="space-y-3 min-h-[200px]">
              {col.items.map((item) => (
                <div key={item.id} className="glass-card p-4 cursor-grab hover:border-primary-500/30 transition-all">
                  <h4 className="text-sm font-medium text-white">{item.title}</h4>
                  <p className="text-xs text-surface-400 mt-1">{item.company}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="h-1.5 flex-1 rounded-full bg-surface-800 overflow-hidden">
                      <div className="h-full rounded-full bg-primary-500" style={{ width: `${item.score}%` }} />
                    </div>
                    <span className="text-xs text-surface-400">{item.score}%</span>
                  </div>
                </div>
              ))}
              {col.items.length === 0 && (
                <div className="border-2 border-dashed border-surface-800 rounded-xl p-6 text-center">
                  <p className="text-xs text-surface-600">No applications</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
