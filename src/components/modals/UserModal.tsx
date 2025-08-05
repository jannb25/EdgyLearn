import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { UserPlus, Mail, User, Shield } from "lucide-react"

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
  onUserCreated: (user: any) => void
}

export const UserModal = ({ isOpen, onClose, onUserCreated }: UserModalProps) => {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'student',
    password: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
      })
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Por favor ingresa un email válido",
      })
      return
    }

    const newUser = {
      id: Date.now(),
      ...formData,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active'
    }

    onUserCreated(newUser)
    
    toast({
      title: "Usuario creado",
      description: `"${formData.name}" ha sido creado exitosamente`,
    })
    
    onClose()
    setFormData({
      name: '',
      email: '',
      role: 'student',
      password: ''
    })
  }

  const handleChange = (field: string, value: string) => {
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
            <UserPlus className="h-5 w-5 text-learning-blue" />
            Crear Nuevo Usuario
          </DialogTitle>
          <DialogDescription>
            Completa la información para crear un nuevo usuario en el sistema
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-1">
              <User className="h-4 w-4" />
              Nombre Completo *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Ej: María García"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              Correo Electrónico *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="usuario@ejemplo.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              Rol del Usuario
            </Label>
            <Select value={formData.role} onValueChange={(value) => handleChange('role', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Estudiante</SelectItem>
                <SelectItem value="teacher">Docente</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña Temporal *</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="Mínimo 6 caracteres"
              minLength={6}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="learning">
              Crear Usuario
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}