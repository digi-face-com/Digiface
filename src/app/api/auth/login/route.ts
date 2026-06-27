import { jsonError, jsonOk } from '@/lib/auth/api'
import { verifyPassword } from '@/lib/auth/password'
import { createSessionToken, setSessionCookie } from '@/lib/auth/session'
import { normalizePhone, normalizeUsername } from '@/lib/auth/validation'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const identifier = String(body.identifier ?? body.username ?? '').trim()
    const password = String(body.password ?? '')

    if (!identifier || !password) {
      return jsonError('یوزرنیم/موبایل و رمز عبور را وارد کنید')
    }

    const phone = normalizePhone(identifier)
    const username = phone ? null : normalizeUsername(identifier)

    const user = phone
      ? await prisma.user.findUnique({ where: { phone } })
      : await prisma.user.findUnique({ where: { username: username! } })

    if (!user || !user.passwordHash) {
      return jsonError('یوزرنیم/موبایل یا رمز عبور اشتباه است', 401)
    }

    if (!user.isActive) {
      return jsonError('حساب کاربری غیرفعال است', 403)
    }

    const valid = await verifyPassword(password, user.passwordHash)
    if (!valid) {
      return jsonError('یوزرنیم/موبایل یا رمز عبور اشتباه است', 401)
    }

    const token = await createSessionToken({ userId: user.id, role: user.role })
    await setSessionCookie(token)

    return jsonOk({
      success: true,
      user: {
        id: user.id,
        phone: user.phone,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'خطای سرور'
    return jsonError(message, 500)
  }
}
