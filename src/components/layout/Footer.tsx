import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white dark:border-primary-600 dark:bg-primary-900">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">JORDAN AFORE</p>
            <p className="mt-1 text-sm text-gray-500">
              Sistema de consulta AFORE. Frontend para integración con backend.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            <Link to="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Consulta
            </Link>
            <a
              href="/docs/api-contract.md"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              API (docs)
            </a>
          </div>
        </div>
        <p className="mt-6 text-xs text-gray-500">
          Variables de entorno y contrato de API documentados en el repositorio.
        </p>
      </div>
    </footer>
  )
}
