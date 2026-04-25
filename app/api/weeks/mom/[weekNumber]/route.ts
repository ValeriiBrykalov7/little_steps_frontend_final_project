import { NextRequest, NextResponse } from 'next/server';
import { api, ApiError } from '../../../api';
import { cookies } from 'next/headers';

type Props = { params: Promise<{ weekNumber: string }> };

export async function GET(request: NextRequest, { params }: Props) {
  const { weekNumber } = await params;

  try {
    const cookieStore = await cookies();
    const res = await api(`/weeks/mom/${weekNumber}`, {
      headers: { Cookie: cookieStore.toString() },
    });

    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data?.error ??
          (error as ApiError).message,
      },
      {
        status: (error as ApiError).status,
      },
    );
  }
}
