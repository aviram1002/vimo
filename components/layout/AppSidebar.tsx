'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Logo } from '@/components/ui/Logo'
import clsx from 'clsx'

const mainNav = [
  { label:'לוח בקרה',       href:'/app/dashboard', icon:'🏠' },
  { label:'גלריית עיצובים', href:'/app/editor',    icon:'🎨' },
  { label:'ניהול אורחים',   href:'/app/guests',    icon:'👥' },
  { label:'אישורי הגעה',    href:'/app/rsvp',      icon:'✅' },
]
const secondaryNav = [
  { label:'אנליטיקה', href:'/app/analytics', icon:'📊' },
  { label:'הגדרות',   href:'/app/settings',  icon:'⚙️' },
  { label:'עזרה',     href:'/app/help',      icon:'💬' },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router   = useRouter()
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) return
      supabase.from('profiles').select('full_name,email,plan,is_admin').eq('id', session.user.id).single()
        .then(({ data }) => setProfile(data))
    })
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <aside className="w-60 flex-shrink-0 bg-white border-l border-brand-border flex flex-col h-screen sticky top-0 overflow-y-auto">
      <div className="p-5 border-b border-brand-border">
        <Link href="/"><Logo size="md" /></Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        <p className="px-3 py-2 text-xs font-bold text-brand-muted/60 uppercase tracking-widest">ניהול</p>
        {mainNav.map(item => (
          <Link key={item.href} href={item.href}
            className={clsx('sidebar-item', pathname === item.href && 'active')}>
            <span className="text-base">{item.icon}</span>
            <span className="flex-1">{item.label}</span>
          </Link>
        ))}
        <div className="h-px bg-brand-border my-3" />
        <p className="px-3 py-2 text-xs font-bold text-brand-muted/60 uppercase tracking-widest">נוסף</p>
        {secondaryNav.map(item => (
          <Link key={item.href} href={item.href}
            className={clsx('sidebar-item', pathname === item.href && 'active')}>
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
        {profile?.is_admin && (
          <>
            <div className="h-px bg-brand-border my-3" />
            <Link href="/admin" className="sidebar-item">
              <span className="text-base">👑</span>
              <span>פאנל ניהול</span>
            </Link>
          </>
        )}
      </nav>

      <div className="p-3 border-t border-brand-border">
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-violet-50 cursor-pointer transition-colors group">
          <div className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center font-bold text-sm text-violet-700 flex-shrink-0">
            {(profile?.full_name ?? profile?.email ?? '?').charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-brand-text truncate">{profile?.full_name ?? 'משתמש'}</p>
            <p className="text-xs text-brand-muted truncate">{profile?.email ?? ''}</p>
          </div>
          <button onClick={handleLogout} className="text-xs text-brand-muted hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100" title="התנתק">
            ← יציאה
          </button>
        </div>
      </div>
    </aside>
  )
}
