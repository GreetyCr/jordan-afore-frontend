import { useState, useCallback } from 'react'
import { getApiUrl } from '@/lib/api'
import type { StatsOverview, UserRow, SystemControl } from '@/types/admin.types'

export function useAdmin() {
  const [stats, setStats] = useState<StatsOverview>({
    totalUsers: 0,
    totalConsultas: 0,
    exitos: 0,
    creditosAsignados: 0,
  })
  const [users, setUsers] = useState<UserRow[]>([])
  const [control, setControl] = useState<SystemControl>({
    consultasEnabled: true,
  })
  const [loading, setLoading] = useState(false)

  const fetchStats = useCallback(async () => {
    setLoading(true)
    try {
      const url = getApiUrl('/api/admin/stats')
      const res = await fetch(url)
      if (res.ok) {
        const data = (await res.json()) as StatsOverview
        setStats(data)
      }
    } catch {
      // Backend no disponible: mantener valores por defecto
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const url = getApiUrl('/api/admin/users')
      const res = await fetch(url)
      if (res.ok) {
        const data = (await res.json()) as UserRow[]
        setUsers(data)
      }
    } catch {
      setUsers([])
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchControl = useCallback(async () => {
    try {
      const url = getApiUrl('/api/admin/control')
      const res = await fetch(url)
      if (res.ok) {
        const data = (await res.json()) as SystemControl
        setControl(data)
      }
    } catch {
      // mantener default
    }
  }, [])

  const updateCredits = useCallback(
    async (userId: string, credits: number) => {
      const url = getApiUrl('/api/admin/update-credits')
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, credits }),
      })
      if (!res.ok) throw new Error('Error al actualizar créditos')
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, credits } : u))
      )
    },
    []
  )

  const toggleConsultas = useCallback(async (enabled: boolean) => {
    const url = getApiUrl('/api/admin/control')
    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ consultasEnabled: enabled }),
    })
    if (!res.ok) throw new Error('Error al actualizar control')
    setControl((c) => ({ ...c, consultasEnabled: enabled }))
  }, [])

  return {
    stats,
    users,
    control,
    loading,
    fetchStats,
    fetchUsers,
    fetchControl,
    updateCredits,
    toggleConsultas,
  }
}
