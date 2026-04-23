import type { Metadata } from 'next'
import Link from 'next/link'
import { MarketingLayout } from '@/components/layout/MarketingLayout'
import { CTASection } from '@/components/marketing/CTASection'
import { blogArticles } from '@/lib/data'
import { notFound } from 'next/navigation'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return blogArticles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = blogArticles.find((a) => a.slug === params.slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `https://vimo.co.il/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
    },
  }
}

export default function BlogArticlePage({ params }: Props) {
  const article = blogArticles.find((a) => a.slug === params.slug)
  if (!article) notFound()

  const related = blogArticles.filter((a) => a.slug !== article.slug).slice(0, 2)

  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="bg-white border-b border-brand-border py-16">
        <div className="section-container max-w-3xl">
          <div className="flex items-center gap-2 mb-4 text-sm text-brand-muted">
            <Link href="/blog" className="hover:text-brand-purple transition-colors">בלוג</Link>
            <span>›</span>
            <span className="text-brand-purple font-semibold">{article.category}</span>
          </div>
          <h1 className="text-4xl font-black text-brand-text leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-brand-muted mb-6">{article.description}</p>
          <div className="flex items-center gap-4 text-sm text-brand-muted">
            <span>📅 {article.date}</span>
            <span>⏱ {article.readTime} דקות קריאה</span>
          </div>
        </div>
      </section>

      {/* Cover image placeholder */}
      <div
        className="h-64 w-full flex items-center justify-center text-7xl"
        style={{ background: 'linear-gradient(135deg,rgba(108,59,255,0.1),rgba(59,209,198,0.1))' }}
      >
        {article.category === 'חתונה' ? '💍' : article.category === 'שיווק' ? '📲' : '📋'}
      </div>

      {/* Content */}
      <section className="py-16">
        <div className="section-container max-w-3xl">
          <article className="prose-vimo space-y-6 text-brand-text">
            {/* Intro */}
            <p className="text-lg leading-relaxed text-brand-muted">
              {article.description} בעידן הדיגיטלי, כלים נכונים יכולים לחסוך שעות של עבודה ולשפר את חוויית
              האירוע כולה — הן עבורכם והן עבור האורחים שלכם.
            </p>

            <h2 className="text-2xl font-black text-brand-text mt-8">למה זה חשוב?</h2>
            <p className="leading-relaxed text-brand-muted">
              הזמנות דיגיטליות הפכו לנורמה בשנים האחרונות. הן ידידותיות לסביבה, נוחות לשיתוף ומאפשרות
              מעקב בזמן אמת אחרי אישורי ההגעה — דבר שבהזמנות נייר פשוט לא היה אפשרי.
            </p>

            <h2 className="text-2xl font-black text-brand-text mt-8">7 צעדים להצלחה</h2>
            <ol className="space-y-4 list-decimal list-inside text-brand-muted">
              {[
                'בחרו תבנית שמתאימה לסגנון האירוע שלכם',
                'הוסיפו את כל פרטי האירוע בבהירות',
                'עצבו לפי הצבעים והאווירה שאתם רוצים',
                'שלחו הזמנת ניסיון לעצמכם לפני השליחה',
                'שלחו בוואטסאפ ישירות לרשימת האנשי הקשר',
                'עקבו אחרי האישורים בזמן אמת',
                'שלחו תזכורת שבוע לפני האירוע',
              ].map((step, i) => (
                <li key={i} className="leading-relaxed">
                  <strong className="text-brand-text">שלב {i + 1}:</strong> {step}
                </li>
              ))}
            </ol>

            <h2 className="text-2xl font-black text-brand-text mt-8">סיכום</h2>
            <p className="leading-relaxed text-brand-muted">
              עם Vimo, כל התהליך הזה לוקח פחות מ-10 דקות. מהרגע שבוחרים תבנית ועד לרגע שהאורחים מאשרים הגעה,
              הכל מנוהל במקום אחד, בצורה פשוטה ויפה.
            </p>

            {/* CTA box */}
            <div
              className="rounded-2xl p-6 mt-8 text-center"
              style={{ background: 'linear-gradient(135deg,rgba(108,59,255,0.08),rgba(59,209,198,0.08))' }}
            >
              <p className="font-bold text-brand-text mb-2">מוכנים להתחיל?</p>
              <p className="text-sm text-brand-muted mb-4">צרו הזמנה מדהימה עכשיו — בחינם.</p>
              <Link
                href="/app/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-bold text-sm"
                style={{ background: 'linear-gradient(135deg,#6C3BFF,#3BD1C6)' }}
              >
                התחל עכשיו →
              </Link>
            </div>
          </article>

          {/* Related articles */}
          {related.length > 0 && (
            <div className="mt-16">
              <h3 className="text-xl font-black text-brand-text mb-6">מאמרים נוספים</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {related.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}`}
                    className="p-5 bg-white rounded-2xl border border-brand-border hover:border-brand-purple hover:shadow-card transition-all group"
                  >
                    <p className="text-sm font-bold text-brand-muted mb-1 group-hover:text-brand-purple">{a.category}</p>
                    <h4 className="font-black text-brand-text text-sm leading-snug">{a.title}</h4>
                    <p className="text-xs text-brand-muted mt-2">{a.readTime} דקות קריאה</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </MarketingLayout>
  )
}
