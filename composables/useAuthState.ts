import { ref } from 'vue'
import { useAuthConnect } from './useAuthConnect'

export const user = ref(null)
export const session = ref(null)

export const setAuth = (newUser: any, newSession: any) => {
  user.value = newUser
  session.value = newSession
}

export const clearAuth = () => {
  user.value = null
  session.value = null
}

// Logout function
export const logout = async () => {
  await useAuthConnect.auth.signOut()
  clearAuth()
}

// Recover session on page load
const recoverSession = async () => {
  const { data } = await useAuthConnect.auth.getSession()
  if (data.session) {
    setAuth(data.session.user, data.session)
  }
}

recoverSession()

// Listen for changes (login/logout) and update state
useAuthConnect.auth.onAuthStateChange((_event, newSession) => {
  if (newSession) setAuth(newSession.user, newSession)
  else clearAuth()
})
