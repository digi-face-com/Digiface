import { jwtVerify } from 'jose'

function getSecret() {
  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) throw new Error('NEXTAUTH_SECRET is not set')
  return new TextEncoder().encode(secret)
}

export async function verifySessionTokenEdge(token: string) {
  const { payload } = await jwtVerify(token, getSecret())
  if (!payload.userId || !payload.role) throw new Error('Invalid session')
  return { userId: String(payload.userId), role: String(payload.role) }
}
