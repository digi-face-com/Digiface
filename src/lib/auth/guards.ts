import { jsonError } from '@/lib/auth/api'
import { getSessionFromCookies, type SessionPayload } from '@/lib/auth/session'
import { isAdminRole } from '@/lib/auth/roles'

export { ADMIN_ROLES, isAdminRole, canAccessAccountPanel } from '@/lib/auth/roles'

export async function requireAdminSession(): Promise<
  { ok: true; session: SessionPayload } | { ok: false; response: Response }
> {
  const session = await getSessionFromCookies()
  if (!session) {
    return { ok: false, response: jsonError('لطفاً وارد شوید', 401) }
  }

  if (!isAdminRole(session.role)) {
    return { ok: false, response: jsonError('دسترسی غیرمجاز', 403) }
  }

  return { ok: true, session }
}
