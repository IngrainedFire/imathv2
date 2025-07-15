<script setup>
definePageMeta({
  layout: 'public'
})

const { subjects } = useSubjects()
</script>

<template>
  <Hero />
  <div class="max-w-4xl mx-auto grid gap-6 mt-12 md:grid-cols-2 px-4">
    <SubjectCard v-for="subject in subjects" :key="subject.id" :subject="subject" />
  </div>
</template>
