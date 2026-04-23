'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/ui/Logo'
import { Avatar } from '@/components/ui/Avatar'
import clsx from 'clsx'

interface NavItem {
  label: string
  href: string
  icon: string
  badge?: number
}

const mainNav: NavItem[] = [
  { label: 'לוח בקרה',       href: '/app/dashboard', icon: '🏠' },
  { label: 'גלריית עיצובים', href: '/app/editor',    icon: '🎨' },
  { label: 'ניהול אורחים',   href: '/app/guests',    icon: '👥', badge: 3 },
  { label: 'אישורי הגעה',    href: '/app/rsvp',      icon: '✅' },
]

const secondaryNav: NavItem[] = [
  { label: 'אנליטיקה',  href: '/app/analytics', icon: '📊' },
  { label: 'הגדרות',    href: '/app/settings',  icon: '⚙️' },
  { label: 'עזרה',      href: '/app/help',      icon: '💬' },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 flex-shrink-0 bg-white border-l border-brand-border flex flex-col h-screen sticky top-0 overflow-y-auto">
      {/* Header */}
      <div className="p-5 border-b border-brand-border">
        <Link href="/">
          <Logo size="md" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        <p className="px-3 py-2 text-xs font-bold text-brand-muted/60 uppercase tracking-widest">
          ניהול
        </p>
        {mainNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'sidebar-item',
              pathname === item.href && 'active'
            )}
          >
            <span className="text-base">{item.icon}</span>
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="bg-brand-pink text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </Link>
        ))}

        <div className="h-px bg-brand-border my-3" />

        <p className="px-3 py-2 text-xs font-bold text-brand-muted/60 uppercase tracking-widest">
          חשבון
        </p>
        {secondaryNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx('sidebar-item', pathname === item.href && 'active')}
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* User profile footer */}
      <div className="p-3 border-t border-brand-border">
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-violet-50 cursor-pointer transition-colors">
          <Avatar name="רחל כהן" size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-brand-text truncate">רחל כהן</p>
            <p className="text-xs text-brand-muted truncate">Rachel@vimo.co.il</p>
          </div>
          <span className="text-brand-muted text-xs">⚙</span>
        </div>
      </div>
    </aside>
  )
}
