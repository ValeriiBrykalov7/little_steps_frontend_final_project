'use client';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { applyTheme } from '@/lib/helper/theme';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  const setAuthChecked = useAuthStore((state) => state.setAuthChecked);
  const theme = useAuthStore((state) => state.user?.theme ?? 'null');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const isAuthenticated = await checkSession();

        if (isAuthenticated) {
          const user = await getMe();
          if (user) setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } catch {
        clearIsAuthenticated();
      } finally {
        setAuthChecked(true);
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated, setAuthChecked]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return children;
};

export default AuthProvider;
