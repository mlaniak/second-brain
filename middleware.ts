import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Skip login page and API routes
  if (request.nextUrl.pathname === '/login' || 
      request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Check for auth cookie
  const authCookie = request.cookies.get('brain-auth')
  
  if (authCookie?.value === 'authenticated') {
    return NextResponse.next()
  }

  // Redirect to login
  return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
