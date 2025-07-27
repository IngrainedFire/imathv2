// composables/useGrades.js
export const useGrades = () => {
  // Reactive state for selected grade
  const selectedGrade = ref('grade8')
  
  // Static data for grades and their modules
  const grades = ref([
    {
      id: 'grade8',
      name: 'Grade 8',
      modules: [
        {
          id: 'module1',
          title: 'Module 1',
          subject: 'Whole Numbers',
          lessons: [
            {
              id: 'lesson1',
              title: '1. The Number System',
              duration: '12:25',
              slug: 'number-system-1'
            },
            {
              id: 'lesson2',
              title: '1. The Number System',
              duration: '12:25',
              slug: 'number-system-2'
            },
            {
              id: 'lesson1',
              title: '1. The Number System',
              duration: '12:25',
              slug: 'number-system-1'
            },
            {
              id: 'lesson2',
              title: '1. The Number System',
              duration: '12:25',
              slug: 'number-system-2'
            }
          ]
        },
        {
          id: 'module2',
          title: 'Module 2',
          subject: 'Integers',
          lessons: [
            {
              id: 'lesson3',
              title: '1. The Number System',
              duration: '12:25',
              slug: 'integers-number-system-1'
            },
            {
              id: 'lesson4',
              title: '1. The Number System',
              duration: '12:25',
              slug: 'integers-number-system-2'
            }
          ]
        }
      ]
    },
    {
      id: 'grade9',
      name: 'Grade 9',
      modules: [
        {
          id: 'module1',
          title: 'Module 1',
          subject: 'Whole Numbers',
          lessons: [
            {
              id: 'lesson1',
              title: '1. The Number System',
              duration: '12:25',
              slug: 'grade9-number-system-1'
            },
            {
              id: 'lesson2',
              title: '1. The Number System',
              duration: '12:25',
              slug: 'grade9-number-system-2'
            }
          ]
        },
        {
          id: 'module2',
          title: 'Module 2',
          subject: 'Integers',
          lessons: [
            {
              id: 'lesson3',
              title: '1. The Number System',
              duration: '12:25',
              slug: 'grade9-integers-1'
            },
            {
              id: 'lesson4',
              title: '1. The Number System',
              duration: '12:25',
              slug: 'grade9-integers-2'
            }
          ]
        }
      ]
    }
  ])

  // Computed property to get the current grade data
  const currentGrade = computed(() => {
    return grades.value.find(grade => grade.id === selectedGrade.value)
  })

  // Method to get a specific grade by ID
  const getGradeById = (gradeId) => {
    return grades.value.find(grade => grade.id === gradeId)
  }

  // Method to get all modules for a specific grade
  const getModulesByGrade = (gradeId) => {
    const grade = getGradeById(gradeId)
    return grade ? grade.modules : []
  }

  // Method to get a specific module
  const getModuleById = (gradeId, moduleId) => {
    const modules = getModulesByGrade(gradeId)
    return modules.find(module => module.id === moduleId)
  }

  // Method to get lessons for a specific module
  const getLessonsByModule = (gradeId, moduleId) => {
    const module = getModuleById(gradeId, moduleId)
    return module ? module.lessons : []
  }

  // Method to add a new grade (for admin functionality)
  const addGrade = (gradeData) => {
    grades.value.push({
      id: gradeData.id || `grade${grades.value.length + 1}`,
      name: gradeData.name,
      modules: gradeData.modules || []
    })
  }

  // Method to add a module to a grade
  const addModuleToGrade = (gradeId, moduleData) => {
    const grade = getGradeById(gradeId)
    if (grade) {
      grade.modules.push({
        id: moduleData.id || `module${grade.modules.length + 1}`,
        title: moduleData.title,
        subject: moduleData.subject,
        lessons: moduleData.lessons || []
      })
    }
  }

  // Method to add a lesson to a module
  const addLessonToModule = (gradeId, moduleId, lessonData) => {
    const module = getModuleById(gradeId, moduleId)
    if (module) {
      module.lessons.push({
        id: lessonData.id || `lesson${module.lessons.length + 1}`,
        title: lessonData.title,
        duration: lessonData.duration,
        slug: lessonData.slug
      })
    }
  }

  return {
    grades: readonly(grades),
    selectedGrade,
    currentGrade,
    getGradeById,
    getModulesByGrade,
    getModuleById,
    getLessonsByModule,
    addGrade,
    addModuleToGrade,
    addLessonToModule
  }
}