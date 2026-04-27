import { isAxiosError } from 'axios';
import { nextServer } from '@/lib/api/api';

type CheckSessionRequest = {
  success: boolean;
};

const refreshSession = async () => {
  const { data } = await nextServer.post<CheckSessionRequest>('/auth/refresh', {
    forceRefresh: true,
  });

  return data.success;
};

export const requestWithAuthRefresh = async <T>(request: () => Promise<T>) => {
  try {
    return await request();
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      const isSessionRefreshed = await refreshSession();

      if (isSessionRefreshed) {
        return request();
      }
    }

    throw error;
  }
};
