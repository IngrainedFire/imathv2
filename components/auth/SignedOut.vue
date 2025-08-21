<script setup lang="ts">
import { user } from '~/composables/useAuthState'
</script>

<template>
  <div v-if="!user">
    <slot />
  </div>
</template>
