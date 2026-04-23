import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { createServerSupabaseClient } from '@/lib/auth/server'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  try {
    const supabase = createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single()

    const profile = data as { is_admin: boolean } | null
    if (!profile?.is_admin) redirect('/app/dashboard')
  } catch {
    redirect('/login')
  }

  return (
    <div className="flex bg-gray-950 min-h-screen text-white" dir="rtl">
      <AdminSidebar />
      <div className="flex-1 min-w-0 overflow-x-hidden bg-gray-950">
        {children}
      </div>
    </div>
  )
}
