import type { Metadata } from 'next'
import Link from 'next/link'
import { MarketingLayout } from '@/components/layout/MarketingLayout'
import { FeaturesSection } from '@/components/marketing/FeaturesSection'
import { CTASection } from '@/components/marketing/CTASection'
import { mockTemplates } from '@/lib/data'
import { Badge } from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'הזמנות דיגיטליות לחתונה – עיצוב ושליחה בוואטסאפ',
  description:
    'צרו הזמנות חתונה דיגיטליות מרהיבות תוך דקות. מאות תבניות, שליחה בוואטסאפ וניהול אישורי הגעה — הכל במקום אחד.',
  keywords: ['הזמנות לחתונה', 'הזמנות חתונה דיגיטליות', 'הזמנות חתונה וואטסאפ', 'RSVP חתונה'],
  alternates: { canonical: 'https://vimo.co.il/invitations/wedding' },
}

const weddingTemplates = mockTemplates.filter(
  (t) => t.category === 'wedding' || t.category === 'all'
).slice(0, 4)

const steps = [
  { num: '01', title: 'בחרו תבנית',      desc: 'מאות תבניות חתונה מקצועיות — קלאסיות, מודרניות ויוקרתיות.',           icon: '🎨' },
  { num: '02', title: 'הוסיפו פרטים',    desc: 'שמות, תאריך, שעה, מיקום — הכל עובר לעיצוב תוך שניות.',               icon: '✏️' },
  { num: '03', title: 'שלחו לאורחים',    desc: 'שליחה ישירה בוואטסאפ לכל הרשימה, קישור ייחודי וקוד QR.',              icon: '📲' },
  { num: '04', title: 'נהלו אישורים',    desc: 'ראו בזמן אמת מי אישר, מי ביטל ומי לא ענה. הכל אוטומטי.',             icon: '✅' },
]

export default function WeddingInvitationsPage() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="py-20 bg-white border-b border-brand-border">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 border border-violet-200 text-brand-purple text-sm font-bold mb-5">
                💍 הזמנות לחתונה
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-brand-text leading-tight mb-5">
                הזמנות חתונה דיגיטליות{' '}
                <span className="text-gradient">שאורחים ישמרו</span>
              </h1>
              <p className="text-lg text-brand-muted leading-relaxed mb-8">
                צרו הזמנת חתונה מרהיבה שתשאיר רושם. שלחו בוואטסאפ ונהלו את כל אישורי ההגעה
                בלוח בקרה אחד פשוט.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/app/editor"
                  className="px-7 py-3.5 rounded-2xl text-white font-bold text-base inline-flex items-center gap-2"
                  style={{ background: 'linear-gradient(135deg,#6C3BFF,#3BD1C6)', boxShadow: '0 4px 18px rgba(108,59,255,.35)' }}
                >
                  התחל לעצב – חינם
                </Link>
                <Link
                  href="/templates"
                  className="px-7 py-3.5 rounded-2xl border border-brand-border text-brand-text font-bold text-base hover:border-brand-purple hover:text-brand-purple transition-all bg-white"
                >
                  ראה תבניות
                </Link>
              </div>
              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 mt-8">
                {['✓ ללא עיצוב גרפי', '✓ שליחה בוואטסאפ', '✓ אישורי הגעה אוטומטיים', '✓ מותאם לנייד'].map((b) => (
                  <span key={b} className="text-sm text-green-700 font-semibold">{b}</span>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div className="flex justify-center">
              <div
                className="w-72 rounded-[36px] overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg,#fdf6ff,#f0eeff)',
                  boxShadow: '0 24px 80px rgba(108,59,255,0.22), 0 0 0 8px #1E1F2B',
                }}
              >
                <div className="w-24 h-5 bg-brand-text rounded-b-2xl mx-auto" />
                <div className="px-6 py-6 text-center space-y-3">
                  <div className="text-5xl">💍</div>
                  <div className="text-xs font-bold text-brand-purple tracking-widest">✦ אנחנו מתחתנים! ✦</div>
                  <div className="text-xl font-black text-gradient">נועה & דניאל</div>
                  <div className="w-8 h-0.5 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg,#6C3BFF,#3BD1C6)' }} />
                  <div className="text-base font-black text-brand-purple">12.09.2024</div>
                  <div className="text-xs text-brand-muted">19:30 | הוילה בקיסריה</div>
                  <button className="w-full py-3 rounded-xl text-white text-sm font-bold mt-2" style={{ background: 'linear-gradient(135deg,#6C3BFF,#3BD1C6)' }}>
                    אישור הגעה (RSVP)
                  </button>
                  <div className="text-xs text-brand-purple font-semibold cursor-pointer">📍 הוראות הגעה ב-Waze</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-brand-bg">
        <div className="section-container">
          <h2 className="text-3xl font-black text-center text-brand-text mb-12">
            איך זה עובד?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.num} className="bg-white rounded-3xl p-6 border border-brand-border shadow-card text-center">
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="text-xs font-bold text-brand-purple mb-2 tracking-widest">{s.num}</div>
                <h3 className="font-black text-brand-text mb-2">{s.title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates preview */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl font-black text-brand-text">תבניות לחתונה</h2>
            <Link href="/templates" className="text-sm font-bold text-brand-purple hover:underline">
              כל התבניות ←
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {weddingTemplates.map((t) => (
              <Link key={t.id} href="/app/editor">
                <div className="card overflow-hidden group cursor-pointer">
                  <div className="relative h-56" style={{ background: t.preview }}>
                    {t.isPremium && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="premium">Premium</Badge>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-brand-text/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-4 py-2 rounded-xl text-white font-bold text-sm" style={{ background: 'linear-gradient(135deg,#6C3BFF,#3BD1C6)' }}>
                        בחר עיצוב
                      </span>
                    </div>
                  </div>
                  <div className="p-3 border-t border-brand-border">
                    <p className="text-sm font-bold text-brand-text">{t.name}</p>
                    <p className="text-xs text-brand-muted">{t.tags[0]}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="py-20 bg-brand-bg">
        <div className="section-container max-w-3xl">
          <h2 className="text-2xl font-black text-brand-text mb-4">למה לבחור בהזמנות דיגיטליות לחתונה?</h2>
          <div className="space-y-4 text-brand-muted leading-relaxed">
            <p>
              הזמנות דיגיטליות לחתונה הפכו לבחירה הפופולרית ביותר בקרב זוגות בישראל. הן חוסכות עלויות הדפסה,
              ידידותיות לסביבה, ומאפשרות שינויים של פרטים ברגע האחרון — בלי לדפוס מחדש.
            </p>
            <p>
              עם Vimo, אפשר ליצור הזמנת חתונה מרהיבה שנראית כאילו עיצב אותה גרפיקאי מקצועי — תוך פחות מ-10 דקות.
              בחרו תבנית, הוסיפו את פרטי האירוע שלכם, ושלחו בוואטסאפ ישירות מהטלפון.
            </p>
            <p>
              אישורי ההגעה מגיעים אוטומטית ללוח הבקרה, ואתם רואים בזמן אמת כמה מגיעים, כמה ביטלו,
              ולמי עדיין לא ענה — בלי רשימות אקסל מתסבכות.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="מוכנים לשלוח את ההזמנות?"
        subtitle="הצטרפו לאלפי זוגות שכבר השתמשו ב-Vimo לחתונה שלהם."
        primaryLabel="צרו הזמנת חתונה עכשיו"
      />
    </MarketingLayout>
  )
}
