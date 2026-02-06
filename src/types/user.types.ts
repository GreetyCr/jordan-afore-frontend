export type UserRole = 'admin' | 'user'

export interface UserMetadata {
  role?: UserRole
  credits?: number
  company?: string
}

export interface UserUnsafeMetadata {
  totalConsultas?: number
  ultimaConsulta?: string
}
