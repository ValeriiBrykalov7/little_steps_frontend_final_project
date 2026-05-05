import { api } from '../../api';
import { logErrorResponse } from '../../_utils/utils';
import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const body = await request.json();

    const res = await api.patch('/users/theme', body, {
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
