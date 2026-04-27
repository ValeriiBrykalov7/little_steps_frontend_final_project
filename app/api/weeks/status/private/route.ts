import { NextRequest, NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { api } from '../../../api';

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('accessToken')?.value;
    const sessionId = request.cookies.get('sessionId')?.value;
    console.log(request.headers.get('cookie'));

    console.log({
      accessToken,
      sessionId,
    });

    const cookieHeader = [
      accessToken && `accessToken=${accessToken}`,
      sessionId && `sessionId=${sessionId}`,
    ]
      .filter(Boolean)
      .join('; ');

    const res = await api.get('/weeks/status/private', {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        { status: error.response?.status ?? 500 },
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
