import { AdminSidebar } from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-gray-950 min-h-screen text-white" dir="rtl">
      <AdminSidebar />
      <div className="flex-1 min-w-0 overflow-x-hidden bg-gray-950">
        {children}
      </div>
    </div>
  )
}
