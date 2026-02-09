import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UserButton } from '@clerk/clerk-react'
import { Menu, X, Search, LayoutDashboard, Sun, Moon } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useAuthState } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'

const nav = [
  { to: '/', label: 'Consulta AFORE', icon: Search },
  { to: '/admin', label: 'Administración', icon: LayoutDashboard },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { isSignedIn, role, user } = useAuthState()
  const { theme, toggleTheme } = useTheme()
  const isAdmin = role === 'admin'

  const userLabel = user?.username || user?.email || null

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-primary-600 dark:bg-primary-900/95 dark:supports-[backdrop-filter]:bg-primary-900/80">
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
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            )}
          >
            Consulta
          </Link>
          {isSignedIn && isAdmin && (
            <Link
              to="/admin"
              className={cn(
                'text-sm font-medium transition-colors',
                location.pathname === '/admin'
                  ? 'text-accent-cyan'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              )}
            >
              Administración
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-primary-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:ring-offset-2 dark:focus:ring-offset-primary-900"
            aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          {isSignedIn ? (
            <div className="flex items-center gap-2">
              {userLabel && (
                <span className="max-w-[140px] truncate text-sm text-gray-600 dark:text-gray-300 sm:max-w-[180px]">
                  {userLabel}
                </span>
              )}
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: 'w-8 h-8',
                  },
                }}
              />
            </div>
          ) : (
            <>
              <Link
                to="/sign-in"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
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
            className="md:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:ring-offset-2 dark:focus:ring-offset-primary-900"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-gray-200 bg-gray-50 dark:border-primary-600 dark:bg-primary-900 md:hidden">
          <div className="flex flex-col gap-1 px-4 py-3">
            {nav
              .filter((item) => item.to !== '/admin' || isAdmin)
              .map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium',
                    location.pathname === item.to
                      ? 'bg-primary-700 text-accent-cyan dark:bg-primary-700'
                      : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-primary-700 dark:hover:text-white'
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
