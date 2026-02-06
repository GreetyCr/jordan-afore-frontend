import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { CreditManager } from '@/components/admin/CreditManager'
import type { UserRow } from '@/types/admin.types'

export interface UserManagementProps {
  users: UserRow[]
  onUpdateCredits?: (userId: string, credits: number) => Promise<void>
  loading?: boolean
}

export function UserManagement({
  users,
  onUpdateCredits,
  loading,
}: UserManagementProps) {
  if (loading) {
    return (
      <Card variant="glass" padding="md">
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-primary-700 rounded" />
          ))}
        </div>
      </Card>
    )
  }

  return (
    <Card variant="glass" padding="md">
      <h3 className="font-semibold text-gray-100 mb-4">Usuarios y créditos</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-primary-600 text-gray-400">
              <th className="pb-2 pr-4">Email</th>
              <th className="pb-2 pr-4">Rol</th>
              <th className="pb-2 pr-4">Créditos</th>
              <th className="pb-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-primary-600/50 hover:bg-primary-700/30"
              >
                <td className="py-3 pr-4 text-gray-200">{user.email}</td>
                <td className="py-3 pr-4">
                  <Badge variant={user.role === 'admin' ? 'info' : 'default'}>
                    {user.role}
                  </Badge>
                </td>
                <td className="py-3 pr-4">
                  <CreditManager
                    user={user}
                    onUpdateCredits={onUpdateCredits}
                  />
                </td>
                <td className="py-3" />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {users.length === 0 && (
        <p className="py-6 text-center text-gray-500">No hay usuarios.</p>
      )}
    </Card>
  )
}
