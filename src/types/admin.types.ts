export interface StatsOverview {
  totalUsers: number
  totalConsultas: number
  exitos: number
  creditosAsignados: number
}

export interface UserRow {
  id: string
  email: string
  role: string
  credits: number
  totalConsultas?: number
  lastConsulta?: string
}

export interface ConsultaRecord {
  id: string
  userId: string
  curp: string
  success: boolean
  timestamp: string
}

export interface SystemControl {
  consultasEnabled: boolean
}
