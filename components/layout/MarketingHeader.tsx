'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import clsx from 'clsx'

const navLinks = [
  { label: 'תכונות', href: '/#features' },
  { label: 'תבניות', href: '/templates' },
  { label: 'מחירים', href: '/pricing' },
  { label: 'בלוג', href: '/blog' },
  { label: 'שאלות ותשובות', href: '/faq' },
]

export function MarketingHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-brand-border">
      <div className="section-container">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo size="md" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-brand-muted hover:text-brand-purple hover:bg-violet-50 transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/app/dashboard">
              <Button variant="ghost" size="sm">התחברות</Button>
            </Link>
            <Link href="/app/dashboard">
              <Button variant="gradient" size="sm">התחל חינם →</Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-brand-muted hover:text-brand-text"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden py-4 border-t border-brand-border space-y-1 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-brand-muted hover:text-brand-purple hover:bg-violet-50"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <Link href="/app/dashboard" onClick={() => setOpen(false)}>
                <Button variant="outline" size="md" fullWidth>התחברות</Button>
              </Link>
              <Link href="/app/dashboard" onClick={() => setOpen(false)}>
                <Button variant="gradient" size="md" fullWidth>התחל חינם →</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
