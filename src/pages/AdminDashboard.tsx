import { lazy, Suspense } from 'react'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'

const AdminDashboardContent = lazy(
  () =>
    import('@/components/admin/AdminDashboard').then((m) => ({
      default: m.AdminDashboard,
    }))
)

export function AdminDashboardPage() {
  return (
    <Suspense
      fallback={<LoadingSpinner message="Cargando panel de administración..." />}
    >
      <AdminDashboardContent />
    </Suspense>
  )
}
