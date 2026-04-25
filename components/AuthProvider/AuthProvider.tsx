'use client';

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

  // useEffect(() => {

  //   };
  //   fetchUser();
  // }, [setUser, clearIsAuthenticated]);

  return children;
};

export default AuthProvider;
