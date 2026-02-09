import { useEffect } from 'react'
import { Bell, UserPlus } from 'lucide-react'
import { StatsCards } from '@/components/admin/StatsCards'
import { UserManagement } from '@/components/admin/UserManagement'
import { ConsultaControl } from '@/components/admin/ConsultaControl'
import { Button } from '@/components/ui/Button'
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-accent-cyan dark:text-accent-cyan">
          Panel de Administrador
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={<Bell className="w-4 h-4" aria-hidden />}
            className="bg-violet-600 hover:bg-violet-500 text-white border-0"
            aria-label="Enviar notificación"
          >
            Enviar Notificación
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<UserPlus className="w-4 h-4" aria-hidden />}
            className="bg-pink-500 hover:bg-pink-600 from-pink-500 to-pink-600 border-0"
            aria-label="Invitar usuario"
          >
            Invitar Usuario
          </Button>
        </div>
      </div>

      <div className="space-y-6">
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
