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
      <Header />
      <main className="flex-1 bg-primary-800">{children}</main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/"
          element={
            <Layout>
              <ConsultaPage />
            </Layout>
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
