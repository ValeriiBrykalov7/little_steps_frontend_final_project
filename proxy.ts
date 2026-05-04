//  треба буде дописати, коли будемо мати готовий бек

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { checkServerSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/diary', '/journey'];
const publicRoutes = ['/auth/login', '/auth/register'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!accessToken && refreshToken) {
    try {
      const sessionResponse = await checkServerSession();
      const setCookie = sessionResponse.headers.get('set-cookie');

      const response = isPublicRoute
        ? NextResponse.redirect(new URL('/', request.url))
        : NextResponse.next();

      if (setCookie) {
        response.headers.set('set-cookie', setCookie);
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
