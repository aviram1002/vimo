import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { AppTopBar } from '@/components/layout/AppTopBar'
import { StatCard } from '@/components/ui/Card'
import { EventCard, AddEventCard } from '@/components/app/EventCard'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export const metadata: Metadata = {
  title: 'לוח בקרה',
  robots: { index: false },
}

export default async function DashboardPage() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name: string) => cookieStore.get(name)?.value } }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: eventsData } = await supabase
    .from('events')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: true })

  const { data: profileData } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single()

  const allEvents = (eventsData ?? []) as any[]
  const profile   = profileData as any

  // Get recent guest activity
  const eventIds = allEvents.map((e: any) => e.id)
  const { data: recentGuestsData } = eventIds.length > 0
    ? await supabase
        .from('guests')
        .select('*, events(name)')
        .in('event_id', eventIds)
        .order('updated_at', { ascending: false })
        .limit(5)
    : { data: [] }

  const recentGuests = (recentGuestsData ?? []) as any[]

  const totalInvited   = allEvents.reduce((a: number, e: any) => a + (e.total_invited   ?? 0), 0)
  const totalConfirmed = allEvents.reduce((a: number, e: any) => a + (e.rsvp_confirmed  ?? 0), 0)
  const activeEvents   = allEvents.filter((e: any) => e.status === 'published').length
  const firstName      = profile?.full_name?.split(' ')[0] ?? 'שלום'

  return (
    <div className="min-h-screen">
      <AppTopBar
        title="האירועים שלך 👋"
        subtitle={`ברוך הבא, ${firstName}! יש לך ${allEvents.length} אירועים`}
        action={{ label: 'צור אירוע חדש', href: '/app/editor' }}
      />

      <div className="p-6 space-y-8">
        {/* Stats */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard
              label="סך אורחים מוזמנים"
              value={totalInvited.toLocaleString()}
              icon="✉️"
              color="purple"
              change={`סך הכל ${allEvents.length} אירועים`}
              changeType="neutral"
            />
            <StatCard
              label="אישרו הגעה"
              value={totalConfirmed.toLocaleString()}
              icon="📊"
              color="teal"
              change={`↑ ${Math.round((totalConfirmed / Math.max(totalInvited, 1)) * 100)}% אישרו`}
              changeType="up"
            />
            <StatCard
              label="אירועים פעילים"
              value={activeEvents}
              icon="💝"
              color="pink"
              change={`${allEvents.length} סך הכל`}
              changeType="neutral"
            />
          </div>
        </section>

        {/* Events grid */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-brand-text">האירועים שלי</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {allEvents.map((event: any) => (
              <EventCard key={event.id} event={event} />
            ))}
            <AddEventCard />
          </div>

          {allEvents.length === 0 && (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🎉</div>
              <p className="text-xl font-black text-brand-text mb-2">עדיין אין אירועים</p>
              <p className="text-brand-muted mb-6">צור את האירוע הראשון שלך עכשיו</p>
            </div>
          )}
        </section>

        {/* Recent activity */}
        {recentGuests.length > 0 && (
          <section>
            <h2 className="text-lg font-black text-brand-text mb-4">פעילות אחרונה</h2>
            <div className="bg-white rounded-3xl border border-brand-border overflow-hidden shadow-card">
              {recentGuests.map((guest: any) => {
                const statusMap: Record<string, { icon: string; color: string; text: string }> = {
                  coming:       { icon: '✅', color: 'text-green-600',   text: 'אישר הגעה' },
                  'not-coming': { icon: '❌', color: 'text-red-500',     text: 'ביטל הגעה' },
                  maybe:        { icon: '❓', color: 'text-amber-500',   text: 'אולי מגיע' },
                  pending:      { icon: '⏳', color: 'text-brand-muted', text: 'לא ענה' },
                }
                const s = statusMap[guest.status] ?? statusMap.pending
                const eventName = guest.events?.name ?? 'אירוע'
                return (
                  <div key={guest.id} className="flex items-center gap-4 px-5 py-3.5 border-b border-brand-border last:border-0 hover:bg-brand-bg transition-colors">
                    <span className="text-lg">{s.icon}</span>
                    <p className={`flex-1 text-sm font-medium ${s.color}`}>{guest.name} {s.text} ל{eventName}</p>
                    <span className="text-xs text-brand-muted flex-shrink-0">
                      {new Date(guest.updated_at).toLocaleDateString('he-IL')}
                    </span>
                  </div>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
