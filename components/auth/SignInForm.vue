<script setup lang="ts">
import { ref } from 'vue'
import { useUserState } from '@/composables/auth/useUserState'

const email = ref('')
const password = ref('')
const { login } = useUserState()

const handleSignIn = async (event: Event) => {
  event.preventDefault()
  try {
    await login(email.value, password.value)
    console.log('User logged in!')
  } catch (err: any) {
    console.error('Login failed:', err.message)
  }
}
</script>

<template>
  <form @submit="handleSignIn" class="max-w-md mx-auto p-4 border-4 rounded">
    <div class="mb-4">
      <label for="email" class="block mb-1">Email</label>
      <input v-model="email" type="email" id="email" required class="w-full border px-2 py-1 rounded" />
    </div>

    <div class="mb-4">
      <label for="password" class="block mb-1">Password</label>
      <input v-model="password" type="password" id="password" required class="w-full border px-2 py-1 rounded" />
    </div>

    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded w-full">
      Sign In
    </button>
  </form>
</template>
