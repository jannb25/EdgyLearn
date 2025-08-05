import { useState } from "react"
import { LoginForm } from "@/components/auth/LoginForm"
import { RegisterForm } from "@/components/auth/RegisterForm"
import { Navbar } from "@/components/layout/Navbar"
import { StudentDashboard } from "@/components/dashboard/StudentDashboard"
import { TeacherDashboard } from "@/components/dashboard/TeacherDashboard"
import { AdminDashboard } from "@/components/dashboard/AdminDashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, Mail, ArrowLeft } from "lucide-react"

type User = {
  name: string
  email: string
  role: 'student' | 'teacher' | 'admin'
}

type ViewState = 'login' | 'register' | 'forgot-password' | 'dashboard'

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>('login')
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  // Mock data para demostración
  const mockUsers = {
    'estudiante@edgylearn.com': { name: 'María García', role: 'student' as const },
    'docente@edgylearn.com': { name: 'Carlos López', role: 'teacher' as const },
    'admin@edgylearn.com': { name: 'Ana Martínez', role: 'admin' as const }
  }

  const handleLogin = (email: string, password: string) => {
    // Simulación de autenticación
    const user = mockUsers[email as keyof typeof mockUsers]
    if (user) {
      setCurrentUser({ ...user, email })
      setCurrentView('dashboard')
    } else {
      alert('Credenciales inválidas. Prueba con:\n- estudiante@edgylearn.com\n- docente@edgylearn.com\n- admin@edgylearn.com')
    }
  }

  const handleRegister = (userData: { name: string; email: string; password: string; role: string }) => {
    // Simulación de registro
    setCurrentUser({
      name: userData.name,
      email: userData.email,
      role: userData.role as 'student' | 'teacher' | 'admin'
    })
    setCurrentView('dashboard')
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setCurrentView('login')
  }

  const ForgotPasswordForm = () => (
    <div className="min-h-screen bg-gradient-to-br from-trust-blue-light to-learning-blue-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="bg-white p-4 rounded-full inline-block shadow-learning mb-4">
            <BookOpen className="h-12 w-12 text-learning-blue" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">EdgyLearn</h1>
          <p className="text-white/80">Recupera tu contraseña</p>
        </div>

        <Card className="shadow-learning bg-card/95 backdrop-blur-sm border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">Recuperar Contraseña</CardTitle>
            <CardDescription>
              Te enviaremos un enlace para restablecer tu contraseña
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@ejemplo.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button variant="learning" className="w-full">
              Enviar Enlace de Recuperación
            </Button>

            <div className="text-center">
              <button
                onClick={() => setCurrentView('login')}
                className="text-sm text-primary hover:underline flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver al inicio de sesión
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderDashboard = () => {
    if (!currentUser) return null

    return (
      <div className="min-h-screen bg-background">
        <Navbar userRole={currentUser.role} onLogout={handleLogout} />
        <main className="container mx-auto px-4 py-6">
          {currentUser.role === 'student' && <StudentDashboard />}
          {currentUser.role === 'teacher' && <TeacherDashboard />}
          {currentUser.role === 'admin' && <AdminDashboard />}
        </main>
      </div>
    )
  }

  if (currentView === 'dashboard' && currentUser) {
    return renderDashboard()
  }

  return (
    <>
      {currentView === 'login' && (
        <LoginForm
          onLogin={handleLogin}
          onForgotPassword={() => setCurrentView('forgot-password')}
          onRegister={() => setCurrentView('register')}
        />
      )}
      {currentView === 'register' && (
        <RegisterForm
          onRegister={handleRegister}
          onBackToLogin={() => setCurrentView('login')}
        />
      )}
      {currentView === 'forgot-password' && <ForgotPasswordForm />}
    </>
  )
}

export default Index