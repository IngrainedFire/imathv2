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
  <div class=" flex flex-col h-screen max-h-[calc(100vh-30px)] overflow-y-scroll bg-white my-[15px]  mr-[15px] rounded-[10px] border-4 px-[15px] ml-[15px] duration-300" >
    <img src="/assets/logos/imath-logo-light.webp" class="mt-[50px] mb-[30px] self-center w-[110px]">
    <!-- Conditionally render the correct auth component -->
    <AuthSignInForm v-if="authType === 'sign-in'" />
    <AuthSignUpForm v-else />
    <p class="mt-2 mb-5 text-sm text-center text-gray-400">Copyright iEd | All rights Reserved 2025</p>
  </div>
</template>
