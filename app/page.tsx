import type { Metadata } from 'next'
import { MarketingLayout } from '@/components/layout/MarketingLayout'
import { HeroSection } from '@/components/marketing/HeroSection'
import { FeaturesSection } from '@/components/marketing/FeaturesSection'
import { NumbersSection } from '@/components/marketing/NumbersSection'
import { TestimonialsSection } from '@/components/marketing/TestimonialsSection'
import { CTASection } from '@/components/marketing/CTASection'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Vimo – הזמנות דיגיטליות לאירועים',
  description:
    'צרו הזמנות דיגיטליות מדהימות לחתונה, יום הולדת, בר מצווה וכל אירוע אחר. שלחו בוואטסאפ ונהלו אישורי הגעה בקלות.',
  alternates: { canonical: 'https://vimo.co.il' },
}

const eventTypes = [
  { label: 'חתונה',       href: '/invitations/wedding',     emoji: '💍', desc: 'הזמנות לחתונה' },
  { label: 'יום הולדת',  href: '/invitations/birthday',    emoji: '🎂', desc: 'מסיבות וימי הולדת' },
  { label: 'בר מצווה',   href: '/invitations/bar-mitzvah', emoji: '✡️', desc: 'בר ובת מצווה' },
  { label: 'אירוע עסקי', href: '/invitations/business',    emoji: '🏢', desc: 'כנסים ואירועים' },
]

export default function HomePage() {
  return (
    <MarketingLayout>
      <HeroSection />

      {/* Event types quick nav */}
      <section className="py-16 bg-white border-b border-brand-border">
        <div className="section-container">
          <h2 className="text-2xl font-black text-center mb-8 text-brand-text">
            הזמנות לכל סוג אירוע
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {eventTypes.map((et) => (
              <Link key={et.href} href={et.href}>
                <Card hover className="card-lift p-5 text-center cursor-pointer group">
                  <div className="text-4xl mb-3">{et.emoji}</div>
                  <h3 className="font-bold text-brand-text group-hover:text-brand-purple transition-colors">
                    {et.label}
                  </h3>
                  <p className="text-xs text-brand-muted mt-1">{et.desc}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FeaturesSection />
      <NumbersSection />
      <TestimonialsSection />
      <CTASection />
    </MarketingLayout>
  )
}
