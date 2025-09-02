<!-- components/auth/LogoutButton.vue -->
<script setup lang="ts">
import { useUserState } from '@/composables/auth/useUserState'

const { logout, user } = useUserState()

const handleLogout = async () => {
  try {
    await logout()
    console.log('User logged out')
  } catch (err: any) {
    console.error('Logout failed:', err.message)
  }
}
</script>

<template>
  <!-- only show if user is signed in -->
  <button
    v-if="user"
    @click="handleLogout"
    class="bg-red-500 text-white px-4 py-2 rounded"
  >
    Logout
  </button>
</template>
