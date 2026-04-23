'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router  = useRouter()
  const [ok, setOk] = useState(false)

  useEffect(() => {
    async function check() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }

      const { data } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', session.user.id)
        .single()

      if (!data?.is_admin) { router.push('/app/dashboard'); return }
      setOk(true)
    }
    check()
  }, [router])

  if (!ok) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <p className="text-gray-400 text-lg">טוען...</p>
    </div>
  )

  return (
    <div className="flex bg-gray-950 min-h-screen text-white" dir="rtl">
      <AdminSidebar />
      <div className="flex-1 min-w-0 overflow-x-hidden bg-gray-950">
        {children}
      </div>
    </div>
  )
}
