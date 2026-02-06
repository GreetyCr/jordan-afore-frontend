import { useMemo, type ReactNode } from 'react'
import { useUser, useAuth } from '@clerk/clerk-react'
import { AuthStateContext } from '@/contexts/AuthContext'
import type { UserRole } from '@/types/user.types'

export function ClerkAuthBridge({ children }: { children: ReactNode }) {
  const { isLoaded } = useAuth()
  const { user } = useUser()

  const value = useMemo(() => {
    if (!isLoaded) {
      return {
        isLoaded: false,
        isSignedIn: false,
        user: null,
        role: 'user' as UserRole,
        credits: 0,
      }
    }
    const role = (user?.publicMetadata?.role as UserRole) ?? 'user'
    const credits = (user?.publicMetadata?.credits as number) ?? 0
    return {
      isLoaded: true,
      isSignedIn: !!user,
      user: user
        ? { id: user.id, email: user.primaryEmailAddress?.emailAddress }
        : null,
      role,
      credits,
    }
  }, [isLoaded, user])

  return (
    <AuthStateContext.Provider value={value}>
      {children}
    </AuthStateContext.Provider>
  )
}
