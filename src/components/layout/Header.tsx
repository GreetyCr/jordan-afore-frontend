import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UserButton } from '@clerk/clerk-react'
import { Menu, X, Search, LayoutDashboard } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useAuthState } from '@/contexts/AuthContext'

const nav = [
  { to: '/', label: 'Consulta AFORE', icon: Search },
  { to: '/admin', label: 'Administración', icon: LayoutDashboard },
]

const isPreviewMode =
  import.meta.env.VITE_DISABLE_CLERK === 'true' ||
  !import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { isSignedIn, role } = useAuthState()
  const isAdmin = role === 'admin'

  return (
    <header className="sticky top-0 z-50 border-b border-primary-600 bg-primary-900/95 backdrop-blur supports-[backdrop-filter]:bg-primary-900/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-accent-cyan"
        >
          JORDAN AFORE
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={cn(
              'text-sm font-medium transition-colors',
              location.pathname === '/'
                ? 'text-accent-cyan'
                : 'text-gray-400 hover:text-white'
            )}
          >
            Consulta
          </Link>
          {(isPreviewMode || (isSignedIn && isAdmin)) && (
            <Link
              to="/admin"
              className={cn(
                'text-sm font-medium transition-colors',
                location.pathname === '/admin'
                  ? 'text-accent-cyan'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              Administración
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {isSignedIn && !isPreviewMode ? (
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: 'w-8 h-8',
                },
              }}
            />
          ) : (
            <>
              <Link
                to="/sign-in"
                className="text-sm font-medium text-gray-400 hover:text-white"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/sign-up"
                className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1.5 text-sm font-medium text-white hover:from-cyan-600 hover:to-blue-600"
              >
                Registrarse
              </Link>
            </>
          )}

          <button
            type="button"
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Menú"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-primary-600 bg-primary-900 md:hidden">
          <div className="flex flex-col gap-1 px-4 py-3">
            {nav
              .filter((item) => item.to !== '/admin' || isPreviewMode || isAdmin)
              .map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium',
                    location.pathname === item.to
                      ? 'bg-primary-700 text-accent-cyan'
                      : 'text-gray-400 hover:bg-primary-700 hover:text-white'
                  )}
                  onClick={() => setOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
          </div>
        </div>
      )}
    </header>
  )
}
