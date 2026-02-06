/**
 * Cliente API para conectar con el backend Python.
 * Base URL desde VITE_API_URL; documentación de contrato en /docs/api-contract.md
 */

const BASE_URL = import.meta.env.VITE_API_URL ?? ''

export function getApiUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${BASE_URL.replace(/\/$/, '')}${normalized}`
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = getApiUrl(path)
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string }
    throw new Error(err.message ?? `Error ${res.status}`)
  }
  return res.json() as Promise<T>
}
