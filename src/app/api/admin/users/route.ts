import type { Prisma, Role } from '@prisma/client'
import { jsonError, jsonOk } from '@/lib/auth/api'
import { requireAdminSession } from '@/lib/auth/guards'
import { prisma } from '@/lib/prisma'

const PAGE_SIZE = 20

export async function GET(request: Request) {
  try {
    const auth = await requireAdminSession()
    if (!auth.ok) return auth.response

    const { searchParams } = new URL(request.url)
    const page = Math.max(1, Number(searchParams.get('page') || '1'))
    const q = String(searchParams.get('q') || '').trim()
    const role = searchParams.get('role') as Role | null

    const where: Prisma.UserWhereInput = {}

    if (role) {
      where.role = role
    }

    if (q) {
      where.OR = [
        { phone: { contains: q } },
        { username: { contains: q, mode: 'insensitive' } },
        { fullName: { contains: q, mode: 'insensitive' } },
      ]
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        select: {
          id: true,
          phone: true,
          username: true,
          fullName: true,
          role: true,
          isActive: true,
          score: true,
          tier: true,
          createdAt: true,
        },
      }),
      prisma.user.count({ where }),
    ])

    return jsonOk({
      users,
      total,
      page,
      pageSize: PAGE_SIZE,
      totalPages: Math.ceil(total / PAGE_SIZE),
    })
  } catch {
    return jsonError('خطای سرور', 500)
  }
}
