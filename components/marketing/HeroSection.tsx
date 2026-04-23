import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-bg">
      {/* Background mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(108,59,255,0.10) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(59,209,198,0.08) 0%, transparent 60%)',
        }}
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, #C7C9E0 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="section-container relative py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 border border-violet-200 text-brand-purple text-sm font-bold mb-6">
              <span className="w-2 h-2 bg-brand-teal rounded-full animate-pulse-soft" />
              ✨ הדרך החדשה להזמין לאירועים
            </div>

            <h1 className="text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight text-brand-text mb-6">
              ככה יוצרים{' '}
              <span className="text-gradient">הזמנה לאירוע</span>
              <br />
              תוך דקות
            </h1>

            <p className="text-lg text-brand-muted leading-relaxed mb-8 max-w-lg">
              Vimo היא הפלטפורמה הקלה ביותר ליצור הזמנות דיגיטליות מדהימות,
              לשלוח בוואטסאפ ולנהל את כל האישורים במקום אחד.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link href="/app/dashboard">
                <Button variant="gradient" size="xl">
                  התחל עכשיו – חינם
                </Button>
              </Link>
              <Link href="/templates">
                <Button variant="outline" size="xl">
                  צפה בתבניות
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2 space-x-reverse">
                {['#6C3BFF', '#FF4FA3', '#3BD1C6', '#F59E0B'].map((c, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: c }}
                  >
                    {['נ', 'ד', 'מ', 'א'][i]}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <strong className="text-brand-text">+10,000</strong>{' '}
                <span className="text-brand-muted">זוגות ומארגנים כבר משתמשים ב-Vimo</span>
              </div>
            </div>
          </div>

          {/* Visual side */}
          <div className="relative flex justify-center animate-fade-up delay-200">
            {/* Phone mockup */}
            <div
              className="w-64 rounded-[40px] overflow-hidden relative z-10"
              style={{
                background: 'linear-gradient(160deg,#fdf6ff,#f0f4ff)',
                boxShadow: '0 24px 80px rgba(108,59,255,0.25), 0 0 0 8px #1E1F2B',
              }}
            >
              {/* Notch */}
              <div className="w-24 h-5 bg-brand-text rounded-b-2xl mx-auto" />
              {/* Content */}
              <div className="px-5 py-4 flex flex-col items-center gap-3 text-center min-h-[460px] justify-center">
                <div className="text-4xl">💍</div>
                <div className="text-xs text-brand-muted font-semibold">✦ אנחנו מתחתנים! ✦</div>
                <div
                  className="text-lg font-black text-brand-purple"
                  style={{ background: 'linear-gradient(135deg,#6C3BFF,#3BD1C6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  נועה & דניאל
                </div>
                <div className="w-8 h-0.5 bg-gradient-to-l from-brand-purple to-brand-teal rounded-full" />
                <div className="text-base font-black text-brand-purple">12.09.2024</div>
                <div className="text-xs text-brand-muted">19:30 | הוילה בקיסריה</div>
                <button
                  className="w-full py-2.5 rounded-xl text-white text-sm font-bold mt-1"
                  style={{ background: 'linear-gradient(135deg,#6C3BFF,#3BD1C6)' }}
                >
                  אישור הגעה (RSVP)
                </button>
                <div className="w-full bg-violet-50 rounded-xl p-3">
                  <div className="text-xs font-bold text-brand-purple mb-1.5">✓ 245 אישרו הגעה</div>
                  <div className="h-1.5 bg-violet-100 rounded-full overflow-hidden">
                    <div className="h-full w-4/5 rounded-full bg-gradient-to-l from-brand-purple to-brand-teal" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating stat cards */}
            <div className="absolute -left-4 top-12 bg-white rounded-2xl p-3 shadow-card border border-brand-border min-w-[130px] animate-fade-up delay-400">
              <div className="text-base mb-1">📊</div>
              <div className="text-2xl font-black text-brand-text">87%</div>
              <div className="text-xs text-brand-muted">שיעור אישרו</div>
              <div className="text-xs font-bold text-green-600 mt-1">↑ 12% השבוע</div>
            </div>

            <div className="absolute -right-4 bottom-16 bg-white rounded-2xl p-3 shadow-card border border-brand-border min-w-[130px] animate-fade-up delay-500">
              <div className="text-base mb-1">📲</div>
              <div className="text-2xl font-black text-brand-text">1,204</div>
              <div className="text-xs text-brand-muted">הזמנות נשלחו</div>
              <div className="text-xs font-bold text-green-600 mt-1">✓ הכל אוטומטי</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
