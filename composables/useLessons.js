// composables/useLessons.js
export const useLessons = () => {
  const router = useRouter()
  
  // Navigate to a specific lesson
  const navigateToLesson = (lesson) => {
    // You can customize this navigation logic based on your routing structure
    router.push(`/lessons/${lesson.slug}`)
  }
  
  return {
    navigateToLesson,
  }
}