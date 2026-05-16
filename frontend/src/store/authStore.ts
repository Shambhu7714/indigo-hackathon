import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'
import { authApi } from '@/lib/api'

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  // Login with backend — returns error string or null on success
  signIn: (email: string, password: string) => Promise<string | null>
  // Register with backend — returns error string or null on success
  signUp: (email: string, fullName: string, password: string) => Promise<string | null>
  signOut: () => void
}

/** Map the snake_case API user → camelCase frontend User type */
function mapApiUser(apiUser: { id: string; email: string; full_name: string }): User {
  return {
    id: apiUser.id,
    name: apiUser.full_name,
    email: apiUser.email,
    role: 'Marketing',
    department: 'Digital',
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,

      signIn: async (email, password) => {
        set({ loading: true })
        const res = await authApi.login(email, password)
        set({ loading: false })
        if (!res.ok) return res.error
        set({ user: mapApiUser(res.data.user), token: res.data.access_token })
        return null
      },

      signUp: async (email, fullName, password) => {
        set({ loading: true })
        const res = await authApi.signup(email, fullName, password)
        set({ loading: false })
        if (!res.ok) return res.error
        set({ user: mapApiUser(res.data.user), token: res.data.access_token })
        return null
      },

      signOut: () => set({ user: null, token: null }),
    }),
    { name: '6e-creative-auth', partialize: (s) => ({ user: s.user, token: s.token }) },
  ),
)
