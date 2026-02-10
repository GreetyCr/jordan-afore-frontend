import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'
import { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'
import App from './App'
import { MockAuthProvider } from '@/contexts/AuthContext'
import { ClerkAuthBridge } from '@/contexts/ClerkAuthBridge'
import { ThemeProvider } from '@/contexts/ThemeContext'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const disableClerk =
  import.meta.env.VITE_DISABLE_CLERK === 'true' || !clerkPubKey

if (!disableClerk && !clerkPubKey) {
  console.warn(
    'Missing VITE_CLERK_PUBLISHABLE_KEY. Auth will not work. Copy .env.example to .env.local and set the key.'
  )
}

function Root() {
  if (disableClerk) {
    return (
      <ThemeProvider>
        <MockAuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              className: 'bg-primary-800 border border-primary-600 text-gray-100',
            }}
          />
          <App />
        </MockAuthProvider>
      </ThemeProvider>
    )
  }

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      afterSignInUrl="/"
      afterSignUpUrl="/"
      allowedRedirectOrigins={[
        'https://jordan-afore-frontend.vercel.app',
        'http://localhost:5173',
      ]}
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#06B6D4',
          colorBackground: '#0F1E35',
          colorDanger: '#EF4444',
        },
        elements: {
          formButtonPrimary:
            'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white',
          card: 'bg-primary-800 border border-primary-600 shadow-xl',
          cardBox: 'bg-primary-800',
          headerTitle: 'text-cyan-400',
          headerSubtitle: 'text-gray-400',
          formFieldLabel: 'text-gray-200',
          formFieldInput: 'text-gray-100 bg-primary-700',
          formFieldInputShowPasswordButton: 'text-gray-400 hover:text-gray-200',
          identityPreviewEditButton: 'text-cyan-400 hover:text-cyan-300',
          footerActionLink: 'text-cyan-400 hover:text-cyan-300',
          socialButtonsBlockButton: 'bg-primary-700 text-gray-100 border-primary-600',
          dividerLine: 'bg-primary-600',
          dividerText: 'text-gray-400',
          formFieldHintText: 'text-amber-400',
          otpCodeFieldInput: 'text-gray-100 bg-primary-700 border-primary-600',
          formFieldAction: 'text-cyan-400 hover:text-cyan-300',
        },
      }}
    >
      <ClerkAuthBridge>
        <ThemeProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              className: 'bg-primary-800 border border-primary-600 text-gray-100',
            }}
          />
          <App />
        </ThemeProvider>
      </ClerkAuthBridge>
    </ClerkProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
