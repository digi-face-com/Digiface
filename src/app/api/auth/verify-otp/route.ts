import { jsonError, jsonOk } from '@/lib/auth/api'
import { verifyOtp } from '@/lib/auth/otp'
import { createVerificationToken } from '@/lib/auth/session'
import { normalizePhone } from '@/lib/auth/validation'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const phone = normalizePhone(String(body.phone ?? ''))
    const code = String(body.code ?? '').trim()

    if (!phone) {
      return jsonError('شماره موبایل نامعتبر است')
    }

    if (!/^\d{6}$/.test(code)) {
      return jsonError('کد تأیید باید ۶ رقم باشد')
    }

    await verifyOtp(phone, code)
    const verificationToken = await createVerificationToken(phone)

    return jsonOk({
      success: true,
      verificationToken,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'خطای سرور'
    return jsonError(message, 400)
  }
}
