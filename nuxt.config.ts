// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss',
    '@clerk/nuxt'
  ],
  googleFonts: {
    families: {
      Fredoka: [300, 400, 500, 600, 700],
    },
    display: 'swap',
    download: true,
  },
  runtimeConfig: {
    public: {
      supabaseUrl: 'https://ujzqpgtapofmluxnmkyy.supabase.co',       // Fill this in from Supabase dashboard
      supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqenFwZ3RhcG9mbWx1eG5ta3l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NTUwMDksImV4cCI6MjA2NjMzMTAwOX0.y8h-p-yV_yN8Nje-3O1k70yuoBP7lhDTM51SWtmVFio',   // Fill this in from Supabase dashboard
    },
    supabaseServiceKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqenFwZ3RhcG9mbWx1eG5ta3l5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDc1NTAwOSwiZXhwIjoyMDY2MzMxMDA5fQ.Bn_S414Re2CrJl7i_PPrtR4NEwmjXuM4B54lGjZHni8'    // Optional, for server-side access (not exposed to client)
  },
  debug: true
})
