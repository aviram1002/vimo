import type { Metadata } from 'next'
import Link from 'next/link'
import { MarketingLayout } from '@/components/layout/MarketingLayout'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { blogArticles } from '@/lib/data'

export const metadata: Metadata = {
  title: 'בלוג – טיפים לאירועים ומדריכים',
  description: 'מדריכים, טיפים ורעיונות לאירועים מוצלחים: חתונות, ימי הולדת, בר מצווה ועוד.',
}

export default function BlogPage() {
  return (
    <MarketingLayout>
      <section className="bg-white border-b border-brand-border py-20">
        <div className="section-container text-center">
          <h1 className="text-4xl font-black text-brand-text mb-4">
            הבלוג שלנו
          </h1>
          <p className="text-lg text-brand-muted max-w-2xl mx-auto">
            טיפים, מדריכים ורעיונות לאירועים מוצלחים ובלתי נשכחים.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogArticles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`}>
                <Card hover className="card-lift overflow-hidden h-full">
                  {/* Image placeholder */}
                  <div
                    className="h-44"
                    style={{ background: 'linear-gradient(135deg,#6C3BFF20,#3BD1C620)' }}
                  >
                    <div className="h-full flex items-center justify-center text-5xl">
                      {article.category === 'חתונה' ? '💍'
                        : article.category === 'שיווק' ? '📲'
                        : '📋'}
                    </div>
                  </div>
                  <div className="p-5 space-y-3">
                    <Badge variant="new">{article.category}</Badge>
                    <h2 className="text-base font-black text-brand-text leading-snug">
                      {article.title}
                    </h2>
                    <p className="text-sm text-brand-muted leading-relaxed">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-brand-border">
                      <span className="text-xs text-brand-muted">{article.date}</span>
                      <span className="text-xs text-brand-muted">{article.readTime} דקות קריאה</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
