'use client'
import { useState, useEffect } from 'react'
import { AppTopBar } from '@/components/layout/AppTopBar'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { supabase } from '@/lib/supabase/client'
import clsx from 'clsx'

type Tab = 'overview' | 'send'

export default function RSVPPage() {
  const [tab, setTab]       = useState<Tab>('overview')
  const [events, setEvents] = useState<any[]>([])
  const [event, setEvent]   = useState<any>(null)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadEvents() }, [])

  async function loadEvents() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase
      .from('events')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
    setEvents(data ?? [])
    if (data && data.length > 0) setEvent(data[0])
    setLoading(false)
  }

  function handleCopy() {
    if (!event?.slug) return
    navigator.clipboard.writeText(`${window.location.origin}/rsvp/${event.slug}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) return (
    <div className="p-8 text-center text-brand-muted">טוען...</div>
  )

  if (!event) return (
    <div>
      <AppTopBar title="אישורי הגעה ✅" subtitle="שלח הזמנות ועקוב אחר תגובות האורחים" />
      <div className="p-8 text-center">
        <div className="text-5xl mb-4">📋</div>
        <p className="text-xl font-black text-brand-text mb-2">עדיין אין אירועים</p>
        <p className="text-brand-muted mb-6">צור אירוע ראשון כדי להתחיל לנהל אישורים</p>
        <a href="/app/editor" className="px-6 py-3 rounded-2xl text-white font-bold inline-block" style={{background:'linear-gradient(135deg,#6C3BFF,#3BD1C6)'}}>
          צור אירוע עכשיו
        </a>
      </div>
    </div>
  )

  const pct = event.total_invited > 0
    ? Math.round((event.rsvp_confirmed / event.total_invited) * 100)
    : 0

  return (
    <div>
      <AppTopBar title="אישורי הגעה ✅" subtitle="שלח הזמנות ועקוב אחר תגובות האורחים" />

      {/* Tabs */}
      <div className="flex border-b border-brand-border bg-white px-6 gap-1">
        {([{id:'overview',label:'סקירה כללית'},{id:'send',label:'שלח הזמנות'}] as {id:Tab;label:string}[]).map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={clsx('px-5 py-3.5 text-sm font-semibold relative transition-colors border-b-2 -mb-px',
              tab === t.id ? 'text-brand-purple border-brand-purple' : 'text-brand-muted border-transparent hover:text-brand-text'
            )}>{t.label}</button>
        ))}
      </div>

      <div className="p-6 space-y-6">
        {/* Event selector */}
        {events.length > 1 && (
          <div className="flex gap-2 flex-wrap">
            {events.map(e => (
              <button key={e.id} onClick={() => setEvent(e)}
                className={clsx('px-4 py-2 rounded-xl text-sm font-bold border transition-all',
                  event?.id === e.id
                    ? 'border-brand-purple bg-violet-50 text-brand-purple'
                    : 'border-brand-border bg-white text-brand-muted hover:border-brand-purple'
                )}>
                {e.emoji} {e.name}
              </button>
            ))}
          </div>
        )}

        {tab === 'overview' && (
          <>
            {/* Event card */}
            <div className="card p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{background: event.cover_gradient ?? 'linear-gradient(135deg,#6C3BFF,#3BD1C6)'}}>
                {event.emoji}
              </div>
              <div className="flex-1">
                <p className="font-bold text-brand-text">{event.name}</p>
                <p className="text-sm text-brand-muted">{event.date} · {event.venue ?? 'מיקום לא הוגדר'}</p>
              </div>
              <span className={clsx('text-xs font-bold px-3 py-1 rounded-full',
                event.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              )}>
                {event.status === 'published' ? '● פעיל' : '○ טיוטה'}
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'סך מוזמנים',    value: event.total_invited,  icon: '👥', color: 'text-brand-purple' },
                { label: 'מגיעים',         value: event.rsvp_confirmed, icon: '✅', color: 'text-green-600' },
                { label: 'לא מגיעים',     value: event.rsvp_declined,  icon: '❌', color: 'text-red-500' },
                { label: 'לא ענו',        value: event.rsvp_pending,   icon: '❓', color: 'text-amber-500' },
              ].map(s => (
                <Card key={s.label} padding="md">
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-brand-muted mt-1">{s.label}</div>
                  <ProgressBar value={event.total_invited > 0 ? Math.round((s.value/event.total_invited)*100) : 0} className="mt-3"
                    color={s.label==='מגיעים'?'green':s.label.includes('לא מגיעים')?'red':'brand'} />
                </Card>
              ))}
            </div>

            {/* Progress */}
            <Card padding="md">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-brand-text">קצב ההתקדמות</h3>
                <span className="text-sm font-bold text-brand-purple">{pct}% אישרו</span>
              </div>
              <ProgressBar value={pct} size="md" />
              <div className="flex gap-4 mt-3 text-xs font-semibold">
                <span className="text-green-600">✓ {event.rsvp_confirmed} מגיעים</span>
                <span className="text-red-500">✗ {event.rsvp_declined} לא מגיעים</span>
                <span className="text-brand-muted">? {event.rsvp_pending} לא ענו</span>
              </div>
            </Card>
          </>
        )}

        {tab === 'send' && (
          <div className="max-w-3xl space-y-6">
            {/* WhatsApp */}
            <Card padding="lg" className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-3xl">💬</div>
              <h3 className="text-xl font-black text-brand-text">שליחה בוואטסאפ</h3>
              <p className="text-sm text-brand-muted leading-relaxed">שלח הזמנה ישירות לאנשי הקשר שלך עם הודעה מותאמת אישית.</p>
              <div className="bg-brand-bg rounded-xl p-4 text-sm text-brand-text leading-relaxed border border-brand-border">
                🎉 שלום! נשמח לראותכם באירוע המיוחד שלנו.<br/>
                הנה הקישור להזמנה ולפרטים המלאים:<br/>
                👉 <span className="text-brand-purple font-semibold">
                  {typeof window !== 'undefined' ? window.location.origin : 'https://vimo-blush.vercel.app'}/rsvp/{event.slug}
                </span>
              </div>
              <button
                onClick={() => {
                  const text = encodeURIComponent(`🎉 שלום! נשמח לראותכם ב${event.name}.\n👉 ${window.location.origin}/rsvp/${event.slug}`)
                  window.open(`https://wa.me/?text=${text}`)
                }}
                className="w-full py-3.5 rounded-2xl text-white font-bold flex items-center justify-center gap-2"
                style={{background:'linear-gradient(135deg,#25D366,#128C7E)',boxShadow:'0 4px 16px rgba(37,211,102,.3)'}}
              >
                📲 שליחה בוואטסאפ עכשיו
              </button>
            </Card>

            {/* Link */}
            <Card padding="lg" className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center text-3xl">🔗</div>
              <h3 className="text-xl font-black text-brand-text">קישור ישיר</h3>
              <div className="flex gap-2">
                <div className="flex-1 px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg text-sm text-brand-muted truncate">
                  {typeof window !== 'undefined' ? window.location.origin : 'https://vimo-blush.vercel.app'}/rsvp/{event.slug}
                </div>
                <button onClick={handleCopy}
                  className="px-4 py-2.5 rounded-xl border border-brand-border bg-white text-sm font-bold hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all whitespace-nowrap">
                  {copied ? '✓ הועתק!' : 'העתק'}
                </button>
              </div>
            </Card>

            {/* CTA Banner */}
            <div className="rounded-3xl p-8 flex items-center justify-between gap-6"
              style={{background:'linear-gradient(135deg,#6C3BFF,#3BD1C6)'}}>
              <div>
                <h3 className="text-xl font-black text-white mb-1">מוכנים לצאת לדרך? 🚀</h3>
                <p className="text-sm text-white/75">זמן את כל האורחים בלחיצה אחת</p>
              </div>
              <button
                onClick={() => {
                  const text = encodeURIComponent(`🎉 שלום! נשמח לראותכם ב${event.name}.\n👉 ${window.location.origin}/rsvp/${event.slug}`)
                  window.open(`https://wa.me/?text=${text}`)
                }}
                className="flex-shrink-0 px-6 py-3 rounded-xl font-bold text-white flex items-center gap-2 whitespace-nowrap"
                style={{background:'rgba(255,255,255,0.2)',backdropFilter:'blur(8px)'}}>
                שלח הזמנות ←
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
