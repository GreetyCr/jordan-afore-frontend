/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DISABLE_CLERK?: string
  readonly VITE_CLERK_PUBLISHABLE_KEY?: string
  readonly VITE_API_URL?: string
  readonly VITE_ENABLE_ANALYTICS?: string
  readonly VITE_ENABLE_DEBUG?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
