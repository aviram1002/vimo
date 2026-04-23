import type { Metadata } from 'next'
import Link from 'next/link'
import { MarketingLayout } from '@/components/layout/MarketingLayout'
import { CTASection } from '@/components/marketing/CTASection'

export const metadata: Metadata = {
  title: 'הזמנות דיגיטליות ליום הולדת – שלחו בוואטסאפ',
  description:
    'צרו הזמנות יום הולדת צבעוניות ושמחות תוך דקות. שלחו לכל החברים בוואטסאפ ונהלו אישורי הגעה בקלות.',
  keywords: ['הזמנות יום הולדת', 'הזמנות יום הולדת דיגיטליות', 'הזמנות יום הולדת וואטסאפ'],
  alternates: { canonical: 'https://vimo.co.il/invitations/birthday' },
}

const features = [
  { icon: '🎨', title: 'עיצובים צבעוניים', desc: 'תבניות שמחות ומושכות עין לכל גיל' },
  { icon: '📲', title: 'שליחה בוואטסאפ', desc: 'שלחו לכל החברים בלחיצה אחת' },
  { icon: '✅', title: 'אישורי הגעה', desc: 'ראו בזמן אמת מי מגיע למסיבה' },
  { icon: '🎁', title: 'הפתעות נוספות', desc: 'הוסיפו ספירה לאחור ומשחקים' },
]

export default function BirthdayInvitationsPage() {
  return (
    <MarketingLayout>
      <section className="py-20 bg-white border-b border-brand-border">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 border border-pink-200 text-pink-700 text-sm font-bold mb-5">
                🎂 הזמנות ליום הולדת
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-brand-text leading-tight mb-5">
                הזמנות יום הולדת{' '}
                <span className="text-gradient">שהחברים יאהבו</span>
              </h1>
              <p className="text-lg text-brand-muted leading-relaxed mb-8">
                צרו הזמנה צבעונית ושמחה שתגרום לכולם להגיע. שלחו בוואטסאפ ונהלו את רשימת האורחים
                בלי להסתבך.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/app/editor"
                  className="px-7 py-3.5 rounded-2xl text-white font-bold text-base inline-flex items-center gap-2"
                  style={{ background: 'linear-gradient(135deg,#FF4FA3,#FF8C42)', boxShadow: '0 4px 18px rgba(255,79,163,.35)' }}
                >
                  צור הזמנה עכשיו 🎉
                </Link>
                <Link
                  href="/templates"
                  className="px-7 py-3.5 rounded-2xl border border-brand-border text-brand-text font-bold text-base hover:border-brand-purple hover:text-brand-purple transition-all bg-white"
                >
                  ראה תבניות
                </Link>
              </div>
            </div>

            {/* Visual */}
            <div className="flex justify-center">
              <div
                className="w-72 rounded-[36px] overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg,#fff0f8,#ffe4f4)',
                  boxShadow: '0 24px 80px rgba(255,79,163,0.22), 0 0 0 8px #1E1F2B',
                }}
              >
                <div className="w-24 h-5 bg-brand-text rounded-b-2xl mx-auto" />
                <div className="px-6 py-6 text-center space-y-3">
                  <div className="text-5xl">🎂</div>
                  <div className="text-2xl font-black text-brand-pink">Happy Birthday!</div>
                  <div className="text-xl font-black text-brand-text">יהונתן</div>
                  <div className="text-xs text-brand-muted">מוזמנים לחגוג איתנו!</div>
                  <div className="text-sm font-bold text-brand-purple">5.10.2024 | 18:00</div>
                  <div className="text-xs text-brand-muted">גן האירועים הירוק, ת"א</div>
                  <button className="w-full py-3 rounded-xl text-white text-sm font-bold mt-2" style={{ background: 'linear-gradient(135deg,#FF4FA3,#FF8C42)' }}>
                    אישור הגעה 🎉
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-brand-bg">
        <div className="section-container">
          <h2 className="text-3xl font-black text-center text-brand-text mb-10">מה מקבלים?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-3xl p-6 border border-brand-border shadow-card text-center">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-black text-brand-text mb-2">{f.title}</h3>
                <p className="text-sm text-brand-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="py-16 bg-white">
        <div className="section-container max-w-3xl">
          <h2 className="text-2xl font-black text-brand-text mb-4">הזמנות יום הולדת דיגיטליות — הדרך המודרנית לחגוג</h2>
          <div className="space-y-4 text-brand-muted leading-relaxed">
            <p>
              שלחו הזמנות יום הולדת בוואטסאפ תוך שניות לכל החברים והמשפחה. אין צורך בהדפסה, אין בזבוז כסף,
              ואין סיבוכים — פשוט בוחרים תבנית, כותבים פרטים ושולחים.
            </p>
            <p>
              עם Vimo, כל אורח שמקבל הזמנה יכול לאשר הגעה בלחיצה אחת, וכם תראו בזמן אמת מי מגיע ומי לא.
              אין יותר שאלות "אתה בא?" בוואטסאפ.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="בואו נחגוג יחד! 🎉"
        subtitle="צרו הזמנת יום הולדת מדהימה עכשיו."
        primaryLabel="צור הזמנת יום הולדת"
      />
    </MarketingLayout>
  )
}
