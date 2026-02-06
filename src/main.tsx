import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'
import { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'
import App from './App'
import { MockAuthProvider } from '@/contexts/AuthContext'
import { ClerkAuthBridge } from '@/contexts/ClerkAuthBridge'

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
      <MockAuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'bg-primary-800 border border-primary-600 text-gray-100',
          }}
        />
        <App />
      </MockAuthProvider>
    )
  }

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#06B6D4',
          colorBackground: '#0A1628',
          colorInputBackground: '#152842',
          colorInputText: '#F3F4F6',
        },
        elements: {
          formButtonPrimary:
            'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600',
          card: 'bg-primary-800 border border-primary-600',
          headerTitle: 'text-cyan-400',
          headerSubtitle: 'text-gray-400',
        },
      }}
    >
      <ClerkAuthBridge>
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'bg-primary-800 border border-primary-600 text-gray-100',
          }}
        />
        <App />
      </ClerkAuthBridge>
    </ClerkProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
