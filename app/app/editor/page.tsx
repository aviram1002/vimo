'use client'
import { useState } from 'react'
import { AppTopBar } from '@/components/layout/AppTopBar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { mockTemplates } from '@/lib/data'
import type { Template } from '@/types'
import clsx from 'clsx'

const filterCategories = [
  { id: 'all',        label: 'הכל' },
  { id: 'wedding',    label: 'חתונה' },
  { id: 'birthday',   label: 'יום הולדת' },
  { id: 'business',   label: 'עסקי' },
  { id: 'party',      label: 'מסיבה' },
  { id: 'bar-mitzvah',label: 'בר/בת מצווה' },
]

type PanelTab = 'text' | 'images' | 'colors' | 'fonts'

export default function EditorPage() {
  const [view, setView]             = useState<'gallery' | 'editor'>('gallery')
  const [activeFilter, setFilter]   = useState('all')
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)

  // Editor state
  const [activePanel, setActivePanel] = useState<PanelTab>('text')
  const [title, setTitle]  = useState('מזל טוב!')
  const [names, setNames]  = useState('יונתן ואלונה')
  const [date, setDate]    = useState('24.06.2024')
  const [venue, setVenue]  = useState('חוות אלנבי, גבעת אבא')
  const [fontSize, setFontSize] = useState(24)

  const filtered = activeFilter === 'all'
    ? mockTemplates
    : mockTemplates.filter((t) => t.category === activeFilter)

  function handleSelectTemplate(t: Template) {
    setSelectedTemplate(t)
    setView('editor')
  }

  if (view === 'editor') {
    return <EditorView
      template={selectedTemplate}
      title={title} setTitle={setTitle}
      names={names} setNames={setNames}
      date={date} setDate={setDate}
      venue={venue} setVenue={setVenue}
      fontSize={fontSize} setFontSize={setFontSize}
      activePanel={activePanel} setActivePanel={setActivePanel}
      onBack={() => setView('gallery')}
    />
  }

  return (
    <div>
      <AppTopBar
        title="גלריית תבניות 🎨"
        subtitle="בחר עיצוב מושלם לאירוע שלך"
      />

      <div className="p-6">
        {/* Filter pills */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={clsx(
                'px-5 py-2 rounded-full text-sm font-bold transition-all duration-150',
                activeFilter === cat.id
                  ? 'text-white shadow-primary'
                  : 'bg-white border border-brand-border text-brand-muted hover:border-brand-purple hover:text-brand-purple'
              )}
              style={activeFilter === cat.id ? { background: 'linear-gradient(135deg,#6C3BFF,#3BD1C6)' } : {}}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Templates grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((t) => (
            <div key={t.id} className="card overflow-hidden cursor-pointer group">
              {/* Thumb */}
              <div className="relative h-72 overflow-hidden" style={{ background: t.preview }}>
                {t.isPremium && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="premium">Premium</Badge>
                  </div>
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-brand-text/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => handleSelectTemplate(t)}
                    className="px-5 py-2.5 rounded-xl text-white font-bold text-sm translate-y-2 group-hover:translate-y-0 transition-transform"
                    style={{ background: 'linear-gradient(135deg,#6C3BFF,#3BD1C6)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
                  >
                    בחר עיצוב
                  </button>
                </div>
              </div>
              {/* Info */}
              <div className="p-4 border-t border-brand-border">
                <p className="text-sm font-bold text-brand-text">{t.name}</p>
                <p className="text-xs text-brand-muted mt-1">{t.tags.join(' • ')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Editor sub-view ──────────────────────────────────────────
interface EditorViewProps {
  template: Template | null
  title: string; setTitle: (v: string) => void
  names: string; setNames: (v: string) => void
  date: string;  setDate:  (v: string) => void
  venue: string; setVenue: (v: string) => void
  fontSize: number; setFontSize: (v: number) => void
  activePanel: PanelTab; setActivePanel: (v: PanelTab) => void
  onBack: () => void
}

const panelTabs: { id: PanelTab; label: string; icon: string }[] = [
  { id: 'text',   label: 'טקסט',  icon: 'Tt' },
  { id: 'images', label: 'תמונות',icon: '🖼' },
  { id: 'colors', label: 'צבעים', icon: '🎨' },
  { id: 'fonts',  label: 'גופנים',icon: 'A' },
]

const colorPalettes = [
  { from: '#6C3BFF', to: '#3BD1C6' },
  { from: '#FF4FA3', to: '#FF8C42' },
  { from: '#0f2027', to: '#2c5364' },
  { from: '#f093fb', to: '#f5576c' },
  { from: '#a8edea', to: '#fed6e3' },
  { from: '#B45309', to: '#FEF3C7' },
]

function EditorView({
  template, title, setTitle, names, setNames, date, setDate,
  venue, setVenue, fontSize, setFontSize, activePanel, setActivePanel, onBack,
}: EditorViewProps) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <AppTopBar
        title="עורך הזמנות ✏️"
        subtitle="עיצוב חי – ראה את התוצאה בזמן אמת"
      />

      {/* Editor body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Preview */}
        <div
          className="flex-1 flex items-center justify-center bg-slate-100 relative"
          style={{
            backgroundImage: 'radial-gradient(circle, #C7C9E0 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        >
          {/* Back button */}
          <button
            onClick={onBack}
            className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-white border border-brand-border text-sm font-semibold text-brand-muted hover:text-brand-purple hover:border-brand-purple transition-all"
          >
            ← חזור לגלריה
          </button>

          {/* Phone */}
          <div
            className="w-64 rounded-[36px] overflow-hidden flex flex-col"
            style={{
              background: template?.preview || 'linear-gradient(160deg,#fdf6ff,#f0f4ff)',
              boxShadow: '0 20px 60px rgba(30,31,43,.25), 0 0 0 8px #1E1F2B',
            }}
          >
            <div className="w-24 h-5 bg-brand-text rounded-b-2xl mx-auto flex-shrink-0" />
            <div className="flex-1 px-5 py-4 flex flex-col items-center justify-center gap-3 text-center min-h-[440px]">
              <div className="text-4xl">🎊</div>
              <div
                className="font-black text-brand-purple"
                style={{ fontSize: `${fontSize}px`, background: 'linear-gradient(135deg,#6C3BFF,#3BD1C6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                {title}
              </div>
              <div className="text-lg font-black text-brand-text">{names}</div>
              <div className="w-8 h-0.5 rounded-full bg-gradient-to-l from-brand-purple to-brand-teal" />
              <div className="text-base font-black text-brand-purple">{date}</div>
              <div className="text-sm text-brand-muted">{venue}</div>
              <button
                className="w-full py-2.5 rounded-xl text-white text-sm font-bold mt-2"
                style={{ background: 'linear-gradient(135deg,#6C3BFF,#3BD1C6)' }}
              >
                אישור הגעה (RSVP)
              </button>
            </div>
          </div>

          {/* Zoom controls */}
          <div className="absolute bottom-4 left-4 flex flex-col gap-2">
            {['🔍+', '🔍−', '📱'].map((lbl) => (
              <button
                key={lbl}
                className="w-9 h-9 bg-white rounded-xl border border-brand-border text-sm flex items-center justify-center hover:border-brand-purple hover:text-brand-purple transition-all shadow-card"
              >
                {lbl}
              </button>
            ))}
          </div>
        </div>

        {/* Control panel */}
        <div className="w-80 bg-white border-r border-brand-border flex flex-col">
          {/* Tab headers */}
          <div className="flex border-b border-brand-border">
            {panelTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePanel(tab.id)}
                className={clsx(
                  'flex-1 py-3 flex flex-col items-center gap-1 text-xs font-semibold transition-colors relative',
                  activePanel === tab.id ? 'text-brand-purple' : 'text-brand-muted hover:text-brand-text'
                )}
              >
                <span className="text-base">{tab.icon}</span>
                {tab.label}
                {activePanel === tab.id && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-l from-brand-purple to-brand-teal" />
                )}
              </button>
            ))}
          </div>

          {/* Panel body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {activePanel === 'text' && (
              <>
                <Input label="כותרת ראשית" value={title} onChange={(e) => setTitle(e.target.value)} />
                <Input label="שמות המארחים" value={names} onChange={(e) => setNames(e.target.value)} />
                <Input label="תאריך" value={date} onChange={(e) => setDate(e.target.value)} />
                <Input label="מיקום" value={venue} onChange={(e) => setVenue(e.target.value)} />
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-muted">גודל גופן</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                      className="w-8 h-8 rounded-lg border border-brand-border bg-brand-bg text-lg hover:border-brand-purple transition-all flex items-center justify-center"
                    >−</button>
                    <span className="text-base font-bold w-8 text-center">{fontSize}</span>
                    <button
                      onClick={() => setFontSize(Math.min(48, fontSize + 2))}
                      className="w-8 h-8 rounded-lg border border-brand-border bg-brand-bg text-lg hover:border-brand-purple transition-all flex items-center justify-center"
                    >+</button>
                  </div>
                </div>
              </>
            )}

            {activePanel === 'images' && (
              <div className="text-center py-8 space-y-3">
                <div className="text-4xl">🖼️</div>
                <p className="font-bold text-brand-text">הוסף תמונה</p>
                <p className="text-sm text-brand-muted">גרור ושחרר או לחץ לבחירה</p>
                <Button variant="gradient" size="sm" fullWidth>+ העלאת תמונה</Button>
              </div>
            )}

            {activePanel === 'colors' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-muted">לוח צבעים</label>
                  <div className="flex gap-2 flex-wrap">
                    {colorPalettes.map((p, i) => (
                      <button
                        key={i}
                        className="w-10 h-10 rounded-xl transition-transform hover:scale-110 border-2 border-transparent hover:border-brand-text"
                        style={{ background: `linear-gradient(135deg,${p.from},${p.to})` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-muted">צבע רקע</label>
                  <input type="color" defaultValue="#f0f4ff" className="input-base h-10 cursor-pointer p-1" />
                </div>
              </div>
            )}

            {activePanel === 'fonts' && (
              <div className="space-y-3">
                {['Heebo – עברי נקי', 'Assistant – קל ואוורירי', 'Frank Ruhl – קלאסי'].map((f) => (
                  <button
                    key={f}
                    className="w-full p-3 rounded-xl border border-brand-border bg-brand-bg text-sm font-semibold hover:border-brand-purple hover:text-brand-purple hover:bg-violet-50 transition-all text-right"
                  >
                    {f}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer actions */}
          <div className="p-4 border-t border-brand-border flex gap-2">
            <button className="flex-1 py-2.5 rounded-xl border border-brand-border text-sm font-semibold text-brand-text hover:border-brand-purple hover:text-brand-purple transition-all">
              תצוגה מקדימה
            </button>
            <Button variant="gradient" size="md" className="flex-1">
              💾 שמור
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
