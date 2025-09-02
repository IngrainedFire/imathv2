// middleware/auth.global.ts
import { useUserState } from '@/composables/auth/useUserState'

export default defineNuxtRouteMiddleware((to) => {
  const { user, signUpEnabled } = useUserState()

  if (signUpEnabled) {
    // TODO: implement access control when sign-up is enabled
    return
  }

  // SIGN UP DISABLED — restrict access
  if (!user.value) {
    // if not signed in, allow only /sign-in, block everything else
    if (!to.path.includes('/sign-in')) {
      return navigateTo('/sign-in')
    }

  } else {
    // if signed in, redirect away from /sign-in or /sign-up to home
    if (to.path.includes('/sign-in') || to.path.includes('/sign-up')) {
      return navigateTo('/')
    }
    
  }
})
