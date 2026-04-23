'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { AppTopBar } from '@/components/layout/AppTopBar'
import { StatCard } from '@/components/ui/Card'
import { EventCard, AddEventCard } from '@/components/app/EventCard'

export default function DashboardPage() {
  const router = useRouter()
  const [events, setEvents]   = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/login')
      return
    }

    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()
    setProfile(profileData)

    const { data: eventsData } = await supabase
      .from('events')
      .select('*')
      .eq('user_id', session.user.id)
      .order('date', { ascending: true })
    setEvents(eventsData ?? [])
    setLoading(false)
  }

  const totalInvited   = events.reduce((a, e) => a + (e.total_invited  ?? 0), 0)
  const totalConfirmed = events.reduce((a, e) => a + (e.rsvp_confirmed ?? 0), 0)
  const activeEvents   = events.filter(e => e.status === 'published').length
  const firstName      = profile?.full_name?.split(' ')[0] ?? 'שלום'

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-3">⏳</div>
        <p className="text-brand-muted font-semibold">טוען...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen">
      <AppTopBar
        title="האירועים שלך 👋"
        subtitle={`ברוך הבא! יש לך ${events.length} אירועים`}
        action={{ label: 'צור אירוע חדש', href: '/app/editor' }}
      />
      <div className="p-6 space-y-8">
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard label="סך אורחים מוזמנים" value={totalInvited.toLocaleString()} icon="✉️" color="purple" change={`${events.length} אירועים`} changeType="neutral" />
            <StatCard label="אישרו הגעה" value={totalConfirmed.toLocaleString()} icon="📊" color="teal" change={`${Math.round((totalConfirmed / Math.max(totalInvited, 1)) * 100)}% אישרו`} changeType="up" />
            <StatCard label="אירועים פעילים" value={activeEvents} icon="💝" color="pink" change={`${events.length} סך הכל`} changeType="neutral" />
          </div>
        </section>
        <section>
          <h2 className="text-lg font-black text-brand-text mb-4">האירועים שלי</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {events.map(event => <EventCard key={event.id} event={event} />)}
            <AddEventCard />
          </div>
          {events.length === 0 && (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🎉</div>
              <p className="text-xl font-black text-brand-text mb-2">עדיין אין אירועים</p>
              <p className="text-brand-muted">צור את האירוע הראשון שלך עכשיו</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
