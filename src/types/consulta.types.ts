export interface AforeData {
  curp: string
  nss?: string
  afore?: string
  [key: string]: unknown
}

export interface ConsultaAforeParams {
  curp: string
  nss?: string
}

export interface ConsultaAforeResult {
  success: boolean
  data?: AforeData
  error?: string
  timestamp: Date
}

export interface ConsultaResult {
  curp: string
  nss?: string
  data: AforeData
  timestamp: Date
}
