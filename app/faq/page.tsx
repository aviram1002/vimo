import type { Metadata } from 'next'
import { MarketingLayout } from '@/components/layout/MarketingLayout'
import { CTASection } from '@/components/marketing/CTASection'

export const metadata: Metadata = {
  title: 'שאלות נפוצות – Vimo',
  description: 'תשובות לשאלות הנפוצות ביותר על הזמנות דיגיטליות, שליחה בוואטסאפ וניהול אישורי הגעה ב-Vimo.',
}

const faqs = [
  {
    q: 'האם Vimo חינמית לשימוש?',
    a: 'כן! יש לנו פלן חינמי שמאפשר ליצור אירוע אחד עם עד 50 מוזמנים. לאירועים גדולים יותר יש לנו פלן פרו במחיר סביר.',
  },
  {
    q: 'כמה זמן לוקח ליצור הזמנה?',
    a: 'רוב המשתמשים שלנו יוצרים הזמנה מוכנה תוך 5–10 דקות. בחרו תבנית, הוסיפו את פרטי האירוע — וזהו!',
  },
  {
    q: 'איך שולחים את ההזמנות?',
    a: 'אפשר לשלוח ישירות בוואטסאפ לכל איש קשר, להעתיק קישור ולשתף בכל פלטפורמה, או להדפיס קוד QR לכניסה לאירוע.',
  },
  {
    q: 'האם ניתן לקבל אישורי הגעה ב-Vimo?',
    a: 'בהחלט! כל הזמנה כוללת עמוד RSVP מותאם אישית. האורחים לוחצים "מגיע" ואתם רואים את כל האישורים בזמן אמת בלוח הבקרה.',
  },
  {
    q: 'האם ניתן לייצא את רשימת האורחים?',
    a: 'כן, בפלן פרו ועסקי ניתן לייצא את כל רשימת האורחים עם הסטטוסים שלהם לקובץ אקסל.',
  },
  {
    q: 'מה ההבדל בין פלן פרו לפלן עסקי?',
    a: 'פלן פרו מתאים לאירוע אחד ללא מגבלות. פלן עסקי מתאים לאנשים שמנהלים אירועים מרובים — מארגני אירועים, בתי עסק, ועוד.',
  },
  {
    q: 'האם ההזמנה נראית טוב בנייד?',
    a: 'כן! כל ההזמנות שלנו מותאמות באופן מלא לנייד ולמחשב. האורחים יכולים לפתוח ולאשר הגעה מכל מכשיר.',
  },
  {
    q: 'האם אפשר להסיר את המיתוג של Vimo?',
    a: 'בפלן פרו ומעלה אפשר להסיר לחלוטין את המיתוג של Vimo מההזמנות שלכם.',
  },
]

export default function FAQPage() {
  return (
    <MarketingLayout>
      <section className="bg-white border-b border-brand-border py-20">
        <div className="section-container text-center">
          <h1 className="text-4xl font-black text-brand-text mb-4">
            שאלות{' '}
            <span className="text-gradient">ותשובות</span>
          </h1>
          <p className="text-lg text-brand-muted">כל מה שצריך לדעת על Vimo</p>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-white rounded-2xl border border-brand-border p-6 group cursor-pointer open:shadow-card-hover transition-all"
              >
                <summary className="flex items-center justify-between font-bold text-brand-text text-base list-none">
                  <span>{faq.q}</span>
                  <span className="text-brand-muted group-open:text-brand-purple group-open:rotate-180 transition-transform text-xl ml-3">
                    ▾
                  </span>
                </summary>
                <p className="mt-4 text-sm text-brand-muted leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="עדיין יש שאלות?"
        subtitle="צוות התמיכה שלנו זמין 7 ימים בשבוע לעזור לכם."
        primaryLabel="פנה לתמיכה"
        secondaryLabel="קרא מדריכים"
      />
    </MarketingLayout>
  )
}
