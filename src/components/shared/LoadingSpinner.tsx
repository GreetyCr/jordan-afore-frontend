import { cn } from '@/utils/cn'

export interface LoadingSpinnerProps {
  message?: string
  className?: string
}

export function LoadingSpinner({ message, className }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center min-h-[400px]',
        className
      )}
    >
      <div className="text-center">
        <div
          className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-primary-600 border-t-accent-cyan"
          aria-hidden
        />
        {message && (
          <p className="mt-4 text-gray-400" role="status">
            {message}
          </p>
        )}
      </div>
    </div>
  )
}
