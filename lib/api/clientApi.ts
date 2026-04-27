import { User } from '@/types/user';
import { nextServer } from './api';

type CheckSessionRequest = {
  success: boolean;
};

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export const checkSession = async () => {
  const res = await nextServer.post<CheckSessionRequest>('/auth/refresh');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/current');
  return data;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post('/auth/login', data);
  return res.data;
};

export const register = async (body: RegisterRequest) => {
  const { data } = await nextServer.post<User>('/auth/register', body);
  return data;
};
