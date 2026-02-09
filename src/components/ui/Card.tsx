import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient'
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      hover = false,
      padding = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const variants = {
      default:
        'bg-white border border-gray-200 shadow-sm dark:bg-primary-800 dark:border-primary-600',
      glass:
        'bg-white/90 backdrop-blur-md border border-gray-200 shadow-sm dark:bg-primary-800/50 dark:border-primary-600/50',
      gradient:
        'bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-sm dark:from-primary-800 dark:to-primary-900 dark:border-primary-600',
    }

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl shadow-xl',
          'transition-all duration-200',
          hover && 'hover:shadow-2xl hover:scale-[1.02] cursor-pointer',
          variants[variant],
          paddings[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
