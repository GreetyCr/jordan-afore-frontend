import { useAuthState } from '@/contexts/AuthContext'
import type { UserRole } from '@/types/user.types'

/** Usa el estado de auth (Clerk o mock cuando auth está deshabilitado). */
export function useUserRole(): { role: UserRole; isAdmin: boolean } {
  const { role } = useAuthState()
  return { role, isAdmin: role === 'admin' }
}

export function useCredits(): { credits: number } {
  const { credits } = useAuthState()
  return { credits }
}
