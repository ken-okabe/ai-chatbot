import { NextResponse, type NextRequest } from 'next/server';
import { guestRegex, isDevelopmentEnvironment } from './lib/constants';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Playwright starts the dev server and requires a 200 status to begin the tests
  if (pathname.startsWith('/ping')) {
    return new Response('pong', { status: 200 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/chat/:id',
    '/api/:path*',
    '/login',
    '/register',
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
