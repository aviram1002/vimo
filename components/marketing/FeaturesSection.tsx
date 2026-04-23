import { Card } from '@/components/ui/Card'

const features = [
  {
    icon: '🎨',
    title: 'עיצובים מקצועיים',
    desc: 'בחרו מתוך מאות תבניות לכל סוג אירוע. חתונות, ימי הולדת, אירועים עסקיים ועוד.',
    color: 'bg-violet-100',
  },
  {
    icon: '📲',
    title: 'שליחה בוואטסאפ',
    desc: 'שלחו הזמנות ישירות לכל אנשי הקשר שלכם בלחיצה אחת עם הודעה מותאמת אישית.',
    color: 'bg-teal-100',
  },
  {
    icon: '✅',
    title: 'ניהול אישורי הגעה',
    desc: 'עקבו בזמן אמת אחרי כל מי שאישר ומי שסירב. פילטרים, חיפוש וייצוא לאקסל.',
    color: 'bg-pink-100',
  },
  {
    icon: '🔗',
    title: 'קישור וקוד QR',
    desc: 'כל הזמנה מקבלת כתובת URL ייחודית וקוד QR להדפסה ולסריקה בכניסה לאירוע.',
    color: 'bg-amber-100',
  },
  {
    icon: '📊',
    title: 'מעקב אוטומטי',
    desc: 'קבלו עדכונים בזמן אמת ודוחות מסודרים על מצב האישורים שלכם.',
    color: 'bg-green-100',
  },
  {
    icon: '🔒',
    title: 'פרטיות ואבטחה',
    desc: 'כל נתוני האורחים מוצפנים ומאוחסנים בצורה מאובטחת לפי תקנות GDPR.',
    color: 'bg-blue-100',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-bold text-brand-purple uppercase tracking-widest mb-3">
            למה Vimo?
          </p>
          <h2 className="text-4xl font-black tracking-tight text-brand-text mb-4">
            הכלים הנכונים לאירוע{' '}
            <span className="text-gradient">מושלם</span>
          </h2>
          <p className="text-lg text-brand-muted leading-relaxed">
            פיתחנו עבורכם את הכלים שכבר חיכיתם להם — כל מה שצריך במקום אחד.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <Card key={f.title} hover className="card-lift p-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 ${f.color}`}>
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-brand-text mb-2">{f.title}</h3>
              <p className="text-sm text-brand-muted leading-relaxed">{f.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
