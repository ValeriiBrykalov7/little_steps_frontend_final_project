import { User } from '@/types/user';
import { nextServer } from './api';
import { requestWithAuthRefresh } from '@/lib/helper/requestWithAuthRefresh';

type CheckSessionRequest = {
  success: boolean;
};

export type loginRequest = {
  email: string;
  password: string;
};

export const checkSession = async (forceRefresh = false) => {
  const res = await nextServer.post<CheckSessionRequest>('/auth/refresh', {
    forceRefresh,
  });
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/current');
  return data;
};

export const login = async (payload: loginRequest) => {
  const { data } = await nextServer.post<User>('/auth/login', payload);
  return data;
};

export const getDashboardInfo = async (isAuthenticated: boolean) => {
  const endpoint = isAuthenticated
    ? '/weeks/status/private'
    : '/weeks/status/public';

  if (!isAuthenticated) {
    const response = await nextServer.get(endpoint);
    return response.data;
  }

  return requestWithAuthRefresh(async () => {
    const response = await nextServer.get(endpoint);
    return response.data;
  });
};
