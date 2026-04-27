import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../api';
import { parse } from 'cookie';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

const authCookieNames = ['accessToken', 'refreshToken', 'sessionId'] as const;

export async function POST() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (accessToken) {
      return NextResponse.json({ success: true });
    }

    if (refreshToken) {
      const apiRes = await api.get('/auth/refresh', {
        headers: {
          Cookie: cookieStore.toString(),
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

          for (const name of authCookieNames) {
            if (parsed[name]) response.cookies.set(name, parsed[name], options);
          }
        }
        return response;
      }
    }
    return NextResponse.json({ success: false }, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json({ success: false }, { status: 200 });
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ success: false }, { status: 200 });
  }
}

