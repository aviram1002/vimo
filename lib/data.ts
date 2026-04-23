import type { VimoEvent, Guest, Template, PricingPlan, Article } from '@/types'

// ─── Events ─────────────────────────────────────────────────
export const mockEvents: VimoEvent[] = [
  {
    id: '1',
    name: 'החתונה של נועה ודניאל',
    type: 'wedding',
    date: '2024-09-12',
    time: '19:30',
    venue: 'הוילה בקיסריה',
    address: 'קיסריה, ישראל',
    emoji: '💍',
    coverGradient: 'linear-gradient(135deg,#667eea,#764ba2)',
    status: 'published',
    totalInvited: 300,
    rsvpConfirmed: 245,
    rsvpDeclined: 18,
    rsvpPending: 37,
    createdAt: '2024-06-01',
    slug: 'noa-daniel-wedding',
  },
  {
    id: '2',
    name: 'מסיבת יום הולדת ליהונתן',
    type: 'birthday',
    date: '2024-10-05',
    time: '18:00',
    venue: 'גן האירועים הירוק',
    address: 'תל אביב, ישראל',
    emoji: '🎂',
    coverGradient: 'linear-gradient(135deg,#f093fb,#f5576c)',
    status: 'published',
    totalInvited: 50,
    rsvpConfirmed: 42,
    rsvpDeclined: 3,
    rsvpPending: 5,
    createdAt: '2024-08-01',
    slug: 'yonatan-bday',
  },
  {
    id: '3',
    name: 'כנס טכנולוגיה 2024',
    type: 'business',
    date: '2024-11-18',
    time: '09:00',
    venue: 'מרכז הכנסים SAFE',
    address: 'תל אביב',
    emoji: '🏢',
    coverGradient: 'linear-gradient(135deg,#0f2027,#2c5364)',
    status: 'draft',
    totalInvited: 1000,
    rsvpConfirmed: 120,
    rsvpDeclined: 50,
    rsvpPending: 830,
    createdAt: '2024-07-15',
    slug: 'tech-conf-2024',
  },
  {
    id: '4',
    name: 'בר מצווה של אלון',
    type: 'bar-mitzvah',
    date: '2024-12-20',
    time: '17:00',
    venue: 'אולם אורנים',
    address: 'ירושלים',
    emoji: '✡️',
    coverGradient: 'linear-gradient(135deg,#43e97b,#38f9d7)',
    status: 'draft',
    totalInvited: 150,
    rsvpConfirmed: 0,
    rsvpDeclined: 0,
    rsvpPending: 150,
    createdAt: '2024-09-01',
    slug: 'alon-bar-mitzvah',
  },
]

// ─── Guests ─────────────────────────────────────────────────
export const mockGuests: Guest[] = [
  { id: 'g1', name: 'ישראל ישראלי',   phone: '050-1234567', group: 'משפחה',  status: 'coming',     count: 2, message: 'מזל טוב! מחכים לחגוג אתכם', eventId: '1', createdAt: '2024-07-01' },
  { id: 'g2', name: 'מיכל עוז',        phone: '054-9876543', group: 'חברים',  status: 'not-coming', count: 0, message: '',                             eventId: '1', createdAt: '2024-07-02' },
  { id: 'g3', name: 'דוד גולן',         phone: '052-4455667', group: 'עבודה',  status: 'maybe',      count: 1, message: 'מחכה לאישור סידור עבודה',      eventId: '1', createdAt: '2024-07-03' },
  { id: 'g4', name: 'אבי לוי',          phone: '053-1122334', group: 'משפחה',  status: 'coming',     count: 4, message: 'מגיעים כל המשפחה',              eventId: '1', createdAt: '2024-07-04' },
  { id: 'g5', name: 'שירה כהן',         phone: '050-9988776', group: 'חברים',  status: 'coming',     count: 2, message: '',                             eventId: '1', createdAt: '2024-07-05' },
  { id: 'g6', name: 'יוסי פרידמן',     phone: '058-3344556', group: 'משפחה',  status: 'pending',    count: 3, message: '',                             eventId: '1', createdAt: '2024-07-06' },
  { id: 'g7', name: 'נורית שמש',        phone: '054-2233441', group: 'עבודה',  status: 'coming',     count: 1, message: 'ממש מרגשת! אחכה לזה',          eventId: '1', createdAt: '2024-07-07' },
  { id: 'g8', name: 'רון אברהם',        phone: '052-6677889', group: 'חברים',  status: 'not-coming', count: 0, message: 'לצערי בחו"ל',                  eventId: '1', createdAt: '2024-07-08' },
]

// ─── Templates ──────────────────────────────────────────────
export const mockTemplates: Template[] = [
  {
    id: 't1', name: 'אלגנטיות קלאסית', category: 'wedding', isPremium: true,
    preview: 'linear-gradient(160deg,#fdf6ff,#f0eeff)',
    description: 'עיצוב נקי ואלגנטי לחתונה קלאסית', tags: ['חתונה', 'נקי'],
  },
  {
    id: 't2', name: 'חגיגת צבעים', category: 'birthday', isPremium: false,
    preview: 'linear-gradient(160deg,#fff0f8,#ffe0f0)',
    description: 'עיצוב צבעוני ושמח ליום הולדת', tags: ['יום הולדת', 'צבעוני'],
  },
  {
    id: 't3', name: 'מינימליזם אורבני', category: 'business', isPremium: false,
    preview: 'linear-gradient(160deg,#0f0f1a,#1a1a2e)',
    description: 'עיצוב מקצועי לאירועים עסקיים', tags: ['עסקי', 'מודרני'],
  },
  {
    id: 't4', name: 'ערב גאלה יוקרתי', category: 'wedding', isPremium: true,
    preview: 'linear-gradient(160deg,#fef9f0,#fff3e0)',
    description: 'הזמנה יוקרתית בסגנון זהב', tags: ['יוקרה', 'זהב'],
  },
  {
    id: 't5', name: 'נקי ורענן', category: 'bar-mitzvah', isPremium: false,
    preview: 'linear-gradient(160deg,#e0f7fa,#b2ebf2)',
    description: 'עיצוב נקי לברית ובר מצווה', tags: ['ברית', 'מסורתי'],
  },
  {
    id: 't6', name: 'פרחים עדינים', category: 'birthday', isPremium: false,
    preview: 'linear-gradient(160deg,#f3e5f5,#e1bee7)',
    description: 'עיצוב פרחוני לנשים', tags: ['נשי', 'פרחים'],
  },
  {
    id: 't7', name: 'לילה בפריז', category: 'party', isPremium: true,
    preview: 'linear-gradient(160deg,#1a1a2e,#e94560)',
    description: 'מסיבה בסגנון צרפתי', tags: ['מסיבה', 'יוקרה'],
  },
  {
    id: 't8', name: 'גרדיאנט חיים', category: 'birthday', isPremium: false,
    preview: 'linear-gradient(135deg,#6C3BFF,#3BD1C6)',
    description: 'עיצוב עכשווי עם גרדיאנטים', tags: ['מודרני', 'טרנדי'],
  },
]

// ─── Pricing Plans ──────────────────────────────────────────
export const pricingPlans: PricingPlan[] = [
  {
    id: 'free', name: 'חינמי', price: 0, period: 'event',
    description: 'מושלם לאירוע אחד',
    cta: 'התחל חינם',
    features: [
      'אירוע אחד',
      'עד 50 מוזמנים',
      '3 תבניות בסיסיות',
      'שליחה בוואטסאפ',
      'עמוד אישורי הגעה',
    ],
  },
  {
    id: 'pro', name: 'פרו', price: 99, period: 'event',
    description: 'לאירוע אחד ללא מגבלות',
    highlighted: true,
    cta: 'בחר פרו',
    features: [
      'אירוע אחד',
      'אורחים ללא הגבלה',
      'כל התבניות פרמיום',
      'קוד QR מותאם אישית',
      'ניהול אורחים מלא',
      'תזכורות אוטומטיות',
      'ייצוא לאקסל',
      'ללא מיתוג Vimo',
    ],
  },
  {
    id: 'business', name: 'עסקי', price: 299, period: 'month',
    description: 'לאירועים מרובים ועסקים',
    cta: 'צור קשר',
    features: [
      'אירועים ללא הגבלה',
      'אורחים ללא הגבלה',
      'כל תבניות פרמיום',
      'API גישה',
      'ניהול צוות',
      'אנליטיקה מתקדמת',
      'תמיכה עדיפותית',
      'דומיין מותאם אישית',
    ],
  },
]

// ─── Blog articles ──────────────────────────────────────────
export const blogArticles: Article[] = [
  {
    slug: 'digital-invitations-guide',
    title: 'המדריך המלא להזמנות דיגיטליות לחתונה',
    description: 'כל מה שצריך לדעת על יצירת הזמנות דיגיטליות יפות ואפקטיביות לחתונה שלכם',
    category: 'חתונה',
    date: '2024-08-15',
    readTime: 8,
  },
  {
    slug: 'rsvp-management-tips',
    title: '10 טיפים לניהול אישורי הגעה ללא כאב ראש',
    description: 'אל תבלו שעות בטלפון — כך תנהלו את אישורי ההגעה בצורה חכמה ואוטומטית',
    category: 'ניהול אירועים',
    date: '2024-08-01',
    readTime: 5,
  },
  {
    slug: 'whatsapp-invitations',
    title: 'איך לשלוח הזמנות בוואטסאפ שאנשים אכן קוראים',
    description: 'הסוד לכתיבת הודעת וואטסאפ שמגיעה לכולם ומקבלת תגובה',
    category: 'שיווק',
    date: '2024-07-20',
    readTime: 4,
  },
]

// ─── Helpers ─────────────────────────────────────────────────
export const EVENT_TYPE_LABELS: Record<string, string> = {
  wedding:    'חתונה',
  birthday:   'יום הולדת',
  business:   'עסקי',
  party:      'מסיבה',
  'bar-mitzvah': 'בר/בת מצווה',
  other:      'אחר',
}

export const GUEST_STATUS_LABELS: Record<string, string> = {
  coming:      'מגיע',
  'not-coming':'לא מגיע',
  maybe:       'אולי',
  pending:     'לא ענה',
}
