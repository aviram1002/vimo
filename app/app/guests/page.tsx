'use client'
import { useState } from 'react'
import { AppTopBar } from '@/components/layout/AppTopBar'
import { GuestRow, GuestTableHeader } from '@/components/app/GuestRow'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { mockGuests } from '@/lib/data'
import type { GuestStatus } from '@/types'
import clsx from 'clsx'

const statusFilters: { id: GuestStatus | 'all'; label: string }[] = [
  { id: 'all',        label: 'כל הסטטוסים' },
  { id: 'coming',     label: '✓ מגיעים' },
  { id: 'not-coming', label: '✗ לא מגיעים' },
  { id: 'maybe',      label: '? אולי' },
  { id: 'pending',    label: '– לא ענו' },
]

export default function GuestsPage() {
  const [search, setSearch]           = useState('')
  const [statusFilter, setStatusFilter] = useState<GuestStatus | 'all'>('all')

  const filtered = mockGuests.filter((g) => {
    const matchSearch = g.name.includes(search) || g.phone.includes(search)
    const matchStatus = statusFilter === 'all' || g.status === statusFilter
    return matchSearch && matchStatus
  })

  const coming    = mockGuests.filter((g) => g.status === 'coming').length
  const notComing = mockGuests.filter((g) => g.status === 'not-coming').length
  const maybe     = mockGuests.filter((g) => g.status === 'maybe').length
  const pending   = mockGuests.filter((g) => g.status === 'pending').length
  const total     = mockGuests.length

  return (
    <div>
      <AppTopBar
        title="ניהול אורחים 👥"
        subtitle="מעקב ועדכון רשימת האורחים שלך"
        action={{ label: 'הוסף אורח' }}
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'סך מוזמנים',  value: total,     color: 'text-brand-purple', barColor: 'brand' as const, pct: 100 },
            { label: 'מגיעים',      value: coming,    color: 'text-green-600',    barColor: 'green' as const, pct: Math.round((coming/total)*100) },
            { label: 'לא מגיעים',  value: notComing, color: 'text-red-500',      barColor: 'red' as const,   pct: Math.round((notComing/total)*100) },
            { label: 'לא ענו',     value: pending,   color: 'text-amber-500',    barColor: 'amber' as const, pct: Math.round((pending/total)*100) },
          ].map((s) => (
            <div key={s.label} className="card p-5">
              <p className="text-xs text-brand-muted mb-1">{s.label}</p>
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
              <ProgressBar value={s.pct} color={s.barColor} className="mt-3" />
            </div>
          ))}
        </div>

        {/* Filter & search bar */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-48">
            <Input
              placeholder="🔍  חיפוש אורח לפי שם או טלפון..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {statusFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => setStatusFilter(f.id)}
                className={clsx(
                  'px-4 py-2 rounded-xl text-xs font-bold border transition-all',
                  statusFilter === f.id
                    ? 'border-brand-purple bg-violet-50 text-brand-purple'
                    : 'border-brand-border bg-white text-brand-muted hover:border-brand-purple hover:text-brand-purple'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm">⬇️ ייצוא לאקסל</Button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-brand-border shadow-card overflow-hidden">
          <GuestTableHeader />
          {filtered.length > 0 ? (
            filtered.map((guest) => (
              <GuestRow
                key={guest.id}
                guest={guest}
                onEdit={(id) => console.log('edit', id)}
                onMessage={(id) => console.log('message', id)}
              />
            ))
          ) : (
            <div className="py-16 text-center text-brand-muted">
              <div className="text-4xl mb-3">🔍</div>
              <p className="font-bold">לא נמצאו אורחים</p>
              <p className="text-sm mt-1">נסה לשנות את הפילטרים</p>
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-between items-center px-5 py-3.5 border-t border-brand-border bg-brand-bg rounded-b-3xl">
            <p className="text-xs text-brand-muted">
              מציג {filtered.length} מתוך {total} אורחים
            </p>
            <div className="flex gap-1">
              {['→', '1', '2', '3', '←'].map((p, i) => (
                <button
                  key={i}
                  className={clsx(
                    'w-8 h-8 rounded-lg border text-xs font-bold transition-all',
                    p === '1'
                      ? 'border-brand-purple text-white'
                      : 'border-brand-border bg-white text-brand-text hover:border-brand-purple hover:text-brand-purple'
                  )}
                  style={p === '1' ? { background: 'linear-gradient(135deg,#6C3BFF,#3BD1C6)' } : {}}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
