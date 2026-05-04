import { cookies } from 'next/headers';

const API_URL = 'https://little-steps-final-project.onrender.com/api';

export const checkServerSession = async () => {
  const cookieStore = await cookies();

  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      Cookie: cookieStore.toString(),
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Session refresh failed');
  }

  return res;
};
