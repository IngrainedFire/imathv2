<script setup lang="ts">
import { logout, user } from '~/composables/useAuthState'
</script>

<template>
  <button
    v-if="user"
    @click="logout"
    class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
  >
    Logout
  </button>
</template>
