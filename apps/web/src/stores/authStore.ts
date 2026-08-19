
import type { Role, User } from "@/types/auth";
import { create } from "zustand";



interface AuthState {
    token: string | null
    user: User | null
    setAuth: (token: string, user: User) => void;
    logout: () => void
    hydrate: () => void
}

const TOKEN_KEY = "zarp-token";
const USER_KEY = "zarp-user";


export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    user: null,


    setAuth: (token, user) => {
        localStorage.setItem(TOKEN_KEY, token)
        localStorage.setItem(USER_KEY, JSON.stringify(user))
        set({ token, user})
    },

    logout: () => {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
        set({ token: null, user: null})
    },

    hydrate: () => {
        const token = localStorage.getItem(TOKEN_KEY)
        const rawUser = localStorage.getItem(USER_KEY )

        if(token && rawUser) {
            set({ token, user: JSON.parse(rawUser)})
        }
    }

}))
