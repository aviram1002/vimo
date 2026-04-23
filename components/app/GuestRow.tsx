import clsx from 'clsx'

const statusVariant: Record<string, string> = {
  coming:       'bg-green-100 text-green-700',
  'not-coming': 'bg-red-100 text-red-700',
  maybe:        'bg-amber-100 text-amber-700',
  pending:      'bg-gray-100 text-gray-600',
}

const statusLabel: Record<string, string> = {
  coming:       'מגיע',
  'not-coming': 'לא מגיע',
  maybe:        'אולי',
  pending:      'לא ענה',
}

const statusIcon: Record<string, string> = {
  coming:       '✓',
  'not-coming': '✗',
  maybe:        '?',
  pending:      '–',
}

interface GuestRowProps {
  guest: any
  onEdit?: (id: string) => void
  onMessage?: (id: string) => void
}

export function GuestRow({ guest, onEdit, onMessage }: GuestRowProps) {
  return (
    <div className="grid grid-cols-[2fr_1fr_auto_2fr_auto] items-center gap-4 px-5 py-3.5 border-b border-brand-border last:border-0 hover:bg-violet-50/30 transition-colors">
      {/* Name */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 bg-violet-100 text-violet-700">
          {guest.name?.charAt(0) ?? '?'}
        </div>
        <div>
          <p className="text-sm font-bold text-brand-text">{guest.name}</p>
          <p className="text-xs text-brand-muted">{guest.phone ?? '–'}</p>
        </div>
      </div>

      {/* Status */}
      <div>
        <span className={clsx('inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold', statusVariant[guest.status] ?? statusVariant.pending)}>
          {statusIcon[guest.status] ?? '–'} {statusLabel[guest.status] ?? guest.status}
        </span>
      </div>

      {/* Count */}
      <div className="text-sm font-semibold text-brand-text text-center w-8">
        {guest.count > 0 ? guest.count : '–'}
      </div>

      {/* Message */}
      <div className="text-sm text-brand-muted truncate">
        {guest.message || '–'}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button onClick={() => onEdit?.(guest.id)}
          className="w-8 h-8 rounded-lg bg-brand-bg border border-brand-border text-brand-muted hover:border-brand-purple hover:text-brand-purple hover:bg-violet-50 flex items-center justify-center text-sm transition-all">
          ✏️
        </button>
        <button onClick={() => onMessage?.(guest.id)}
          className="w-8 h-8 rounded-lg bg-brand-bg border border-brand-border text-brand-muted hover:border-brand-teal hover:text-brand-teal hover:bg-teal-50 flex items-center justify-center text-sm transition-all">
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
        <div key={h} className="text-xs font-bold text-brand-muted uppercase tracking-wider">{h}</div>
      ))}
    </div>
  )
}
