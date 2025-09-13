
<template>
  <div>
    <!------------Side Panel------------->
    <div 
      :class="[' flex flex-col z-20 absolute top-0 items-center w-[300px] sm:w-[400px] min-h-[85dvh] overflow-hidden  bg-white h-[85dvh] p-[15px]', open ? 'translate-x-0 duration-300' : '-translate-x-full duration-300']">

      <!-- Side Panel Header (logo area) -->
      <div class="flex justify-between items-center w-full h-[80px]">
          <!-- Logo image -->
          <img src="/assets/logos/imath-logo-light.webp" class="w-[134px] h-[60px]">
          <button
          @click="open = !open"
          class="p-2 bg-gray-800 text-white rounded lg:hidden"
          >Toggle</button>
      </div>

      <!-- Grade Content Outline -->
      <div class="flex flex-col min-w-full flex-grow h-[52px]">
        <!-- Grade Selector Dropdown -->
        <div class="relative w-full mb-6">
          <!-- Dropdown bound to selectedGradeId, triggers onGradeChange -->
          <select
            v-model="selectedGradeId"
            @change="onGradeChange"
            class="w-full p-3 border-2 border-pink-200 rounded-lg text-pink-600 font-medium focus:outline-none focus:border-pink-400"
          >
            <!-- Loop over all grades and render as options -->
            <option v-for="grade in grades" :key="grade.id" :value="grade.id">
              {{ grade.name }}
            </option>
          </select>
          
          <!-- Custom dropdown arrow icon -->
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
        <nav class="space-y-2 overflow-y-scroll flex-grow">
          <!-- Loop over modules in the current grade -->
          <div
            v-for="module in currentGrade?.modules || []"
            :key="module.id"
            class="module-section"
          >
            <!-- Module Header button (expand/collapse) -->
            <button
              @click="toggleModule(module.id)"
              class="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
              :class="{
                'bg-gray-50': expandedModules.includes(module.id)
              }"
            >
              <!-- Module title -->
              <span class="font-medium text-gray-900">{{ module.subject }}</span>
              <!-- Expand/collapse arrow -->
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

            <!-- Lessons List (only shown if module expanded) -->
            <div
              v-if="expandedModules.includes(module.id)"
              class="ml-4 mt-2 space-y-1"
            >
              <!-- Loop over lessons in module -->
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
    <div :class="['opacity-[20%] absolute top-0 h-[85dvh] w-screen z-10 bg-[#192764]', open ? 'block lg:hidden' : 'hidden' ]">
    </div>
    <!------------Main Content Section------------->
    <div 
      :class="[ 'z-0 max-h-[calc(85dvh-30px)] overflow-y-scroll bg-white my-[15px]  mr-[15px] rounded-[10px] border-4 px-[15px]', open ? 'ml-[15px] lg:ml-[400px] duration-300' : 'ml-[15px] duration-300' ]" >
      
      <!-- Lesson Header -->
      <div class="flex justify-between items-center h-[80px]">
          <!-- Toggle side panel button -->
          <button
          @click="open = !open"
          class="p-2 bg-gray-800 text-white rounded"
          >Toggle</button>

          <!-- Breadcrumb section -->
          <div class="flex items-center">
              <div class="ml-4 text-gray-600">
                <nav class="flex items-center space-x-2 text-sm text-gray-600">
                  <!-- Current grade -->
                  <div class="flex items-center space-x-2">
                    <span class="font-medium">{{ currentGrade?.name }}</span>
                  </div>
                  <!-- Arrow separator -->
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  <!-- Current module -->
                  <span>{{ currentModule?.subject }}</span>
                  <!-- Arrow separator -->
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  <!-- Current lesson -->
                  <span>{{ currentLesson?.title }}</span>
                </nav>
              </div>
          </div>

          <!-- Logout button (only when signed in) -->
          <div class="flex justify-center gap-[20px]">
            <AuthSignedIn>
              <AuthLogoutButton />
            </AuthSignedIn>
          </div>
      </div>

      <!-- Lesson body -->
      <div class="flex-1 p-8">
        <div class="max-w-6xl mx-auto">
          <!-- Video + Lesson header -->
          <div class="bg-white rounded-xl border border-gray-200 p-8 mb-6">
            <!-- Vimeo video embed -->
            <div class="flex flex-col rounded-lg mb-4 items-center justify-center mx-auto h-[50%]">
                <iframe id="vimeo-player" :src="`https://player.vimeo.com/video/${currentLesson?.video}`" class="flex flex-shrink w-full h-[500px] rounded" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
            </div>
            <!-- Lesson info row -->
            <div class="flex items-center justify-between mb-6">
              <div>
                <!-- Module subject -->
                <p class="text-sm text-gray-500 mb-2">{{ currentModule?.subject }}</p>
                <!-- Lesson title -->
                <h1 class="text-3xl font-bold text-gray-900">{{ currentLesson?.title }}</h1>
              </div>
              <!-- Lesson duration -->
              <div class="text-2xl font-bold text-gray-900">
                {{ currentLesson?.duration }}
              </div>
            </div>

            <!-- Lesson Tabs -->
            <div class="border-b border-gray-200">
              <nav class="flex space-x-8">
                <!-- Render each tab button -->
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
              </nav>
            </div>
          </div>

          <!-- Lesson Content Tabs -->
          <div class="bg-white rounded-xl border border-gray-200 p-8 min-h-[600px]">
            <!-- Summary tab -->
            <div v-if="activeTab === 'summary'" class="lesson-content">
              <h2 class="text-xl font-semibold mb-4">Lesson Summary</h2>
              <div class="prose max-w-none">
                <p class="text-gray-600 leading-relaxed">
                  This is where the lesson summary content will be displayed. 
                  You can add rich content, videos, interactive elements, and more.
                </p>
              </div>
            </div>

            <!-- Notes tab -->
            <div v-else-if="activeTab === 'notes'" class="lesson-content">
              <h2 class="text-xl font-semibold mb-4">Lesson Notes</h2>
              <div class="prose max-w-none">
                <p class="text-gray-600 leading-relaxed">
                  Detailed notes and explanations for this lesson will appear here.
                </p>
              </div>
            </div>

            <!-- Practice tab -->
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

/* =========================
   PAGE SETUP
========================= */

definePageMeta({ layout: 'default' })


/* =========================
   IMPORTS & COMPOSABLES
========================= */

import { useMediaQuery } from '~/composables/useMediaQuery'
import { ref, computed, onMounted, watch } from 'vue'
const route = useRoute()
const router = useRouter()

// Custom composables for grades and lessons
const { grades, getGradeById, navigateToLesson } = useGrades()

/* =========================
   DYNAMIC ROUTE PARAMS
========================= */

// Route params from URL
const gradeParam = computed(() => route.params.grade)   // [grade] route
const moduleParam = computed(() => route.params.module) // [module] route
const lessonParam = computed(() => route.params.lesson) // [lesson] route

/* =========================
   UNIVERSAL STATE
========================= */

const selectedGradeId = ref('') // Currently selected grade ID
const currentGrade = ref(null)  // Current grade object
const currentModule = ref(null) // Current module object
const currentLesson = ref(null) // Current lesson object

/* =========================
   ROUTE PROCESSOR
========================= */

// Updates reactive state based on current route params
const initializeFromRoute = () => {
  const gradeId = gradeParam.value.replace('grade-', 'grade')
  selectedGradeId.value = gradeId
  currentGrade.value = getGradeById(gradeId)
  
  if (currentGrade.value) {
    // Find module matching URL param
    currentModule.value = currentGrade.value.modules.find(module => 
      module.subject.toLowerCase().replace(/\s+/g, '-') === moduleParam.value ||
      module.id.toLowerCase().replace(/\s+/g, '-') === moduleParam.value
    )
    
    if (currentModule.value) {
      // Expand module in sidebar
      expandedModules.value = [currentModule.value.id]
      
      // Find lesson matching URL param
      currentLesson.value = currentModule.value.lessons.find(lesson => 
        lesson.slug === lessonParam.value ||
        lesson.title.toLowerCase().replace(/\s+/g, '-') === lessonParam.value
      )
    }
  }
}

/* =========================
   METHODS / HELPERS
========================= */

// Check if a lesson is currently active
const isCurrentLesson = (lesson) => {
  return currentLesson.value && lesson.id === currentLesson.value.id
}

// Navigate to the first lesson of a newly selected grade
const onGradeChange = () => {
  const grade = getGradeById(selectedGradeId.value)
  if (grade && grade.modules.length > 0 && grade.modules[0].lessons.length > 0) {
    const firstModule = grade.modules[0]
    const firstLesson = firstModule.lessons[0]
    navigateToLesson(firstLesson, selectedGradeId.value, firstModule.id)
  }
}

/* =========================
   SIDEBAR STATE & METHODS
========================= */

const open = useMediaQuery('(min-width: 1025px)')           // Sidebar open/closed state


const expandedModules = ref([])    // Tracks expanded modules in sidebar

// Expand or collapse a module in the sidebar
const toggleModule = (moduleId) => {
  const index = expandedModules.value.indexOf(moduleId)
  if (index > -1) expandedModules.value.splice(index, 1) // collapse
  else expandedModules.value.push(moduleId)               // expand
}

/* =========================
   CONTENT SECTION STATE
========================= */

const activeTab = ref('summary')   // Active tab in lesson content
const lessonTabs = [               // Tabs configuration
  { id: 'summary', name: 'Summary' },
  { id: 'notes', name: 'Notes' },
  { id: 'practice', name: 'Practice' }
]

/* =========================
   LIFECYCLE HOOKS
========================= */

// Initialize state on page load
onMounted(() => {
  initializeFromRoute()
})

// Re-run initialization when route params change
watch(() => route.params, () => {
  initializeFromRoute()
}, { deep: true })

/* =========================
   SEO SETUP
========================= */
useHead({
  title: computed(() => 
    currentLesson.value 
      ? `${currentLesson.value.title} - ${currentGrade.value?.name} - iMath`
      : 'iMath'
  )
})

</script>

<style scoped>
/* Animate lesson content fade-in */
.lesson-content {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Rotate arrow */
.rotate-180 {
  transform: rotate(180deg);
}

/* Custom select styling */
select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 2.5rem;
  position: relative;
}
</style>
