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
  username?: string | null
}

export interface AuthState {
  isLoaded: boolean
  isSignedIn: boolean
  user: AuthUser | null
  role: UserRole
  credits: number
  /** true cuando Clerk está deshabilitado y se usa MockAuthProvider (vista previa) */
  isPreviewMode?: boolean
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

/** Modo sin Clerk: acceso total a la UI para vista previa (Consulta + Admin) sin login */
const MOCK_AUTH_STATE: AuthState = {
  isLoaded: true,
  isSignedIn: true,
  user: {
    id: 'preview',
    email: 'vista-previa@demo',
    username: 'Vista previa',
  },
  role: 'admin',
  credits: 5,
  isPreviewMode: true,
}

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const value = useMemo(() => MOCK_AUTH_STATE, [])
  return (
    <AuthStateContext.Provider value={value}>
      {children}
    </AuthStateContext.Provider>
  )
}
