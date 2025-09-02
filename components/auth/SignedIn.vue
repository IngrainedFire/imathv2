<!-- components/auth/SignedIn.vue -->
<script setup lang="ts">
import { useUserState } from '@/composables/auth/useUserState'

const { user } = useUserState()
</script>

<template>
  <slot v-if="user" />
</template>
