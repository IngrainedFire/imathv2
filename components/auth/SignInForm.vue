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
  
  <form @submit="handleSignIn" class=" flex flex-col flex-1 w-full max-w-[500px] p-4 mb-10 mx-auto">
    <h1 class="text-center text-[24px] mb-4">Sign In</h1>
    <div class="mb-4">
      <label for="email" class="block mb-1">Email</label>
      <input v-model="email" type="email" id="email" required class="w-full border-2 px-2 py-1 rounded-[10px]" />
    </div>

    <div class="mb-4">
      <label for="password" class="block mb-1">Password</label>
      <input v-model="password" type="password" id="password" required class="w-full border-2 px-2 py-1 rounded-[10px]" />
    </div>

    <button type="submit" class="bg-[#FF5787] text-white px-4 py-2 rounded-[10px] w-full mt-auto">
      Sign In
    </button>
  </form>
</template>
