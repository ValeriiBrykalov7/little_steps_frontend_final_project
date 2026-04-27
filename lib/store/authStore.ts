import { create } from 'zustand';
import type { User } from '../../types/user';

interface AuthState {
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
  setAuthChecked: (isAuthChecked: boolean) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: false,
  isAuthChecked: false,
  user: null,

  setUser: (user: User) =>
    set((state) => {
      const updatedUser = state.user ? { ...state.user, ...user } : user;

      return {
        user: updatedUser,
        isAuthenticated: Boolean(updatedUser),
        isAuthChecked: true,
      };
    }),

  clearIsAuthenticated: () =>
    set({
      user: null,
      isAuthenticated: false,
      isAuthChecked: true,
    }),

  setAuthChecked: (isAuthChecked: boolean) => set({ isAuthChecked }),
}));
