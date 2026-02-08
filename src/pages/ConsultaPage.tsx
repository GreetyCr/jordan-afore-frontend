import { useState } from 'react'
import toast from 'react-hot-toast'
import { Coins, ShoppingCart } from 'lucide-react'
import { ConsultaForm } from '@/components/consulta/ConsultaForm'
import { CreditPlansModal } from '@/components/consulta/CreditPlansModal'
import { Button } from '@/components/ui/Button'
import { useAuthState } from '@/contexts/AuthContext'

export function ConsultaPage() {
  const { isSignedIn, credits } = useAuthState()
  const [plansOpen, setPlansOpen] = useState(false)

  return (
    <section id="consulta" className="py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-10 lg:gap-16 mb-10">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-gray-100 sm:text-4xl">
              Consulta tu AFORE
            </h1>
            <p className="mt-2 text-gray-400">
              Ingresa tu CURP y opcionalmente tu NSS para consultar información.
            </p>
          </div>
          <div className="flex items-center justify-center sm:justify-end gap-2">
            <div className="inline-flex items-center gap-2 rounded-lg bg-primary-700 border border-primary-600 px-4 py-2">
              <Coins className="w-5 h-5 text-accent-cyan" aria-hidden />
              <span className="text-sm font-medium text-gray-300">
                Créditos:
              </span>
              <span className="text-lg font-semibold text-accent-cyan">
                {isSignedIn ? credits : 0}
              </span>
            </div>
            <Button
              variant="outline"
              size="md"
              icon={<ShoppingCart className="w-5 h-5" />}
              onClick={() => setPlansOpen(true)}
            >
              Comprar
            </Button>
          </div>
        </div>
        <CreditPlansModal
          open={plansOpen}
          onClose={() => setPlansOpen(false)}
          onSelectPlan={(planId, consultations, price) => {
            toast.success(
              `Plan seleccionado: ${consultations} consulta(s) — $${price} MXN. Próximamente: pasarela de pago.`
            )
          }}
        />
        <ConsultaForm
          credits={isSignedIn ? credits : 0}
          consultasRealizadas={0}
          disabled={!isSignedIn}
        />
        {!isSignedIn && (
          <p className="mt-4 text-center text-sm text-gray-500">
            Inicia sesión para usar tus créditos y realizar consultas.
          </p>
        )}
      </div>
    </section>
  )
}
