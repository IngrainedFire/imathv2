// composables/useSubjects.ts
import { ref } from 'vue'

export const useSubjects = () => {
  const subjects = ref([
    { id: 8, title: 'Math Grade 8', description: 'Master the fundamentals.' },
    { id: 9, title: 'Math Grade 9', description: 'Level up your skills.' }
  ])

  return { subjects }
}
