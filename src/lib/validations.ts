import { CURP_LENGTH, NSS_LENGTH, ESTADOS_CURP } from '@/utils/constants'

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export function validateCURP(curp: string): ValidationResult {
  const errors: string[] = []
  const trimmed = curp.trim().toUpperCase()

  if (trimmed.length !== CURP_LENGTH) {
    errors.push('El CURP debe tener exactamente 18 caracteres')
  }

  const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]{2}$/
  if (trimmed.length === CURP_LENGTH && !curpRegex.test(trimmed)) {
    errors.push('El formato del CURP no es válido')
  }

  if (trimmed.length >= 10) {
    const yearStr = trimmed.substring(4, 6)
    const monthStr = trimmed.substring(6, 8)
    const dayStr = trimmed.substring(8, 10)
    const year = parseInt(yearStr, 10)
    const month = parseInt(monthStr, 10)
    const day = parseInt(dayStr, 10)
    const fullYear = year <= 24 ? 2000 + year : 1900 + year
    const date = new Date(fullYear, month - 1, day)

    if (
      Number.isNaN(date.getTime()) ||
      date.getMonth() + 1 !== month ||
      date.getDate() !== day ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 31
    ) {
      errors.push('La fecha de nacimiento en el CURP no es válida')
    }
  }

  if (trimmed.length >= 11) {
    const sexo = trimmed.charAt(10)
    if (sexo !== 'H' && sexo !== 'M') {
      errors.push('El sexo debe ser H (Hombre) o M (Mujer)')
    }
  }

  if (trimmed.length >= 13) {
    const estado = trimmed.substring(11, 13)
    if (!(ESTADOS_CURP as readonly string[]).includes(estado)) {
      errors.push('El código de estado no es válido')
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function validateNSS(nss: string): ValidationResult {
  const errors: string[] = []
  const cleanNSS = nss.replace(/-/g, '')

  if (cleanNSS.length !== 0 && cleanNSS.length !== NSS_LENGTH) {
    errors.push('El NSS debe tener exactamente 11 dígitos')
  }

  if (cleanNSS.length > 0 && !/^\d+$/.test(cleanNSS)) {
    errors.push('El NSS solo debe contener números')
  }

  return {
    isValid: errors.length === 0 && cleanNSS.length === NSS_LENGTH,
    errors,
  }
}
