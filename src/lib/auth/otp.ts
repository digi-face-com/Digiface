import { prisma } from '@/lib/prisma'
import { OTP_EXPIRY_MINUTES, TEST_OTP_CODE } from './constants'
import { isValidPhone } from './validation'

export async function createOtpForPhone(phone: string) {
  if (!isValidPhone(phone)) {
    throw new Error('شماره موبایل نامعتبر است')
  }

  await prisma.otpCode.deleteMany({ where: { phone } })

  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000)

  await prisma.otpCode.create({
    data: {
      phone,
      code: TEST_OTP_CODE,
      expiresAt,
    },
  })

  if (process.env.NODE_ENV === 'development') {
    console.log(`[OTP TEST] phone=${phone} code=${TEST_OTP_CODE}`)
  }

  return { expiresAt, testCode: TEST_OTP_CODE }
}

export async function verifyOtp(phone: string, code: string) {
  const record = await prisma.otpCode.findFirst({
    where: {
      phone,
      code,
      used: false,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: 'desc' },
  })

  if (!record) {
    throw new Error('کد تأیید نامعتبر یا منقضی شده است')
  }

  await prisma.otpCode.update({
    where: { id: record.id },
    data: { used: true },
  })
}
