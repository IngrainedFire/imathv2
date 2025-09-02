<template>
  <div>
    <!-- Side Panel -->
    <div :class="['absolute top-0 items-center min-h-screen w-1/4 bg-white h-full p-[15px]', open ? 'translate-x-0 duration-300' : '-translate-x-full duration-300']">

      <!-- Side Panel Header -->
      <div class="flex justify-center items-center w-full h-[80px]">
          <img src="/assets/logos/imath-logo-light.webp" class="w-[134px] h-[60px]">
      </div>

      <!-- Grade Content Ouline -->
      <div class="min-w-full p-6">
        <!-- Grade Selector -->
        <div class="relative w-full mb-6">
          <select
            v-model="selectedGradeId"
            @change="onGradeChange"
            class="w-full p-3 border-2 border-pink-200 rounded-lg text-pink-600 font-medium focus:outline-none focus:border-pink-400"
          >
            <option v-for="grade in grades" :key="grade.id" :value="grade.id">
              {{ grade.name }}
            </option>
          </select>
          
          <svg
            class="w-4 h-4 text-pink-600 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>

        <!-- Module Navigation -->
        <nav class="space-y-2">
          <div
            v-for="module in currentGrade?.modules || []"
            :key="module.id"
            class="module-section"
          >
            <!-- Module Header -->
            <button
              @click="toggleModule(module.id)"
              class="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
              :class="{
                'bg-gray-50': expandedModules.includes(module.id)
              }"
            >
              <span class="font-medium text-gray-900">{{ module.subject }}</span>
              <svg
                class="w-4 h-4 text-gray-500 transition-transform"
                :class="{ 'rotate-180': expandedModules.includes(module.id) }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <!-- Lessons List -->
            <div
              v-if="expandedModules.includes(module.id)"
              class="ml-4 mt-2 space-y-1"
            >
              <button
                v-for="lesson in module.lessons"
                :key="lesson.id"
                @click="navigateToLesson(lesson, selectedGradeId, module.id)"
                class="w-full text-left p-3 rounded-lg transition-colors hover:bg-pink-50"
                :class="{
                  'bg-pink-50 text-pink-600 font-medium': isCurrentLesson(lesson),
                  'text-gray-600': !isCurrentLesson(lesson)
                }"
              >
                {{ lesson.title }}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <!-- Main -->
    <div :class="[ 'max-h-[calc(100vh-30px)] overflow-y-scroll bg-white my-[15px]  mr-[15px] rounded-[10px] border-4 px-[15px]', open ? 'ml-[25%] duration-300' : 'ml-[15px] duration-300' ]" >
      <!-- Lesson Header -->
      <div class="flex justify-between items-center h-[80px]">
          <button
          @click="open = !open"
          class="p-2 bg-gray-800 text-white rounded"
          >Toggle</button>
          <div class="flex items-center">
              <div class="ml-4 text-gray-600">
                

                <!-- Breadcrumb -->
                <nav class="flex items-center space-x-2 text-sm text-gray-600">
                  <div class="flex items-center space-x-2">
                    <span class="font-medium">{{ currentGrade?.name }}</span>
                  </div>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  <span>{{ currentModule?.subject }}</span>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  <span>{{ currentLesson?.title }}</span>
                </nav>
              </div>
          </div>
          <div class="flex justify-center gap-[20px]">
            <AuthSignedIn>
              <AuthLogoutButton />
            </AuthSignedIn>
          </div>
      </div>
      <div class="flex-1 p-8">
        <div class="max-w-6xl mx-auto">
          <!-- Lesson Header -->
          <div class="bg-white rounded-xl border border-gray-200 p-8 mb-6">
            <div class="flex flex-col rounded-lg mb-4 items-center justify-center mx-auto h-[50%]">
                <iframe id="vimeo-player" src="https://player.vimeo.com/video/1071326882" class="flex flex-shrink w-full h-[500px] rounded" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
            </div>
            <div class="flex items-center justify-between mb-6">
              <div>
                <p class="text-sm text-gray-500 mb-2">{{ currentModule?.subject }}</p>
                <h1 class="text-3xl font-bold text-gray-900">{{ currentLesson?.title }}</h1>
              </div>
              <div class="text-2xl font-bold text-gray-900">
                {{ currentLesson?.duration }}
              </div>
            </div>

            <!-- Lesson Tabs -->
            <div class="border-b border-gray-200">
              <nav class="flex space-x-8">
                <button
                  v-for="tab in lessonTabs"
                  :key="tab.id"
                  @click="activeTab = tab.id"
                  class="py-4 px-1 border-b-2 font-medium text-sm transition-colors"
                  :class="{
                    'border-pink-500 text-pink-600': activeTab === tab.id,
                    'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': activeTab !== tab.id
                  }"
                >
                  {{ tab.name }}
                </button>

                <!-- Lesson Navigation Buttons 
                <div class="flex justify-between items-center mt-8">
                  <button
                    v-if="previousLesson"
                    @click="goToPreviousLesson"
                    class="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    <span>Previous</span>
                  </button>
                  <div v-else></div>

                  <button
                    v-if="nextLesson"
                    @click="goToNextLesson"
                    class="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <span>Next</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                  <div v-else></div>
                </div>
                -->
              </nav>
            </div>
          </div>

          <!-- Lesson Content -->
          <div class="bg-white rounded-xl border border-gray-200 p-8 min-h-[600px]">
            <div v-if="activeTab === 'summary'" class="lesson-content">
              <h2 class="text-xl font-semibold mb-4">Lesson Summary</h2>
              <div class="prose max-w-none">
                <p class="text-gray-600 leading-relaxed">
                  This is where the lesson summary content will be displayed. 
                  You can add rich content, videos, interactive elements, and more.
                </p>
              </div>
            </div>

            <div v-else-if="activeTab === 'notes'" class="lesson-content">
              <h2 class="text-xl font-semibold mb-4">Lesson Notes</h2>
              <div class="prose max-w-none">
                <p class="text-gray-600 leading-relaxed">
                  Detailed notes and explanations for this lesson will appear here.
                </p>
              </div>
            </div>

            <div v-else-if="activeTab === 'practice'" class="lesson-content">
              <h2 class="text-xl font-semibold mb-4">Practice Exercises</h2>
              <div class="prose max-w-none">
                <p class="text-gray-600 leading-relaxed">
                  Interactive practice exercises and problems will be displayed here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'public'
})

import { NuxtLink } from '#components'
import { ref } from 'vue'

// Sidepanel Toggle
const open = ref(true)


const route = useRoute()
const router = useRouter()

// Composables
const { grades, getGradeById, getModuleById } = useGrades()
const { navigateToLesson, getNextRecommendedLesson } = useLessons()

// Extract route params
const gradeParam = computed(() => route.params.grade)
const moduleParam = computed(() => route.params.module)
const lessonParam = computed(() => route.params.lesson)

// Convert URL params back to IDs
const selectedGradeId = ref('')
const currentGrade = ref(null)
const currentModule = ref(null)
const currentLesson = ref(null)

// UI State
const expandedModules = ref([])
const activeTab = ref('summary')

// Lesson tabs
const lessonTabs = [
  { id: 'summary', name: 'Summary' },
  { id: 'notes', name: 'Notes' },
  { id: 'practice', name: 'Practice' }
]

// Initialize data based on route params
const initializeFromRoute = () => {
  // Find grade by converting param back to ID
  const gradeId = gradeParam.value.replace('grade-', 'grade')
  selectedGradeId.value = gradeId
  currentGrade.value = getGradeById(gradeId)
  
  if (currentGrade.value) {
    // Find module by subject name
    currentModule.value = currentGrade.value.modules.find(module => 
      module.subject.toLowerCase().replace(/\s+/g, '-') === moduleParam.value ||
      module.id.toLowerCase().replace(/\s+/g, '-') === moduleParam.value
    )
    
    if (currentModule.value) {
      // Expand current module
      expandedModules.value = [currentModule.value.id]
      
      // Find lesson
      currentLesson.value = currentModule.value.lessons.find(lesson => 
        lesson.slug === lessonParam.value ||
        lesson.title.toLowerCase().replace(/\s+/g, '-') === lessonParam.value
      )
    }
  }
}

// Navigation helpers
const nextLesson = computed(() => {
  if (!currentGrade.value || !currentModule.value || !currentLesson.value) return null
  return getNextRecommendedLesson(currentGrade.value.id, currentModule.value.id, currentLesson.value.id)
})

const previousLesson = computed(() => {
  if (!currentModule.value || !currentLesson.value) return null
  
  const currentLessonIndex = currentModule.value.lessons.findIndex(
    lesson => lesson.id === currentLesson.value.id
  )
  
  if (currentLessonIndex > 0) {
    return currentModule.value.lessons[currentLessonIndex - 1]
  }
  
  // Could implement previous module logic here
  return null
})

// Methods
const toggleModule = (moduleId) => {
  const index = expandedModules.value.indexOf(moduleId)
  if (index > -1) {
    expandedModules.value.splice(index, 1)
  } else {
    expandedModules.value.push(moduleId)
  }
}

const isCurrentLesson = (lesson) => {
  return currentLesson.value && lesson.id === currentLesson.value.id
}

const onGradeChange = () => {
  // Navigate to first lesson of first module in selected grade
  const grade = getGradeById(selectedGradeId.value)
  if (grade && grade.modules.length > 0 && grade.modules[0].lessons.length > 0) {
    const firstModule = grade.modules[0]
    const firstLesson = firstModule.lessons[0]
    navigateToLesson(firstLesson, selectedGradeId.value, firstModule.id)
  }
}

const goToNextLesson = () => {
  if (nextLesson.value) {
    navigateToLesson(nextLesson.value, currentGrade.value.id, currentModule.value.id)
  }
}

const goToPreviousLesson = () => {
  if (previousLesson.value) {
    navigateToLesson(previousLesson.value, currentGrade.value.id, currentModule.value.id)
  }
}

// Initialize on mount and watch for route changes
onMounted(() => {
  initializeFromRoute()
})

watch(() => route.params, () => {
  initializeFromRoute()
}, { deep: true })

// SEO
useHead({
  title: computed(() => 
    currentLesson.value 
      ? `${currentLesson.value.title} - ${currentGrade.value?.name} - iMath`
      : 'iMath'
  )
})
</script>

<style scoped>
.lesson-content {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.rotate-180 {
  transform: rotate(180deg);
}

select {
  /* Remove default appearance */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  
  /* Padding to make room for custom arrow */
  padding-right: 2.5rem;
  
  /* Position relative for the arrow */
  position: relative;
}

</style>

