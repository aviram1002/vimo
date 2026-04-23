import { adminGetStats, adminGetRecentSignups } from '@/lib/db/admin'
import { Avatar } from '@/components/ui/Avatar'

export const metadata = { title: 'Admin Dashboard – Vimo', robots: { index: false } }

export default async function AdminDashboardPage() {
  const [stats, recentSignups] = await Promise.all([
    adminGetStats(),
    adminGetRecentSignups(),
  ])

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white">לוח בקרה ראשי 👑</h1>
        <p className="text-gray-400 mt-1">סקירה כללית של הפלטפורמה</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'סך משתמשים',    value: stats.totalUsers,  icon: '👥', color: 'text-violet-400' },
          { label: 'אירועים פעילים',value: stats.totalEvents, icon: '🎉', color: 'text-teal-400' },
          { label: 'משתמשי פרו',    value: stats.proUsers,    icon: '⭐', color: 'text-amber-400' },
          { label: 'סך אורחים',     value: stats.totalGuests, icon: '📋', color: 'text-pink-400' },
        ].map((s) => (
          <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <div className="text-2xl mb-3">{s.icon}</div>
            <div className={`text-3xl font-black ${s.color}`}>
              {s.value.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent signups */}
      <div>
        <h2 className="text-lg font-black text-white mb-4">הצטרפו לאחרונה</h2>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          {recentSignups.length === 0 ? (
            <p className="p-8 text-center text-gray-500">אין משתמשים חדשים</p>
          ) : (
            recentSignups.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-4 px-5 py-3.5 border-b border-gray-800 last:border-0 hover:bg-gray-800/50 transition-colors"
              >
                <Avatar name={user.full_name ?? user.email} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">
                    {user.full_name ?? 'משתמש חדש'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  user.plan === 'free'
                    ? 'bg-gray-700 text-gray-300'
                    : user.plan === 'pro'
                    ? 'bg-violet-500/20 text-violet-300'
                    : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {user.plan}
                </span>
                <span className="text-xs text-gray-600">
                  {new Date(user.created_at).toLocaleDateString('he-IL')}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
