import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { CreditManager } from '@/components/admin/CreditManager'
import { FileText } from 'lucide-react'
import type { UserRow } from '@/types/admin.types'

export interface UserManagementProps {
  users: UserRow[]
  onUpdateCredits?: (userId: string, credits: number) => Promise<void>
  loading?: boolean
}

type TabId = 'users' | 'queries'

export function UserManagement({
  users,
  onUpdateCredits,
  loading,
}: UserManagementProps) {
  const [activeTab, setActiveTab] = useState<TabId>('users')

  if (loading) {
    return (
      <Card variant="default" padding="md" className="border-primary-600">
        <div className="animate-pulse space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 bg-primary-700 rounded" />
          ))}
        </div>
      </Card>
    )
  }

  return (
    <Card variant="default" padding="md" className="border-primary-600">
      <div className="flex border-b border-primary-600 mb-4">
        <button
          type="button"
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
            activeTab === 'users'
              ? 'bg-accent-cyan/20 text-accent-cyan border-b-2 border-accent-cyan -mb-px'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Gestionar Usuarios
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('queries')}
          className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
            activeTab === 'queries'
              ? 'bg-accent-cyan/20 text-accent-cyan border-b-2 border-accent-cyan -mb-px'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Ver Consultas
        </button>
      </div>

      {activeTab === 'users' && (
        <>
          <h3 className="font-semibold text-gray-100 mb-4">
            Gestionar Créditos de Usuarios
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-primary-600 text-gray-400">
                  <th className="pb-3 pr-4 font-medium">Usuario</th>
                  <th className="pb-3 pr-4 font-medium">Email</th>
                  <th className="pb-3 pr-4 font-medium">Empresa</th>
                  <th className="pb-3 pr-4 font-medium">Rol</th>
                  <th className="pb-3 pr-4 font-medium">Créditos</th>
                  <th className="pb-3 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-primary-600/50 hover:bg-primary-700/20"
                  >
                    <td className="py-3 pr-4 text-gray-200 font-medium">
                      {user.name || user.email}
                    </td>
                    <td className="py-3 pr-4 text-gray-300">{user.email}</td>
                    <td className="py-3 pr-4 text-gray-400">
                      {user.company ?? '-'}
                    </td>
                    <td className="py-3 pr-4">
                      <Badge
                        variant={user.role === 'admin' ? 'info' : 'default'}
                        className="bg-violet-500/20 text-violet-300"
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-3 pr-4 text-gray-200">{user.credits}</td>
                    <td className="py-3">
                      <CreditManager
                        user={user}
                        onUpdateCredits={onUpdateCredits}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {users.length === 0 && (
            <p className="py-8 text-center text-gray-500">
              No hay usuarios.
            </p>
          )}
        </>
      )}

      {activeTab === 'queries' && (
        <div className="py-8 text-center text-gray-500 flex flex-col items-center gap-2">
          <FileText className="w-10 h-10 text-primary-500" aria-hidden />
          <p>Vista de consultas. Conecta el backend para ver el historial.</p>
        </div>
      )}
    </Card>
  )
}
