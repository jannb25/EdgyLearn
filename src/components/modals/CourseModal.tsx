import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { BookOpen, Clock, Target } from "lucide-react"

interface CourseModalProps {
  isOpen: boolean
  onClose: () => void
  onCourseCreated: (course: any) => void
  mode?: 'create' | 'edit'
  course?: any
}

export const CourseModal = ({ 
  isOpen, 
  onClose, 
  onCourseCreated, 
  mode = 'create',
  course 
}: CourseModalProps) => {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: course?.title || '',
    description: course?.description || '',
    category: course?.category || '',
    difficulty: course?.difficulty || 'Básico',
    duration: course?.duration || '',
    modules: course?.modules || 1
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.description.trim()) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
      })
      return
    }

    const newCourse = {
      id: course?.id || Date.now(),
      ...formData,
      status: mode === 'edit' ? course?.status : 'draft',
      progress: course?.progress || 0,
      students: course?.students || 0,
      rating: course?.rating || 0,
      lastUpdate: "Ahora mismo"
    }

    onCourseCreated(newCourse)
    
    toast({
      title: mode === 'edit' ? "Curso actualizado" : "Curso creado",
      description: mode === 'edit' 
        ? `"${formData.title}" ha sido actualizado exitosamente`
        : `"${formData.title}" ha sido creado como borrador`,
    })
    
    onClose()
    setFormData({
      title: '',
      description: '',
      category: '',
      difficulty: 'Básico',
      duration: '',
      modules: 1
    })
  }

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-learning-blue" />
            {mode === 'edit' ? 'Editar Curso' : 'Crear Nuevo Curso'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'edit' 
              ? 'Modifica los detalles del curso'
              : 'Completa la información para crear un nuevo curso'
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título del Curso *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Ej: Fundamentos de React"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe qué aprenderán los estudiantes..."
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                placeholder="Ej: Programación"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Dificultad</Label>
              <Select value={formData.difficulty} onValueChange={(value) => handleChange('difficulty', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Básico">Básico</SelectItem>
                  <SelectItem value="Intermedio">Intermedio</SelectItem>
                  <SelectItem value="Avanzado">Avanzado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Duración
              </Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
                placeholder="Ej: 8h 30m"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modules" className="flex items-center gap-1">
                <Target className="h-4 w-4" />
                Módulos
              </Label>
              <Input
                id="modules"
                type="number"
                min="1"
                value={formData.modules}
                onChange={(e) => handleChange('modules', parseInt(e.target.value) || 1)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="learning">
              {mode === 'edit' ? 'Actualizar' : 'Crear'} Curso
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}