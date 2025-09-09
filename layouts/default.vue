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
  <div class="h-vh flex flex-col font-mobo font-medium text-slate-950">
    <main class="flex-grow">
      <slot />
    </main>
  </div>
</template>
