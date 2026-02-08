import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import type { UserRow } from '@/types/admin.types'

export interface CreditManagerProps {
  user: UserRow
  onUpdateCredits?: (userId: string, credits: number) => Promise<void>
}

export function CreditManager({ user, onUpdateCredits }: CreditManagerProps) {
  const [loading, setLoading] = useState(false)

  const add = async (delta: number) => {
    if (!onUpdateCredits || delta <= 0) return
    setLoading(true)
    try {
      await onUpdateCredits(user.id, user.credits + delta)
    } finally {
      setLoading(false)
    }
  }

  const subtract = async () => {
    if (!onUpdateCredits || user.credits <= 0) return
    setLoading(true)
    try {
      await onUpdateCredits(user.id, Math.max(0, user.credits - 1))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        disabled={loading}
        onClick={() => add(1)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-accent-blue text-white hover:bg-blue-600 disabled:opacity-50 transition-colors"
        aria-label="Añadir 1 crédito"
      >
        <Plus className="w-4 h-4" />
      </button>
      <button
        type="button"
        disabled={loading}
        onClick={() => add(5)}
        className="inline-flex h-8 items-center justify-center rounded-md border border-primary-500 bg-primary-700 px-2.5 text-sm font-medium text-gray-300 hover:bg-primary-600 disabled:opacity-50 transition-colors"
      >
        +5
      </button>
      <button
        type="button"
        disabled={loading}
        onClick={() => add(10)}
        className="inline-flex h-8 items-center justify-center rounded-md border border-primary-500 bg-primary-700 px-2.5 text-sm font-medium text-gray-300 hover:bg-primary-600 disabled:opacity-50 transition-colors"
      >
        +10
      </button>
      <button
        type="button"
        disabled={loading || user.credits <= 0}
        onClick={subtract}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-red-800 bg-red-900/40 text-red-400 hover:bg-red-900/60 disabled:opacity-50 transition-colors"
        aria-label="Quitar 1 crédito"
      >
        <Minus className="w-4 h-4" />
      </button>
    </div>
  )
}
