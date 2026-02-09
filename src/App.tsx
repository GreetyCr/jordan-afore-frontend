import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { SignIn } from '@/components/auth/SignIn'
import { SignUp } from '@/components/auth/SignUp'
import { ConsultaPage } from '@/pages/ConsultaPage'
import { AdminDashboardPage } from '@/pages/AdminDashboard'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:p-4 focus:bg-accent-cyan focus:text-white focus:rounded-lg focus:outline-none focus:w-auto focus:h-auto focus:m-0 focus:overflow-visible focus:[clip-path:none]"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-gray-100 dark:bg-primary-800" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in/*" element={<SignIn />} />
        <Route path="/sign-up/*" element={<SignUp />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <ConsultaPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <AdminDashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
