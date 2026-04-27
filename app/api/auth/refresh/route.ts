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

    console.log('=== COOKIE STORE ===');
    console.log(cookieStore.getAll());

    console.log('=== TOKENS ===');
    console.log({
      accessToken,
      refreshToken,
      sessionId,
    });

    if (accessToken) {
      console.log('Access token exists → success');

      return NextResponse.json({ success: true });
    }

    if (refreshToken && sessionId) {
      const cookieHeader = [
        `refreshToken=${refreshToken}`,
        `sessionId=${sessionId}`,
      ].join('; ');

      console.log('=== COOKIE HEADER SENT TO BACKEND ===');
      console.log(cookieHeader);

      const apiRes = await api.get('/auth/refresh', {
        headers: {
          Cookie: cookieHeader,
        },
      });

      console.log('=== BACKEND RESPONSE ===');
      console.log(apiRes.status);
      console.log(apiRes.data);

      console.log('=== BACKEND HEADERS ===');
      console.log(apiRes.headers);

      const setCookie = apiRes.headers['set-cookie'];

      console.log('=== SET COOKIE ===');
      console.log(setCookie);

      if (setCookie) {
        const response = NextResponse.json({ success: true }, { status: 200 });

        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        console.log('=== COOKIE ARRAY ===');
        console.log(cookieArray);

        for (const cookieStr of cookieArray) {
          console.log('=== RAW COOKIE STRING ===');
          console.log(cookieStr);

          const parsed = parse(cookieStr);

          console.log('=== PARSED COOKIE ===');
          console.log(parsed);

          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path || '/',
            maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
          };

          if (parsed.accessToken) {
            console.log('Setting accessToken cookie');

            response.cookies.set('accessToken', parsed.accessToken, options);
          }

          if (parsed.refreshToken) {
            console.log('Setting refreshToken cookie');

            response.cookies.set('refreshToken', parsed.refreshToken, options);
          }
        }

        console.log('Refresh success');

        return response;
      }

      console.log('No set-cookie received from backend');
    }

    console.log('Missing refreshToken or sessionId');

    return NextResponse.json({ success: false }, { status: 200 });
  } catch (error) {
    console.log('=== ERROR ===');

    if (isAxiosError(error)) {
      console.log('Axios error status:', error.response?.status);
      console.log('Axios error data:', error.response?.data);
      console.log('Axios error headers:', error.response?.headers);

      logErrorResponse(error.response?.data);
    } else {
      console.log('Unknown error:', error);

      logErrorResponse({ message: (error as Error).message });
    }

    return NextResponse.json({ success: false }, { status: 200 });
  }
}
