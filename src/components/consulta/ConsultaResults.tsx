import { Card } from '@/components/ui/Card'
import type { ConsultaResult } from '@/types/consulta.types'

export interface ConsultaResultsProps {
  result: ConsultaResult | null
  onClose?: () => void
}

export function ConsultaResults({ result, onClose }: ConsultaResultsProps) {
  if (!result) return null

  const { data, curp, timestamp } = result

  return (
    <Card variant="glass" padding="lg" className="mt-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-accent-cyan mb-2">
            Resultado de consulta AFORE
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            CURP: <span className="text-gray-200 font-mono">{curp}</span>
          </p>
          <p className="text-xs text-gray-500">
            Consultado: {new Date(timestamp).toLocaleString()}
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white text-sm"
          >
            Cerrar
          </button>
        )}
      </div>

      <div className="mt-6 rounded-lg bg-primary-900/50 p-4 border border-primary-600">
        <pre className="text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap break-words font-mono">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </Card>
  )
}
