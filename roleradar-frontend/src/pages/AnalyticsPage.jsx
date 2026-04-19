import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const activityData = [
  { name: 'Mon', applications: 4, matches: 12 },
  { name: 'Tue', applications: 7, matches: 18 },
  { name: 'Wed', applications: 3, matches: 15 },
  { name: 'Thu', applications: 8, matches: 22 },
  { name: 'Fri', applications: 5, matches: 20 },
  { name: 'Sat', applications: 2, matches: 8 },
  { name: 'Sun', applications: 1, matches: 5 },
];

const funnelData = [
  { name: 'Matched', value: 247 },
  { name: 'Saved', value: 64 },
  { name: 'Applied', value: 38 },
  { name: 'Interview', value: 6 },
  { name: 'Offered', value: 1 },
];

const skillData = [
  { name: 'Java', demand: 85 },
  { name: 'React', demand: 78 },
  { name: 'Python', demand: 82 },
  { name: 'Docker', demand: 70 },
  { name: 'AWS', demand: 75 },
  { name: 'Kafka', demand: 55 },
];

const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#f59e0b', '#10b981'];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="mt-1 text-surface-400">Track your job search performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', color: '#e2e8f0' }} />
              <Bar dataKey="matches" fill="#6366f1" radius={[4,4,0,0]} />
              <Bar dataKey="applications" fill="#06b6d4" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Funnel */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Application Funnel</h3>
          <div className="space-y-3">
            {funnelData.map((item, i) => (
              <div key={item.name} className="flex items-center gap-3">
                <span className="text-xs text-surface-400 w-20">{item.name}</span>
                <div className="flex-1 h-8 bg-surface-800 rounded-lg overflow-hidden">
                  <div
                    className="h-full rounded-lg flex items-center px-3"
                    style={{ width: `${(item.value / funnelData[0].value) * 100}%`, background: COLORS[i % COLORS.length] }}
                  >
                    <span className="text-xs font-semibold text-white">{item.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Demand */}
        <div className="glass-card p-6 lg:col-span-2">
          <h3 className="text-sm font-semibold text-white mb-4">Skill Demand Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={skillData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', color: '#e2e8f0' }} />
              <Line type="monotone" dataKey="demand" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
