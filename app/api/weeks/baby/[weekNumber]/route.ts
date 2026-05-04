import { NextRequest, NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { api } from '../../../api';
import { logErrorResponse } from '../../../_utils/utils';

type Props = { params: Promise<{ weekNumber: string }> };

export async function GET(request: NextRequest, { params }: Props) {
  const { weekNumber } = await params;

  try {
    const res = await api.get(`/weeks/baby/${weekNumber}`, {
      headers: { Cookie: request.headers.get('cookie') ?? '' },
    });

    return NextResponse.json(res.data, { status: res.status });
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
