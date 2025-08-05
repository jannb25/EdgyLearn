import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Trophy, Star, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Cursos Interactivos",
      description: "Aprende con contenido multimedia y ejercicios prácticos diseñados por expertos."
    },
    {
      icon: Users,
      title: "Comunidad Activa",
      description: "Conecta con otros estudiantes y docentes en un ambiente colaborativo."
    },
    {
      icon: Trophy,
      title: "Certificaciones",
      description: "Obtén certificados reconocidos al completar tus cursos y rutas de aprendizaje."
    }
  ];

  const testimonials = [
    {
      name: "Ana García",
      role: "Estudiante",
      content: "EdgyLearn ha transformado mi forma de aprender. Los cursos son increíbles.",
      rating: 5
    },
    {
      name: "Dr. Carlos Mendoza",
      role: "Instructor",
      content: "La plataforma me permite crear contenido de calidad y llegar a más estudiantes.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-learning-landing">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6">
            🚀 Nueva Era del Aprendizaje Digital
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Aprende sin límites con
            <span className="text-primary block">EdgyLearn</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            La plataforma educativa que revoluciona tu experiencia de aprendizaje con cursos personalizados, 
            tecnología de vanguardia y una comunidad global de expertos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/index">
              <Button size="lg" className="text-lg px-8 py-6">
                Comenzar Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/courses">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Explorar Cursos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Por qué elegir EdgyLearn?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre las características que hacen de EdgyLearn la mejor opción para tu crecimiento profesional.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold text-primary mb-2">10,000+</h3>
            <p className="text-muted-foreground">Estudiantes Activos</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-primary mb-2">500+</h3>
            <p className="text-muted-foreground">Cursos Disponibles</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-primary mb-2">150+</h3>
            <p className="text-muted-foreground">Instructores Expertos</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-primary mb-2">95%</h3>
            <p className="text-muted-foreground">Tasa de Satisfacción</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Lo que dicen nuestros usuarios
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-primary text-primary-foreground border-0">
          <CardContent className="text-center py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para transformar tu futuro?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Únete a miles de estudiantes que ya están construyendo sus carreras con EdgyLearn.
            </p>

          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Landing;