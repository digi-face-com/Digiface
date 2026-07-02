export const ADMIN_ROLES = ['ADMIN', 'SUPER_ADMIN'] as const

export type AdminRole = (typeof ADMIN_ROLES)[number]

export function isAdminRole(role: string): role is AdminRole {
  return (ADMIN_ROLES as readonly string[]).includes(role)
}

export function canAccessAccountPanel(role: string) {
  // پنل کاربری برای مشتری و سایر نقش‌های غیرادمین
  return !isAdminRole(role)
}
