import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'default', className, ...props }, ref) => {
    const variants = {
      default: 'bg-primary-600 text-gray-300',
      success: 'bg-accent-green/20 text-accent-green',
      warning: 'bg-amber-500/20 text-amber-400',
      error: 'bg-red-500/20 text-red-400',
      info: 'bg-accent-blue/20 text-accent-blue',
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
