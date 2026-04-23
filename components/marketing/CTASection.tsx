import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface CTASectionProps {
  title?: string
  subtitle?: string
  primaryLabel?: string
  secondaryLabel?: string
}

export function CTASection({
  title = 'מוכנים להתחיל?',
  subtitle = 'הצטרפו לאלפי זוגות ומארגנים שכבר מנהלים אירועים עם Vimo.',
  primaryLabel = 'התחל עכשיו – זה בחינם',
  secondaryLabel = 'ראה מחירים',
}: CTASectionProps) {
  return (
    <section className="py-24 bg-white">
      <div className="section-container">
        <div
          className="rounded-3xl px-8 py-16 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg,#6C3BFF,#3BD1C6)' }}
        >
          {/* Dot overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)',
              backgroundSize: '30px 30px',
            }}
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl font-black text-white tracking-tight mb-4">
              {title}
            </h2>
            <p className="text-lg text-white/80 mb-8">{subtitle}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/app/dashboard">
                <Button variant="white" size="xl">{primaryLabel}</Button>
              </Link>
              <Link href="/pricing">
                <button className="px-8 py-4 rounded-2xl border-2 border-white/40 text-white text-lg font-bold hover:bg-white/10 transition-colors">
                  {secondaryLabel}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
