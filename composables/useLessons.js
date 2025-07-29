// composables/useLessons.js
export const useLessons = () => {
  const router = useRouter()
  
  // Navigate to a specific lesson using the new breadcrumb structure
  const navigateToLesson = (lesson, gradeId, moduleId) => {
    // Convert IDs to URL-friendly slugs
    const gradeSlug = gradeId.replace('grade', 'grade-')
    const moduleSlug = moduleId.replace(/\s+/g, '-').toLowerCase()
    const lessonSlug = lesson.slug || lesson.title.toLowerCase().replace(/\s+/g, '-')
    
    router.push(`/${gradeSlug}/${moduleSlug}/${lessonSlug}`)
  }

  // Get lesson progress (could be integrated with a progress tracking system)
  const getLessonProgress = (lessonId) => {
    // This would typically fetch from an API or local storage
    // For now, returning mock data
    return {
      id: lessonId,
      completed: false,
      progress: 0,
      lastAccessed: null
    }
  }

  // Mark lesson as completed
  const markLessonCompleted = (lessonId) => {
    // This would typically update an API or local storage
    console.log(`Lesson ${lessonId} marked as completed`)
  }

  // Update lesson progress
  const updateLessonProgress = (lessonId, progress) => {
    // This would typically update an API or local storage
    console.log(`Lesson ${lessonId} progress updated to ${progress}%`)
  }

  // Get recommended next lesson
  const getNextRecommendedLesson = (currentGradeId, currentModuleId, currentLessonId) => {
    const { getModuleById, getModulesByGrade } = useGrades()
    
    const currentModule = getModuleById(currentGradeId, currentModuleId)
    if (!currentModule) return null

    const currentLessonIndex = currentModule.lessons.findIndex(
      lesson => lesson.id === currentLessonId
    )

    // If there's a next lesson in the same module
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      return currentModule.lessons[currentLessonIndex + 1]
    }

    // If no more lessons in current module, get first lesson of next module
    const allModules = getModulesByGrade(currentGradeId)
    const currentModuleIndex = allModules.findIndex(
      module => module.id === currentModuleId
    )

    if (currentModuleIndex < allModules.length - 1) {
      const nextModule = allModules[currentModuleIndex + 1]
      return nextModule.lessons[0] || null
    }

    return null // No more lessons available
  }

  // Search lessons across all grades and modules
  const searchLessons = (query) => {
    const { grades } = useGrades()
    const results = []

    grades.value.forEach(grade => {
      grade.modules.forEach(module => {
        module.lessons.forEach(lesson => {
          if (lesson.title.toLowerCase().includes(query.toLowerCase()) ||
              module.subject.toLowerCase().includes(query.toLowerCase())) {
            results.push({
              ...lesson,
              gradeId: grade.id,
              gradeName: grade.name,
              moduleId: module.id,
              moduleTitle: module.title,
              moduleSubject: module.subject
            })
          }
        })
      })
    })

    return results
  }

  // Get lesson statistics for a grade
  const getGradeStatistics = (gradeId) => {
    const { getModulesByGrade } = useGrades()
    const modules = getModulesByGrade(gradeId)
    
    let totalLessons = 0
    let totalDuration = 0

    modules.forEach(module => {
      totalLessons += module.lessons.length
      module.lessons.forEach(lesson => {
        // Parse duration string (e.g., "12:25" -> 12.42 minutes)
        const [minutes, seconds] = lesson.duration.split(':').map(Number)
        totalDuration += minutes + (seconds / 60)
      })
    })

    return {
      totalModules: modules.length,
      totalLessons,
      totalDuration: Math.round(totalDuration),
      averageLessonDuration: totalLessons > 0 ? Math.round(totalDuration / totalLessons) : 0
    }
  }

  return {
    navigateToLesson,
    getLessonProgress,
    markLessonCompleted,
    updateLessonProgress,
    getNextRecommendedLesson,
    searchLessons,
    getGradeStatistics
  }
}