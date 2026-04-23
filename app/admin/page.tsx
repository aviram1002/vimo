'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Avatar } from '@/components/ui/Avatar'
import { createClient } from '@supabase/supabase-js'

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [stats, setStats] = useState({ totalUsers:0, totalEvents:0, proUsers:0, totalGuests:0 })
  const [recent, setRecent] = useState<any[]>([])

  useEffect(() => {
    load()
  }, [])

  async function load() {
    // Check session
    const { data: { session } } = await supabase.auth.getSession()
    console.log('Session:', session?.user?.email)
    
    if (!session) {
      router.push('/login')
      return
    }

    // Check admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', session.user.id)
      .single()
    
    console.log('Profile:', profile)

    if (!profile?.is_admin) {
      router.push('/app/dashboard')
      return
    }

    setAuthorized(true)

    // Load stats
    const db = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const [u, e, p, g] = await Promise.all([
      db.from('profiles').select('*', { count: 'exact', head: true }),
      db.from('events').select('*', { count: 'exact', head: true }),
      db.from('profiles').select('*', { count: 'exact', head: true }).neq('plan', 'free'),
      db.from('guests').select('*', { count: 'exact', head: true }),
    ])
    setStats({ totalUsers: u.count??0, totalEvents: e.count??0, proUsers: p.count??0, totalGuests: g.count??0 })

    const { data } = await db.from('profiles').select('*').order('created_at', { ascending: false }).limit(10)
    setRecent(data ?? [])
    setLoading(false)
  }

  if (loading && !authorized) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-3">⏳</div>
        <p className="text-gray-400">טוען פאנל ניהול...</p>
      </div>
    </div>
  )

  if (!authorized) return null

  return (
    <div className="flex bg-gray-950 min-h-screen text-white" dir="rtl">
      <AdminSidebar />
      <div className="flex-1 p-8 space-y-8 overflow-x-hidden">
        <div>
          <h1 className="text-3xl font-black text-white">לוח בקרה ראשי 👑</h1>
          <p className="text-gray-400 mt-1">סקירה כללית של הפלטפורמה</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label:'סך משתמשים',  value:stats.totalUsers,  icon:'👥', color:'text-violet-400' },
            { label:'אירועים',     value:stats.totalEvents, icon:'🎉', color:'text-teal-400' },
            { label:'משתמשי פרו', value:stats.proUsers,    icon:'⭐', color:'text-amber-400' },
            { label:'סך אורחים',  value:stats.totalGuests, icon:'📋', color:'text-pink-400' },
          ].map(s => (
            <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <div className="text-2xl mb-3">{s.icon}</div>
              <div className={`text-3xl font-black ${s.color}`}>{s.value.toLocaleString()}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-lg font-black text-white mb-4">משתמשים אחרונים</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            {recent.length === 0 ? (
              <p className="p-8 text-center text-gray-500">אין משתמשים עדיין</p>
            ) : recent.map((user: any) => (
              <div key={user.id} className="flex items-center gap-4 px-5 py-3.5 border-b border-gray-800 last:border-0 hover:bg-gray-800/50 transition-colors">
                <Avatar name={user.full_name ?? user.email} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{user.full_name ?? 'משתמש חדש'}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  user.plan==='free' ? 'bg-gray-700 text-gray-300' :
                  user.plan==='pro' ? 'bg-violet-500/20 text-violet-300' :
                  'bg-amber-500/20 text-amber-300'
                }`}>
                  {user.plan}
                </span>
                <span className="text-xs text-gray-600">
                  {new Date(user.created_at).toLocaleDateString('he-IL')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
