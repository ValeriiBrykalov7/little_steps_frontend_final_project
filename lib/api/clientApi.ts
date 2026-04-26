import { User } from '@/types/user';
import { nextServer } from './api';


type CheckSessionRequest = {
  success: boolean;
};

export type loginRequest = {
  email: string;
  password: string;
};

export const checkSession = async () => {
  const res = await nextServer.post<CheckSessionRequest>('/auth/refresh');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/current');
  return data;
};

export const login = async (data: loginRequest) => {
  const res = await nextServer.post('/auth/login', data);
  return res.data;
};

export const getDashboardInfo = async (isAuthenticated:boolean)=>{
  const endpoint = isAuthenticated ? '/weeks/status/private' : '/weeks/status/public'
  const response = await nextServer.get(endpoint)
  return response.data;
}
