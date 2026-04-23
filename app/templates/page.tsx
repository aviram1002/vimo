import type { Metadata } from 'next'
import Link from 'next/link'
import { MarketingLayout } from '@/components/layout/MarketingLayout'
import { Badge } from '@/components/ui/Badge'
import { CTASection } from '@/components/marketing/CTASection'
import { mockTemplates } from '@/lib/data'

export const metadata: Metadata = {
  title: 'תבניות הזמנות דיגיטליות – גלריית עיצובים',
  description:
    'מאות תבניות מקצועיות להזמנות דיגיטליות לחתונה, יום הולדת, בר מצווה ואירועים עסקיים. בחרו ועצבו תוך דקות.',
  keywords: ['תבניות הזמנות', 'עיצוב הזמנות', 'הזמנות דיגיטליות'],
}

const categories = [
  { id: 'all', label: 'הכל' },
  { id: 'wedding', label: 'חתונה' },
  { id: 'birthday', label: 'יום הולדת' },
  { id: 'business', label: 'עסקי' },
  { id: 'party', label: 'מסיבה' },
  { id: 'bar-mitzvah', label: 'בר/בת מצווה' },
]

export default function TemplatesPage() {
  return (
    <MarketingLayout>
      {/* Header */}
      <section className="bg-white border-b border-brand-border py-16">
        <div className="section-container text-center">
          <h1 className="text-4xl font-black text-brand-text mb-4">
            גלריית{' '}
            <span className="text-gradient">תבניות עיצוב</span>
          </h1>
          <p className="text-lg text-brand-muted max-w-2xl mx-auto mb-8">
            בחרו מתוך מאות תבניות מקצועיות. כל עיצוב ניתן לעריכה מלאה תוך דקות.
          </p>
          {/* Filter pills — server-rendered default "all" */}
          <div className="flex justify-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <span
                key={cat.id}
                className={`px-5 py-2 rounded-full text-sm font-bold cursor-pointer border transition-all ${
                  cat.id === 'all'
                    ? 'text-white border-transparent'
                    : 'bg-white border-brand-border text-brand-muted'
                }`}
                style={cat.id === 'all' ? { background: 'linear-gradient(135deg,#6C3BFF,#3BD1C6)' } : {}}
              >
                {cat.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockTemplates.map((t) => (
              <div key={t.id} className="card overflow-hidden cursor-pointer group">
                {/* Thumb */}
                <div className="relative h-72 overflow-hidden" style={{ background: t.preview }}>
                  {t.isPremium && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="premium">Premium</Badge>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-brand-text/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Link
                      href="/app/editor"
                      className="px-5 py-2.5 rounded-xl text-white font-bold text-sm translate-y-2 group-hover:translate-y-0 transition-transform inline-block"
                      style={{ background: 'linear-gradient(135deg,#6C3BFF,#3BD1C6)', boxShadow: '0 4px 20px rgba(0,0,0,.3)' }}
                    >
                      בחר עיצוב
                    </Link>
                  </div>
                </div>
                <div className="p-4 border-t border-brand-border">
                  <p className="text-sm font-bold text-brand-text">{t.name}</p>
                  <p className="text-xs text-brand-muted mt-1">{t.tags.join(' • ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="מוצאים עיצוב שאתם אוהבים?"
        subtitle="התחילו לעצב את ההזמנה שלכם עכשיו — בחינם."
        primaryLabel="התחל לעצב"
      />
    </MarketingLayout>
  )
}
