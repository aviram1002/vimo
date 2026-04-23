'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { AppTopBar } from '@/components/layout/AppTopBar'
import { GuestRow, GuestTableHeader } from '@/components/app/GuestRow'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Input } from '@/components/ui/Input'
import { supabase } from '@/lib/supabase/client'
import clsx from 'clsx'

const statusFilters = [
  { id: 'all',        label: 'הכל' },
  { id: 'coming',     label: '✓ מגיעים' },
  { id: 'not-coming', label: '✗ לא מגיעים' },
  { id: 'maybe',      label: '? אולי' },
  { id: 'pending',    label: '– לא ענו' },
]

export default function GuestsPage() {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [guests, setGuests]             = useState<any[]>([])
  const [events, setEvents]             = useState<any[]>([])
  const [selectedEvent, setSelectedEvent] = useState<string>('')
  const [loading, setLoading]           = useState(true)
  const [search, setSearch]             = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showModal, setShowModal]       = useState(false)
  const [importing, setImporting]       = useState(false)

  // New guest form
  const [newName,  setNewName]  = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newGroup, setNewGroup] = useState('כללי')
  const [saving,   setSaving]   = useState(false)

  useEffect(() => { loadEvents() }, [])
  useEffect(() => { if (selectedEvent) loadGuests() }, [selectedEvent])

  async function loadEvents() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { router.push('/login'); return }
    const { data } = await supabase.from('events').select('id,name').eq('user_id', session.user.id).order('date', { ascending: false })
    setEvents(data ?? [])
    if (data && data.length > 0) setSelectedEvent(data[0].id)
    else setLoading(false)
  }

  async function loadGuests() {
    setLoading(true)
    const { data } = await supabase.from('guests').select('*').eq('event_id', selectedEvent).order('created_at', { ascending: false })
    setGuests(data ?? [])
    setLoading(false)
  }

  async function handleAddGuest() {
    if (!newName || !selectedEvent) return
    setSaving(true)
    await supabase.from('guests').insert({ event_id: selectedEvent, name: newName, phone: newPhone || null, group_name: newGroup, status: 'pending', count: 1 })
    setNewName(''); setNewPhone(''); setNewGroup('כללי')
    setShowModal(false)
    setSaving(false)
    loadGuests()
  }

  async function handleExcelImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !selectedEvent) return
    setImporting(true)
    const text = await file.text()
    const lines = text.split('\n').filter(l => l.trim())
    const guests = lines.slice(1).map(line => {
      const cols = line.split(',')
      return { event_id: selectedEvent, name: cols[0]?.trim() || '', phone: cols[1]?.trim() || null, group_name: cols[2]?.trim() || 'כללי', status: 'pending', count: 1 }
    }).filter(g => g.name)
    if (guests.length > 0) {
      await supabase.from('guests').insert(guests)
      loadGuests()
    }
    setImporting(false)
    e.target.value = ''
  }

  async function handleExport() {
    const header = 'שם,טלפון,קבוצה,סטטוס,כמות'
    const rows = guests.map(g => `${g.name},${g.phone??''},${g.group_name},${g.status},${g.count}`)
    const csv = '\uFEFF' + [header, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'guests.csv'; a.click()
  }

  const filtered = guests.filter(g => {
    const matchSearch = g.name.includes(search) || (g.phone ?? '').includes(search)
    const matchStatus = statusFilter === 'all' || g.status === statusFilter
    return matchSearch && matchStatus
  })

  const coming    = guests.filter(g => g.status === 'coming').length
  const notComing = guests.filter(g => g.status === 'not-coming').length
  const pending   = guests.filter(g => g.status === 'pending').length
  const total     = guests.length

  return (
    <div>
      <AppTopBar title="ניהול אורחים 👥" subtitle="מעקב ועדכון רשימת האורחים שלך" />

      <div className="p-6 space-y-5">
        {/* Event selector */}
        {events.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {events.map(e => (
              <button key={e.id} onClick={() => setSelectedEvent(e.id)}
                className={clsx('px-4 py-2 rounded-xl text-sm font-bold border transition-all',
                  selectedEvent === e.id ? 'border-brand-purple bg-violet-50 text-brand-purple' : 'border-brand-border bg-white text-brand-muted hover:border-brand-purple')}>
                {e.name}
              </button>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label:'סך מוזמנים', value:total,     color:'text-brand-purple', barColor:'brand' as const, pct:100 },
            { label:'מגיעים',     value:coming,    color:'text-green-600',    barColor:'green' as const, pct:total?Math.round(coming/total*100):0 },
            { label:'לא מגיעים', value:notComing, color:'text-red-500',      barColor:'red' as const,   pct:total?Math.round(notComing/total*100):0 },
            { label:'לא ענו',    value:pending,   color:'text-amber-500',    barColor:'amber' as const, pct:total?Math.round(pending/total*100):0 },
          ].map(s => (
            <div key={s.label} className="card p-5">
              <p className="text-xs text-brand-muted mb-1">{s.label}</p>
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
              <ProgressBar value={s.pct} color={s.barColor} className="mt-3" />
            </div>
          ))}
        </div>

        {/* Actions bar */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-48">
            <Input placeholder="🔍  חיפוש..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2 flex-wrap">
            {statusFilters.map(f => (
              <button key={f.id} onClick={() => setStatusFilter(f.id)}
                className={clsx('px-3 py-2 rounded-xl text-xs font-bold border transition-all',
                  statusFilter === f.id ? 'border-brand-purple bg-violet-50 text-brand-purple' : 'border-brand-border bg-white text-brand-muted hover:border-brand-purple')}>
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowModal(true)} className="px-4 py-2 rounded-xl text-sm font-bold text-white" style={{background:'linear-gradient(135deg,#6C3BFF,#3BD1C6)'}}>
              + הוסף אורח
            </button>
            <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleExcelImport} />
            <button onClick={() => fileRef.current?.click()} disabled={importing} className="px-4 py-2 rounded-xl text-sm font-bold border border-brand-border bg-white text-brand-muted hover:border-brand-purple hover:text-brand-purple transition-all">
              {importing ? '...' : '📥 ייבוא CSV'}
            </button>
            <button onClick={handleExport} className="px-4 py-2 rounded-xl text-sm font-bold border border-brand-border bg-white text-brand-muted hover:border-brand-purple hover:text-brand-purple transition-all">
              📤 ייצוא
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-brand-border shadow-card overflow-hidden">
          <GuestTableHeader />
          {loading ? (
            <div className="py-16 text-center text-brand-muted">טוען...</div>
          ) : filtered.length > 0 ? (
            filtered.map(guest => (
              <GuestRow key={guest.id} guest={guest}
                onEdit={async id => {
                  const options = ['coming', 'not-coming', 'maybe', 'pending']
                  const labels  = ['מגיע', 'לא מגיע', 'אולי', 'לא ענה']
                  const current = guests.find(g => g.id === id)
                  const idx = options.indexOf(current?.status ?? 'pending')
                  const next = options[(idx + 1) % options.length]
                  await supabase.from('guests').update({ status: next }).eq('id', id)
                  loadGuests()
                }}
                onMessage={id => {
                  const g = guests.find(g => g.id === id)
                  if (g?.phone) window.open(`https://wa.me/972${g.phone.replace(/^0/,'')}`)
                }}
              />
            ))
          ) : (
            <div className="py-16 text-center text-brand-muted">
              <div className="text-4xl mb-3">{total === 0 ? '👥' : '🔍'}</div>
              <p className="font-bold">{total === 0 ? 'עדיין אין אורחים' : 'לא נמצאו תוצאות'}</p>
              {total === 0 && (
                <button onClick={() => setShowModal(true)} className="mt-4 px-5 py-2 rounded-xl text-white font-bold text-sm" style={{background:'linear-gradient(135deg,#6C3BFF,#3BD1C6)'}}>
                  + הוסף אורח ראשון
                </button>
              )}
            </div>
          )}
        </div>

        {/* CSV hint */}
        <p className="text-xs text-brand-muted text-center">
          💡 לייבוא CSV — פורמט: שם, טלפון, קבוצה (שורה ראשונה כותרות)
        </p>
      </div>

      {/* Add guest modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl space-y-4 animate-fade-up">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black text-brand-text">הוספת אורח חדש</h2>
              <button onClick={() => setShowModal(false)} className="text-brand-muted hover:text-brand-text text-2xl">✕</button>
            </div>

            <Input label="שם מלא *" value={newName} onChange={e => setNewName(e.target.value)} placeholder="ישראל ישראלי" />
            <Input label="טלפון" value={newPhone} onChange={e => setNewPhone(e.target.value)} placeholder="050-0000000" type="tel" />
            <div>
              <label className="text-sm font-semibold text-brand-muted block mb-1">קבוצה</label>
              <select className="input-base" value={newGroup} onChange={e => setNewGroup(e.target.value)}>
                <option>כללי</option>
                <option>משפחה</option>
                <option>חברים</option>
                <option>עבודה</option>
                <option>שכנים</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border border-brand-border text-brand-muted font-semibold hover:bg-brand-bg transition-colors">
                ביטול
              </button>
              <button onClick={handleAddGuest} disabled={saving || !newName} className="flex-1 py-3 rounded-xl text-white font-bold disabled:opacity-50 transition-all" style={{background:'linear-gradient(135deg,#6C3BFF,#3BD1C6)'}}>
                {saving ? 'שומר...' : '+ הוסף אורח'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
