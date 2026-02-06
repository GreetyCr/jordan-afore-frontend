import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthState } from '@/contexts/AuthContext'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import type { UserRole } from '@/types/user.types'

/** Misma condición que en main: vista previa sin Clerk = no auth, permitir todo */
const isPreviewMode =
  import.meta.env.VITE_DISABLE_CLERK === 'true' ||
  !import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

export interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: UserRole
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isLoaded, isSignedIn, role } = useAuthState()
  const location = useLocation()
  const isAdmin = role === 'admin'

  if (isPreviewMode) {
    return <>{children}</>
  }

  if (!isLoaded) {
    return <LoadingSpinner message="Verificando sesión..." />
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />
  }

  if (requiredRole === 'admin' && !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">
            Acceso denegado
          </h1>
          <p className="text-gray-400">
            No tienes permisos para acceder a esta sección.
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
