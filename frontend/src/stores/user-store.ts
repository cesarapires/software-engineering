import { Usuario } from '@/types/usuario'
import { create } from 'zustand'
import Api from '@/lib/api'

interface UserStore extends Usuario {
  fetchUser: () => Promise<boolean>
}

export const useUserStore = create<UserStore>()((set, get) => ({
  ...get(),
  fetchUser: async () => {
    try {
      const response = await Api.get<Usuario>('/v1/usuario/me')
      const auxUser: Usuario = response.data
      set(() => ({ ...auxUser }))
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  },
}))
