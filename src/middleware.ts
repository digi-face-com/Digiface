import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySessionTokenEdge } from '@/lib/auth/session-edge'
import { SESSION_COOKIE } from '@/lib/auth/constants'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value

  if (!token) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  try {
    await verifySessionTokenEdge(token)
    return NextResponse.next()
  } catch {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('next', request.nextUrl.pathname)
    const response = NextResponse.redirect(loginUrl)
    response.cookies.delete(SESSION_COOKIE)
    return response
  }
}

export const config = {
  matcher: ['/account/:path*'],
}
