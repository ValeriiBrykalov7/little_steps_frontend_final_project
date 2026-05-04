import { isAxiosError } from 'axios';
import { NextResponse } from 'next/server';
import { logErrorResponse } from '../../../_utils/utils';
import { api } from '../../../api';

type Props = {
  params: Promise<{ entryId: string }>;
};

export async function DELETE(request: Request, { params }: Props) {
  const { entryId } = await params;
  const cookieHeader = request.headers.get('cookie') ?? '';

  try {
    await api.delete(`/diaries/deleteDiary/${entryId}`, {
      headers: { Cookie: cookieHeader },
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
