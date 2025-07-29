const config = {
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
        'primary': '#1D1A19',
        'light-text': '#192764'
      },
      fontFamily: {
        fredoko: ['Fredoka', 'sans-serif'],
      }
    },

  },
  plugins: [
  ],
}

export default config
