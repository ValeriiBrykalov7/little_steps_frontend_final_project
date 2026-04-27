import { create } from 'zustand';
import type { User } from '../../types/user';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: false,
  user: null,

  setUser: (user: User) =>
    set((state) => {
      const updatedUser = state.user ? { ...state.user, ...user } : user;

      return {
        user: updatedUser,
        isAuthenticated: Boolean(updatedUser?._id),
      };
    }),

  clearIsAuthenticated: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
