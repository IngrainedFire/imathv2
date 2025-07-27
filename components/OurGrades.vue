<template>
  <div class="max-w-6xl mx-auto p-6">
    <!-- Header -->
    <h1 class="text-4xl font-fredoko font-bold text-center mb-8 text-[#192764]">Our Grades</h1>
    
    <!-- Grade Tabs -->
    <div class="flex justify-center mb-8">
      <div class="bg-gray-100 p-1 rounded-lg flex">
        <button
          v-for="grade in grades"
          :key="grade.id"
          @click="selectedGrade = grade.id"
          :class="[
            'px-6 py-3 rounded-md font-medium transition-all duration-200',
            selectedGrade === grade.id
              ? 'bg-white text-blue-600 shadow-sm border border-blue-200'
              : 'text-gray-600 hover:text-gray-900'
          ]"
        >
          {{ grade.name }}
        </button>
      </div>
    </div>

    <!-- Course Content -->
    <div v-if="currentGrade" class="space-y-8">
      <div
        v-for="module in currentGrade.modules"
        :key="module.id"
        class="module-section"
      >
        <!-- Module Header -->
        <div class="mb-6">
          <h2 class="text-sm font-medium text-gray-500 mb-2">{{ module.title }}</h2>
          <h3 class="text-2xl font-bold text-gray-900">{{ module.subject }}</h3>
        </div>

        <!-- Lessons Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="lesson in module.lessons"
            :key="lesson.id"
            @click="navigateToLesson(lesson)"
            class="lesson-card bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer group"
          >
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-semibold text-gray-900 mb-2">{{ lesson.title }}</h4>
                <p class="text-sm text-gray-500">{{ lesson.duration }}</p>
              </div>
              <div class="text-blue-600 group-hover:translate-x-1 transition-transform duration-200">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { grades, selectedGrade, currentGrade } = useGrades()
const { navigateToLesson } = useLessons()
</script>

<style scoped>
.lesson-card:hover {
  transform: translateY(-2px);
}
</style>