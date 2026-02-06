import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Power, PowerOff } from 'lucide-react'
import type { SystemControl } from '@/types/admin.types'

export interface ConsultaControlProps {
  control: SystemControl
  onToggle?: (enabled: boolean) => Promise<void>
  loading?: boolean
}

export function ConsultaControl({
  control,
  onToggle,
  loading = false,
}: ConsultaControlProps) {
  const [updating, setUpdating] = useState(false)
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

  return (
    <Card variant="glass" padding="md">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-gray-100">Sistema de consultas</h3>
          <p className="text-sm text-gray-400 mt-1">
            Activa o desactiva las consultas AFORE para todos los usuarios.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={enabled ? 'success' : 'error'}>
            {enabled ? 'Activo' : 'Inactivo'}
          </Badge>
          <Button
            variant={enabled ? 'danger' : 'primary'}
            size="sm"
            loading={loading || updating}
            icon={enabled ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
            onClick={handleToggle}
          >
            {enabled ? 'Desactivar' : 'Activar'}
          </Button>
        </div>
      </div>
    </Card>
  )
}
