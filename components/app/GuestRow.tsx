import type { Guest } from '@/types'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { GUEST_STATUS_LABELS } from '@/lib/data'
import clsx from 'clsx'

const statusVariant: Record<string, 'coming' | 'not' | 'maybe' | 'default'> = {
  coming:      'coming',
  'not-coming':'not',
  maybe:       'maybe',
  pending:     'default',
}

const statusIcon: Record<string, string> = {
  coming:      '✓',
  'not-coming':'✗',
  maybe:       '?',
  pending:     '–',
}

interface GuestRowProps {
  guest: Guest
  onEdit?: (id: string) => void
  onMessage?: (id: string) => void
}

export function GuestRow({ guest, onEdit, onMessage }: GuestRowProps) {
  return (
    <div className="grid grid-cols-[2fr_1fr_auto_2fr_auto] items-center gap-4 px-5 py-3.5 border-b border-brand-border last:border-0 hover:bg-violet-50/30 transition-colors">
      {/* Name */}
      <div className="flex items-center gap-3">
        <Avatar name={guest.name} size="sm" />
        <div>
          <p className="text-sm font-bold text-brand-text">{guest.name}</p>
          <p className="text-xs text-brand-muted">{guest.phone}</p>
        </div>
      </div>

      {/* Status */}
      <div>
        <Badge variant={statusVariant[guest.status]}>
          <span>{statusIcon[guest.status]}</span>
          {GUEST_STATUS_LABELS[guest.status]}
        </Badge>
      </div>

      {/* Count */}
      <div className="text-sm text-brand-text font-semibold text-center w-8">
        {guest.count > 0 ? guest.count : '–'}
      </div>

      {/* Message */}
      <div className="text-sm text-brand-muted truncate">
        {guest.message || '–'}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit?.(guest.id)}
          className="w-8 h-8 rounded-lg bg-brand-bg border border-brand-border text-brand-muted hover:border-brand-purple hover:text-brand-purple hover:bg-violet-50 flex items-center justify-center text-sm transition-all"
          title="ערוך"
        >
          ✏️
        </button>
        <button
          onClick={() => onMessage?.(guest.id)}
          className="w-8 h-8 rounded-lg bg-brand-bg border border-brand-border text-brand-muted hover:border-brand-teal hover:text-brand-teal hover:bg-teal-50 flex items-center justify-center text-sm transition-all"
          title="שלח הודעה"
        >
          💬
        </button>
      </div>
    </div>
  )
}

export function GuestTableHeader() {
  return (
    <div className="grid grid-cols-[2fr_1fr_auto_2fr_auto] gap-4 px-5 py-3 bg-brand-bg border-b border-brand-border rounded-t-2xl">
      {['שם האורח', 'סטטוס', 'כמות', 'הודעה', 'פעולות'].map((h) => (
        <div key={h} className="text-xs font-bold text-brand-muted uppercase tracking-wider">
          {h}
        </div>
      ))}
    </div>
  )
}
