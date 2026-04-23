'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Logo } from '@/components/ui/Logo'
import clsx from 'clsx'

const navItems = [
  { label: 'לוח בקרה',       href: '/app/dashboard', icon: '🏠' },
  { label: 'גלריית עיצובים', href: '/app/editor',    icon: '🎨' },
  { label: 'ניהול אורחים',   href: '/app/guests',    icon: '👥' },
  { label: 'אישורי הגעה',    href: '/app/rsvp',      icon: '✅' },
]

const secondaryNav = [
  { label: 'אנליטיקה', href: '/app/analytics', icon: '📊' },
  { label: 'הגדרות',   href: '/app/settings',  icon: '⚙️' },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router   = useRouter()
  const [user, setUser]       = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    async function loadUser() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()
      setUser(data)
      setIsAdmin(data?.is_admin ?? false)
    }
    loadUser()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const displayName = user?.full_name ?? user?.email ?? ''
  const initials    = displayName.charAt(0).toUpperCase()

  return (
    <aside className="w-60 flex-shrink-0 bg-white border-l border-brand-border flex flex-col h-screen sticky top-0 overflow-y-auto">
      <div className="p-5 border-b border-brand-border">
        <Link href="/"><Logo size="md" /></Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        <p className="px-3 py-2 text-xs font-bold text-brand-muted/60 uppercase tracking-widest">ניהול</p>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}
            className={clsx('sidebar-item', pathname === item.href && 'active')}>
            <span className="text-base">{item.icon}</span>
            <span className="flex-1">{item.label}</span>
          </Link>
        ))}

        <div className="h-px bg-brand-border my-3" />

        <p className="px-3 py-2 text-xs font-bold text-brand-muted/60 uppercase tracking-widest">חשבון</p>
        {secondaryNav.map((item) => (
          <Link key={item.href} href={item.href}
            className={clsx('sidebar-item', pathname === item.href && 'active')}>
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}

        {isAdmin && (
          <>
            <div className="h-px bg-brand-border my-3" />
            <Link href="/admin"
              className="sidebar-item bg-violet-50 text-brand-purple font-bold">
              <span className="text-base">👑</span>
              <span>פאנל ניהול</span>
            </Link>
          </>
        )}
      </nav>

      <div className="p-3 border-t border-brand-border space-y-1">
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-violet-50 cursor-pointer transition-colors">
          <div className="w-9 h-9 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
            {initials || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-brand-text truncate">
              {user?.full_name || user?.email || 'משתמש'}
            </p>
            <p className="text-xs text-brand-muted truncate">{user?.email || ''}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full text-right px-3 py-2 text-xs font-semibold text-brand-muted hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
          🚪 התנתק
        </button>
      </div>
    </aside>
  )
}
