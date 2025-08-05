import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { CourseModal } from "@/components/modals/CourseModal"
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Clock, 
  Plus,
  Eye,
  Edit,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Trash2,
  Upload
} from "lucide-react"

export const TeacherDashboard = () => {
  const { toast } = useToast()
  const [showCourseModal, setShowCourseModal] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [teacherStats, setTeacherStats] = useState({
    totalCourses: 5,
    totalStudents: 156,
    avgRating: 4.7,
    monthlyHours: 32
  })

  const [myCourses, setMyCourses] = useState([
    {
      id: 1,
      title: "Fundamentos de React",
      students: 45,
      rating: 4.8,
      status: "published",
      progress: 100,
      lastUpdate: "Hace 2 días"
    },
    {
      id: 2,
      title: "JavaScript Avanzado",
      students: 38,
      rating: 4.6,
      status: "published", 
      progress: 85,
      lastUpdate: "Hace 1 semana"
    },
    {
      id: 3,
      title: "Node.js y Express",
      students: 0,
      rating: 0,
      status: "pending",
      progress: 60,
      lastUpdate: "Hace 3 días"
    },
    {
      id: 4,
      title: "Base de Datos MongoDB",
      students: 0,
      rating: 0,
      status: "draft",
      progress: 30,
      lastUpdate: "Hace 5 días"
    }
  ])

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: "enrollment",
      message: "15 nuevos estudiantes se inscribieron en 'Fundamentos de React'",
      time: "Hace 2 horas",
      isNew: true
    },
    {
      id: 2,
      type: "completion",
      message: "María completó el módulo 3 de 'JavaScript Avanzado'",
      time: "Hace 4 horas",
      isNew: true
    },
    {
      id: 3,
      type: "review",
      message: "Carlos dejó una reseña de 5 estrellas en tu curso",
      time: "Hace 1 día",
      isNew: false
    },
    {
      id: 4,
      type: "question",
      message: "Ana hizo una pregunta en el foro de 'React Hooks'",
      time: "Hace 1 día",
      isNew: false
    }
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newActivities = [
          "Nuevo estudiante se inscribió en tu curso",
          "Un estudiante completó una lección",
          "Recibiste una nueva pregunta en el foro",
          "Un estudiante dejó una calificación"
        ]
        
        const randomActivity = newActivities[Math.floor(Math.random() * newActivities.length)]
        
        setRecentActivity(prev => [
          {
            id: Date.now(),
            type: "enrollment",
            message: randomActivity,
            time: "Ahora mismo",
            isNew: true
          },
          ...prev.slice(0, 3)
        ])
        
        // Update stats occasionally
        if (Math.random() > 0.8) {
          setTeacherStats(prev => ({
            ...prev,
            totalStudents: prev.totalStudents + 1,
            monthlyHours: prev.monthlyHours + 0.5
          }))
        }
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const createNewCourse = () => {
    setShowCourseModal(true)
  }

  const handleCourseCreated = (courseData: any) => {
    if (editingCourse) {
      setMyCourses(prev => prev.map(course => 
        course.id === editingCourse.id ? courseData : course
      ))
    } else {
      setMyCourses(prev => [courseData, ...prev])
      setTeacherStats(prev => ({
        ...prev,
        totalCourses: prev.totalCourses + 1
      }))
    }
    setEditingCourse(null)
  }

  const editCourse = (courseId: number) => {
    const course = myCourses.find(c => c.id === courseId)
    setEditingCourse(course)
    setShowCourseModal(true)
  }

  const viewCourse = (courseId: number) => {
    const course = myCourses.find(c => c.id === courseId)
    toast({
      title: "Vista previa",
      description: `Visualizando "${course?.title}"`,
    })
  }

  const publishCourse = (courseId: number) => {
    setMyCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { ...course, status: "pending", lastUpdate: "Ahora mismo" }
        : course
    ))
    
    const course = myCourses.find(c => c.id === courseId)
    toast({
      title: "Curso enviado",
      description: `"${course?.title}" ha sido enviado para revisión`,
    })
  }

  const deleteCourse = (courseId: number) => {
    const course = myCourses.find(c => c.id === courseId)
    setMyCourses(prev => prev.filter(c => c.id !== courseId))
    setTeacherStats(prev => ({
      ...prev,
      totalCourses: prev.totalCourses - 1
    }))
    
    toast({
      title: "Curso eliminado",
      description: `"${course?.title}" ha sido eliminado`,
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-success-green text-white">Publicado</Badge>
      case 'pending':
        return <Badge className="bg-progress-amber text-white">Pendiente</Badge>
      case 'draft':
        return <Badge variant="outline">Borrador</Badge>
      default:
        return <Badge variant="secondary">Desconocido</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-success rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Panel del Docente</h1>
            <p className="text-white/90">Gestiona tus cursos y monitorea el progreso de tus estudiantes</p>
          </div>
          <Button 
            variant="outline" 
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={createNewCourse}
          >
            <Plus className="h-4 w-4 mr-2" />
            Crear Curso
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="bg-learning-blue/10 p-3 rounded-full w-fit mx-auto mb-3">
              <BookOpen className="h-6 w-6 text-learning-blue" />
            </div>
            <div className="text-2xl font-bold text-foreground">{teacherStats.totalCourses}</div>
            <div className="text-sm text-muted-foreground">Cursos Creados</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="bg-success-green/10 p-3 rounded-full w-fit mx-auto mb-3">
              <Users className="h-6 w-6 text-success-green" />
            </div>
            <div className="text-2xl font-bold text-foreground">{teacherStats.totalStudents}</div>
            <div className="text-sm text-muted-foreground">Estudiantes Totales</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="bg-progress-amber/10 p-3 rounded-full w-fit mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-progress-amber" />
            </div>
            <div className="text-2xl font-bold text-foreground">{teacherStats.avgRating}</div>
            <div className="text-sm text-muted-foreground">Rating Promedio</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="bg-trust-blue/10 p-3 rounded-full w-fit mx-auto mb-3">
              <Clock className="h-6 w-6 text-trust-blue" />
            </div>
            <div className="text-2xl font-bold text-foreground">{teacherStats.monthlyHours}h</div>
            <div className="text-sm text-muted-foreground">Horas Este Mes</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* My Courses */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-learning-blue" />
              Mis Cursos
            </CardTitle>
            <CardDescription>
              Gestiona y monitorea tus cursos creados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {myCourses.map((course) => (
              <div key={course.id} className="border rounded-lg p-4 hover:shadow-soft transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">{course.lastUpdate}</p>
                  </div>
                  {getStatusBadge(course.status)}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Progreso del curso</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students} estudiantes
                  </div>
                  {course.rating > 0 && (
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {course.rating} ⭐
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => viewCourse(course.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Ver
                  </Button>
                  <Button 
                    variant="learning" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => editCourse(course.id)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  {course.status === "draft" && (
                    <Button 
                      variant="success" 
                      size="sm"
                      onClick={() => publishCourse(course.id)}
                    >
                      <Upload className="h-4 w-4 mr-1" />
                      Publicar
                    </Button>
                  )}
                  {course.status === "draft" && (
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => deleteCourse(course.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-success-green" />
              Actividad Reciente
            </CardTitle>
            <CardDescription>
              Últimas interacciones con tus cursos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className={`flex items-start gap-3 p-3 border rounded-lg ${activity.isNew ? 'bg-learning-blue/5 border-learning-blue/20' : ''}`}>
                <div className={`p-2 rounded-full ${
                  activity.type === 'enrollment' ? 'bg-learning-blue/10' :
                  activity.type === 'completion' ? 'bg-success-green/10' :
                  activity.type === 'review' ? 'bg-progress-amber/10' :
                  'bg-trust-blue/10'
                }`}>
                  {activity.type === 'enrollment' && <Users className="h-4 w-4 text-learning-blue" />}
                  {activity.type === 'completion' && <CheckCircle className="h-4 w-4 text-success-green" />}
                  {activity.type === 'review' && <TrendingUp className="h-4 w-4 text-progress-amber" />}
                  {activity.type === 'question' && <AlertCircle className="h-4 w-4 text-trust-blue" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm">{activity.message}</p>
                    {activity.isNew && (
                      <Badge variant="destructive" className="text-xs px-1 py-0">
                        Nuevo
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <CourseModal
        isOpen={showCourseModal}
        onClose={() => {
          setShowCourseModal(false)
          setEditingCourse(null)
        }}
        onCourseCreated={handleCourseCreated}
        mode={editingCourse ? 'edit' : 'create'}
        course={editingCourse}
      />
    </div>
  )
}