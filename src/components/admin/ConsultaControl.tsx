import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { AlertTriangle } from 'lucide-react'
import type { SystemControl } from '@/types/admin.types'

export interface ConsultaControlProps {
  control: SystemControl
  onToggle?: (enabled: boolean) => Promise<void>
  onBlockMessageChange?: (message: string) => void
  loading?: boolean
}

const DEFAULT_BLOCK_MESSAGE =
  'Las consultas están temporalmente deshabilitadas por mantenimiento del servidor.'

export function ConsultaControl({
  control,
  onToggle,
  onBlockMessageChange,
  loading = false,
}: ConsultaControlProps) {
  const [updating, setUpdating] = useState(false)
  const [blockMessage, setBlockMessage] = useState(
    control.blockMessage ?? DEFAULT_BLOCK_MESSAGE
  )
  const enabled = control.consultasEnabled

  const handleToggle = async () => {
    if (!onToggle) return
    setUpdating(true)
    try {
      await onToggle(!enabled)
    } finally {
      setUpdating(false)
    }
  }

  const handleBlurMessage = () => {
    onBlockMessageChange?.(blockMessage)
  }

  return (
    <Card
      variant="default"
      padding="md"
      className="dark:bg-primary-700/30"
    >
      <div className="flex items-start gap-3 mb-4">
        <AlertTriangle
          className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5"
          aria-hidden
        />
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          Control de Consultas
        </h3>
      </div>

      <div className="space-y-4 pl-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Estado del Sistema
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
              {enabled
                ? 'Las consultas están funcionando normalmente'
                : 'Las consultas están desactivadas'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-medium ${
                enabled
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {enabled ? 'Activo' : 'Inactivo'}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={enabled}
              aria-label={enabled ? 'Desactivar consultas' : 'Activar consultas'}
              disabled={loading || updating}
              onClick={handleToggle}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:ring-offset-2 focus:ring-offset-primary-800 disabled:opacity-50 ${
                enabled ? 'bg-emerald-500' : 'bg-primary-600'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition ${
                  enabled ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">
            Mensaje de Bloqueo (opcional)
          </label>
          <textarea
            value={blockMessage}
            onChange={(e) => setBlockMessage(e.target.value)}
            onBlur={handleBlurMessage}
            rows={2}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-accent-cyan focus:outline-none focus:ring-1 focus:ring-accent-cyan dark:border-primary-600 dark:bg-primary-900/60 dark:text-gray-300 dark:placeholder-gray-500"
            placeholder="Las consultas están temporalmente deshabilitadas por mantenimiento del servidor."
          />
        </div>
      </div>
    </Card>
  )
}
