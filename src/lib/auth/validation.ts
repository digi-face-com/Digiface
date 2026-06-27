const IR_MOBILE = /^09\d{9}$/

export function normalizePhone(input: string): string | null {
  const digits = input.replace(/\D/g, '')

  if (digits.length === 11 && digits.startsWith('09')) return digits
  if (digits.length === 10 && digits.startsWith('9')) return `0${digits}`
  if (digits.length === 12 && digits.startsWith('989')) return `0${digits.slice(2)}`

  return null
}

export function isValidPhone(phone: string): boolean {
  return IR_MOBILE.test(phone)
}

export function normalizeUsername(input: string): string {
  return input.trim().replace(/^@/, '').toLowerCase()
}

export function isValidUsername(username: string): boolean {
  return /^[a-z0-9_]{3,30}$/.test(username)
}

export function isValidPassword(password: string): boolean {
  return password.length >= 6
}
