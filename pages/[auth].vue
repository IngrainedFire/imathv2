<!-- /pages/[auth].vue -->
<script setup server lang="ts">
definePageMeta({
  layout: 'default'
})

import AuthSignInForm from '~/components/auth/SignInForm.vue'
import AuthSignUpForm from '~/components/auth/SignUpForm.vue'

const route = useRoute()
const authType = route.params.auth
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <!-- Conditionally render the correct auth component -->
    <AuthSignInForm v-if="authType === 'sign-in'" />
    <AuthSignUpForm v-else />
  </div>
</template>
