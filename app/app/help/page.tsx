import { AppTopBar } from '@/components/layout/AppTopBar'
import Link from 'next/link'

const faqs = [
  { q: 'איך יוצרים אירוע חדש?',           a: 'לחץ על "צור אירוע חדש" בלוח הבקרה, בחר תבנית ומלא את הפרטים.' },
  { q: 'איך שולחים הזמנות בוואטסאפ?',     a: 'כנס לדף "אישורי הגעה" → "שלח הזמנות" → לחץ על כפתור הוואטסאפ.' },
  { q: 'איך מוסיפים אורחים?',              a: 'כנס לדף "ניהול אורחים" ולחץ על "+ הוסף אורח" או ייבא מאקסל.' },
  { q: 'מה ההבדל בין טיוטה לפורסם?',      a: 'טיוטה = רק אתה רואה. פורסם = האורחים יכולים לגשת ולאשר הגעה.' },
  { q: 'איך מפרסמים אירוע?',              a: 'ערוך את האירוע ושנה את הסטטוס מ"טיוטה" ל"פורסם".' },
  { q: 'האם אפשר לייצא את רשימת האורחים?', a: 'כן! בדף "ניהול אורחים" יש כפתור "ייצוא לאקסל".' },
]

export default function HelpPage() {
  return (
    <div>
      <AppTopBar title="עזרה ותמיכה 💬" subtitle="כל מה שצריך לדעת על Vimo" />
      <div className="p-6 max-w-3xl space-y-6">
        {/* Quick links */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: '📖', title: 'מדריך התחלה',    desc: 'למתחילים' },
            { icon: '📹', title: 'סרטוני הדרכה',   desc: 'YouTube' },
            { icon: '✉️', title: 'צור קשר',         desc: 'support@vimo.co.il' },
          ].map(item => (
            <div key={item.title} className="card p-5 text-center hover:shadow-card-hover transition-all cursor-pointer">
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="font-bold text-brand-text text-sm">{item.title}</p>
              <p className="text-xs text-brand-muted mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="card overflow-hidden">
          <div className="p-5 border-b border-brand-border">
            <h2 className="font-black text-brand-text">שאלות נפוצות</h2>
          </div>
          <div className="divide-y divide-brand-border">
            {faqs.map((faq, i) => (
              <details key={i} className="p-5 group cursor-pointer">
                <summary className="flex justify-between items-center font-bold text-brand-text text-sm list-none">
                  {faq.q}
                  <span className="text-brand-muted group-open:rotate-180 transition-transform text-lg">▾</span>
                </summary>
                <p className="mt-3 text-sm text-brand-muted leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="card p-6 text-center" style={{background:'linear-gradient(135deg,rgba(108,59,255,0.06),rgba(59,209,198,0.06))'}}>
          <p className="font-black text-brand-text mb-1">לא מצאת תשובה?</p>
          <p className="text-sm text-brand-muted mb-4">צוות התמיכה שלנו זמין 7 ימים בשבוע</p>
          <a href="mailto:support@vimo.co.il" className="px-6 py-2.5 rounded-xl text-white font-bold text-sm inline-block" style={{background:'linear-gradient(135deg,#6C3BFF,#3BD1C6)'}}>
            שלח מייל לתמיכה
          </a>
        </div>
      </div>
    </div>
  )
}
