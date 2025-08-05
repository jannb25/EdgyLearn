// Mock data for EdgyLearn platform

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  totalLessons: number;
  completedLessons?: number;
  thumbnail: string;
  status: 'pending' | 'approved' | 'rejected';
  rating: number;
  studentsEnrolled: number;
  createdAt: string;
  tags: string[];
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: string;
  completionRate: number;
  isRecommended: boolean;
  adaptedForUser?: boolean;
}

export interface Progress {
  userId: string;
  courseId: string;
  completionPercentage: number;
  currentLesson: number;
  totalLessons: number;
  timeSpent: number;
  lastActivity: string;
  performance: 'excellent' | 'good' | 'needs_improvement';
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ana García',
    email: 'ana.garcia@email.com',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5cc?w=400',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Dr. Carlos Mendoza',
    email: 'carlos.mendoza@email.com',
    role: 'instructor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    createdAt: '2023-12-01'
  },
  {
    id: '3',
    name: 'María Rodríguez',
    email: 'maria.rodriguez@email.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    createdAt: '2023-11-10'
  },
  {
    id: '4',
    name: 'Javier López',
    email: 'javier.lopez@email.com',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    createdAt: '2024-02-20'
  }
];

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introducción a la Programación en Python',
    description: 'Aprende los fundamentos de Python desde cero. Este curso te llevará desde conceptos básicos hasta proyectos prácticos.',
    instructor: 'Dr. Carlos Mendoza',
    instructorId: '2',
    category: 'Programación',
    level: 'beginner',
    duration: '8 semanas',
    totalLessons: 24,
    completedLessons: 8,
    thumbnail: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400',
    status: 'approved',
    rating: 4.8,
    studentsEnrolled: 1250,
    createdAt: '2024-01-10',
    tags: ['Python', 'Programación', 'Beginner']
  },
  {
    id: '2',
    title: 'Machine Learning Fundamentals',
    description: 'Domina los conceptos esenciales del aprendizaje automático con ejemplos prácticos y proyectos reales.',
    instructor: 'Dra. Elena Vásquez',
    instructorId: '5',
    category: 'Inteligencia Artificial',
    level: 'intermediate',
    duration: '12 semanas',
    totalLessons: 36,
    completedLessons: 12,
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400',
    status: 'approved',
    rating: 4.9,
    studentsEnrolled: 850,
    createdAt: '2024-01-15',
    tags: ['ML', 'AI', 'Data Science']
  },
  {
    id: '3',
    title: 'Desarrollo Web con React',
    description: 'Construye aplicaciones web modernas y responsive utilizando React y las mejores prácticas del desarrollo frontend.',
    instructor: 'Ing. Miguel Torres',
    instructorId: '6',
    category: 'Desarrollo Web',
    level: 'intermediate',
    duration: '10 semanas',
    totalLessons: 30,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
    status: 'pending',
    rating: 4.7,
    studentsEnrolled: 650,
    createdAt: '2024-02-01',
    tags: ['React', 'JavaScript', 'Frontend']
  },
  {
    id: '4',
    title: 'Análisis de Datos con Excel Avanzado',
    description: 'Aprende técnicas avanzadas de análisis de datos, visualización y automatización en Excel.',
    instructor: 'Lic. Patricia Luna',
    instructorId: '7',
    category: 'Análisis de Datos',
    level: 'beginner',
    duration: '6 semanas',
    totalLessons: 18,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
    status: 'approved',
    rating: 4.6,
    studentsEnrolled: 920,
    createdAt: '2024-01-20',
    tags: ['Excel', 'Data Analysis', 'Business']
  }
];

// Mock Learning Paths
export const mockLearningPaths: LearningPath[] = [
  {
    id: '1',
    title: 'Programador Full Stack',
    description: 'Conviértete en un desarrollador completo dominando tanto frontend como backend',
    courses: ['1', '3', '8'],
    difficulty: 'intermediate',
    estimatedDuration: '6 meses',
    completionRate: 35,
    isRecommended: true,
    adaptedForUser: true
  },
  {
    id: '2',
    title: 'Especialista en Data Science',
    description: 'Domina el análisis de datos, machine learning y visualización',
    courses: ['2', '4', '9'],
    difficulty: 'advanced',
    estimatedDuration: '8 meses',
    completionRate: 20,
    isRecommended: false,
    adaptedForUser: false
  },
  {
    id: '3',
    title: 'Fundamentos de Tecnología',
    description: 'Perfecta para principiantes que quieren entrar al mundo tech',
    courses: ['1', '4'],
    difficulty: 'beginner',
    estimatedDuration: '3 meses',
    completionRate: 60,
    isRecommended: true,
    adaptedForUser: true
  }
];

// Mock Progress Data
export const mockProgress: Progress[] = [
  {
    userId: '1',
    courseId: '1',
    completionPercentage: 35,
    currentLesson: 8,
    totalLessons: 24,
    timeSpent: 1200, // minutes
    lastActivity: '2024-03-15',
    performance: 'good'
  },
  {
    userId: '1',
    courseId: '2',
    completionPercentage: 15,
    currentLesson: 5,
    totalLessons: 36,
    timeSpent: 600,
    lastActivity: '2024-03-10',
    performance: 'excellent'
  },
  {
    userId: '4',
    courseId: '1',
    completionPercentage: 80,
    currentLesson: 19,
    totalLessons: 24,
    timeSpent: 2400,
    lastActivity: '2024-03-16',
    performance: 'excellent'
  }
];

// Current logged user (mock)
export let currentUser: User = mockUsers[0]; // Ana García as default student

export const setCurrentUser = (user: User) => {
  currentUser = user;
};

// Helper functions
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getCourseById = (id: string): Course | undefined => {
  return mockCourses.find(course => course.id === id);
};

export const getUserProgress = (userId: string): Progress[] => {
  return mockProgress.filter(progress => progress.userId === userId);
};

export const getCoursesForUser = (userId: string): Course[] => {
  const userProgress = getUserProgress(userId);
  return userProgress.map(progress => getCourseById(progress.courseId)).filter(Boolean) as Course[];
};