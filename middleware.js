import { NextResponse } from 'next/server'

export function middleware(request) {
  // Only protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check for auth cookie
    const authCookie = request.cookies.get('admin_authenticated')

    // If not authenticated and not on login page, show login form
    if (!authCookie || authCookie.value !== 'true') {
      // Allow the page to load so the login form can be shown
      // The page component itself will handle showing login vs dashboard
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
