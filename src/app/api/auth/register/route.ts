import { jsonError, jsonOk } from '@/lib/auth/api'
import { hashPassword } from '@/lib/auth/password'
import {
  createSessionToken,
  setSessionCookie,
  verifyVerificationToken,
} from '@/lib/auth/session'
import {
  isValidPassword,
  isValidUsername,
  normalizeUsername,
} from '@/lib/auth/validation'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const verificationToken = String(body.verificationToken ?? '')
    const fullName = String(body.fullName ?? '').trim()
    const username = normalizeUsername(String(body.username ?? ''))
    const password = String(body.password ?? '')

    if (!verificationToken) {
      return jsonError('توکن تأیید موبایل یافت نشد. دوباره کد را وارد کنید.')
    }

    if (!fullName || fullName.length < 2) {
      return jsonError('نام و نام خانوادگی را وارد کنید')
    }

    if (!isValidUsername(username)) {
      return jsonError('یوزرنیم باید ۳ تا ۳۰ کاراکتر و فقط حروف انگلیسی، عدد و _ باشد')
    }

    if (!isValidPassword(password)) {
      return jsonError('رمز عبور باید حداقل ۶ کاراکتر باشد')
    }

    const { phone } = await verifyVerificationToken(verificationToken)

    const usernameTaken = await prisma.user.findUnique({ where: { username } })
    if (usernameTaken) {
      return jsonError('این یوزرنیم قبلاً استفاده شده است')
    }

    const passwordHash = await hashPassword(password)

    const user = await prisma.user.upsert({
      where: { phone },
      update: {
        fullName,
        username,
        passwordHash,
        phoneVerified: true,
        isActive: true,
      },
      create: {
        phone,
        fullName,
        username,
        passwordHash,
        phoneVerified: true,
      },
    })

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
    return jsonError(message, 400)
  }
}
