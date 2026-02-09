import { Card } from '@/components/ui/Card'
import { Users, FileText, CheckCircle, CreditCard } from 'lucide-react'
import type { StatsOverview } from '@/types/admin.types'

export interface StatsCardsProps {
  stats: StatsOverview
  loading?: boolean
}

const items: Array<{
  key: keyof StatsOverview
  label: string
  icon: typeof Users
  cardClass: string
  labelClass: string
  valueClass: string
}> = [
  {
    key: 'totalUsers',
    label: 'Total Usuarios',
    icon: Users,
    cardClass:
      'bg-blue-50 border-blue-100 dark:bg-blue-900/40 dark:border-blue-700/50',
    labelClass: 'text-blue-700 dark:text-blue-300',
    valueClass: 'text-gray-900 dark:text-white',
  },
  {
    key: 'totalConsultas',
    label: 'Total Consultas',
    icon: FileText,
    cardClass:
      'bg-emerald-50 border-emerald-100 dark:bg-emerald-900/40 dark:border-emerald-700/50',
    labelClass: 'text-emerald-700 dark:text-emerald-300',
    valueClass: 'text-gray-900 dark:text-white',
  },
  {
    key: 'exitos',
    label: 'Exitosas',
    icon: CheckCircle,
    cardClass:
      'bg-teal-50 border-teal-100 dark:bg-teal-900/40 dark:border-teal-700/50',
    labelClass: 'text-teal-700 dark:text-teal-300',
    valueClass: 'text-gray-900 dark:text-white',
  },
  {
    key: 'creditosAsignados',
    label: 'Total Créditos',
    icon: CreditCard,
    cardClass:
      'bg-violet-50 border-violet-100 dark:bg-violet-900/40 dark:border-violet-700/50',
    labelClass: 'text-violet-700 dark:text-violet-300',
    valueClass: 'text-gray-900 dark:text-white',
  },
]

export function StatsCards({ stats, loading }: StatsCardsProps) {
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-busy="true" aria-live="polite">
        {items.map((item) => (
          <Card key={item.key} padding="md">
            <div className="animate-pulse flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-primary-600" />
              <div className="flex-1">
                <div className="h-4 w-20 bg-gray-200 dark:bg-primary-600 rounded mb-2" />
                <div className="h-6 w-12 bg-gray-200 dark:bg-primary-600 rounded" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  const allZeros =
    stats.totalUsers === 0 &&
    stats.totalConsultas === 0 &&
    stats.exitos === 0 &&
    stats.creditosAsignados === 0

  if (allZeros) {
    return (
      <div
        className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-8 text-center dark:border-primary-600 dark:bg-primary-800/50"
        role="status"
      >
        <p className="text-gray-600 dark:text-gray-400">
          Sin datos de estadísticas. Conecta el backend para ver totales.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Card
          key={item.key}
          padding="md"
          className={`border ${item.cardClass}`}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className={`text-sm font-medium ${item.labelClass}`}>
                {item.label}
              </p>
              <p className={`text-2xl font-bold mt-1 ${item.valueClass}`}>
                {stats[item.key].toLocaleString()}
              </p>
            </div>
            <div
              className={`rounded-lg p-2.5 ${item.labelClass} bg-black/5 dark:bg-white/10`}
            >
              <item.icon className="w-6 h-6" aria-hidden />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
