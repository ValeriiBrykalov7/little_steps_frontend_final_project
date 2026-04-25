import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { logErrorResponse } from '../../../_utils/utils';
import { api } from '../../../api';

type Props = {
  params: { entryId: string };
};

export async function DELETE(request: Request, { params }: Props) {
  const cookieStore = cookies();
  const { entryId } = params;

  try {
    await api.delete(`/diaries/deleteDiary/${entryId}`, {
      headers: { Cookie: cookieStore.toString() },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        { status: error.response?.status ?? 500 },
      );
    }

    logErrorResponse({ message: (error as Error).message });

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
