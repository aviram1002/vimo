import { adminGetCustomers } from '@/lib/db/admin'
import { Avatar } from '@/components/ui/Avatar'
import Link from 'next/link'

export const metadata = { title: 'ניהול לקוחות – Admin', robots: { index: false } }

export default async function AdminCustomersPage() {
  const customers = await adminGetCustomers()

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">לקוחות 👥</h1>
          <p className="text-gray-400 mt-1">{customers.length} משתמשים רשומים</p>
        </div>
        {/* Search - client component could be added */}
        <div className="flex gap-3">
          <input
            placeholder="חיפוש לקוח..."
            className="px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 outline-none focus:border-violet-500 w-52"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 bg-gray-800/50 text-xs font-bold text-gray-500 uppercase tracking-wider">
          <div>משתמש</div>
          <div>מנוי</div>
          <div>אירועים</div>
          <div>הצטרף</div>
          <div>פעולות</div>
        </div>

        {customers.length === 0 ? (
          <p className="p-10 text-center text-gray-500">אין לקוחות עדיין</p>
        ) : (
          customers.map((customer) => (
            <div
              key={customer.id}
              className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-5 py-4 border-b border-gray-800 last:border-0 hover:bg-gray-800/30 transition-colors items-center"
            >
              {/* User */}
              <div className="flex items-center gap-3 min-w-0">
                <Avatar name={customer.full_name ?? customer.email} size="sm" />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white truncate">
                    {customer.full_name ?? 'ללא שם'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{customer.email}</p>
                </div>
              </div>

              {/* Plan badge */}
              <div>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                  customer.plan === 'free'
                    ? 'bg-gray-700 text-gray-300'
                    : customer.plan === 'pro'
                    ? 'bg-violet-500/20 text-violet-300'
                    : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {customer.plan === 'free' ? 'חינמי' : customer.plan === 'pro' ? 'פרו' : 'עסקי'}
                </span>
              </div>

              {/* Event count */}
              <div className="text-sm font-bold text-white">
                {(customer as any).events?.[0]?.count ?? 0}
              </div>

              {/* Join date */}
              <div className="text-xs text-gray-500">
                {new Date(customer.created_at).toLocaleDateString('he-IL')}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  className="px-3 py-1.5 text-xs font-bold rounded-lg bg-violet-500/20 text-violet-300 hover:bg-violet-500/30 transition-colors"
                  title="שדרג מנוי"
                >
                  שדרג
                </button>
                <button
                  className="px-3 py-1.5 text-xs font-bold rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                  title="צפה בפרטים"
                >
                  פרטים
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
