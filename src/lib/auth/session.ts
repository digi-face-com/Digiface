import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import type { Role } from '@prisma/client'
import { SESSION_COOKIE, SESSION_MAX_AGE } from './constants'

function getSecret() {
  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) throw new Error('NEXTAUTH_SECRET is not set')
  return new TextEncoder().encode(secret)
}

export type SessionPayload = {
  userId: string
  role: Role
}

export type VerificationPayload = {
  phone: string
  purpose: 'register'
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecret())
}

export async function verifySessionToken(token: string): Promise<SessionPayload> {
  const { payload } = await jwtVerify(token, getSecret())
  if (!payload.userId || !payload.role) throw new Error('Invalid session')
  return { userId: String(payload.userId), role: payload.role as Role }
}

export async function createVerificationToken(phone: string): Promise<string> {
  return new SignJWT({ phone, purpose: 'register' satisfies VerificationPayload['purpose'] })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(getSecret())
}

export async function verifyVerificationToken(token: string): Promise<VerificationPayload> {
  const { payload } = await jwtVerify(token, getSecret())
  if (payload.purpose !== 'register' || !payload.phone) throw new Error('Invalid verification token')
  return { phone: String(payload.phone), purpose: 'register' }
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })
}

export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function getSessionFromCookies(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null
  try {
    return await verifySessionToken(token)
  } catch {
    return null
  }
}
