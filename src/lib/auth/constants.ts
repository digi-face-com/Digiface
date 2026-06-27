export const SESSION_COOKIE = 'digiface_session'
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days
export const OTP_EXPIRY_MINUTES = 5
export const VERIFICATION_TOKEN_MAX_AGE = 60 * 15 // 15 minutes

/** کد OTP تست — فاز بعد SMS واقعی */
export const TEST_OTP_CODE = process.env.TEST_OTP_CODE ?? '123456'
