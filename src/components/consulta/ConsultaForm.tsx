import { useState, useCallback } from 'react'
import { Search } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { CURPInput } from '@/components/consulta/CURPInput'
import { NSSInput } from '@/components/consulta/NSSInput'
import { ConsultaResults } from '@/components/consulta/ConsultaResults'
import { useConsultaAfore } from '@/hooks/useConsultaAfore'
import type { ConsultaResult } from '@/types/consulta.types'

export interface ConsultaFormProps {
  onConsultaComplete?: (data: ConsultaResult) => void
  credits?: number
  consultasRealizadas?: number
  disabled?: boolean
}

export function ConsultaForm({
  onConsultaComplete,
  credits = 0,
  consultasRealizadas = 0,
  disabled = false,
}: ConsultaFormProps) {
  const [curp, setCurp] = useState('')
  const [nss, setNss] = useState('')
  const [curpValid, setCurpValid] = useState(false)
  const [result, setResult] = useState<ConsultaResult | null>(null)

  const { consultarAfore, loading } = useConsultaAfore()

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!curpValid || disabled) return
      if (credits <= 0) {
        toast.error('No tienes créditos disponibles')
        return
      }

      const res = await consultarAfore({
        curp: curp.trim().toUpperCase(),
        nss: nss.trim() ? nss.replace(/-/g, '') : undefined,
      })

      if (res.success && res.data) {
        const consultaResult: ConsultaResult = {
          curp,
          nss: nss.trim() || undefined,
          data: res.data,
          timestamp: res.timestamp,
        }
        setResult(consultaResult)
        onConsultaComplete?.(consultaResult)
        toast.success('Consulta realizada correctamente')
      } else {
        toast.error(res.error ?? 'Error en la consulta')
      }
    },
    [curp, nss, curpValid, disabled, credits, consultarAfore, onConsultaComplete]
  )

  const canSubmit = curpValid && !loading && !disabled && credits > 0

  return (
    <div>
      <Card variant="glass" padding="lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-100">
              Consultar AFORE
            </h2>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-400">
                Créditos: <strong className="text-accent-cyan">{credits}</strong>
              </span>
              {consultasRealizadas > 0 && (
                <span className="text-gray-400">
                  Realizadas: {consultasRealizadas}
                </span>
              )}
            </div>
          </div>

          <CURPInput
            value={curp}
            onChange={setCurp}
            onValidChange={setCurpValid}
            disabled={disabled}
          />

          <NSSInput
            value={nss}
            onChange={setNss}
            disabled={disabled}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            loadingText="Consultando..."
            icon={<Search className="w-5 h-5" />}
            disabled={!canSubmit}
            className="w-full sm:w-auto"
          >
            Consultar AFORE
          </Button>
        </form>
      </Card>

      <ConsultaResults
        result={result}
        onClose={() => setResult(null)}
      />
    </div>
  )
}
