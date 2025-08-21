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
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    }
  },

  vite: {
    server: {
      allowedHosts: true
    }
  },

  debug: true

})
