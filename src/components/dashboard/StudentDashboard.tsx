import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  Target, 
  TrendingUp, 
  Play,
  CheckCircle,
  Star,
  ArrowRight,
  Heart,
  Bookmark
} from "lucide-react"

export const StudentDashboard = () => {
  const { toast } = useToast()
  const [progress, setProgress] = useState({
    completedCourses: 3,
    totalCourses: 8,
    overallProgress: 65,
    weeklyHours: 12,
    streak: 5
  })
  
  const [enrolledCourses, setEnrolledCourses] = useState([
    {
      id: 1,
      title: "Fundamentos de React",
      instructor: "María García",
      progress: 75,
      nextLesson: "Hooks Avanzados",
      timeToComplete: "2h 30m",
      difficulty: "Intermedio",
      isBookmarked: false
    },
    {
      id: 2,
      title: "JavaScript Moderno",
      instructor: "Carlos López",
      progress: 45,
      nextLesson: "Async/Await",
      timeToComplete: "1h 45m",
      difficulty: "Básico",
      isBookmarked: true
    },
    {
      id: 3,
      title: "Base de Datos NoSQL",
      instructor: "Ana Martínez",
      progress: 90,
      nextLesson: "Proyecto Final",
      timeToComplete: "3h 15m",
      difficulty: "Avanzado",
      isBookmarked: false
    }
  ])

  const [suggestedCourses, setSuggestedCourses] = useState([
    {
      id: 4,
      title: "TypeScript Avanzado",
      instructor: "Pedro Ruiz",
      rating: 4.8,
      students: 1234,
      duration: "8h 30m",
      isLiked: false,
      enrolled: false
    },
    {
      id: 5,
      title: "Design Patterns",
      instructor: "Laura Silva",
      rating: 4.9,
      students: 856,
      duration: "6h 45m",
      isLiked: true,
      enrolled: false
    }
  ])

  // Simulate learning progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setProgress(prev => ({
          ...prev,
          weeklyHours: prev.weeklyHours + 0.5,
          overallProgress: Math.min(prev.overallProgress + 1, 100)
        }))
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const continueCourse = (courseId: number) => {
    const course = enrolledCourses.find(c => c.id === courseId)
    if (course) {
      toast({
        title: "Continuando curso",
        description: `Reanudando "${course.title}" - ${course.nextLesson}`,
      })
      
      // Simulate progress update
      setTimeout(() => {
        setEnrolledCourses(prev => prev.map(c => 
          c.id === courseId 
            ? { ...c, progress: Math.min(c.progress + 5, 100) }
            : c
        ))
        
        if (course.progress >= 95) {
          setProgress(prev => ({
            ...prev,
            completedCourses: prev.completedCourses + 1,
            streak: prev.streak + 1
          }))
          toast({
            title: "¡Curso completado!",
            description: `Felicitaciones por completar "${course.title}"`,
          })
        }
      }, 2000)
    }
  }

  const toggleBookmark = (courseId: number) => {
    setEnrolledCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { ...course, isBookmarked: !course.isBookmarked }
        : course
    ))
    
    const course = enrolledCourses.find(c => c.id === courseId)
    toast({
      title: course?.isBookmarked ? "Marcador eliminado" : "Curso marcado",
      description: course?.isBookmarked ? "Curso eliminado de favoritos" : "Curso agregado a favoritos",
    })
  }

  const enrollInCourse = (courseId: number) => {
    const course = suggestedCourses.find(c => c.id === courseId)
    if (course && !course.enrolled) {
      setSuggestedCourses(prev => prev.map(c => 
        c.id === courseId ? { ...c, enrolled: true } : c
      ))
      
      setProgress(prev => ({
        ...prev,
        totalCourses: prev.totalCourses + 1
      }))
      
      toast({
        title: "¡Inscripción exitosa!",
        description: `Te has inscrito en "${course.title}"`,
      })
    }
  }

  const toggleLike = (courseId: number) => {
    setSuggestedCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { ...course, isLiked: !course.isLiked }
        : course
    ))
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-hero rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">¡Bienvenido de vuelta! 👋</h1>
            <p className="text-white/90">Continúa tu viaje de aprendizaje donde lo dejaste</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{progress.streak}</div>
            <div className="text-sm text-white/80">días seguidos</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="bg-learning-blue/10 p-3 rounded-full w-fit mx-auto mb-3">
              <BookOpen className="h-6 w-6 text-learning-blue" />
            </div>
            <div className="text-2xl font-bold text-foreground">{progress.completedCourses}</div>
            <div className="text-sm text-muted-foreground">Cursos Completados</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="bg-success-green/10 p-3 rounded-full w-fit mx-auto mb-3">
              <Trophy className="h-6 w-6 text-success-green" />
            </div>
            <div className="text-2xl font-bold text-foreground">{progress.overallProgress}%</div>
            <div className="text-sm text-muted-foreground">Progreso General</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="bg-progress-amber/10 p-3 rounded-full w-fit mx-auto mb-3">
              <Clock className="h-6 w-6 text-progress-amber" />
            </div>
            <div className="text-2xl font-bold text-foreground">{progress.weeklyHours}h</div>
            <div className="text-sm text-muted-foreground">Esta Semana</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="bg-trust-blue/10 p-3 rounded-full w-fit mx-auto mb-3">
              <Target className="h-6 w-6 text-trust-blue" />
            </div>
            <div className="text-2xl font-bold text-foreground">{progress.totalCourses}</div>
            <div className="text-sm text-muted-foreground">Cursos Inscritos</div>
          </CardContent>
        </Card>
      </div>

      {/* My Courses */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-learning-blue" />
            Mis Cursos en Progreso
          </CardTitle>
          <CardDescription>
            Continúa donde lo dejaste y mantén tu racha de aprendizaje
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="border rounded-lg p-4 hover:shadow-soft transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <p className="text-muted-foreground text-sm">Por {course.instructor}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleBookmark(course.id)}
                    className="h-8 w-8"
                  >
                    <Bookmark className={`h-4 w-4 ${course.isBookmarked ? 'fill-current text-progress-amber' : 'text-muted-foreground'}`} />
                  </Button>
                  <Badge variant={course.difficulty === 'Básico' ? 'secondary' : course.difficulty === 'Intermedio' ? 'default' : 'destructive'}>
                    {course.difficulty}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progreso</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Play className="h-4 w-4 mr-1" />
                    Siguiente: {course.nextLesson}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.timeToComplete}
                  </div>
                </div>
                
                <Button 
                  variant="learning" 
                  size="sm" 
                  className="w-full"
                  onClick={() => continueCourse(course.id)}
                >
                  {course.progress > 0 ? "Continuar Curso" : "Comenzar Curso"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Suggested Courses */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-success-green" />
            Cursos Sugeridos para Ti
          </CardTitle>
          <CardDescription>
            Basado en tu progreso y preferencias de aprendizaje
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {suggestedCourses.map((course) => (
              <div key={course.id} className="border rounded-lg p-4 hover:shadow-soft transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleLike(course.id)}
                    className="h-8 w-8"
                  >
                    <Heart className={`h-4 w-4 ${course.isLiked ? 'fill-current text-destructive' : 'text-muted-foreground'}`} />
                  </Button>
                </div>
                <p className="text-muted-foreground text-sm mb-3">Por {course.instructor}</p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-progress-amber fill-current" />
                    {course.rating}
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {course.students} estudiantes
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                </div>
                
                <Button 
                  variant={course.enrolled ? "outline" : "success"} 
                  size="sm" 
                  className="w-full"
                  onClick={() => enrollInCourse(course.id)}
                  disabled={course.enrolled}
                >
                  {course.enrolled ? "Inscrito" : "Inscribirse"}
                  {course.enrolled && <CheckCircle className="h-4 w-4 ml-2" />}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}