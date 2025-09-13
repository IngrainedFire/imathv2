// composables/useGrades.js
import { ref, readonly, computed } from 'vue'
import { useRouter } from 'vue-router'

export const useGrades = () => {
  const router = useRouter()

  // --- Grades State ---
  const selectedGrade = ref('grade8')
  const grades = ref([
    {
      id: 'grade8',
      name: 'Grade 8',
      modules: [
        {
          id: 'module-1',
          title: 'Module 1',
          subject: 'Whole Numbers',
          lessons: [
            { id: 'lesson1', title: '1. The Number System', duration: '12:25', slug: 'the-number-system-1', video: '1071326882' },
            { id: 'lesson1', title: '1. The Number System', duration: '12:25', slug: 'the-number-system-1', video: '1071326882' },
            { id: 'lesson1', title: '1. The Number System', duration: '12:25', slug: 'the-number-system-1', video: '1071326882' },
            { id: 'lesson1', title: '1. The Number System', duration: '12:25', slug: 'the-number-system-1', video: '1071326882' },
            { id: 'lesson1', title: '1. The Number System', duration: '12:25', slug: 'the-number-system-1', video: '1071326882' },
            { id: 'lesson1', title: '1. The Number System', duration: '12:25', slug: 'the-number-system-1', video: '1071326882' },
            { id: 'lesson2', title: '2. hhfjhdgfdhgf', duration: '12:25', slug: 'the-number-system-2' }
          ]
        },
        {
          id: 'module-2',
          title: 'Module 2',
          subject: 'Integers',
          lessons: [
            { id: 'lesson3', title: '1. The Number System', duration: '12:25', slug: 'integers-number-system-1' },
            { id: 'lesson4', title: '2. The Number System', duration: '12:25', slug: 'integers-number-system-2' }
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
            { id: 'lesson1', title: '1. The Number System', duration: '12:25', slug: 'grade9-number-system-1' },
            { id: 'lesson2', title: '2. The Number System', duration: '12:25', slug: 'grade9-number-system-2' }
          ]
        },
        {
          id: 'module2',
          title: 'Module 2',
          subject: 'Integers',
          lessons: [
            { id: 'lesson3', title: '1. The Number System', duration: '12:25', slug: 'grade9-integers-1' },
            { id: 'lesson4', title: '2. The Number System', duration: '12:25', slug: 'grade9-integers-2' }
          ]
        }
      ]
    }
  ])

  // --- Computed & Utilities ---
  const currentGrade = computed(() => 
    grades.value.find(g => g.id === selectedGrade.value)
  )

  const getGradeById = (gradeId) => grades.value.find(g => g.id === gradeId)

  // Navigate to a specific lesson using breadcrumb structure
  const navigateToLesson = (lesson, gradeId, moduleId) => {
    const gradeSlug = gradeId.replace('grade', 'grade-')
    const moduleSlug = moduleId.replace(/\s+/g, '-').toLowerCase()
    const lessonSlug = lesson.slug || lesson.title.toLowerCase().replace(/\s+/g, '-')

    router.push(`/${gradeSlug}/${moduleSlug}/${lessonSlug}`)
  }

  return {
    grades: readonly(grades),
    selectedGrade,
    currentGrade,
    getGradeById,
    navigateToLesson
  }
}
