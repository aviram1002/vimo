import type { Metadata } from 'next'
import { AppTopBar } from '@/components/layout/AppTopBar'
import { StatCard } from '@/components/ui/Card'
import { EventCard, AddEventCard } from '@/components/app/EventCard'
import { mockEvents } from '@/lib/data'

export const metadata: Metadata = {
  title: 'לוח בקרה',
  robots: { index: false },
}

export default function DashboardPage() {
  const totalInvited   = mockEvents.reduce((a, e) => a + e.totalInvited, 0)
  const totalConfirmed = mockEvents.reduce((a, e) => a + e.rsvpConfirmed, 0)
  const totalDeclined  = mockEvents.reduce((a, e) => a + e.rsvpDeclined, 0)

  return (
    <div className="min-h-screen">
      <AppTopBar
        title="האירועים שלך 👋"
        subtitle="ברוך הבא! יש לך 4 אירועים פעילים החודש"
        action={{ label: 'צור אירוע חדש', href: '/app/editor' }}
      />

      <div className="p-6 space-y-8">
        {/* Stats row */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard
              label="הזמנות שנשלחו"
              value="1,204"
              icon="✉️"
              color="purple"
              change="↑ 12% השבוע"
              changeType="up"
            />
            <StatCard
              label="סך אישורי הגעה"
              value={totalConfirmed.toLocaleString()}
              icon="📊"
              color="teal"
              change={`↑ ${Math.round((totalConfirmed/totalInvited)*100)}% אישרו`}
              changeType="up"
            />
            <StatCard
              label="אירועים פעילים"
              value="4"
              icon="💝"
              color="pink"
              change="↑ 1 חדש החודש"
              changeType="up"
            />
          </div>
        </section>

        {/* Events grid */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-brand-text">האירועים שלי</h2>
            <button className="text-sm font-semibold text-brand-purple hover:underline">
              הצג הכל ←
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {mockEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
            <AddEventCard />
          </div>
        </section>

        {/* Recent activity */}
        <section>
          <h2 className="text-lg font-black text-brand-text mb-4">פעילות אחרונה</h2>
          <div className="bg-white rounded-3xl border border-brand-border overflow-hidden shadow-card">
            {[
              { icon: '✅', text: 'ישראל ישראלי אישר הגעה לחתונה של נועה ודניאל', time: 'לפני 5 דקות', color: 'text-green-600' },
              { icon: '❌', text: 'מיכל עוז סירבה להגיע למסיבת יום הולדת ליהונתן', time: 'לפני 12 דקות', color: 'text-red-500' },
              { icon: '📲', text: '15 הזמנות נשלחו בוואטסאפ לכנס טכנולוגיה', time: 'לפני שעה', color: 'text-brand-purple' },
              { icon: '✅', text: 'אבי לוי אישר הגעה עם 4 אורחים נוספים', time: 'לפני 2 שעות', color: 'text-green-600' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-5 py-3.5 border-b border-brand-border last:border-0 hover:bg-brand-bg transition-colors"
              >
                <span className="text-lg">{item.icon}</span>
                <p className={`flex-1 text-sm font-medium ${item.color}`}>{item.text}</p>
                <span className="text-xs text-brand-muted flex-shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
