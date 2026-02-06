import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  loadingText?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      loadingText = 'Cargando...',
      icon,
      iconPosition = 'left',
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/25',
      secondary:
        'bg-gradient-to-r from-accent-purple to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-lg shadow-purple-500/25',
      outline:
        'border-2 border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-white',
      ghost: 'text-gray-300 hover:bg-primary-700',
      danger:
        'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/25',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled ?? loading}
        className={cn(
          'relative inline-flex items-center justify-center gap-2',
          'font-semibold rounded-lg',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-accent-cyan',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="w-5 h-5 animate-spin shrink-0" />}
        {!loading && icon && iconPosition === 'left' && icon}
        <span>{loading ? loadingText : children}</span>
        {!loading && icon && iconPosition === 'right' && icon}
      </button>
    )
  }
)

Button.displayName = 'Button'
