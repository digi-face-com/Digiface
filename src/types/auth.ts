import type { Role, UserTier } from '@prisma/client'

export type AuthUser = {
  id: string
  phone: string
  username: string | null
  fullName: string | null
  role: Role
  score: number
  tier: UserTier
}
