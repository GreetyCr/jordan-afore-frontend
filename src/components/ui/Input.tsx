import { useState, useEffect, forwardRef } from 'react'
import { cn } from '@/utils/cn'
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react'
import type { ValidationResult } from '@/lib/validations'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string
  helperText?: string
  error?: string
  success?: boolean
  validation?: (value: string) => ValidationResult
  transform?: (value: string) => string
  icon?: React.ReactNode
  onValidChange?: (isValid: boolean) => void
  onChange?: (value: string) => void
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      validation,
      transform,
      icon,
      onValidChange,
      className,
      onChange,
      value,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false)
    const [validationErrors, setValidationErrors] = useState<string[]>([])
    const [isValid, setIsValid] = useState(false)

    const stringValue = typeof value === 'string' ? value : (value ?? '') as string

    useEffect(() => {
      if (validation && stringValue) {
        const result = validation(stringValue)
        setValidationErrors(result.errors)
        setIsValid(result.isValid)
        onValidChange?.(result.isValid)
      } else {
        setValidationErrors([])
        setIsValid(false)
        onValidChange?.(false)
      }
    }, [stringValue, validation, onValidChange])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value
      if (transform) {
        newValue = transform(newValue)
      }
      onChange?.(newValue)
    }

    const showError = Boolean(error || validationErrors.length > 0)
    const showSuccess = Boolean(success ?? (isValid && stringValue && !showError))

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            value={stringValue}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              'w-full px-4 py-3 border rounded-lg transition-all duration-200',
              'bg-white text-gray-900 placeholder-gray-400 border-gray-300',
              'dark:bg-primary-700 dark:text-gray-100 dark:placeholder-gray-500 dark:border-primary-600',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-primary-900',
              icon && 'pl-10',
              showError && 'border-red-500 focus:ring-red-500',
              showSuccess && 'border-accent-green focus:ring-accent-green',
              !showError &&
                !showSuccess &&
                isFocused &&
                'border-accent-cyan focus:ring-accent-cyan',
              !showError &&
                !showSuccess &&
                !isFocused &&
                'dark:border-primary-600',
              props.disabled && 'opacity-50 cursor-not-allowed',
              className
            )}
            {...props}
          />

          {stringValue && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              {showError && <XCircle className="w-5 h-5 text-red-500" />}
              {showSuccess && (
                <CheckCircle2 className="w-5 h-5 text-accent-green" />
              )}
            </div>
          )}
        </div>

        {helperText && !showError && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {helperText}
          </p>
        )}

        {showError && (
          <div className="mt-2 space-y-1">
            {error && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <XCircle className="w-4 h-4 shrink-0" />
                {error}
              </p>
            )}
            {validationErrors.map((err, index) => (
              <p
                key={index}
                className="text-sm text-red-500 flex items-center gap-1"
              >
                <XCircle className="w-4 h-4 shrink-0" />
                {err}
              </p>
            ))}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
