import { NextRequest, NextResponse } from 'next/server';
import { splitCookiesString } from 'set-cookie-parser';
import { checkServerSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/diary', '/journey'];
const publicRoutes = ['/auth/login', '/auth/register'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const sessionId = request.cookies.get('sessionId')?.value;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!accessToken && refreshToken && sessionId) {
    try {
      const sessionResponse = await checkServerSession(
        request.headers.get('cookie') ?? '',
      );
      const setCookie = sessionResponse.headers.get('set-cookie');

      const response = isPublicRoute
        ? NextResponse.redirect(new URL('/', request.url))
        : NextResponse.next();

      if (setCookie) {
        for (const cookie of splitCookiesString(setCookie)) {
          response.headers.append('set-cookie', cookie);
        }
      }

      return response;
    } catch {
      if (isPrivateRoute) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }

      return NextResponse.next();
    }
  }

  if (!accessToken && isPrivateRoute) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (accessToken && isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/diary/:path*',
    '/journey/:path*',
    '/auth/login',
    '/auth/register',
  ],
};
