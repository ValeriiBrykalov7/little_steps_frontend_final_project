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
      if (user === null) {
        return { user: null, isAuthenticated: false };
      }

      const updatedUser = state.user
        ? { ...state.user, ...user }
        : (user as User);
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
