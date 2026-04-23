'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { createClient } from '@supabase/supabase-js'

function getClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

export default function RSVPPublicPage({ params }: { params: { slug: string } }) {
  const [event, setEvent]   = useState<any>(null)
  const [status, setStatus] = useState<string>('')
  const [name, setName]     = useState('')
  const [phone, setPhone]   = useState('')
  const [count, setCount]   = useState(1)
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(false)
  const [error, setError]       = useState('')

  useEffect(() => { loadEvent() }, [])

  async function loadEvent() {
    const db = getClient()
    // Try exact slug first, then URL-decoded
    const slug = decodeURIComponent(params.slug)
    const { data } = await db.from('events').select('*').or(`slug.eq.${params.slug},slug.eq.${slug}`).eq('status', 'published').single()
    setEvent(data)
    setLoading(false)
  }

  async function handleSubmit() {
    if (!name || !status) { setError('נא למלא שם וסטטוס'); return }
    setSaving(true)
    const db = getClient()
    const { error: err } = await db.from('guests').insert({
      event_id:   event.id,
      name,
      phone:      phone || null,
      status,
      count,
      message:    message || null,
      group_name: 'כללי',
    })
    if (err) { setError('שגיאה בשמירה, נסה שוב'); setSaving(false); return }
    setSubmitted(true)
    setSaving(false)
  }

  if (loading) return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center">
      <div className="text-4xl animate-pulse">⏳</div>
    </div>
  )

  if (!event) return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center text-center p-4">
      <div>
        <div className="text-5xl mb-4">😕</div>
        <h1 className="text-2xl font-black text-brand-text mb-2">ההזמנה לא נמצאה</h1>
        <p className="text-brand-muted">ייתכן שהקישור שגוי או שהאירוע הסתיים</p>
      </div>
    </div>
  )

  if (submitted) return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-10 shadow-card border border-brand-border max-w-md w-full text-center">
        <div className="text-6xl mb-4">{status === 'coming' ? '🎉' : status === 'not-coming' ? '😢' : '🤔'}</div>
        <h2 className="text-2xl font-black text-brand-text mb-2">
          {status === 'coming' ? 'תודה! נתראה שם!' : status === 'not-coming' ? 'חבל, נתגעגע!' : 'תודה על התשובה!'}
        </h2>
        <p className="text-brand-muted">{event.name}</p>
        <p className="text-sm text-brand-muted mt-1">{event.date} | {event.venue}</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md space-y-4">
        {/* Invitation card */}
        <div className="bg-white rounded-3xl p-8 shadow-card border border-brand-border text-center">
          <div className="text-5xl mb-3">{event.emoji}</div>
          <h1 className="text-2xl font-black text-brand-text mb-1">{event.name}</h1>
          <div className="w-10 h-0.5 mx-auto my-3 rounded-full" style={{background:'linear-gradient(90deg,#6C3BFF,#3BD1C6)'}} />
          {event.date && <p className="text-lg font-black text-brand-purple">{new Date(event.date).toLocaleDateString('he-IL', {day:'numeric',month:'long',year:'numeric'})}</p>}
          {event.time && <p className="text-sm text-brand-muted mt-1">🕐 {event.time}</p>}
          {event.venue && <p className="text-sm text-brand-muted mt-1">📍 {event.venue}</p>}
        </div>

        {/* RSVP form */}
        <div className="bg-white rounded-3xl p-6 shadow-card border border-brand-border space-y-4">
          <h2 className="font-black text-brand-text text-center">אישור הגעה</h2>

          <div>
            <label className="text-sm font-semibold text-brand-muted block mb-1">שמך המלא *</label>
            <input className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg text-sm outline-none focus:border-brand-purple transition-colors"
              value={name} onChange={e => setName(e.target.value)} placeholder="ישראל ישראלי" />
          </div>

          <div>
            <label className="text-sm font-semibold text-brand-muted block mb-1">טלפון (אופציונלי)</label>
            <input className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg text-sm outline-none focus:border-brand-purple transition-colors"
              value={phone} onChange={e => setPhone(e.target.value)} placeholder="050-0000000" type="tel" />
          </div>

          <div>
            <label className="text-sm font-semibold text-brand-muted block mb-2">האם תגיע/י? *</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id:'coming',     label:'✓ מגיע/ה',    color:'border-green-400 bg-green-50 text-green-700' },
                { id:'not-coming', label:'✗ לא מגיע/ה', color:'border-red-400 bg-red-50 text-red-700' },
                { id:'maybe',      label:'? אולי',       color:'border-amber-400 bg-amber-50 text-amber-700' },
              ].map(opt => (
                <button key={opt.id} onClick={() => setStatus(opt.id)}
                  className={`py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${status === opt.id ? opt.color : 'border-brand-border bg-brand-bg text-brand-muted'}`}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {status === 'coming' && (
            <div>
              <label className="text-sm font-semibold text-brand-muted block mb-1">כמה אנשים מגיעים?</label>
              <div className="flex items-center gap-3">
                <button onClick={() => setCount(Math.max(1, count-1))} className="w-9 h-9 rounded-xl border border-brand-border text-lg hover:border-brand-purple transition-colors flex items-center justify-center">−</button>
                <span className="text-xl font-black w-8 text-center">{count}</span>
                <button onClick={() => setCount(count+1)} className="w-9 h-9 rounded-xl border border-brand-border text-lg hover:border-brand-purple transition-colors flex items-center justify-center">+</button>
              </div>
            </div>
          )}

          <div>
            <label className="text-sm font-semibold text-brand-muted block mb-1">הודעה למארחים (אופציונלי)</label>
            <textarea className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg text-sm outline-none focus:border-brand-purple transition-colors resize-none h-20"
              value={message} onChange={e => setMessage(e.target.value)} placeholder="מזל טוב! מחכים לחגוג אתכם..." />
          </div>

          {error && <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-xl">{error}</p>}

          <button onClick={handleSubmit} disabled={saving || !status || !name}
            className="w-full py-3.5 rounded-2xl text-white font-bold disabled:opacity-50 transition-all"
            style={{background:'linear-gradient(135deg,#6C3BFF,#3BD1C6)'}}>
            {saving ? 'שולח...' : 'שלח אישור'}
          </button>
        </div>

        <p className="text-center text-xs text-brand-muted">מופעל על ידי <span className="font-bold text-brand-purple">Vimo</span></p>
      </div>
    </div>
  )
}
