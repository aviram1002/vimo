import { AppSidebar } from './AppSidebar'

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-brand-bg min-h-screen" dir="rtl">
      <AppSidebar />
      <div className="flex-1 min-w-0 overflow-x-hidden">
        {children}
      </div>
    </div>
  )
}
