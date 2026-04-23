'use client'
import Link from 'next/link'
import type { VimoEvent } from '@/types'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Badge } from '@/components/ui/Badge'
import { EVENT_TYPE_LABELS } from '@/lib/data'
import clsx from 'clsx'

interface EventCardProps {
  event: VimoEvent
}

const eventColors: Record<string, string> = {
  wedding:    'linear-gradient(135deg,#667eea,#764ba2)',
  birthday:   'linear-gradient(135deg,#f093fb,#f5576c)',
  business:   'linear-gradient(135deg,#0f2027,#2c5364)',
  party:      'linear-gradient(135deg,#ee0979,#ff6a00)',
  'bar-mitzvah': 'linear-gradient(135deg,#43e97b,#38f9d7)',
  other:      'linear-gradient(135deg,#4facfe,#00f2fe)',
}

export function EventCard({ event }: EventCardProps) {
  const pct = event.totalInvited > 0
    ? Math.round((event.rsvpConfirmed / event.totalInvited) * 100)
    : 0

  const formattedDate = new Date(event.date).toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="card card-lift overflow-hidden flex flex-col">
      {/* Thumb */}
      <div
        className="h-40 flex items-center justify-center text-5xl relative"
        style={{ background: event.coverGradient || eventColors[event.type] }}
      >
        <span>{event.emoji}</span>
        <div className="absolute top-3 right-3">
          <Badge variant={event.status === 'published' ? 'coming' : 'default'}>
            {event.status === 'published' ? 'פעיל' : 'טיוטה'}
          </Badge>
        </div>
        <div className="absolute top-3 left-3">
          <span
            className="text-xs font-bold text-white px-2 py-1 rounded-full"
            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)' }}
          >
            {EVENT_TYPE_LABELS[event.type]}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="text-base font-bold text-brand-text leading-snug">{event.name}</h3>
          <p className="text-xs text-brand-muted mt-1 flex items-center gap-1">
            📅 {formattedDate}
          </p>
        </div>

        {/* RSVP progress */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-brand-muted">
              <strong className="text-brand-text">{event.rsvpConfirmed}</strong> / {event.totalInvited} אישרו הגעה
            </span>
            <span className="text-xs font-bold text-brand-purple">{pct}%</span>
          </div>
          <ProgressBar value={pct} />
        </div>

        {/* Quick stats */}
        <div className="flex gap-4 text-xs">
          <span className="text-green-600 font-semibold">✓ {event.rsvpConfirmed} מגיעים</span>
          <span className="text-red-500 font-semibold">✗ {event.rsvpDeclined} לא מגיעים</span>
          <span className="text-brand-muted">? {event.rsvpPending} לא ענו</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-1">
          <Link
            href={`/app/rsvp?event=${event.id}`}
            className="flex-1 py-2 text-center text-xs font-semibold text-brand-muted bg-brand-bg rounded-xl hover:bg-violet-50 hover:text-brand-purple transition-colors"
          >
            אורחים
          </Link>
          <Link
            href={`/app/editor?event=${event.id}`}
            className="flex-1 py-2 text-center text-xs font-semibold text-brand-muted bg-brand-bg rounded-xl hover:bg-violet-50 hover:text-brand-purple transition-colors"
          >
            ערוך
          </Link>
          <Link
            href={`/app/rsvp?event=${event.id}`}
            className="flex-1 py-2 text-center text-xs font-bold text-white rounded-xl transition-all"
            style={{ background: 'linear-gradient(135deg,#6C3BFF,#3BD1C6)' }}
          >
            צפייה
          </Link>
        </div>
      </div>
    </div>
  )
}

export function AddEventCard() {
  return (
    <div className="border-2 border-dashed border-brand-border rounded-3xl flex flex-col items-center justify-center gap-3 min-h-[320px] cursor-pointer hover:border-brand-purple hover:bg-violet-50/30 transition-all group">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-3xl text-white group-hover:scale-110 transition-transform"
        style={{ background: 'linear-gradient(135deg,#6C3BFF,#3BD1C6)', boxShadow: '0 4px 18px rgba(108,59,255,0.3)' }}
      >
        +
      </div>
      <p className="text-base font-bold text-brand-muted group-hover:text-brand-purple">הוסף אירוע חדש</p>
      <p className="text-xs text-brand-muted opacity-70 text-center px-6">
        התחל לתכנן את האירוע שלך בכמה קליקים
      </p>
    </div>
  )
}
