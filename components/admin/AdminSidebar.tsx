'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const navItems = [
  { label: 'לוח בקרה',    href: '/admin',            icon: '📊' },
  { label: 'לקוחות',      href: '/admin/customers',  icon: '👥' },
  { label: 'עיצובים',     href: '/admin/templates',  icon: '🎨' },
  { label: 'הגדרות',      href: '/admin/settings',   icon: '⚙️' },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 flex-shrink-0 bg-gray-900 border-l border-gray-800 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-5 border-b border-gray-800">
        <span className="text-xl font-black text-white">
          Vimo <span className="text-xs font-bold text-brand-pink bg-brand-pink/20 px-2 py-0.5 rounded-full">Admin</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href ||
            (item.href !== '/admin' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
                active
                  ? 'bg-white/10 text-white font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              )}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <Link
          href="/app/dashboard"
          className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors"
        >
          ← חזור לאפליקציה
        </Link>
      </div>
    </aside>
  )
}
