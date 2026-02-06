import { CURP_LENGTH, NSS_LENGTH } from '@/utils/constants'

export function formatCURP(value: string): string {
  return value
    .replace(/\s/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, CURP_LENGTH)
}

export function formatNSS(value: string): string {
  const numbers = value.replace(/\D/g, '').slice(0, NSS_LENGTH)
  if (numbers.length <= 2) return numbers
  if (numbers.length <= 7) return `${numbers.slice(0, 2)}-${numbers.slice(2)}`
  if (numbers.length <= 10) {
    return `${numbers.slice(0, 2)}-${numbers.slice(2, 7)}-${numbers.slice(7)}`
  }
  return `${numbers.slice(0, 2)}-${numbers.slice(2, 7)}-${numbers.slice(7, 10)}-${numbers.slice(10)}`
}

export function formatNSSDisplay(nss: string): string {
  const clean = nss.replace(/-/g, '')
  if (clean.length <= 2) return clean
  if (clean.length <= 7) return `${clean.slice(0, 2)}-${clean.slice(2)}`
  if (clean.length <= 10) {
    return `${clean.slice(0, 2)}-${clean.slice(2, 7)}-${clean.slice(7)}`
  }
  return `${clean.slice(0, 2)}-${clean.slice(2, 7)}-${clean.slice(7, 10)}-${clean.slice(10)}`
}
