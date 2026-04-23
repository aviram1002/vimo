import type { Metadata } from 'next'
import Link from 'next/link'
import { MarketingLayout } from '@/components/layout/MarketingLayout'
import { CTASection } from '@/components/marketing/CTASection'

export const metadata: Metadata = {
  title: 'הזמנות לבר מצווה ובת מצווה – דיגיטלי ומרשים',
  description:
    'הזמנות דיגיטליות לבר מצווה ובת מצווה בעיצוב מקצועי. שלחו לכל המשפחה בוואטסאפ ונהלו אישורי הגעה בקלות.',
  keywords: ['הזמנות בר מצווה', 'הזמנות בת מצווה', 'הזמנות דיגיטליות בר מצווה'],
  alternates: { canonical: 'https://vimo.co.il/invitations/bar-mitzvah' },
}

export default function BarMitzvahPage() {
  return (
    <MarketingLayout>
      <section className="py-20 bg-white border-b border-brand-border">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 border border-teal-200 text-teal-700 text-sm font-bold mb-5">
                ✡️ הזמנות לבר/בת מצווה
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-brand-text leading-tight mb-5">
                הזמנות בר מצווה{' '}
                <span className="text-gradient">שהמשפחה תאהב</span>
              </h1>
              <p className="text-lg text-brand-muted leading-relaxed mb-8">
                צרו הזמנה מכובדת ומרשימה לאחד האירועים החשובים בחיי משפחתכם.
                שלחו לכל הקרובים ועקבו אחרי האישורים בקלות.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/app/editor"
                  className="px-7 py-3.5 rounded-2xl text-white font-bold text-base"
                  style={{ background: 'linear-gradient(135deg,#6C3BFF,#3BD1C6)', boxShadow: '0 4px 18px rgba(108,59,255,.35)' }}
                >
                  צור הזמנה עכשיו
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
                  background: 'linear-gradient(160deg,#e0f7fa,#b2ebf2)',
                  boxShadow: '0 24px 80px rgba(59,209,198,0.22), 0 0 0 8px #1E1F2B',
                }}
              >
                <div className="w-24 h-5 bg-brand-text rounded-b-2xl mx-auto" />
                <div className="px-6 py-6 text-center space-y-3">
                  <div className="text-5xl">✡️</div>
                  <div className="text-xs font-bold text-teal-700 tracking-widest">בשעה טובה</div>
                  <div className="text-xl font-black text-brand-text">בר מצווה</div>
                  <div className="text-lg font-black text-gradient">אלון בן-דוד</div>
                  <div className="text-sm font-bold text-brand-purple">20.01.2025 | 17:00</div>
                  <div className="text-xs text-brand-muted">אולם אורנים, ירושלים</div>
                  <button className="w-full py-3 rounded-xl text-white text-sm font-bold mt-2" style={{ background: 'linear-gradient(135deg,#6C3BFF,#3BD1C6)' }}>
                    אישור הגעה
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content section */}
      <section className="py-16 bg-brand-bg">
        <div className="section-container max-w-3xl">
          <h2 className="text-2xl font-black text-brand-text mb-6">מדוע הזמנה דיגיטלית לבר מצווה?</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: 'חיסכון משמעותי', desc: 'הדפסת הזמנות נייר עולה אלפי שקלים. הזמנה דיגיטלית עולה שבריר מזה.', icon: '💰' },
              { title: 'שינויים ברגע האחרון', desc: 'שינוי מקום או שעה? עדכנו ב-30 שניות בלי להדפיס מחדש.', icon: '⚡' },
              { title: 'הגיע לכולם', desc: 'וואטסאפ מגיעה לכולם — גם לסבתא ולדוד שבחו"ל.', icon: '📲' },
              { title: 'מעקב אישורים', desc: 'ראו מי אישר ומי לא — בלי טלפונים ובלי רשימות ידניות.', icon: '✅' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-5 border border-brand-border shadow-card flex gap-4">
                <div className="text-2xl flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-brand-text mb-1">{item.title}</h3>
                  <p className="text-sm text-brand-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="בשעה טובה ומוצלחת! ✡️"
        subtitle="צרו הזמנת בר/בת מצווה מרשימה עכשיו — חינם."
        primaryLabel="צור הזמנת בר מצווה"
      />
    </MarketingLayout>
  )
}
