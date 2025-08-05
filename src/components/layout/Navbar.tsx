import { Button } from "@/components/ui/button"
import { BookOpen, User, Users, Settings, LogOut } from "lucide-react"

interface NavbarProps {
  userRole: 'student' | 'teacher' | 'admin'
  onLogout: () => void
}

export const Navbar = ({ userRole, onLogout }: NavbarProps) => {
  return (
    <nav className="bg-card border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-learning p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-learning bg-clip-text text-transparent">
              EdgyLearn
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              <BookOpen className="w-4 h-4 mr-2" />
              Cursos
            </Button>
            
            {userRole === 'student' && (
              <Button variant="ghost" className="text-foreground hover:text-primary">
                <User className="w-4 h-4 mr-2" />
                Mi Progreso
              </Button>
            )}
            
            {(userRole === 'teacher' || userRole === 'admin') && (
              <Button variant="ghost" className="text-foreground hover:text-primary">
                <Users className="w-4 h-4 mr-2" />
                Gestión
              </Button>
            )}
            
            {userRole === 'admin' && (
              <Button variant="ghost" className="text-foreground hover:text-primary">
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </Button>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <User className="w-4 h-4 mr-2" />
              Perfil
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}