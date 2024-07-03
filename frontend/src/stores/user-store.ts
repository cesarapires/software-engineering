import { Usuario } from '@/types/usuario'
import { create } from 'zustand'

interface UserStore extends Usuario {
  setUser: (user: Usuario | null) => void
}

export const useUserStore = create<UserStore>()((set, get) => ({
  ...get(),
  setUser: (user: Usuario | null) => {
    if (!user) {
      set({}, true)
      return
    }

    set(() => ({ ...user }))
  },
}))
