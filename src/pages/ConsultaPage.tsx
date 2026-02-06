import { ConsultaForm } from '@/components/consulta/ConsultaForm'
import { useAuthState } from '@/contexts/AuthContext'

export function ConsultaPage() {
  const { isSignedIn, credits } = useAuthState()

  return (
    <section id="consulta" className="py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-100 sm:text-4xl">
            Consulta tu AFORE
          </h1>
          <p className="mt-2 text-gray-400">
            Ingresa tu CURP y opcionalmente tu NSS para consultar información.
          </p>
        </div>
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
