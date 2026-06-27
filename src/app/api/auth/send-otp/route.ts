import { jsonError, jsonOk } from '@/lib/auth/api'
import { createOtpForPhone } from '@/lib/auth/otp'
import { normalizePhone } from '@/lib/auth/validation'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const phone = normalizePhone(String(body.phone ?? ''))

    if (!phone) {
      return jsonError('شماره موبایل نامعتبر است')
    }

    const existing = await prisma.user.findUnique({ where: { phone } })
    if (existing?.phoneVerified) {
      return jsonError('این شماره قبلاً ثبت‌نام شده است. وارد شوید.', 409)
    }

    const { testCode } = await createOtpForPhone(phone)

    return jsonOk({
      success: true,
      message: 'کد تأیید ارسال شد (حالت تست)',
      testCode,
      hint: `کد تست: ${testCode}`,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'خطای سرور'
    return jsonError(message, 500)
  }
}
