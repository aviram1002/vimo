'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import type { Template } from '@/lib/supabase/types'
import clsx from 'clsx'

const CATEGORY_LABELS: Record<string, string> = {
  wedding:     'חתונה',
  birthday:    'יום הולדת',
  business:    'עסקי',
  party:       'מסיבה',
  'bar-mitzvah': 'בר/בת מצווה',
  other:       'אחר',
}

export default function AdminTemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading]     = useState(true)
  const [showForm, setShowForm]   = useState(false)
  const [editing, setEditing]     = useState<Template | null>(null)
  const [saving, setSaving]       = useState(false)

  // Form state
  const [form, setForm] = useState({
    name: '', name_he: '', category: 'wedding',
    preview_css: 'linear-gradient(160deg,#fdf6ff,#f0eeff)',
    is_premium: false, is_active: true, sort_order: 0,
    tags: '',
  })

  useEffect(() => { fetchTemplates() }, [])

  async function fetchTemplates() {
    setLoading(true)
    const { data } = await supabase
      .from('templates')
      .select('*')
      .order('sort_order', { ascending: true })
    setTemplates(data ?? [])
    setLoading(false)
  }

  function openNew() {
    setEditing(null)
    setForm({ name: '', name_he: '', category: 'wedding', preview_css: 'linear-gradient(160deg,#fdf6ff,#f0eeff)', is_premium: false, is_active: true, sort_order: 0, tags: '' })
    setShowForm(true)
  }

  function openEdit(t: Template) {
    setEditing(t)
    setForm({
      name: t.name, name_he: t.name_he, category: t.category,
      preview_css: t.preview_css, is_premium: t.is_premium,
      is_active: t.is_active, sort_order: t.sort_order,
      tags: t.tags.join(', '),
    })
    setShowForm(true)
  }

  async function handleSave() {
    setSaving(true)
    const payload = {
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    }
    if (editing) {
      await supabase.from('templates').update(payload).eq('id', editing.id)
    } else {
      await supabase.from('templates').insert(payload as any)
    }
    setShowForm(false)
    await fetchTemplates()
    setSaving(false)
  }

  async function toggleActive(t: Template) {
    await supabase.from('templates').update({ is_active: !t.is_active }).eq('id', t.id)
    fetchTemplates()
  }

  async function handleDelete(id: string) {
    if (!confirm('למחוק את העיצוב?')) return
    await supabase.from('templates').delete().eq('id', id)
    fetchTemplates()
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">עיצובים 🎨</h1>
          <p className="text-gray-400 mt-1">{templates.length} תבניות במערכת</p>
        </div>
        <button
          onClick={openNew}
          className="px-5 py-2.5 rounded-xl font-bold text-sm text-white"
          style={{ background: 'linear-gradient(135deg,#6C3BFF,#3BD1C6)' }}
        >
          + הוסף עיצוב
        </button>
      </div>

      {/* Templates grid */}
      {loading ? (
        <div className="text-center text-gray-500 py-20">טוען...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {templates.map((t) => (
            <div key={t.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
              {/* Preview */}
              <div className="h-40 relative" style={{ background: t.preview_css }}>
                {!t.is_active && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">מושבת</span>
                  </div>
                )}
                {t.is_premium && (
                  <div className="absolute top-2 right-2">
                    <span className="bg-amber-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">Premium</span>
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-sm font-bold text-white">{t.name_he}</p>
                  <p className="text-xs text-gray-500">{CATEGORY_LABELS[t.category]}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(t)}
                    className="flex-1 py-1.5 text-xs font-bold rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
                  >
                    ערוך
                  </button>
                  <button
                    onClick={() => toggleActive(t)}
                    className={clsx(
                      'flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors',
                      t.is_active
                        ? 'bg-green-500/20 text-green-300 hover:bg-red-500/20 hover:text-red-300'
                        : 'bg-gray-700 text-gray-400 hover:bg-green-500/20 hover:text-green-300'
                    )}
                  >
                    {t.is_active ? 'השבת' : 'הפעל'}
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="w-8 h-7 text-xs rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/25 transition-colors"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-3xl p-8 w-full max-w-lg space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-white">
                {editing ? 'ערוך עיצוב' : 'עיצוב חדש'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white text-xl">✕</button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">שם (English)</label>
                  <input
                    className="input-base bg-gray-800 border-gray-700 text-white"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="classic-elegance"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">שם בעברית</label>
                  <input
                    className="input-base bg-gray-800 border-gray-700 text-white"
                    value={form.name_he}
                    onChange={(e) => setForm({ ...form, name_he: e.target.value })}
                    placeholder="אלגנטיות קלאסית"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">קטגוריה</label>
                <select
                  className="input-base bg-gray-800 border-gray-700 text-white"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  {Object.entries(CATEGORY_LABELS).map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">CSS Preview (גרדיאנט)</label>
                <input
                  className="input-base bg-gray-800 border-gray-700 text-white font-mono text-xs"
                  value={form.preview_css}
                  onChange={(e) => setForm({ ...form, preview_css: e.target.value })}
                />
                {/* Live preview */}
                <div className="mt-2 h-16 rounded-xl" style={{ background: form.preview_css }} />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">תגיות (מופרדות בפסיק)</label>
                <input
                  className="input-base bg-gray-800 border-gray-700 text-white"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="חתונה, נקי, פרמיום"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">סדר תצוגה</label>
                  <input
                    type="number"
                    className="input-base bg-gray-800 border-gray-700 text-white"
                    value={form.sort_order}
                    onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                  />
                </div>
                <div className="flex flex-col gap-2 justify-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_premium}
                      onChange={(e) => setForm({ ...form, is_premium: e.target.checked })}
                      className="w-4 h-4 accent-violet-500"
                    />
                    <span className="text-sm text-gray-300">Premium</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_active}
                      onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                      className="w-4 h-4 accent-violet-500"
                    />
                    <span className="text-sm text-gray-300">פעיל</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 py-3 rounded-xl border border-gray-700 text-gray-300 font-semibold hover:bg-gray-800 transition-colors"
              >
                ביטול
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-3 rounded-xl text-white font-bold transition-all disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg,#6C3BFF,#3BD1C6)' }}
              >
                {saving ? 'שומר...' : editing ? 'עדכן' : 'הוסף'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
