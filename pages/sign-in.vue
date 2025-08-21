<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthConnect } from '~/composables/useAuthConnect'
import { setAuth, user } from '~/composables/useAuthState'

const router = useRouter()

// Redirect logged-in users away from sign-in page
watchEffect(() => {
  if (user.value) {
    router.push('/') // or another page like /dashboard
  }
})

// Toggle sign-up availability
const SIGN_UP_ENABLED = true

const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const isSignUp = ref(false) // switch between sign-in / sign-up

const handleAuth = async () => {
  error.value = ''
  success.value = ''

  if (isSignUp.value) {
    if (!SIGN_UP_ENABLED) {
      error.value = 'Sign-up is disabled.'
      return
    }
    const { data, error: err } = await useAuthConnect.auth.signUp({
      email: email.value,
      password: password.value
    })
    if (err) {
      error.value = err.message
    } else {
      success.value = `Signed up as ${data.user?.email}`
      setAuth(data.user, data.session) // store auth state
      router.push('/') 
    }
  } else {
    const { data, error: err } = await useAuthConnect.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })
    if (err) {
      error.value = err.message
    } else {
      success.value = `Logged in as ${data.user?.email}`
      setAuth(data.user, data.session) // store auth state
      router.push('/') 
    }
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6 text-center">
        {{ isSignUp ? 'Sign Up' : 'Sign In' }}
      </h2>

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        @click="handleAuth"
        class="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition"
      >
        {{ isSignUp ? 'Sign Up' : 'Sign In' }}
      </button>

      <p v-if="error" class="mt-4 text-red-500 text-center">{{ error }}</p>
      <p v-if="success" class="mt-4 text-green-500 text-center">{{ success }}</p>

      <p class="mt-4 text-center text-sm">
        <button
          class="text-blue-500 hover:underline"
          @click="isSignUp = !isSignUp"
        >
          {{ isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }}
        </button>
      </p>
    </div>
  </div>
</template>
