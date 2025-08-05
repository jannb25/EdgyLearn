import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star,
  Search,
  Filter,
  PlayCircle,
  Plus
} from 'lucide-react';
import { mockCourses, currentUser } from '@/data/mockData';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  // Filter courses based on user role
  const availableCourses = currentUser.role === 'instructor' 
    ? mockCourses.filter(course => course.instructorId === currentUser.id)
    : mockCourses.filter(course => course.status === 'approved');

  // Apply filters
  const filteredCourses = availableCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const categories = [...new Set(mockCourses.map(course => course.category))];
  const levels = ['beginner', 'intermediate', 'advanced'];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-success text-success-foreground';
      case 'intermediate': return 'bg-warning text-warning-foreground';
      case 'advanced': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner': return 'Principiante';
      case 'intermediate': return 'Intermedio';
      case 'advanced': return 'Avanzado';
      default: return level;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-learning-landing">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">
                {currentUser.role === 'instructor' ? 'Mis Cursos' : 'Catálogo de Cursos'}
              </h1>
              <p className="text-muted-foreground mt-2">
                {currentUser.role === 'instructor' 
                  ? 'Gestiona y supervisa tus cursos creados'
                  : 'Descubre y únete a cursos que impulsen tu carrera'
                }
              </p>
            </div>
            {currentUser.role === 'instructor' && (
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Crear Curso
              </Button>
            )}
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar cursos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los niveles</SelectItem>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {getLevelText(level)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros Avanzados
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="course-card group cursor-pointer">
              <div className="relative overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4">
                    <Button className="w-full" variant="secondary">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      {currentUser.role === 'instructor' ? 'Gestionar' : 'Comenzar Curso'}
                    </Button>
                  </div>
                </div>
                <Badge className={getLevelColor(course.level)} variant="secondary">
                  {getLevelText(course.level)}
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{course.description}</p>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {course.totalLessons} lecciones
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-warning fill-warning mr-1" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        <span className="text-sm">{course.studentsEnrolled}</span>
                      </div>
                    </div>
                    <Badge variant="outline">{course.category}</Badge>
                  </div>

                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground mb-2">
                      Instructor: <span className="font-medium text-foreground">{course.instructor}</span>
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {course.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No se encontraron cursos</h3>
            <p className="text-muted-foreground">
              Intenta ajustar tus filtros de búsqueda para encontrar más cursos.
            </p>
          </div>
        )}

        {/* Statistics */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Estadísticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{filteredCourses.length}</p>
                <p className="text-sm text-muted-foreground">
                  {currentUser.role === 'instructor' ? 'Mis Cursos' : 'Cursos Disponibles'}
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">{categories.length}</p>
                <p className="text-sm text-muted-foreground">Categorías</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-success">
                  {filteredCourses.reduce((acc, course) => acc + course.studentsEnrolled, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Estudiantes Inscritos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-warning">
                  {(filteredCourses.reduce((acc, course) => acc + course.rating, 0) / filteredCourses.length || 0).toFixed(1)}
                </p>
                <p className="text-sm text-muted-foreground">Rating Promedio</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Courses;