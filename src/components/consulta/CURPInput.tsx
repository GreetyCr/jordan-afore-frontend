import { Input } from '@/components/ui/Input'
import { validateCURP } from '@/lib/validations'
import { formatCURP } from '@/lib/formatters'

export interface CURPInputProps {
  value: string
  onChange: (value: string) => void
  onValidChange?: (isValid: boolean) => void
  disabled?: boolean
  id?: string
}

const CURP_PATTERN = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]{2}$/

export function CURPInput({
  value,
  onChange,
  onValidChange,
  disabled,
  id = 'curp',
}: CURPInputProps) {
  const validation = (v: string) => validateCURP(v)

  return (
    <Input
      id={id}
      label="CURP"
      type="text"
      value={value}
      onChange={onChange}
      transform={formatCURP}
      validation={validation}
      onValidChange={onValidChange}
      placeholder="AAAA000000HAAAAA00"
      required
      maxLength={18}
      disabled={disabled}
      autoComplete="off"
      helperText="18 caracteres alfanuméricos. Ejemplo: AAAA000000HAAAAA00"
      aria-describedby={`${id}-hint`}
      aria-invalid={value.length === 18 ? !CURP_PATTERN.test(value) : undefined}
    />
  )
}
