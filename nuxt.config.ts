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

  plugins: ['~/plugins/viewport.client.js'],

  css: [
    '~/assets/css/globals.css',
  ],

  googleFonts: {
    families: {
      Fredoka: [300, 400, 500, 600, 700],
    },
    display: 'swap',
    download: true,
  },

  runtimeConfig: {
    signUpEnabled: process.env.NUXT_PRV_SIGN_UP_ENABLED === 'true',
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON
    },

  },

  vite: {
    server: {
      allowedHosts: true
    }
  },

  debug: true

})
