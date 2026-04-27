import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../api';
import { parse } from 'cookie';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

export async function POST() {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;
    const sessionId = cookieStore.get('sessionId')?.value;

    if (accessToken) {
      return NextResponse.json({ success: true });
    }

    if (refreshToken && sessionId) {
      const cookieHeader = [
        `refreshToken=${refreshToken}`,
        `sessionId=${sessionId}`,
      ].join('; ');

      const apiRes = await api.get('/auth/refresh', {
        headers: {
          Cookie: cookieHeader,
        },
      });

      const setCookie = apiRes.headers['set-cookie'];

      if (setCookie) {
        const response = NextResponse.json({ success: true }, { status: 200 });

        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);

          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path || '/',
            maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
          };

          if (parsed.accessToken) {
            response.cookies.set('accessToken', parsed.accessToken, options);
          }

          if (parsed.refreshToken) {
            response.cookies.set('refreshToken', parsed.refreshToken, options);
          }
        }

        return response;
      }
    }

    return NextResponse.json({ success: false }, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      console.log('AXIOS ERROR');
      console.log(error.response?.status);
      console.log(error.response?.data);
    } else {
      logErrorResponse({ message: (error as Error).message });
    }

    return NextResponse.json({ success: false }, { status: 200 });
  }
}
