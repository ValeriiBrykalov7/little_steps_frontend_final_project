import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { parse } from 'cookie';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

const authCookieNames = ['accessToken', 'refreshToken', 'sessionId'] as const;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const apiRes = await api.post('/auth/register', body);

    const setCookie = apiRes.headers['set-cookie'];

    if (setCookie) {
      const response = NextResponse.json(apiRes.data, { status: apiRes.status });
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

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
