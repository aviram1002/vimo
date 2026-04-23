'use client'
import { useState, useEffect } from 'react'
import { AppTopBar } from '@/components/layout/AppTopBar'
import { GuestRow, GuestTableHeader } from '@/components/app/GuestRow'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { supabase } from '@/lib/supabase/client'
import type { Guest } from '@/lib/supabase/types'
import clsx from 'clsx'

type StatusFilter = Guest['status'] | 'all'

const statusFilters: { id: StatusFilter; label: string }[] = [
  { id: 'all',        label: 'כל הסטטוסים' },
  { id: 'coming',     label: '✓ מגיעים' },
  { id: 'not-coming', label: '✗ לא מגיעים' },
  { id: 'maybe',      label: '? אולי' },
  { id: 'pending',    label: '– לא ענו' },
]

export default function GuestsPage() {
  const [guests, setGuests]           = useState<Guest[]>([])
  const [loading, setLoading]         = useState(true)
  const [search, setSearch]           = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [events, setEvents]           = useState<{id:string;name:string}[]>([])
  const [selectedEvent, setSelectedEvent] = useState<string>('all')

  useEffect(() => {
    loadEvents()
  }, [])

  useEffect(() => {
    loadGuests()
  }, [selectedEvent])

  async function loadEvents() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase
      .from('events')
      .select('id, name')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
    setEvents(data ?? [])
    if (data && data.length > 0) setSelectedEvent(data[0].id)
  }

  async function loadGuests() {
    if (selectedEvent === 'all') { setGuests([]); setLoading(false); return }
    setLoading(true)
    const { data } = await supabase
      .from('guests')
      .select('*')
      .eq('event_id', selectedEvent)
      .order('created_at', { ascending: false })
    setGuests(data ?? [])
    setLoading(false)
  }

  async function handleAddGuest() {
    const name = prompt('שם האורח:')
    if (!name || !selectedEvent) return
    const phone = prompt('טלפון (אופציונלי):') ?? undefined
    await supabase.from('guests').insert({
      event_id: selectedEvent,
      name,
      phone: phone || null,
      status: 'pending',
      count: 1,
      group_name: 'כללי',
    })
    loadGuests()
  }

  const filtered = guests.filter((g) => {
    const matchSearch = g.name.includes(search) || (g.phone ?? '').includes(search)
    const matchStatus = statusFilter === 'all' || g.status === statusFilter
    return matchSearch && matchStatus
  })

  const coming    = guests.filter(g => g.status === 'coming').length
  const notComing = guests.filter(g => g.status === 'not-coming').length
  const maybe     = guests.filter(g => g.status === 'maybe').length
  const pending   = guests.filter(g => g.status === 'pending').length
  const total     = guests.length

  return (
    <div>
      <AppTopBar
        title="ניהול אורחים 👥"
        subtitle="מעקב ועדכון רשימת האורחים שלך"
        action={{ label: 'הוסף אורח', onClick: handleAddGuest }}
      />

      <div className="p-6 space-y-6">
        {/* Event selector */}
        {events.length > 0 && (
          <div className="flex gap-3 flex-wrap">
            {events.map(e => (
              <button
                key={e.id}
                onClick={() => setSelectedEvent(e.id)}
                className={clsx(
                  'px-4 py-2 rounded-xl text-sm font-bold border transition-all',
                  selectedEvent === e.id
                    ? 'border-brand-purple bg-violet-50 text-brand-purple'
                    : 'border-brand-border bg-white text-brand-muted hover:border-brand-purple'
                )}
              >
                {e.name}
              </button>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'סך מוזמנים',  value: total,     color: 'text-brand-purple', barColor: 'brand' as const, pct: 100 },
            { label: 'מגיעים',      value: coming,    color: 'text-green-600',    barColor: 'green' as const, pct: total ? Math.round((coming/total)*100) : 0 },
            { label: 'לא מגיעים',  value: notComing, color: 'text-red-500',      barColor: 'red' as const,   pct: total ? Math.round((notComing/total)*100) : 0 },
            { label: 'לא ענו',     value: pending,   color: 'text-amber-500',    barColor: 'amber' as const, pct: total ? Math.round((pending/total)*100) : 0 },
          ].map(s => (
            <div key={s.label} className="card p-5">
              <p className="text-xs text-brand-muted mb-1">{s.label}</p>
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
              <ProgressBar value={s.pct} color={s.barColor} className="mt-3" />
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-48">
            <Input
              placeholder="🔍  חיפוש אורח לפי שם או טלפון..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {statusFilters.map(f => (
              <button
                key={f.id}
                onClick={() => setStatusFilter(f.id)}
                className={clsx(
                  'px-4 py-2 rounded-xl text-xs font-bold border transition-all',
                  statusFilter === f.id
                    ? 'border-brand-purple bg-violet-50 text-brand-purple'
                    : 'border-brand-border bg-white text-brand-muted hover:border-brand-purple'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-brand-border shadow-card overflow-hidden">
          <GuestTableHeader />
          {loading ? (
            <div className="py-16 text-center text-brand-muted">טוען...</div>
          ) : filtered.length > 0 ? (
            filtered.map(guest => (
              <GuestRow
                key={guest.id}
                guest={guest}
                onEdit={async (id) => {
                  const newStatus = prompt('סטטוס חדש (coming/not-coming/maybe/pending):') as Guest['status']
                  if (!newStatus) return
                  await supabase.from('guests').update({ status: newStatus }).eq('id', id)
                  loadGuests()
                }}
                onMessage={(id) => {
                  const g = guests.find(g => g.id === id)
                  if (g?.phone) window.open(`https://wa.me/972${g.phone.replace(/^0/, '')}`)
                }}
              />
            ))
          ) : (
            <div className="py-16 text-center text-brand-muted">
              <div className="text-4xl mb-3">{total === 0 ? '👥' : '🔍'}</div>
              <p className="font-bold">{total === 0 ? 'עדיין אין אורחים' : 'לא נמצאו אורחים'}</p>
              {total === 0 && (
                <button onClick={handleAddGuest} className="mt-4 px-5 py-2 rounded-xl text-white font-bold text-sm" style={{background:'linear-gradient(135deg,#6C3BFF,#3BD1C6)'}}>
                  + הוסף אורח ראשון
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
