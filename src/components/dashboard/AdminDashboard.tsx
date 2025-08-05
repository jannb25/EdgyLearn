import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { UserModal } from "@/components/modals/UserModal"

import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  BarChart3,
  Settings,
  UserPlus,
  Shield,
  Ban
} from "lucide-react"

export const AdminDashboard = () => {
  const { toast } = useToast()
  const [showUserModal, setShowUserModal] = useState(false)
  const [systemStats, setSystemStats] = useState({
    totalUsers: 1247,
    totalCourses: 89,
    pendingApprovals: 12,
    activeStudents: 856
  })

  const [pendingCourses, setPendingCourses] = useState([
    {
      id: 1,
      title: "Advanced Machine Learning",
      instructor: "Dr. Patricia López",
      submittedDate: "2024-01-15",
      modules: 8,
      duration: "12h 30m",
      status: "pending"
    },
    {
      id: 2,
      title: "Python para Data Science",
      instructor: "Miguel Rodríguez",
      submittedDate: "2024-01-14",
      modules: 6,
      duration: "8h 45m",
      status: "pending"
    },
    {
      id: 3,
      title: "Diseño UX/UI Avanzado",
      instructor: "Carmen Silva",
      submittedDate: "2024-01-13",
      modules: 10,
      duration: "15h 20m",
      status: "pending"
    }
  ])

  const [recentUsers, setRecentUsers] = useState([
    {
      id: 1,
      name: "María González",
      email: "maria@example.com",
      role: "student",
      joinDate: "2024-01-15",
      status: "active"
    },
    {
      id: 2,
      name: "Carlos Mendoza",
      email: "carlos@example.com",
      role: "teacher",
      joinDate: "2024-01-14",
      status: "pending"
    },
    {
      id: 3,
      name: "Ana Ruiz",
      email: "ana@example.com",
      role: "student",
      joinDate: "2024-01-14",
      status: "active"
    },
    {
      id: 4,
      name: "Pedro Castro",
      email: "pedro@example.com",
      role: "teacher",
      joinDate: "2024-01-13",
      status: "active"
    }
  ])

  const [systemMetrics, setSystemMetrics] = useState([
    { label: "Cursos Completados", value: 156, trend: "+12%" },
    { label: "Nuevos Registros", value: 23, trend: "+8%" },
    { label: "Satisfacción", value: 4.6, trend: "+0.2" },
    { label: "Retención", value: "87%", trend: "+3%" }
  ])

  // Simulate real-time system updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        // Simulate new user registrations
        setSystemStats(prev => ({
          ...prev,
          totalUsers: prev.totalUsers + 1,
          activeStudents: prev.activeStudents + Math.floor(Math.random() * 2)
        }))
        
        // Update metrics occasionally
        setSystemMetrics(prev => prev.map(metric => {
          if (typeof metric.value === 'number') {
            return {
              ...metric,
              value: metric.value + Math.floor(Math.random() * 3)
            }
          }
          return metric
        }))
      }
    }, 10000)

    return () => clearInterval(interval)
  }, []);

  const approveCourse = (courseId: number) => {
    const course = pendingCourses.find(c => c.id === courseId)
    if (course) {
      setPendingCourses(prev => prev.filter(c => c.id !== courseId))
      setSystemStats(prev => ({
        ...prev,
        totalCourses: prev.totalCourses + 1,
        pendingApprovals: prev.pendingApprovals - 1
      }))
      
      toast({
        title: "Curso aprobado",
        description: `"${course.title}" ha sido aprobado y publicado`,
      })
    }
  };

  const rejectCourse = (courseId: number) => {
    const course = pendingCourses.find(c => c.id === courseId)
    if (course) {
      setPendingCourses(prev => prev.filter(c => c.id !== courseId))
      setSystemStats(prev => ({
        ...prev,
        pendingApprovals: prev.pendingApprovals - 1
      }))
      
      toast({
        title: "Curso rechazado",
        description: `"${course.title}" ha sido rechazado`,
      })
    }
  };

  const reviewCourse = (courseId: number) => {
    const course = pendingCourses.find(c => c.id === courseId)
    toast({
      title: "Revisando curso",
      description: `Abriendo vista detallada de "${course?.title}"`,
    })
  };

  const promoteUser = (userId: number) => {
    setRecentUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, role: user.role === 'student' ? 'teacher' : 'admin' }
        : user
    ))
    
    const user = recentUsers.find(u => u.id === userId)
    toast({
      title: "Usuario promovido",
      description: `${user?.name} ha sido promovido a ${user?.role === 'student' ? 'docente' : 'administrador'}`,
    })
  };

  const suspendUser = (userId: number) => {
    setRecentUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'suspended' : 'active' }
        : user
    ))
    
    const user = recentUsers.find(u => u.id === userId)
    toast({
      title: user?.status === 'active' ? "Usuario suspendido" : "Usuario reactivado",
      description: `${user?.name} ha sido ${user?.status === 'active' ? 'suspendido' : 'reactivado'}`,
    })
  };

  const createNewUser = () => {
    setShowUserModal(true)
  };

  const handleUserCreated = (userData: any) => {
    setRecentUsers(prev => [userData, ...prev.slice(0, 3)])
    setSystemStats(prev => ({
      ...prev,
      totalUsers: prev.totalUsers + 1
    }))
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-destructive text-white">Admin</Badge>
      case 'teacher':
        return <Badge className="bg-success-green text-white">Docente</Badge>
      case 'student':
        return <Badge className="bg-learning-blue text-white">Estudiante</Badge>
      default:
        return <Badge variant="secondary">Usuario</Badge>
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success-green text-white">Activo</Badge>
      case 'pending':
        return <Badge className="bg-progress-amber text-white">Pendiente</Badge>
      case 'suspended':
        return <Badge className="bg-destructive text-white">Suspendido</Badge>
      case 'inactive':
        return <Badge variant="outline">Inactivo</Badge>
      default:
        return <Badge variant="secondary">Desconocido</Badge>
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-hero-admin from-destructive to-destructive/80 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
            <p className="text-white/90">Gestiona usuarios, cursos y monitorea el sistema EdgyLearn</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={createNewUser}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Nuevo Usuario
            </Button>
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Settings className="h-4 w-4 mr-2" />
              Configuración
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="bg-learning-blue/10 p-3 rounded-full w-fit mx-auto mb-3">
              <Users className="h-6 w-6 text-learning-blue" />
            </div>
            <div className="text-2xl font-bold text-foreground">{systemStats.totalUsers}</div>
            <div className="text-sm text-muted-foreground">Usuarios Totales</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="bg-success-green/10 p-3 rounded-full w-fit mx-auto mb-3">
              <BookOpen className="h-6 w-6 text-success-green" />
            </div>
            <div className="text-2xl font-bold text-foreground">{systemStats.totalCourses}</div>
            <div className="text-sm text-muted-foreground">Cursos Publicados</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="bg-progress-amber/10 p-3 rounded-full w-fit mx-auto mb-3">
              <Clock className="h-6 w-6 text-progress-amber" />
            </div>
            <div className="text-2xl font-bold text-foreground">{systemStats.pendingApprovals}</div>
            <div className="text-sm text-muted-foreground">Pendientes Aprobación</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="bg-trust-blue/10 p-3 rounded-full w-fit mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-trust-blue" />
            </div>
            <div className="text-2xl font-bold text-foreground">{systemStats.activeStudents}</div>
            <div className="text-sm text-muted-foreground">Estudiantes Activos</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending Course Approvals */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-progress-amber" />
              Cursos Pendientes de Aprobación
            </CardTitle>
            <CardDescription>
              Revisa y aprueba nuevos cursos creados por docentes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingCourses.map((course) => (
              <div key={course.id} className="border rounded-lg p-4 hover:shadow-soft transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">Por {course.instructor}</p>
                    <p className="text-xs text-muted-foreground">Enviado: {course.submittedDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {course.modules} módulos
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => reviewCourse(course.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Revisar
                  </Button>
                  <Button 
                    variant="success" 
                    size="sm"
                    onClick={() => approveCourse(course.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Aprobar
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => rejectCourse(course.id)}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Rechazar
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-learning-blue" />
              Usuarios Recientes
            </CardTitle>
            <CardDescription>
              Nuevos registros y actividad de usuarios
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className="text-xs text-muted-foreground">Registro: {user.joinDate}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col gap-1 items-end">
                    {getRoleBadge(user.role)}
                    {getStatusBadge(user.status)}
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => promoteUser(user.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Shield className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={user.status === 'active' ? 'destructive' : 'success'}
                      size="sm"
                      onClick={() => suspendUser(user.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Ban className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* System Metrics */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-success-green" />
            Métricas del Sistema
          </CardTitle>
          <CardDescription>
            Estadísticas clave de rendimiento y uso de la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            {systemMetrics.map((metric, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
                <div className="text-sm text-muted-foreground mb-2">{metric.label}</div>
                <div className="text-xs text-success-green font-medium">{metric.trend}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <UserModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        onUserCreated={handleUserCreated}
      />
    </div>
  )
}