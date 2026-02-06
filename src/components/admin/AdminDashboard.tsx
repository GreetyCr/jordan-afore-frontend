import { useEffect } from 'react'
import { StatsCards } from '@/components/admin/StatsCards'
import { UserManagement } from '@/components/admin/UserManagement'
import { ConsultaControl } from '@/components/admin/ConsultaControl'
import { useAdmin } from '@/hooks/useAdmin'

export function AdminDashboard() {
  const {
    stats,
    users,
    control,
    loading,
    fetchStats,
    fetchUsers,
    fetchControl,
    updateCredits,
    toggleConsultas,
  } = useAdmin()

  useEffect(() => {
    fetchStats()
    fetchUsers()
    fetchControl()
  }, [fetchStats, fetchUsers, fetchControl])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-100 mb-6">
        Panel de administración
      </h1>

      <div className="space-y-8">
        <StatsCards stats={stats} loading={loading} />
        <ConsultaControl
          control={control}
          onToggle={toggleConsultas}
          loading={loading}
        />
        <UserManagement
          users={users}
          onUpdateCredits={updateCredits}
          loading={loading}
        />
      </div>
    </div>
  )
}
