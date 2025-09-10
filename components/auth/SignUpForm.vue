<script setup lang="ts">
const handleSignUp = (event: Event) => {
  event.preventDefault()
  // Add your sign-up logic here
  console.log('Sign-up submitted')
}
</script>

<template>
  <form @submit="handleSignUp" class="max-w-md mx-auto p-4  rounded">
    <div class="mb-4">
      <label for="email" class="block mb-1">Email</label>
      <input type="email" id="email" required class="w-full border px-2 py-1 rounded" />
    </div>

    <div class="mb-4">
      <label for="password" class="block mb-1">Password</label>
      <input type="password" id="password" required class="w-full border px-2 py-1 rounded" />
    </div>

    <div class="mb-4">
      <label for="confirmPassword" class="block mb-1">Confirm Password</label>
      <input type="password" id="confirmPassword" required class="w-full border px-2 py-1 rounded" />
    </div>

    <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">
      Sign Up
    </button>
  </form>
</template>
