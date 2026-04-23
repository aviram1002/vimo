'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { AppTopBar } from '@/components/layout/AppTopBar'
import { ProgressBar } from '@/components/ui/ProgressBar'

export default function AnalyticsPage() {
  const router = useRouter()
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { load() }, [])

  async function load() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { router.push('/login'); return }
    const { data } = await supabase.from('events').select('*').eq('user_id', session.user.id)
    setEvents(data ?? [])
    setLoading(false)
  }

  const totalInvited   = events.reduce((a, e) => a + (e.total_invited  ?? 0), 0)
  const totalConfirmed = events.reduce((a, e) => a + (e.rsvp_confirmed ?? 0), 0)
  const totalDeclined  = events.reduce((a, e) => a + (e.rsvp_declined  ?? 0), 0)
  const totalPending   = events.reduce((a, e) => a + (e.rsvp_pending   ?? 0), 0)
  const avgConfirmRate = totalInvited > 0 ? Math.round((totalConfirmed / totalInvited) * 100) : 0

  if (loading) return <div className="p-8 text-brand-muted">טוען...</div>

  return (
    <div>
      <AppTopBar title="אנליטיקה 📊" subtitle="סטטיסטיקות על כל האירועים שלך" />
      <div className="p-6 space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'סך מוזמנים',    value: totalInvited,   color: 'text-brand-purple', icon: '👥' },
            { label: 'אישרו הגעה',    value: totalConfirmed, color: 'text-green-600',    icon: '✅' },
            { label: 'לא מגיעים',    value: totalDeclined,  color: 'text-red-500',      icon: '❌' },
            { label: 'לא ענו',       value: totalPending,   color: 'text-amber-500',    icon: '⏳' },
          ].map(s => (
            <div key={s.label} className="card p-5">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs text-brand-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Overall rate */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-black text-brand-text">שיעור אישורים כולל</h3>
            <span className="text-2xl font-black text-brand-purple">{avgConfirmRate}%</span>
          </div>
          <ProgressBar value={avgConfirmRate} size="md" />
        </div>

        {/* Per event breakdown */}
        <div className="card overflow-hidden">
          <div className="p-5 border-b border-brand-border">
            <h3 className="font-black text-brand-text">פירוט לפי אירוע</h3>
          </div>
          {events.length === 0 ? (
            <p className="p-8 text-center text-brand-muted">אין אירועים עדיין</p>
          ) : events.map(e => {
            const pct = e.total_invited > 0 ? Math.round((e.rsvp_confirmed / e.total_invited) * 100) : 0
            return (
              <div key={e.id} className="p-5 border-b border-brand-border last:border-0">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span>{e.emoji}</span>
                    <span className="font-bold text-brand-text">{e.name}</span>
                  </div>
                  <span className="text-sm font-bold text-brand-purple">{pct}%</span>
                </div>
                <ProgressBar value={pct} />
                <div className="flex gap-4 mt-2 text-xs text-brand-muted">
                  <span>👥 {e.total_invited} מוזמנים</span>
                  <span className="text-green-600">✓ {e.rsvp_confirmed}</span>
                  <span className="text-red-500">✗ {e.rsvp_declined}</span>
                  <span>? {e.rsvp_pending}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
