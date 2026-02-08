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
}> = [
  {
    key: 'totalUsers',
    label: 'Total Usuarios',
    icon: Users,
    cardClass: 'bg-blue-900/40 border-blue-700/50',
    labelClass: 'text-blue-300',
  },
  {
    key: 'totalConsultas',
    label: 'Total Consultas',
    icon: FileText,
    cardClass: 'bg-emerald-900/40 border-emerald-700/50',
    labelClass: 'text-emerald-300',
  },
  {
    key: 'exitos',
    label: 'Exitosas',
    icon: CheckCircle,
    cardClass: 'bg-teal-900/40 border-teal-700/50',
    labelClass: 'text-teal-300',
  },
  {
    key: 'creditosAsignados',
    label: 'Total Créditos',
    icon: CreditCard,
    cardClass: 'bg-violet-900/40 border-violet-700/50',
    labelClass: 'text-violet-300',
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
              <p className="text-2xl font-bold text-white mt-1">
                {stats[item.key].toLocaleString()}
              </p>
            </div>
            <div className={`rounded-lg p-2.5 ${item.labelClass} bg-white/10`}>
              <item.icon className="w-6 h-6" aria-hidden />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
