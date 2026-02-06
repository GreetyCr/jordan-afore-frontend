import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react'
import type { UserRole } from '@/types/user.types'

export interface AuthUser {
  id: string
  email?: string
}

export interface AuthState {
  isLoaded: boolean
  isSignedIn: boolean
  user: AuthUser | null
  role: UserRole
  credits: number
}

const defaultState: AuthState = {
  isLoaded: false,
  isSignedIn: false,
  user: null,
  role: 'user',
  credits: 0,
}

export const AuthStateContext = createContext<AuthState>(defaultState)

export function useAuthState(): AuthState {
  const ctx = useContext(AuthStateContext)
  return ctx ?? defaultState
}

/** Modo sin Clerk: muestra la app sin auth para vista previa / demo */
const MOCK_AUTH_STATE: AuthState = {
  isLoaded: true,
  isSignedIn: false,
  user: null,
  role: 'user',
  credits: 0,
}

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const value = useMemo(() => MOCK_AUTH_STATE, [])
  return (
    <AuthStateContext.Provider value={value}>
      {children}
    </AuthStateContext.Provider>
  )
}
