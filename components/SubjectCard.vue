<template>
  <div class="border rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer">
    <h2 class="text-xl font-semibold mb-2">{{ subject.title }}</h2>
    <p class="text-gray-700">{{ subject.description }}</p>
  </div>
</template>

<script setup>
defineProps({
  subject: {
    type: Object,
    required: true
  }
})
</script>
