import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-amber-500" aria-hidden />
          <h2 className="text-lg font-semibold text-gray-100">
            Algo salió mal
          </h2>
          <p className="text-sm text-gray-400 max-w-md">
            {this.state.error.message}
          </p>
          <Button
            variant="outline"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Reintentar
          </Button>
        </div>
      )
    }
    return this.props.children
  }
}
