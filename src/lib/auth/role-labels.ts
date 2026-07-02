import type { Role } from '@prisma/client'

export const roleLabels: Record<Role, string> = {
  CUSTOMER: 'مشتری',
  SHOP: 'فروشگاه',
  PICK: 'پیک',
  ADMIN: 'ادمین',
  SUPER_ADMIN: 'مدیر اصلی',
  B2B: 'B2B',
  SUPPLIER: 'تأمین‌کننده',
}

export const rolePillColor: Record<Role, 'purple' | 'gold' | 'green' | 'red' | 'blue' | 'orange' | 'muted'> = {
  CUSTOMER: 'purple',
  SHOP: 'gold',
  PICK: 'green',
  ADMIN: 'red',
  SUPER_ADMIN: 'red',
  B2B: 'blue',
  SUPPLIER: 'orange',
}
