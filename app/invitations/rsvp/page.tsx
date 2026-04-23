import type { Metadata } from 'next'
import Link from 'next/link'
import { MarketingLayout } from '@/components/layout/MarketingLayout'
import { CTASection } from '@/components/marketing/CTASection'

export const metadata: Metadata = {
  title: 'ניהול אישורי הגעה – RSVP לאירועים',
  description:
    'מערכת אישורי הגעה אוטומטית. כל אורח מאשר בלחיצה אחת, ואתם רואים הכל בזמן אמת. ללא רשימות אקסל.',
  keywords: ['אישורי הגעה', 'RSVP', 'ניהול אישורים', 'RSVP לחתונה'],
  alternates: { canonical: 'https://vimo.co.il/invitations/rsvp' },
}

const rsvpFeatures = [
  {
    icon: '👆',
    title: 'אישור בלחיצה אחת',
    desc: 'האורח מקבל הזמנה, לוחץ "מגיע" — וזהו. פשוט ומהיר גם לבני 70.',
  },
  {
    icon: '📊',
    title: 'סטטיסטיקות בזמן אמת',
    desc: 'ראו בכל רגע כמה אישרו, כמה ביטלו ולמי עדיין לא ענה.',
  },
  {
    icon: '🔔',
    title: 'תזכורות אוטומטיות',
    desc: 'מי שלא ענה מקבל תזכורת אוטומטית. פחות שיחות טלפון, יותר שקט נפשי.',
  },
  {
    icon: '📋',
    title: 'ייצוא לאקסל',
    desc: 'ייצאו את כל הרשימה עם כמויות ואישורים לקובץ אקסל בלחיצה אחת.',
  },
  {
    icon: '💬',
    title: 'הודעה מותאמת',
    desc: 'כל אורח יכול לצרף הודעה אישית בעת האישור — נגיע 3 נפשות!',
  },
  {
    icon: '🔗',
    title: 'קישור ייחודי',
    desc: 'כל אירוע מקבל קישור ייחודי. אפשר לשתף בכל מקום, בכל זמן.',
  },
]

export default function RSVPLandingPage() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="py-20 bg-white border-b border-brand-border">
        <div className="section-container max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 border border-green-200 text-green-700 text-sm font-bold mb-5">
            ✅ אישורי הגעה
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-brand-text leading-tight mb-5">
            אישורי הגעה{' '}
            <span className="text-gradient">שעובדים לבד</span>
          </h1>
          <p className="text-xl text-brand-muted leading-relaxed mb-8 max-w-2xl mx-auto">
            שלחו הזמנה, ואת השאר Vimo עושה בשבילכם. כל אישור מגיע ישר ללוח הבקרה,
            בזמן אמת, ללא רשימות ידניות.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/app/dashboard"
              className="px-8 py-4 rounded-2xl text-white font-bold text-base"
              style={{ background: 'linear-gradient(135deg,#6C3BFF,#3BD1C6)', boxShadow: '0 4px 18px rgba(108,59,255,.35)' }}
            >
              התחל עכשיו – חינם
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 rounded-2xl border border-brand-border text-brand-text font-bold text-base hover:border-brand-purple hover:text-brand-purple transition-all bg-white"
            >
              ראה מחירים
            </Link>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 bg-brand-bg">
        <div className="section-container">
          <h2 className="text-3xl font-black text-center text-brand-text mb-12">
            כל מה שצריך לניהול אישורים
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rsvpFeatures.map((f) => (
              <div key={f.title} className="bg-white rounded-3xl p-6 border border-brand-border shadow-card">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-black text-brand-text mb-2 text-base">{f.title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it looks */}
      <section className="py-20 bg-white">
        <div className="section-container max-w-5xl">
          <h2 className="text-3xl font-black text-center text-brand-text mb-12">
            ככה נראה לוח האישורים שלכם
          </h2>
          <div className="bg-brand-bg rounded-3xl border border-brand-border p-6 shadow-card">
            {/* Mock dashboard stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { label: 'מוזמנים',  val: '300', color: 'text-brand-purple' },
                { label: 'מגיעים',   val: '245', color: 'text-green-600' },
                { label: 'לא מגיעים',val: '18',  color: 'text-red-500' },
                { label: 'לא ענו',   val: '37',  color: 'text-amber-500' },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl p-4 border border-brand-border text-center shadow-sm">
                  <div className={`text-2xl font-black ${s.color}`}>{s.val}</div>
                  <div className="text-xs text-brand-muted mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="bg-white rounded-2xl p-4 border border-brand-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-brand-text">קצב האישורים</span>
                <span className="text-sm font-bold text-brand-purple">82%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[82%] rounded-full" style={{ background: 'linear-gradient(90deg,#6C3BFF,#3BD1C6)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="סיימו עם הרשימות הידניות"
        subtitle="תנו ל-Vimo לנהל את האישורים בשבילכם."
        primaryLabel="התחל עכשיו בחינם"
        secondaryLabel="ראה מחירים"
      />
    </MarketingLayout>
  )
}
