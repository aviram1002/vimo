import type { Metadata } from 'next'
import Link from 'next/link'
import { MarketingLayout } from '@/components/layout/MarketingLayout'
import { CTASection } from '@/components/marketing/CTASection'
import { pricingPlans } from '@/lib/data'
import clsx from 'clsx'

export const metadata: Metadata = {
  title: 'מחירים – Vimo',
  description: 'מחירי Vimo לאירועים. פלן חינמי להתחלה, פרו לאירוע אחד ועסקי לאירועים מרובים.',
}

export default function PricingPage() {
  return (
    <MarketingLayout>
      {/* Header */}
      <section className="bg-white border-b border-brand-border py-20">
        <div className="section-container text-center">
          <p className="text-sm font-bold text-brand-purple uppercase tracking-widest mb-3">מחירים</p>
          <h1 className="text-4xl font-black text-brand-text mb-4">
            תכנית שמתאימה לכם
          </h1>
          <p className="text-lg text-brand-muted max-w-xl mx-auto">
            התחילו חינם ושדרגו כשתהיו מוכנים. ללא הפתעות, ללא קנסות ביטול.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={clsx(
                  'rounded-3xl p-8 flex flex-col gap-6 relative',
                  plan.highlighted
                    ? 'text-white'
                    : 'bg-white border border-brand-border shadow-card'
                )}
                style={plan.highlighted ? { background: 'linear-gradient(160deg,#6C3BFF,#3BD1C6)' } : {}}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-brand-pink text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                      הכי פופולרי ⭐
                    </span>
                  </div>
                )}

                <div>
                  <p className={clsx('text-sm font-bold mb-2 uppercase tracking-wider', plan.highlighted ? 'text-white/70' : 'text-brand-muted')}>
                    {plan.name}
                  </p>
                  <div className="flex items-end gap-1">
                    <span className={clsx('text-5xl font-black', plan.highlighted ? 'text-white' : 'text-brand-text')}>
                      {plan.price === 0 ? 'חינם' : `₪${plan.price}`}
                    </span>
                    {plan.price > 0 && (
                      <span className={clsx('text-sm pb-2', plan.highlighted ? 'text-white/70' : 'text-brand-muted')}>
                        /{plan.period === 'month' ? 'חודש' : 'אירוע'}
                      </span>
                    )}
                  </div>
                  <p className={clsx('text-sm mt-2', plan.highlighted ? 'text-white/75' : 'text-brand-muted')}>
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span className={plan.highlighted ? 'text-white' : 'text-green-500'}>✓</span>
                      <span className={plan.highlighted ? 'text-white/90' : 'text-brand-text'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/app/dashboard">
                  <button
                    className={clsx(
                      'w-full py-3.5 rounded-2xl font-bold text-sm transition-all',
                      plan.highlighted
                        ? 'bg-white text-brand-purple hover:bg-white/90'
                        : 'border-2 border-brand-border text-brand-text hover:border-brand-purple hover:text-brand-purple'
                    )}
                  >
                    {plan.cta}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="py-12 bg-white border-t border-brand-border">
        <div className="section-container text-center">
          <p className="text-brand-muted">
            יש שאלות?{' '}
            <Link href="/faq" className="text-brand-purple font-bold hover:underline">
              קרא את השאלות הנפוצות ←
            </Link>
          </p>
        </div>
      </section>

      <CTASection />
    </MarketingLayout>
  )
}
