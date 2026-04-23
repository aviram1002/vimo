'use client'
import Link from 'next/link'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Badge } from '@/components/ui/Badge'

interface EventCardProps {
  event: any
}

const eventColors: Record<string, string> = {
  wedding:      'linear-gradient(135deg,#667eea,#764ba2)',
  birthday:     'linear-gradient(135deg,#f093fb,#f5576c)',
  business:     'linear-gradient(135deg,#0f2027,#2c5364)',
  party:        'linear-gradient(135deg,#ee0979,#ff6a00)',
  'bar-mitzvah':'linear-gradient(135deg,#43e97b,#38f9d7)',
  other:        'linear-gradient(135deg,#4facfe,#00f2fe)',
}

const EVENT_TYPE_LABELS: Record<string, string> = {
  wedding:      'חתונה',
  birthday:     'יום הולדת',
  business:     'עסקי',
  party:        'מסיבה',
  'bar-mitzvah':'בר/בת מצווה',
  other:        'אחר',
}

export function EventCard({ event }: EventCardProps) {
  const totalInvited   = event.total_invited   ?? event.totalInvited   ?? 0
  const rsvpConfirmed  = event.rsvp_confirmed  ?? event.rsvpConfirmed  ?? 0
  const rsvpDeclined   = event.rsvp_declined   ?? event.rsvpDeclined   ?? 0
  const rsvpPending    = event.rsvp_pending    ?? event.rsvpPending    ?? 0
  const coverGradient  = event.cover_gradient  ?? event.coverGradient  ?? null

  const pct = totalInvited > 0 ? Math.round((rsvpConfirmed / totalInvited) * 100) : 0

  const formattedDate = event.date
    ? new Date(event.date).toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''

  return (
    <div className="card card-lift overflow-hidden flex flex-col">
      {/* Thumb */}
      <div
        className="h-40 flex items-center justify-center text-5xl relative"
        style={{ background: coverGradient || eventColors[event.type] || eventColors.other }}
      >
        <span>{event.emoji ?? '🎉'}</span>
        <div className="absolute top-3 right-3">
          <Badge variant={event.status === 'published' ? 'coming' : 'default'}>
            {event.status === 'published' ? 'פעיל' : 'טיוטה'}
          </Badge>
        </div>
        <div className="absolute top-3 left-3">
          <span className="text-xs font-bold text-white px-2 py-1 rounded-full"
            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)' }}>
            {EVENT_TYPE_LABELS[event.type] ?? 'אירוע'}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="text-base font-bold text-brand-text leading-snug">{event.name}</h3>
          {formattedDate && (
            <p className="text-xs text-brand-muted mt-1">📅 {formattedDate}</p>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-brand-muted">
              <strong className="text-brand-text">{rsvpConfirmed}</strong> / {totalInvited} אישרו הגעה
            </span>
            <span className="text-xs font-bold text-brand-purple">{pct}%</span>
          </div>
          <ProgressBar value={pct} />
        </div>

        <div className="flex gap-4 text-xs">
          <span className="text-green-600 font-semibold">✓ {rsvpConfirmed}</span>
          <span className="text-red-500 font-semibold">✗ {rsvpDeclined}</span>
          <span className="text-brand-muted">? {rsvpPending}</span>
        </div>

        <div className="flex gap-2 mt-auto pt-1">
          <Link href={`/app/guests?event=${event.id}`}
            className="flex-1 py-2 text-center text-xs font-semibold text-brand-muted bg-brand-bg rounded-xl hover:bg-violet-50 hover:text-brand-purple transition-colors">
            אורחים
          </Link>
          <Link href={`/app/editor?event=${event.id}`}
            className="flex-1 py-2 text-center text-xs font-semibold text-brand-muted bg-brand-bg rounded-xl hover:bg-violet-50 hover:text-brand-purple transition-colors">
            ערוך
          </Link>
          <Link href={`/app/rsvp?event=${event.id}`}
            className="flex-1 py-2 text-center text-xs font-bold text-white rounded-xl transition-all"
            style={{ background: 'linear-gradient(135deg,#6C3BFF,#3BD1C6)' }}>
            צפייה
          </Link>
        </div>
      </div>
    </div>
  )
}

export function AddEventCard() {
  return (
    <Link href="/app/editor">
      <div className="border-2 border-dashed border-brand-border rounded-3xl flex flex-col items-center justify-center gap-3 min-h-[280px] cursor-pointer hover:border-brand-purple hover:bg-violet-50/30 transition-all group">
        <div className="w-14 h-14 rounded-full flex items-center justify-center text-3xl text-white group-hover:scale-110 transition-transform"
          style={{ background: 'linear-gradient(135deg,#6C3BFF,#3BD1C6)', boxShadow: '0 4px 18px rgba(108,59,255,.3)' }}>
          +
        </div>
        <p className="text-base font-bold text-brand-muted group-hover:text-brand-purple">הוסף אירוע חדש</p>
        <p className="text-xs text-brand-muted opacity-70 text-center px-6">התחל לתכנן את האירוע שלך בכמה קליקים</p>
      </div>
    </Link>
  )
}
