import Link from 'next/link'
import { MarketingLayout } from '@/components/layout/MarketingLayout'

export default function NotFound() {
  return (
    <MarketingLayout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-24 px-4">
        <div className="text-7xl mb-6">🔍</div>
        <h1 className="text-4xl font-black text-brand-text mb-3">הדף לא נמצא</h1>
        <p className="text-lg text-brand-muted mb-8 max-w-md">
          מצטערים, הדף שחיפשתם לא קיים. אולי הקישור שגוי?
        </p>
        <div className="flex gap-3">
          <Link
            href="/"
            className="px-6 py-3 rounded-2xl text-white font-bold"
            style={{ background: 'linear-gradient(135deg,#6C3BFF,#3BD1C6)' }}
          >
            חזרה לדף הבית
          </Link>
          <Link
            href="/app/dashboard"
            className="px-6 py-3 rounded-2xl border border-brand-border font-bold text-brand-text hover:border-brand-purple hover:text-brand-purple transition-all"
          >
            לוח הבקרה
          </Link>
        </div>
      </div>
    </MarketingLayout>
  )
}
