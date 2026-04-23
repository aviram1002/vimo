'use client'
import { useState } from 'react'
import { AppTopBar } from '@/components/layout/AppTopBar'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { mockEvents, mockGuests } from '@/lib/data'
import clsx from 'clsx'

type Tab = 'overview' | 'send'

export default function RSVPPage() {
  const [tab, setTab] = useState<Tab>('overview')
  const [copied, setCopied] = useState(false)

  const event = mockEvents[0]
  const guests = mockGuests
  const coming    = guests.filter((g) => g.status === 'coming').length
  const notComing = guests.filter((g) => g.status === 'not-coming').length
  const maybe     = guests.filter((g) => g.status === 'maybe').length
  const pending   = guests.filter((g) => g.status === 'pending').length

  function handleCopy() {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <AppTopBar title="אישורי הגעה ✅" subtitle="שלח הזמנות ועקוב אחר תגובות האורחים" />

      {/* Page tabs */}
      <div className="flex border-b border-brand-border bg-white px-6 gap-1">
        {([{ id: 'overview', label: 'סקירה כללית' }, { id: 'send', label: 'שלח הזמנות' }] as { id: Tab; label: string }[]).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={clsx(
              'px-5 py-3.5 text-sm font-semibold relative transition-colors border-b-2 -mb-px',
              tab === t.id
                ? 'text-brand-purple border-brand-purple'
                : 'text-brand-muted border-transparent hover:text-brand-text'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-6 space-y-6">
        {tab === 'overview' && (
          <>
            {/* Event selector */}
            <div className="card p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: event.coverGradient }}>
                {event.emoji}
              </div>
              <div className="flex-1">
                <p className="font-bold text-brand-text">{event.name}</p>
                <p className="text-sm text-brand-muted">{event.date} · {event.venue}</p>
              </div>
              <button className="text-sm text-brand-purple font-semibold hover:underline">החלף אירוע</button>
            </div>

            {/* RSVP stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'סך מוזמנים',  value: event.totalInvited, icon: '👥', color: 'text-brand-purple' },
                { label: 'מגיעים',      value: coming,             icon: '✅', color: 'text-green-600' },
                { label: 'לא מגיעים',  value: notComing,          icon: '❌', color: 'text-red-500' },
                { label: 'אולי / לא ענו', value: maybe + pending, icon: '❓', color: 'text-amber-500' },
              ].map((s) => (
                <Card key={s.label} padding="md">
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-brand-muted mt-1">{s.label}</div>
                  <ProgressBar
                    value={Math.round((s.value / event.totalInvited) * 100)}
                    className="mt-3"
                    color={s.label === 'מגיעים' ? 'green' : s.label.includes('לא מגיעים') ? 'red' : 'brand'}
                  />
                </Card>
              ))}
            </div>

            {/* Overall progress */}
            <Card padding="md">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-brand-text">קצב ההתקדמות</h3>
                <span className="text-sm font-bold text-brand-purple">
                  {Math.round((event.rsvpConfirmed / event.totalInvited) * 100)}% אישרו
                </span>
              </div>
              <ProgressBar
                value={Math.round((event.rsvpConfirmed / event.totalInvited) * 100)}
                size="md"
                showPercent={false}
              />
              <div className="flex gap-4 mt-3 text-xs font-semibold">
                <span className="text-green-600">✓ {event.rsvpConfirmed} מגיעים</span>
                <span className="text-red-500">✗ {event.rsvpDeclined} לא מגיעים</span>
                <span className="text-brand-muted">? {event.rsvpPending} לא ענו</span>
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
              <p className="text-sm text-brand-muted leading-relaxed">
                שלח הזמנה ישירות לאנשי הקשר שלך עם הודעה מותאמת אישית.
              </p>
              <div className="bg-brand-bg rounded-xl p-4 text-sm text-brand-text leading-relaxed border border-brand-border">
                🎉 שלום! נשמח לראותכם באירוע המיוחד שלנו.<br />
                הנה הקישור להזמנה ולפרטים המלאים:<br />
                👉 <span className="text-brand-purple font-semibold">vimo.events/{event.slug}</span>
              </div>
              <button
                className="w-full py-3.5 rounded-2xl text-white font-bold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)', boxShadow: '0 4px 16px rgba(37,211,102,.3)' }}
              >
                📲 שליחה בוואטסאפ עכשיו
              </button>
            </Card>

            {/* Link & QR */}
            <Card padding="lg" className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center text-3xl">🔗</div>
              <h3 className="text-xl font-black text-brand-text">קישור ישיר + קוד QR</h3>

              <div className="flex gap-2">
                <div className="flex-1 px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg text-sm text-brand-muted truncate">
                  vimo.events/{event.slug}
                </div>
                <button
                  onClick={handleCopy}
                  className="px-4 py-2.5 rounded-xl border border-brand-border bg-white text-sm font-bold text-brand-text hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all whitespace-nowrap"
                >
                  {copied ? '✓ הועתק!' : 'העתק'}
                </button>
              </div>

              {/* QR placeholder */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-36 h-36 rounded-2xl border border-brand-border bg-brand-bg p-3 flex items-center justify-center">
                  <div
                    className="w-full h-full rounded opacity-80"
                    style={{
                      background: 'repeating-conic-gradient(#1E1F2B 0% 25%,transparent 0% 50%) 0 0 / 8px 8px',
                    }}
                  />
                </div>
                <p className="text-xs text-brand-muted text-center">הציגו את הקוד לסריקה בכניסה</p>
              </div>

              <button className="w-full py-2.5 rounded-xl border border-brand-border text-sm font-semibold text-brand-text hover:border-brand-purple hover:text-brand-purple transition-all flex items-center justify-center gap-2">
                ⬇️ הורד קוד QR
              </button>
            </Card>

            {/* Banner CTA */}
            <div
              className="rounded-3xl p-8 flex items-center justify-between gap-6"
              style={{ background: 'linear-gradient(135deg,#6C3BFF,#3BD1C6)' }}
            >
              <div>
                <h3 className="text-xl font-black text-white mb-1">מוכנים לצאת לדרך? 🚀</h3>
                <p className="text-sm text-white/75">זמן את כל האורחים בלחיצה אחת</p>
              </div>
              <button className="flex-shrink-0 px-6 py-3 rounded-xl font-bold text-white flex items-center gap-2 whitespace-nowrap" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
                שלח הזמנות ←
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
