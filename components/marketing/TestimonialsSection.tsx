import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'

const testimonials = [
  {
    name: 'נועה ודניאל כץ',
    role: 'זוג נשוי',
    text: 'Vimo הפכה את כל תהליך הזמנות החתונה לחוויה מהנה. תוך שעה היה לנו עמוד יפה וכל האורחים קיבלו הזמנה.',
    stars: 5,
  },
  {
    name: 'שירה לוי',
    role: 'מארגנת אירועים',
    text: 'אני משתמשת ב-Vimo לכל אירוע. החיסכון בזמן עצום — מה שלקח יומיים עכשיו לוקח שעה אחת.',
    stars: 5,
  },
  {
    name: 'ד"ר יוסי כהן',
    role: 'מנהל כנסים',
    text: 'ניהול 1,000 מוזמנים עם מעקב אחרי כל אישור זה משהו שלא האמנתי שיהיה פשוט. Vimo הוכיחה אחרת.',
    stars: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-brand-bg">
      <div className="section-container">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-3">
            {'★★★★★'.split('').map((s, i) => (
              <span key={i} className="text-amber-400 text-2xl">{s}</span>
            ))}
          </div>
          <h2 className="text-3xl font-black text-brand-text">
            מה אומרים המשתמשים שלנו
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.name} hover className="card-lift p-6 flex flex-col gap-4">
              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-brand-text leading-relaxed text-sm flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-brand-border">
                <Avatar name={t.name} size="sm" />
                <div>
                  <p className="text-sm font-bold text-brand-text">{t.name}</p>
                  <p className="text-xs text-brand-muted">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
