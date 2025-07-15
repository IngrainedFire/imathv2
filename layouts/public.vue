<template>
  <div class="min-h-screen flex flex-col">
    
    <!-- Site Header -->
    <header class="p-6 shadow text-2xl font-bold">
      Public First
    </header>

    <!-- Page Content (dynamic) -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Site Footer -->
    <footer class="p-4 text-center text-sm text-gray-500">
      © 2025 Public First
    </footer>

  </div>
</template>
