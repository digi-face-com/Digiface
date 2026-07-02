import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySessionTokenEdge } from '@/lib/auth/session-edge'
import { SESSION_COOKIE } from '@/lib/auth/constants'
import { canAccessAccountPanel, isAdminRole } from '@/lib/auth/roles'

function loginRedirect(request: NextRequest, pathname: string) {
  const loginUrl = new URL('/auth/login', request.url)
  loginUrl.searchParams.set('next', pathname)
  return loginUrl
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/')
  const isAccountRoute = pathname === '/account' || pathname.startsWith('/account/')

  if (!isAdminRoute && !isAccountRoute) {
    return NextResponse.next()
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value

  if (!token) {
    return NextResponse.redirect(loginRedirect(request, pathname))
  }

  try {
    const session = await verifySessionTokenEdge(token)

    if (isAdminRoute) {
      if (!isAdminRole(session.role)) {
        const homeUrl = new URL('/', request.url)
        homeUrl.searchParams.set('error', 'admin_only')
        return NextResponse.redirect(homeUrl)
      }
      return NextResponse.next()
    }

    // پنل کاربری — هر کاربر لاگین‌شده به‌جز ادمین
    if (isAccountRoute && !canAccessAccountPanel(session.role)) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }

    return NextResponse.next()
  } catch {
    const response = NextResponse.redirect(loginRedirect(request, pathname))
    response.cookies.delete(SESSION_COOKIE)
    return response
  }
}

export const config = {
  matcher: ['/account', '/account/:path*', '/admin', '/admin/:path*'],
}
