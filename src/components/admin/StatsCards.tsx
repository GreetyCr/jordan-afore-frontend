import { Card } from '@/components/ui/Card'
import { Users, Search, CheckCircle, Coins } from 'lucide-react'
import type { StatsOverview } from '@/types/admin.types'

export interface StatsCardsProps {
  stats: StatsOverview
  loading?: boolean
}

const items = [
  {
    key: 'totalUsers' as const,
    label: 'Usuarios',
    icon: Users,
    color: 'text-accent-cyan',
  },
  {
    key: 'totalConsultas' as const,
    label: 'Consultas',
    icon: Search,
    color: 'text-accent-blue',
  },
  {
    key: 'exitos' as const,
    label: 'Éxitos',
    icon: CheckCircle,
    color: 'text-accent-green',
  },
  {
    key: 'creditosAsignados' as const,
    label: 'Créditos asignados',
    icon: Coins,
    color: 'text-amber-400',
  },
]

export function StatsCards({ stats, loading }: StatsCardsProps) {
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Card key={item.key} padding="md">
            <div className="animate-pulse flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary-600" />
              <div className="flex-1">
                <div className="h-4 w-20 bg-primary-600 rounded mb-2" />
                <div className="h-6 w-12 bg-primary-600 rounded" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Card key={item.key} variant="glass" padding="md">
          <div className="flex items-center gap-3">
            <div
              className={`rounded-lg bg-primary-700 p-2 ${item.color}`}
              aria-hidden
            >
              <item.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-400">{item.label}</p>
              <p className="text-xl font-semibold text-gray-100">
                {stats[item.key].toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
