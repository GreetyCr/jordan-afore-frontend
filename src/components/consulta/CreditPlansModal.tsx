import { Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { cn } from '@/utils/cn'

const FEATURES = [
  'Consultas AFORE',
  'Descarga PDF',
  'Soporte técnico',
]

const PLANS = [
  {
    id: '1',
    consultations: 1,
    price: 25,
    pricePerConsultation: null,
    popular: false,
  },
  {
    id: '12',
    consultations: 12,
    price: 250,
    pricePerConsultation: 20.83,
    popular: true,
  },
  {
    id: '30',
    consultations: 30,
    price: 550,
    pricePerConsultation: 18.33,
    popular: false,
  },
  {
    id: '45',
    consultations: 45,
    price: 800,
    pricePerConsultation: 17.78,
    popular: false,
  },
]

export interface CreditPlansModalProps {
  open: boolean
  onClose: () => void
  onSelectPlan?: (planId: string, consultations: number, price: number) => void
}

export function CreditPlansModal({
  open,
  onClose,
  onSelectPlan,
}: CreditPlansModalProps) {
  const handleComprar = (plan: (typeof PLANS)[number]) => {
    onSelectPlan?.(plan.id, plan.consultations, plan.price)
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Planes de Créditos"
      className="max-w-6xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 pt-1">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              'relative rounded-xl border bg-primary-700/50 p-5 flex flex-col min-w-0',
              plan.popular
                ? 'border-cyan-500/60 ring-1 ring-cyan-500/30'
                : 'border-primary-600'
            )}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <span className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1 text-xs font-semibold uppercase text-white whitespace-nowrap">
                  Más popular
                </span>
              </div>
            )}
            <p className="text-lg font-semibold text-white">
              {plan.consultations} Consulta{plan.consultations > 1 ? 's' : ''}
            </p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-bold text-accent-blue">
                ${plan.price}
              </span>
              <span className="text-sm text-gray-400">MXN</span>
            </div>
            {plan.pricePerConsultation != null && (
              <p className="mt-1 text-sm text-gray-400">
                ${plan.pricePerConsultation.toFixed(2)} por consulta
              </p>
            )}
            <ul className="mt-4 space-y-2 flex-1">
              {FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <span className="text-accent-green" aria-hidden>
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              variant={plan.popular ? 'primary' : 'ghost'}
              size="sm"
              className={cn(
                'mt-4 w-full',
                !plan.popular &&
                  'bg-primary-600 text-gray-200 hover:bg-primary-500'
              )}
              icon={<Zap className="w-4 h-4" />}
              onClick={() => handleComprar(plan)}
            >
              Comprar ahora
            </Button>
          </div>
        ))}
      </div>
    </Modal>
  )
}
