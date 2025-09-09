// plugins/viewport.client.js
export default defineNuxtPlugin(() => {
  const setVh = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`)
  }
  window.addEventListener('resize', setVh)
  setVh()
})
