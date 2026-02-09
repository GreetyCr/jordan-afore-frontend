import { Link } from 'react-router-dom'
import { SignUp as ClerkSignUp } from '@clerk/clerk-react'

const isPreviewMode =
  import.meta.env.VITE_DISABLE_CLERK === 'true' ||
  !import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

export function SignUp() {
  if (isPreviewMode) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-primary-800 p-4">
        <p className="text-gray-400 text-center max-w-sm mb-4">
          Vista previa: la autenticación está deshabilitada.
        </p>
        <Link
          to="/"
          className="text-accent-cyan hover:underline font-medium"
        >
          Volver al inicio
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-800 p-4">
      <ClerkSignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        afterSignUpUrl="/"
      />
    </div>
  )
}
