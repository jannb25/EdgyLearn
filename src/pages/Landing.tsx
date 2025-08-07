import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Trophy, Star, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logoEL.jpeg";


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
        <div className="mb-6">
          <img 
            //src="https://drive.google.com/uc?export=view&id=TU_ID1-NK69juEH4QJ5ZwZ2YP0wN7rt-SiRv1v"
            src={logo}
            alt="EdgyLearn Logo"
            className="mx-auto w-64 h-64 md:w-72 md:h-72 rounded-full object-cover"
          />

        </div>
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


      {/*<!-- Pricing Section -->*/}
        <section className="container px-4 py-20">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Planes diseñados para tu éxito
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Elige el plan que mejor se adapte a tus necesidades y comienza a transformar tu futuro hoy mismo.
                </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto ">
                {/*<!-- Plan Básico -->*/}                
                <div className="card-enhanced" >
                    <div className="text-center py-6 px-6 rounded-lg bg-card border-border">
                        <div className="icon-container">
                            <i data-lucide="book-open" className="h-8 w-8 text-primary"></i>
                        </div>
                        <h3 className="text-2xl font-bold">Básico</h3>
                        <div className="text-center">
                            <span className="text-4xl font-bold text-primary">Gratis</span>
                        </div>
                        <p className="text-base text-muted-foreground">
                            Perfecto para comenzar tu viaje de aprendizaje
                        </p>
                    </div>
                    <div className="text-center py-6 px-6 rounded-lg bg-card border-border">
                        <ul className="feature-list">
                            <li className="feature-item">
                                <i data-lucide="check-circle" className="h-5 w-5 check-icon"></i>
                                <span className="text-sm">Acceso a 3 cursos básicos</span>
                            </li>
                            <li className="feature-item">
                                <i data-lucide="check-circle" className="h-5 w-5 check-icon"></i>
                                <span className="text-sm">Comunidad de estudiantes</span>
                            </li>
                            <li className="feature-item">
                                <i data-lucide="check-circle" className="h-5 w-5 check-icon"></i>
                                <span className="text-sm">Certificado básico</span>
                            </li>
                            <li className="feature-item">
                                <i data-lucide="check-circle" className="h-5 w-5 check-icon"></i>
                                <span className="text-sm">Soporte por email</span>
                            </li>
                           <br />
                           <br />
                        </ul>
                      
                         <div className="mt-6">
                            <a
                              href="#"  
                              className="w-full block text-center px-4 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/90 transition duration-300 ease-in-out"
                            >
                              Comenzar Gratis
                            </a>
                           
                          </div>

                    </div>
                </div>

                {/*<!-- Plan Premium -->*/}
                <div className="card-enhanced" >
                <div className="text-center py-6 px-6 rounded-lg bg-card border-border">
                                      
                        <h3 className="text-2xl font-bold">Premium</h3>
                        <div className="text-center">
                            <span className="text-4xl font-bold text-primary">$29</span>
                            <span className="text-muted-foreground">/mes</span>
                        </div>
                        <p className="text-base text-muted-foreground">
                            La opción más popular para estudiantes serios
                        </p>
                    </div>
                    <div className="text-center py-6 px-6 rounded-lg bg-card border-border">
                        <ul className="feature-list">
                            <li className="feature-item">
                                <i data-lucide="check-circle" className="h-5 w-5 check-icon"></i>
                                <span className="text-sm">Acceso ilimitado a todos los cursos</span>
                            </li>
                            <li className="feature-item">
                                <i data-lucide="check-circle" className="h-5 w-5 check-icon"></i>
                                <span className="text-sm">Mentoría personalizada 1:1</span>
                            </li>
                            <li className="feature-item">
                                <i data-lucide="check-circle" className="h-5 w-5 check-icon"></i>
                                <span className="text-sm">Certificados profesionales</span>
                            </li>
                            <li className="feature-item">
                                <i data-lucide="check-circle" className="h-5 w-5 check-icon"></i>
                                <span className="text-sm">Soporte prioritario 24/7</span>
                            </li>
                            <li className="feature-item">
                                <i data-lucide="check-circle" className="h-5 w-5 check-icon"></i>
                                <span className="text-sm">Descarga de contenido offline</span>
                            </li>
                            <li className="feature-item">
                                <i data-lucide="check-circle" className="h-5 w-5 check-icon"></i>
                                <span className="text-sm">Proyectos prácticos exclusivos</span>
                            </li>
                        </ul>
                     
                         <div className="mt-6">
                            <a
                              href="#" 
                              className="w-full block text-center px-4 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/90 transition duration-300 ease-in-out"
                            >
                              Elegir Premium
                            </a>
                            
                          </div>
                    </div>
                </div>
               

                {/*<!-- Plan Empresarial -->*/}
                <div className="card-enhanced">
                    <div className="text-center py-6 px-6 rounded-lg bg-card border-border">
                        <div className="icon-container">
                            <i data-lucide="crown" className="h-8 w-8 text-primary"></i>
                        </div>
                        <h3 className="text-2xl font-bold">Empresarial</h3>
                        <div className="text-center">
                            <span className="text-4xl font-bold text-primary">$99</span>
                            <span className="text-muted-foreground">/mes</span>
                        </div>
                        <p className="text-base text-muted-foreground">
                            Solución completa para equipos y empresas
                        </p>
                    </div>
                    <div className="text-center py-6 px-6 rounded-lg bg-card border-border">
                        <ul className="feature-list">
                            <li className="feature-item">
                                <i data-lucide="check-circle" className="h-5 w-5 check-icon"></i>
                                <span className="text-sm">Todo lo incluido en Premium</span>
                            </li>
                            <li className="feature-item">
                                <i data-lucide="check-circle" className="h-5 w-5 check-icon"></i>
                                <span className="text-sm">Dashboard de administración</span>
                            </li>
                            <li className="feature-item">
                                <i data-lucide="check-circle" className="h-5 w-5 check-icon"></i>
                                <span className="text-sm">Reportes de progreso del equipo</span>
                            </li>
                            <li className="feature-item">
                                <i data-lucide="check-circle" className="h-5 w-5 check-icon"></i>
                                <span className="text-sm">Integraciones empresariales</span>
                            </li>
                            <li className="feature-item">
                                <i data-lucide="check-circle" className="h-5 w-5 check-icon"></i>
                                <span className="text-sm">Contenido personalizado</span>
                            </li>
                            <li className="feature-item">
                                <i data-lucide="check-circle" className="h-5 w-5 check-icon"></i>
                                <span className="text-sm">Gerente de cuenta dedicado</span>
                            </li>
                        </ul>
                     

                            <div className="mt-6">
                            <a
                              href="#" 
                              className="w-full block text-center px-4 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/90 transition duration-300 ease-in-out"
                            >
                                 Contactar Ventas
                            </a>
                           
                          </div>
                    </div>
                </div>
            </div>

            {/*{ Financing Options }*/}
            <div className="bg-card-translucent rounded-2xl py-8 px-8">
                <div className="text-center mb-8">
                    <i data-lucide="credit-card" className="mx-auto h-12 w-12 text-primary mb-4"></i>
                    <h3 className="text-2xl font-bold mb-2">Opciones de Financiamiento</h3>
                    <p className="text-muted-foreground">
                        Hacemos que el aprendizaje sea accesible para todos con opciones flexibles de pago
                    </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center py-6 px-6 rounded-lg bg-card border-border">
                        <span className="badge badge-secondary mb-3">
                            25% de descuento
                        </span>
                        <h4 className="font-semibold text-lg mb-2">Pago Anual</h4>
                        <p className="text-sm text-muted-foreground">Ahorra pagando por adelantado</p>
                    </div>
                    
                    <div className="text-center py-6 px-6 rounded-lg bg-card border-border">
                        <span className="badge badge-secondary mb-3">
                            50% de descuento
                        </span>
                        <h4 className="font-semibold text-lg mb-2">Plan Estudiantil</h4>
                        <p className="text-sm text-muted-foreground">Con credencial estudiantil válida</p>
                    </div>
                    
                    <div className="text-center py-6 px-6 rounded-lg bg-card border-border">
                        <span className="badge badge-secondary mb-3">
                            Sin intereses
                        </span>
                        <h4 className="font-semibold text-lg mb-2">Financiamiento 0%</h4>
                        <p className="text-sm text-muted-foreground">Hasta 12 meses sin intereses</p>
                    </div>
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