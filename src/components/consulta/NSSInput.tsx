import { Input } from '@/components/ui/Input'
import { validateNSS } from '@/lib/validations'
import { formatNSS } from '@/lib/formatters'

export interface NSSInputProps {
  value: string
  onChange: (value: string) => void
  onValidChange?: (isValid: boolean) => void
  disabled?: boolean
  id?: string
}

export function NSSInput({
  value,
  onChange,
  onValidChange,
  disabled,
  id = 'nss',
}: NSSInputProps) {
  const validation = (v: string) => validateNSS(v)

  return (
    <Input
      id={id}
      label="NSS (opcional)"
      type="text"
      inputMode="numeric"
      value={value}
      onChange={onChange}
      transform={formatNSS}
      validation={validation}
      onValidChange={onValidChange}
      placeholder="XX-XXXXX-XXX-X"
      maxLength={14}
      disabled={disabled}
      autoComplete="off"
      helperText="11 dígitos. Ayuda a precisar la consulta. Formato: XX-XXXXX-XXX-X"
      aria-describedby={`${id}-hint`}
    />
  )
}
