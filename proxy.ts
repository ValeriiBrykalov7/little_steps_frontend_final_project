// Почав писати, треба буде дописати, коли будемо мати готовий бек

import { NextRequest } from 'next/server';

const privateRoutes = ['/profile', '/diary', '/journey'];
const publicRoutes = ['/auth'];

export async function proxy(request: NextRequest) {}

export const config = {
  matcher: [
    '/profile/:path*',
    '/diary/:path*',
    '/journey/:path*',
    '/auth/:path*',
  ],
};
