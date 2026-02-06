import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Plus, Minus } from 'lucide-react'
import type { UserRow } from '@/types/admin.types'

export interface CreditManagerProps {
  user: UserRow
  onUpdateCredits?: (userId: string, credits: number) => Promise<void>
}

export function CreditManager({ user, onUpdateCredits }: CreditManagerProps) {
  const [delta, setDelta] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAdd = async () => {
    const n = parseInt(delta, 10)
    if (Number.isNaN(n) || n <= 0 || !onUpdateCredits) return
    setLoading(true)
    try {
      await onUpdateCredits(user.id, user.credits + n)
      setDelta('')
    } finally {
      setLoading(false)
    }
  }

  const handleSubtract = async () => {
    const n = parseInt(delta, 10)
    if (Number.isNaN(n) || n <= 0 || !onUpdateCredits) return
    setLoading(true)
    try {
      await onUpdateCredits(user.id, Math.max(0, user.credits - n))
      setDelta('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-gray-300">{user.credits}</span>
      <Input
        type="number"
        value={delta}
        onChange={setDelta}
        placeholder="Cant."
        className="w-20"
        min={1}
        max={999}
      />
      <Button
        variant="ghost"
        size="sm"
        icon={<Plus className="w-4 h-4" />}
        onClick={handleAdd}
        disabled={loading || !delta}
      />
      <Button
        variant="ghost"
        size="sm"
        icon={<Minus className="w-4 h-4" />}
        onClick={handleSubtract}
        disabled={loading || !delta}
      />
    </div>
  )
}
