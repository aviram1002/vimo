'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AppTopBar } from '@/components/layout/AppTopBar'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { supabase } from '@/lib/supabase/client'
import { createClient } from '@supabase/supabase-js'
import clsx from 'clsx'

const CATEGORIES = [
  { id:'all', label:'הכל' },
  { id:'wedding', label:'חתונה' },
  { id:'birthday', label:'יום הולדת' },
  { id:'business', label:'עסקי' },
  { id:'party', label:'מסיבה' },
  { id:'bar-mitzvah', label:'בר/בת מצווה' },
]

type PanelTab = 'text' | 'colors' | 'fonts'

export default function EditorPage() {
  const router = useRouter()
  const [view, setView]           = useState<'gallery'|'editor'>('gallery')
  const [activeFilter, setFilter] = useState('all')
  const [templates, setTemplates] = useState<any[]>([])
  const [selectedTemplate, setSelected] = useState<any>(null)
  const [saving, setSaving]       = useState(false)
  const [activePanel, setActivePanel] = useState<PanelTab>('text')

  const [eventName, setEventName] = useState('')
  const [names, setNames]         = useState('')
  const [date, setDate]           = useState('')
  const [time, setTime]           = useState('19:30')
  const [venue, setVenue]         = useState('')
  const [eventType, setEventType] = useState('wedding')
  const [emoji, setEmoji]         = useState('💍')
  const [fontSize, setFontSize]   = useState(24)

  useEffect(() => { loadTemplates() }, [])

  async function loadTemplates() {
    const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    const { data } = await db.from('templates').select('*').eq('is_active', true).order('sort_order')
    setTemplates(data ?? [])
  }

  const filtered = activeFilter === 'all' ? templates : templates.filter(t => t.category === activeFilter)

  // Generate URL-safe English slug
  function generateSlug(name: string, date: string) {
    const year = date ? new Date(date).getFullYear() : new Date().getFullYear()
    const clean = name
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase()
      .substring(0, 40)
    return clean + '-' + year
  }

  async function handleSave() {
    if (!eventName) { alert('נא להכניס שם לאירוע'); return }
    setSaving(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { router.push('/login'); return }

    const slug = generateSlug(eventName, date)

    const { data, error } = await supabase.from('events').insert({
      user_id:     session.user.id,
      template_id: selectedTemplate?.id ?? null,
      name:        eventName,
      type:        eventType,
      date:        date || new Date().toISOString().split('T')[0],
      time,
      venue:       venue || null,
      emoji,
      status:      'published', // ← פורסם מיד!
      slug,
      design:      { names, fontSize, preview_css: selectedTemplate?.preview_css },
    }).select().single()

    setSaving(false)
    if (!error && data) {
      router.push('/app/dashboard')
    } else {
      alert('שגיאה: ' + error?.message)
    }
  }

  if (view === 'editor') return (
    <div className="flex flex-col h-screen overflow-hidden">
      <AppTopBar title="עורך הזמנות ✏️" subtitle="עיצוב חי – ראה את התוצאה בזמן אמת" />
      <div className="flex flex-1 overflow-hidden">
        {/* Preview */}
        <div className="flex-1 flex items-center justify-center bg-slate-100 relative"
          style={{backgroundImage:'radial-gradient(circle,#C7C9E0 1px,transparent 1px)',backgroundSize:'24px 24px'}}>
          <button onClick={() => setView('gallery')} className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-white border border-brand-border text-sm font-semibold text-brand-muted hover:text-brand-purple hover:border-brand-purple transition-all">
            ← חזור לגלריה
          </button>
          <div className="w-64 rounded-[36px] overflow-hidden flex flex-col"
            style={{background:selectedTemplate?.preview_css??'linear-gradient(160deg,#fdf6ff,#f0f4ff)',boxShadow:'0 20px 60px rgba(30,31,43,.25), 0 0 0 8px #1E1F2B'}}>
            <div className="w-24 h-5 bg-brand-text rounded-b-2xl mx-auto flex-shrink-0" />
            <div className="flex-1 px-5 py-4 flex flex-col items-center justify-center gap-3 text-center min-h-[440px]">
              <div className="text-4xl">{emoji}</div>
              <div className="font-black" style={{fontSize:`${fontSize}px`,background:'linear-gradient(135deg,#6C3BFF,#3BD1C6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
                {eventName || 'שם האירוע'}
              </div>
              {names && <div className="text-lg font-black text-brand-text">{names}</div>}
              <div className="w-8 h-0.5 rounded-full bg-gradient-to-l from-brand-purple to-brand-teal" />
              {date && <div className="text-base font-black text-brand-purple">{new Date(date).toLocaleDateString('he-IL')}</div>}
              {venue && <div className="text-sm text-brand-muted">{venue}</div>}
              <button className="w-full py-2.5 rounded-xl text-white text-sm font-bold mt-2" style={{background:'linear-gradient(135deg,#6C3BFF,#3BD1C6)'}}>
                אישור הגעה (RSVP)
              </button>
            </div>
          </div>
        </div>

        {/* Panel */}
        <div className="w-80 bg-white border-r border-brand-border flex flex-col">
          <div className="flex border-b border-brand-border">
            {(['text','colors','fonts'] as PanelTab[]).map(tab => (
              <button key={tab} onClick={() => setActivePanel(tab)}
                className={clsx('flex-1 py-3 text-xs font-semibold transition-colors relative', activePanel===tab?'text-brand-purple':'text-brand-muted hover:text-brand-text')}>
                {tab==='text'?'✏️ טקסט':tab==='colors'?'🎨 צבעים':'A גופנים'}
                {activePanel===tab && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-l from-brand-purple to-brand-teal" />}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {activePanel === 'text' && <>
              <Input label="שם האירוע *" value={eventName} onChange={e => setEventName(e.target.value)} placeholder="החתונה של נועה ודניאל" />
              <Input label="שמות המארחים" value={names} onChange={e => setNames(e.target.value)} placeholder="נועה ודניאל" />
              <div className="grid grid-cols-2 gap-3">
                <Input label="תאריך" type="date" value={date} onChange={e => setDate(e.target.value)} />
                <Input label="שעה" type="time" value={time} onChange={e => setTime(e.target.value)} />
              </div>
              <Input label="מיקום" value={venue} onChange={e => setVenue(e.target.value)} placeholder="הוילה בקיסריה" />
              <div>
                <label className="text-sm font-semibold text-brand-muted block mb-1">סוג אירוע</label>
                <select className="input-base" value={eventType} onChange={e => setEventType(e.target.value)}>
                  <option value="wedding">💍 חתונה</option>
                  <option value="birthday">🎂 יום הולדת</option>
                  <option value="business">🏢 עסקי</option>
                  <option value="party">🎉 מסיבה</option>
                  <option value="bar-mitzvah">✡️ בר/בת מצווה</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-brand-muted block mb-1">אמוג'י</label>
                <div className="flex gap-2 flex-wrap">
                  {['💍','🎂','🎉','✡️','🏢','🌸','🎊','❤️'].map(e => (
                    <button key={e} onClick={() => setEmoji(e)}
                      className={clsx('w-10 h-10 text-xl rounded-xl border-2 transition-all', emoji===e?'border-brand-purple bg-violet-50':'border-brand-border hover:border-brand-purple')}>
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            </>}
            {activePanel === 'colors' && (
              <div className="space-y-3">
                <p className="text-sm font-bold text-brand-text">לוח צבעים</p>
                <div className="flex gap-2 flex-wrap">
                  {['linear-gradient(135deg,#6C3BFF,#3BD1C6)','linear-gradient(160deg,#fdf6ff,#f0eeff)','linear-gradient(160deg,#fff0f8,#ffe0f0)','linear-gradient(160deg,#0f0f1a,#1a1a2e)','linear-gradient(160deg,#e0f7fa,#b2ebf2)','linear-gradient(135deg,#FF4FA3,#FF8C42)'].map((p,i) => (
                    <button key={i} className="w-10 h-10 rounded-xl border-2 border-transparent hover:border-brand-text hover:scale-110 transition-all"
                      style={{background:p}} onClick={() => setSelected({...selectedTemplate, preview_css:p})} />
                  ))}
                </div>
              </div>
            )}
            {activePanel === 'fonts' && (
              <div className="space-y-3">
                {['Heebo – עברי נקי','Assistant – קל ואוורירי','Frank Ruhl – קלאסי'].map(f => (
                  <button key={f} className="w-full p-3 rounded-xl border border-brand-border bg-brand-bg text-sm font-semibold hover:border-brand-purple hover:text-brand-purple hover:bg-violet-50 transition-all text-right">{f}</button>
                ))}
              </div>
            )}
          </div>
          <div className="p-4 border-t border-brand-border flex gap-2">
            <button onClick={() => setView('gallery')} className="flex-1 py-2.5 rounded-xl border border-brand-border text-sm font-semibold text-brand-text hover:border-brand-purple hover:text-brand-purple transition-all">
              חזור
            </button>
            <Button variant="gradient" size="md" className="flex-1" loading={saving} onClick={handleSave}>
              🚀 פרסם אירוע
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <AppTopBar title="גלריית תבניות 🎨" subtitle="בחר עיצוב מושלם לאירוע שלך" />
      <div className="p-6">
        <div className="flex gap-2 mb-6 flex-wrap">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setFilter(cat.id)}
              className={clsx('px-5 py-2 rounded-full text-sm font-bold transition-all', activeFilter===cat.id?'text-white':'bg-white border border-brand-border text-brand-muted hover:border-brand-purple hover:text-brand-purple')}
              style={activeFilter===cat.id?{background:'linear-gradient(135deg,#6C3BFF,#3BD1C6)'}:{}}>
              {cat.label}
            </button>
          ))}
        </div>
        {templates.length === 0 ? (
          <div className="text-center py-20 text-brand-muted"><div className="text-4xl mb-3">🎨</div><p className="font-bold">טוען תבניות...</p></div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map(t => (
              <div key={t.id} className="card overflow-hidden cursor-pointer group">
                <div className="relative h-72 overflow-hidden" style={{background:t.preview_css}}>
                  {t.is_premium && <div className="absolute top-3 right-3"><span className="bg-gradient-to-r from-amber-400 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">Premium</span></div>}
                  <div className="absolute inset-0 bg-brand-text/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={() => { setSelected(t); setView('editor') }}
                      className="px-5 py-2.5 rounded-xl text-white font-bold text-sm translate-y-2 group-hover:translate-y-0 transition-transform"
                      style={{background:'linear-gradient(135deg,#6C3BFF,#3BD1C6)',boxShadow:'0 4px 20px rgba(0,0,0,.3)'}}>
                      בחר עיצוב
                    </button>
                  </div>
                </div>
                <div className="p-4 border-t border-brand-border">
                  <p className="text-sm font-bold text-brand-text">{t.name_he}</p>
                  <p className="text-xs text-brand-muted mt-1">{t.tags?.join(' • ')}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
