import { ReactNode, useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuthState } from '@/contexts/AuthContext'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import type { UserRole } from '@/types/user.types'

/** Tiempo de espera para que Clerk restaure la sesión desde la URL (p. ej. tras sign-up) en desarrollo */
const CLERK_HYDRATION_MS = 2500

export interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: UserRole
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isLoaded, isSignedIn, role } = useAuthState()
  const location = useLocation()
  const navigate = useNavigate()
  const [allowRedirect, setAllowRedirect] = useState(false)
  const isAdmin = role === 'admin'

  // Tras sign-up/sign-in Clerk redirige a / con el token en la URL; tarda un poco en restaurar la sesión.
  // Si redirigimos al login de inmediato, el usuario vuelve a sign-up. Esperamos un poco si hay token en la URL.
  useEffect(() => {
    if (!isLoaded || isSignedIn) {
      setAllowRedirect(false)
      return
    }
    const hasClerkToken = typeof window !== 'undefined' && window.location.href.includes('__clerk_db_jwt')
    if (hasClerkToken) {
      const t = setTimeout(() => setAllowRedirect(true), CLERK_HYDRATION_MS)
      return () => clearTimeout(t)
    }
    setAllowRedirect(true)
  }, [isLoaded, isSignedIn])

  useEffect(() => {
    if (isLoaded && !isSignedIn && allowRedirect) {
      navigate('/sign-in', { replace: true, state: { from: location } })
    }
  }, [isLoaded, isSignedIn, allowRedirect, navigate, location])

  if (!isLoaded) {
    return <LoadingSpinner message="Verificando sesión..." />
  }

  if (!isSignedIn) {
    const hasClerkToken = typeof window !== 'undefined' && window.location.href.includes('__clerk_db_jwt')
    if (hasClerkToken && !allowRedirect) {
      return <LoadingSpinner message="Completando registro..." />
    }
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
