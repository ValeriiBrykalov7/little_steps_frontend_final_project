const API_URL = 'https://little-steps-final-project.onrender.com/api';

export const checkServerSession = async (cookieHeader: string) => {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      Cookie: cookieHeader,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Session refresh failed');
  }

  return res;
};
