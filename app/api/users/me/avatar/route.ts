import { cookies } from 'next/headers';
import FormData from 'form-data';
import { NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { api } from '../../../api';
import { logErrorResponse } from '../../../_utils/utils';

export const runtime = 'nodejs';

export async function PUT(req: Request) {
  try {
    const cookieStore = await cookies();
    const formData = await req.formData();
    const file = formData.get('avatar');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file' }, { status: 400 });
    }

    const backendFormData = new FormData();
    backendFormData.append('avatar', Buffer.from(await file.arrayBuffer()), {
      filename: file.name,
      contentType: file.type,
    });

    const { data, status } = await api.put('/users/me/avatar', backendFormData, {
      headers: {
        ...backendFormData.getHeaders(),
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data, { status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
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
