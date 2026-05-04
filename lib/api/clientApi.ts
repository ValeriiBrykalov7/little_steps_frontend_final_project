import { User } from '@/types/user';
import type { CreateTaskRequest, Task, UpdateTaskRequest } from '@/types/task';
import { nextServer } from './api';
import type {
  CreateDiaryRequest,
  DiaryEntry,
  GetAllDiariesResponse,
  UpdateDiaryRequest,
} from '@/types/diary';
import { requestWithAuthRefresh } from '@/lib/helper/requestWithAuthRefresh';
import type { Baby } from '@/types/baby';
import type { Mom } from '@/types/mom';

export { nextServer };

type CheckSessionRequest = {
  success: boolean;
};

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  photo: File | null;
  gender?: string;
  dueDate?: string | null;
}

//
// Auth
//
export const checkSession = async (forceRefresh = false) => {
  const res = await nextServer.post<CheckSessionRequest>('/auth/refresh', {
    forceRefresh,
  });
  return res.data.success;
};

export const getMe = async () => {
  return requestWithAuthRefresh(async () => {
    const { data } = await nextServer.get<User>('/users/current');
    return data;
  });
};

export const login = async (payload: LoginRequest) => {
  const { data } = await nextServer.post<User>('/auth/login', payload);
  return data;
};

export const register = async (body: RegisterRequest) => {
  const { data } = await nextServer.post<User>('/auth/register', body);
  return data;
};

export const logout = async () => {
  await nextServer.post('/auth/logout');
};

//
//Weeks
//

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

export const getBabyWeekInfo = async (weekNumber: number) => {
  return requestWithAuthRefresh(async () => {
    const { data } = await nextServer.get<Baby>(`/weeks/baby/${weekNumber}`);
    return data;
  });
};

export const getMomWeekInfo = async (weekNumber: number) => {
  return requestWithAuthRefresh(async () => {
    const { data } = await nextServer.get<Mom>(`/weeks/mom/${weekNumber}`);
    return data;
  });
};

//
// Tasks
//
export const getAllTasks = async () => {
  return requestWithAuthRefresh(async () => {
    const { data } = await nextServer.get<Task[]>('/tasks/allTasks');
    return data;
  });
};

export const createTask = async (payload: CreateTaskRequest) => {
  return requestWithAuthRefresh(async () => {
    const { data } = await nextServer.post<Task>('/tasks/createTask', payload);
    return data;
  });
};

export const updateTask = async (
  taskId: string,
  payload: UpdateTaskRequest,
) => {
  return requestWithAuthRefresh(async () => {
    const { data } = await nextServer.patch<Task>(
      `/tasks/update/${taskId}`,
      payload,
    );
    return data;
  });
};

//
//Diaries
//

export const getAllDiaries = async (): Promise<GetAllDiariesResponse> => {
  return requestWithAuthRefresh(async () => {
    const { data } =
      await nextServer.get<GetAllDiariesResponse>('/diaries/allDiary');
    return data;
  });
};

export const deleteDiary = async (entryId: string) => {
  return requestWithAuthRefresh(async () => {
    await nextServer.delete(`/diaries/deleteDairy/${entryId}`);
  });
};

export const createDiary = async (payload: CreateDiaryRequest) => {
  return requestWithAuthRefresh(async () => {
    const { data } = await nextServer.post<DiaryEntry>(
      '/diaries/createDiary',
      payload,
    );

    return data;
  });
};

export const updateDiary = async (
  entryId: string,
  payload: UpdateDiaryRequest,
) => {
  return requestWithAuthRefresh(async () => {
    const { data } = await nextServer.patch<DiaryEntry>(
      `/diaries/updateDiary/${entryId}`,
      payload,
    );

    return data;
  });
};

//
//User
//

export const updateAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append('avatar', file);

  return requestWithAuthRefresh(async () => {
    const { data } = await nextServer.put<{
      url: string | null;
    }>('/users/me/avatar', formData);

    const avatar = data.url;

    if (!avatar) {
      throw new Error('Не вдалося оновити аватар');
    }

    return avatar;
  });
};

export const updateUser = async (data: Partial<User> | FormData) => {
  return requestWithAuthRefresh(async () => {
    const { data: responseData } = await nextServer.patch('users/me', data);
    return responseData;
  });
};
