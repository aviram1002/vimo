'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { AppTopBar } from '@/components/layout/AppTopBar'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function SettingsPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [name, setName]       = useState('')
  const [saving, setSaving]   = useState(false)
  const [saved, setSaved]     = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { router.push('/login'); return }
    const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
    setProfile(data)
    setName(data?.full_name ?? '')
  }

  async function handleSave() {
    setSaving(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    await supabase.from('profiles').update({ full_name: name }).eq('id', session.user.id)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div>
      <AppTopBar title="הגדרות ⚙️" subtitle="נהל את פרטי החשבון שלך" />
      <div className="p-6 max-w-2xl space-y-6">
        {/* Profile */}
        <div className="card p-6 space-y-4">
          <h2 className="font-black text-brand-text text-lg">פרטים אישיים</h2>
          <Input label="שם מלא" value={name} onChange={e => setName(e.target.value)} placeholder="השם שלך" />
          <Input label="אימייל" value={profile?.email ?? ''} disabled hint="לא ניתן לשנות את האימייל" />
          <div className="flex items-center gap-3">
            <Button variant="gradient" size="md" loading={saving} onClick={handleSave}>
              {saved ? '✓ נשמר!' : 'שמור שינויים'}
            </Button>
          </div>
        </div>

        {/* Plan */}
        <div className="card p-6">
          <h2 className="font-black text-brand-text text-lg mb-3">המנוי שלך</h2>
          <div className="flex items-center justify-between">
            <div>
              <span className={`text-sm font-bold px-3 py-1.5 rounded-full ${
                profile?.plan === 'free' ? 'bg-gray-100 text-gray-600' :
                profile?.plan === 'pro' ? 'bg-violet-100 text-brand-purple' :
                'bg-amber-100 text-amber-700'
              }`}>
                {profile?.plan === 'free' ? 'חינמי' : profile?.plan === 'pro' ? 'פרו' : 'עסקי'}
              </span>
            </div>
            <Button variant="gradient" size="sm" onClick={() => router.push('/pricing')}>
              שדרג מנוי
            </Button>
          </div>
        </div>

        {/* Danger zone */}
        <div className="card p-6 border-red-100">
          <h2 className="font-black text-red-500 text-lg mb-3">אזור מסוכן</h2>
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-xl border-2 border-red-200 text-red-500 font-bold text-sm hover:bg-red-50 transition-colors"
          >
            התנתק מהחשבון
          </button>
        </div>
      </div>
    </div>
  )
}
