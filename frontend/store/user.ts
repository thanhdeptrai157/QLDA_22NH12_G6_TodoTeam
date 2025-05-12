// store/auth-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    id: string;
    name: string;
    email: string;
    avatarPath?: string;
}

interface AuthState {
    user: User | null;
    setUser: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            logout: () => set({ user: null }),
        }),
        {
            name: "auth-store",
        }
    )
);
