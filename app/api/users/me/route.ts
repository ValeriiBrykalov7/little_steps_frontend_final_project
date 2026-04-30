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

    const gender = incomingFormData.get('gender');
    const dueDate = incomingFormData.get('dueDate');
    const photo = incomingFormData.get('photo');

    if (gender) formData.append('gender', String(gender));
    if (dueDate) formData.append('dueDate', String(dueDate));
    if (photo instanceof File) {
      formData.append('photo', photo);
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
