<template>
  <div class="max-w-6xl mx-auto p-6">
    <!-- Header -->
    <h1 class="text-4xl font-fredoko font-bold text-center mb-8 text-light-text">Our Grades</h1>
    
    <!-- Grade Tabs -->
    <div class="flex h-[50px] justify-center mb-8">
      <div class=" relative flex rounded-[10px] border-[3px] border-gray-300">
        <button
          v-for="grade in grades"
          :key="grade.id"
          @click="selectedGrade = grade.id"
          :class="[
            'w-[200px] py-2 text-sm font-medium z-10 -m-[3px] rounded-[10px] transition-all duration-200',
            selectedGrade === grade.id
              ? ' text-light-text bg-white  border-light-text border-[3px]'
              : 'text-gray-400 hover:text-light-text'
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
          <h2 class="text-sm font-fredoko font-medium text-gray-500 mb-2">{{ module.title }}</h2>
          <h3 class="text-2xl font-fredoko font-medium text-light-text">{{ module.subject }}</h3>
        </div>
        <!-- Lessons Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Lesson Card -->
          <div
            v-for="lesson in module.lessons"
            :key="lesson.id"
            @click="navigateToLesson(lesson)"
            class="lesson-card border-[3px] bg-white border-gray-200 hover:border-light-text rounded-lg p-6  duration-300 cursor-pointer group"
          >
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-fredoko font-medium text-light-text mb-2">{{ lesson.title }}</h4>
                <p class="font-fredoko text-sm text-gray-300">{{ lesson.duration }}</p>
              </div>
              <div class="text-gray-300 group-hover:text-light-text duration-300" >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>    
    </div>
  </div>
</template>
<script setup>
const { grades, selectedGrade, currentGrade } = useGrades()
const { navigateToLesson } = useLessons()
</script>