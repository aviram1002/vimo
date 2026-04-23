import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://vimo.co.il'),
  title: {
    default: 'Vimo – הזמנות דיגיטליות לאירועים',
    template: '%s | Vimo',
  },
  description: 'פלטפורמה לעיצוב הזמנות דיגיטליות, שליחה בוואטסאפ וניהול אישורי הגעה לכל סוג אירוע.',
  keywords: ['הזמנות דיגיטליות', 'הזמנות לחתונה', 'RSVP', 'הזמנות אונליין', 'ניהול אורחים'],
  openGraph: {
    title: 'Vimo – הזמנות דיגיטליות לאירועים',
    description: 'צרו הזמנה מדהימה תוך דקות ושלחו בוואטסאפ',
    url: 'https://vimo.co.il',
    siteName: 'Vimo',
    locale: 'he_IL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vimo – הזמנות דיגיטליות',
    description: 'צרו הזמנה מדהימה תוך דקות',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://vimo.co.il',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-heebo antialiased">{children}</body>
    </html>
  )
}
