import { api } from '../../api';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const incomingFormData = await request.formData();
    const formData = new FormData();

    const username = incomingFormData.get('username');
    const email = incomingFormData.get('email');
    const gender = incomingFormData.get('gender');
    const dueDate = incomingFormData.get('dueDate');
    const avatar = incomingFormData.get('photo');

    if (username !== null) formData.append('username', String(username));
    if (email !== null) formData.append('email', String(email));
    if (gender !== null) formData.append('gender', String(gender));
    if (dueDate !== null) formData.append('dueDate', String(dueDate));
    if (avatar instanceof File) {
      formData.append('avatar', avatar);
    }
    const res = await api.patch('/users/me', formData, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 },
      );
    }

    logErrorResponse({ message: (error as Error).message });

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
