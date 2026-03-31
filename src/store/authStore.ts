import { create } from 'zustand'
import { Role } from '../constants/mockData'

type AuthUser = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: Role
  token?: string
}

type AuthState = {
  user: AuthUser | null
  accessToken: string | null
  setSession: (payload: { user: AuthUser; accessToken?: string | null }) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,

  setSession: ({ user, accessToken }) =>
      set({
        user,
        accessToken: accessToken ?? null,
      }),

  logout: () =>
      set({
        user: null,
        accessToken: null,
      }),
}))