import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'

const footerLinks = {
  'מוצר': [
    { label: 'תכונות', href: '/#features' },
    { label: 'תבניות עיצוב', href: '/templates' },
    { label: 'מחירים', href: '/pricing' },
    { label: 'שאלות ותשובות', href: '/faq' },
  ],
  'אירועים': [
    { label: 'הזמנות לחתונה', href: '/invitations/wedding' },
    { label: 'הזמנות לבר מצווה', href: '/invitations/bar-mitzvah' },
    { label: 'הזמנות ליום הולדת', href: '/invitations/birthday' },
    { label: 'אישורי הגעה', href: '/invitations/rsvp' },
  ],
  'חברה': [
    { label: 'אודות', href: '/about' },
    { label: 'בלוג', href: '/blog' },
    { label: 'צור קשר', href: '/contact' },
    { label: 'תנאי שימוש', href: '/terms' },
  ],
}

export function MarketingFooter() {
  return (
    <footer className="bg-brand-text text-white">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" />
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Vimo היא הפלטפורמה הקלה והיפה ביותר ליצירת הזמנות דיגיטליות, 
              שליחה בוואטסאפ וניהול אישורי הגעה לכל סוג אירוע.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {['Instagram', 'Facebook', 'TikTok'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-150"
                  aria-label={social}
                >
                  <span className="text-sm font-bold text-white/70">
                    {social[0]}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="space-y-4">
              <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest">
                {group}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Vimo. כל הזכויות שמורות.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              מדיניות פרטיות
            </Link>
            <Link href="/terms" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              תנאי שימוש
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
