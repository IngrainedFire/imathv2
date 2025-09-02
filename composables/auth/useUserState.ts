// composables/auth/useUserState.ts
import { createClient } from '@supabase/supabase-js'
import type { User } from '@supabase/supabase-js'

let supabase: ReturnType<typeof createClient> | null = null

export const useUserState = () => {
  const config = useRuntimeConfig()
  const signUpEnabled = config.public.signUpEnabled === 'true' // toggle for future logic

  // ------------ SIGN UP ENABLED (future logic) ------------
  if (signUpEnabled) {
    // TODO: implement login/signup flow when toggle is true
    // Comment: This is here for when we create our public instance; sign up disabled is for organizations.
    return {
      user: ref<User | null>(null),
      signUpEnabled,
      login: async () => { throw new Error('Not implemented yet') },
      logout: async () => {},
    }
  }

  // ------------ SIGN UP DISABLED (current flow) ------------
  if (!supabase) {
    supabase = createClient(
      config.public.supabaseUrl,
      config.public.supabaseAnonKey
    )
  }

  const user = useState<User | null>('auth_user', () => null)

  // populate user on client and listen for auth changes
  if (process.client) {
    supabase.auth.getSession().then(({ data }) => {
      user.value = data.session?.user ?? null
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user ?? null
    })
  }

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase!.auth.signInWithPassword({ email, password })
    if (error) throw error
    user.value = data.user
    return data.user
  }

  const logout = async () => {
    await supabase!.auth.signOut()
    user.value = null
  }

  return {
    user,
    signUpEnabled,
    login,
    logout,
  }
}
