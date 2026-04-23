# Vimo – הזמנות דיגיטליות לאירועים

פלטפורמה מלאה לעיצוב, שליחה וניהול הזמנות דיגיטליות לאירועים.

---

## טכנולוגיות

| טכנולוגיה | תפקיד |
|---|---|
| **Next.js 14** (App Router) | Framework ראשי |
| **React 18** | UI Library |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **Heebo** (Google Fonts) | Hebrew typography |

---

## מבנה הפרויקט

```
vimo/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (RTL, Heebo, SEO metadata)
│   ├── page.tsx                  # Homepage (marketing)
│   ├── sitemap.ts                # SEO sitemap
│   ├── robots.ts                 # SEO robots.txt
│   ├── not-found.tsx             # 404 page
│   │
│   ├── app/                      # Internal dashboard (requires auth)
│   │   ├── layout.tsx            # App layout wrapper
│   │   ├── dashboard/page.tsx    # Main dashboard
│   │   ├── editor/page.tsx       # Template gallery + invitation editor
│   │   ├── guests/page.tsx       # Guest management
│   │   └── rsvp/page.tsx         # RSVP tracking + send invitations
│   │
│   ├── templates/page.tsx        # Marketing: templates gallery
│   ├── pricing/page.tsx          # Marketing: pricing
│   ├── faq/page.tsx              # Marketing: FAQ
│   ├── blog/
│   │   ├── page.tsx              # Blog listing
│   │   └── [slug]/page.tsx       # Individual article template
│   └── invitations/
│       ├── wedding/page.tsx      # SEO: wedding invitations
│       ├── birthday/page.tsx     # SEO: birthday invitations
│       ├── bar-mitzvah/page.tsx  # SEO: bar mitzvah invitations
│       └── rsvp/page.tsx         # SEO: RSVP management
│
├── components/
│   ├── ui/                       # Reusable primitive components
│   │   ├── Button.tsx            # Button (gradient, outline, ghost, danger, white)
│   │   ├── Card.tsx              # Card + StatCard
│   │   ├── Badge.tsx             # Status badges
│   │   ├── Input.tsx             # Input + Textarea
│   │   ├── ProgressBar.tsx       # Animated progress bar
│   │   ├── Avatar.tsx            # User/guest avatar
│   │   └── Logo.tsx              # Vimo logo component
│   │
│   ├── layout/                   # Layout components
│   │   ├── MarketingHeader.tsx   # Public site navbar (responsive)
│   │   ├── MarketingFooter.tsx   # Public site footer
│   │   ├── MarketingLayout.tsx   # Marketing page wrapper
│   │   ├── AppSidebar.tsx        # Dashboard sidebar
│   │   ├── AppTopBar.tsx         # Dashboard top bar
│   │   └── AppLayout.tsx         # Dashboard layout wrapper
│   │
│   ├── marketing/                # Marketing section components
│   │   ├── HeroSection.tsx       # Homepage hero
│   │   ├── FeaturesSection.tsx   # Feature cards grid
│   │   ├── NumbersSection.tsx    # Stats banner
│   │   ├── TestimonialsSection.tsx
│   │   └── CTASection.tsx        # Reusable CTA banner
│   │
│   └── app/                      # App-specific components
│       ├── EventCard.tsx         # Event card + add new card
│       └── GuestRow.tsx          # Guest table row + header
│
├── lib/
│   └── data.ts                   # Mock data + constants
│
├── types/
│   └── index.ts                  # TypeScript types
│
├── styles/
│   └── globals.css               # Tailwind base + custom utilities
│
├── tailwind.config.ts            # Tailwind config with Vimo design tokens
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## התקנה והרצה

```bash
# 1. כניסה לתיקיית הפרויקט
cd vimo

# 2. התקנת dependencies
npm install

# 3. הרצה בסביבת פיתוח
npm run dev

# 4. פתיחת הדפדפן
# http://localhost:3000
```

---

## דפים ונתיבים

### 🌐 Marketing (ציבורי / SEO)

| נתיב | תיאור |
|---|---|
| `/` | דף הבית |
| `/templates` | גלריית תבניות |
| `/pricing` | מחירים |
| `/faq` | שאלות ותשובות |
| `/blog` | בלוג |
| `/blog/[slug]` | מאמר בלוג |
| `/invitations/wedding` | הזמנות לחתונה (SEO) |
| `/invitations/birthday` | הזמנות ליום הולדת (SEO) |
| `/invitations/bar-mitzvah` | הזמנות לבר מצווה (SEO) |
| `/invitations/rsvp` | אישורי הגעה (SEO) |

### 📱 App (פנימי / Dashboard)

| נתיב | תיאור |
|---|---|
| `/app/dashboard` | לוח בקרה – כל האירועים |
| `/app/editor` | גלריית תבניות + עורך הזמנות |
| `/app/guests` | ניהול אורחים |
| `/app/rsvp` | אישורי הגעה + שליחת הזמנות |

---

## Design System

### צבעים (Tailwind tokens)

```
brand-purple  #6C3BFF  — Primary
brand-teal    #3BD1C6  — Secondary
brand-pink    #FF4FA3  — Accent
brand-bg      #F7F8FC  — Background
brand-surface #FFFFFF  — Cards/surfaces
brand-text    #1E1F2B  — Primary text
brand-muted   #8A8FA3  — Secondary text
brand-border  #E8EAF2  — Borders
```

### גרדיאנט ראשי
```css
background: linear-gradient(135deg, #6C3BFF, #3BD1C6);
```

### Typography
- **Font**: Heebo (Google Fonts) — Hebrew-optimized
- **H1**: 900 weight, tight tracking
- **Body**: 400/500 weight
- **Labels**: 600 weight

### Components (CSS classes)
```css
.btn-gradient   — Primary gradient button
.btn-outline    — Outline button
.card           — Base card with shadow
.card-lift      — Card with hover lift effect
.text-gradient  — Gradient text
.input-base     — Form input base style
.sidebar-item   — Sidebar nav item
.progress-track — Progress bar track
.progress-fill  — Progress bar fill
```

---

## SEO ו-Metadata

כל עמוד מקבל:
- `<title>` ייחודי
- `<meta description>`
- `<meta keywords>`
- Open Graph tags
- Canonical URL
- `sitemap.xml` אוטומטי (Next.js)
- `robots.txt` — חוסם `/app/` ו-`/api/`

---

## הרחבות מומלצות

### 🔐 Authentication
```bash
npm install next-auth
# או: Clerk / Supabase Auth
```

### 🗄️ Database
```bash
npm install prisma @prisma/client
# MySQL / PostgreSQL / MongoDB
```

### 📤 WhatsApp Integration
```bash
# Twilio WhatsApp API
# או: WhatsApp Business API
```

### 💳 Payments
```bash
npm install stripe
# Israeli payment: Tranzila / PayPlus / Meshulam
```

### 📧 Email
```bash
npm install nodemailer
# או: Resend / SendGrid
```

---

## משתני סביבה נדרשים (`.env.local`)

```env
# Database
DATABASE_URL="postgresql://..."

# Auth
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

# WhatsApp
WHATSAPP_API_TOKEN=""
WHATSAPP_PHONE_ID=""

# Payments
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""

# Storage (for invitation images)
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_BUCKET_NAME=""
```

---

## License

© 2024 Vimo. כל הזכויות שמורות.
