import { NextRequest, NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { api } from '../../api';

interface BackendErrorResponse {
  message?: string;
}

export async function POST(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { message: 'Token is missing' },
        { status: 400 },
      );
    }
    const body = await req.json();
    const apiRes = await api.post(`/auth/reset-password?token=${token}`, body);

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    if (isAxiosError<BackendErrorResponse>(error)) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || 'Помилка при зміні пароля',
        },
        {
          status: error.response?.status || 500,
        },
      );
    }

    return NextResponse.json(
      { message: 'Внутрішня помилка сервера' },
      { status: 500 },
    );
  }
}
