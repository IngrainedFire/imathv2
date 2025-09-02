<script setup lang="ts">
import { watch } from 'vue'
import { useUserState } from '@/composables/auth/useUserState'
import { useRouter } from 'vue-router'

const { user } = useUserState()
const router = useRouter()

// watcher works client side so it won't not redirect if sign-up enabled becuase variable is not public.
watch(user, (newUser) => {
  if (!newUser && router.currentRoute.value.path !== '/sign-in') {
    router.push('/sign-in')
  } else if (newUser && router.currentRoute.value.path.includes('/sign-in')) {
    router.push('/')
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col font-mobo font-medium text-slate-950">
    <main class="flex-grow">
      <slot />
    </main>
    <footer class="p-4 text-center text-sm text-gray-500">
      © 2025 Public First
    </footer>
  </div>
</template>
