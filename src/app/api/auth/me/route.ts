import { jsonError, jsonOk } from '@/lib/auth/api'
import { getSessionFromCookies } from '@/lib/auth/session'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getSessionFromCookies()
    if (!session) {
        return jsonOk({ user: null })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        phone: true,
        username: true,
        fullName: true,
        role: true,
        score: true,
        tier: true,
      },
    })

    if (!user) {
      return jsonError('کاربر یافت نشد', 404)
    }

    return jsonOk({ user })
  } catch {
    return jsonError('خطای سرور', 500)
  }
}
