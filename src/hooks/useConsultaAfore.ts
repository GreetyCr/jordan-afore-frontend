import { useState, useCallback } from 'react'
import { validateCURP } from '@/lib/validations'
import { getApiUrl } from '@/lib/api'
import type { ConsultaAforeParams, ConsultaAforeResult } from '@/types/consulta.types'

const CONSULTA_TIMEOUT_MS = 30000

export function useConsultaAfore() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const consultarAfore = useCallback(
    async (params: ConsultaAforeParams): Promise<ConsultaAforeResult> => {
      setLoading(true)
      setError(null)

      const validation = validateCURP(params.curp)
      if (!validation.isValid) {
        const err = validation.errors[0] ?? 'CURP inválido'
        setError(err)
        setLoading(false)
        return { success: false, error: err, timestamp: new Date() }
      }

      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), CONSULTA_TIMEOUT_MS)

        const url = getApiUrl('/api/consulta-afore')
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          const errData = (await response.json().catch(() => ({}))) as {
            message?: string
          }
          const errMsg = errData.message ?? 'Error en la consulta'
          setError(errMsg)
          return {
            success: false,
            error: errMsg,
            timestamp: new Date(),
          }
        }

        const data = await response.json()
        return {
          success: true,
          data,
          timestamp: new Date(),
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Error desconocido'
        setError(message)
        return {
          success: false,
          error: message,
          timestamp: new Date(),
        }
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { consultarAfore, loading, error }
}
