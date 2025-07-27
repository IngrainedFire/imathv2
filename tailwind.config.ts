import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1D1A19'
      },
      fontFamily: {
        fredoko: ['Fredoka', 'sans-serif'],
      }
    },

  },
  plugins: [],
}

export default config
