'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui'
import { useAuth } from '@/context/auth-context'

type Step = 'phone' | 'otp' | 'profile'

export default function RegisterPage() {
  const router = useRouter()
  const { refreshUser } = useAuth()
  const [step, setStep] = useState<Step>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [verificationToken, setVerificationToken] = useState('')
  const [testCodeHint, setTestCodeHint] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return
    const next = [...otp]
    next[i] = val
    setOtp(next)
    if (val && i < 5) document.getElementById(`reg-otp-${i + 1}`)?.focus()
  }

  const getOtpCode = () => otp.join('')

  const handleSendOtp = async () => {
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      })

      const data = await res.json()
      if (!res.ok) {
        if (res.status === 409) {
          setError(data.error)
          return
        }
        setError(data.error || 'ارسال کد ناموفق بود')
        return
      }

      setTestCodeHint(data.hint || '')
      setStep('otp')
    } catch {
      setError('خطا در ارتباط با سرور')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code: getOtpCode() }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'کد تأیید نامعتبر است')
        return
      }

      setVerificationToken(data.verificationToken)
      setStep('profile')
    } catch {
      setError('خطا در ارتباط با سرور')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    if (!agreed) return
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verificationToken,
          fullName,
          username,
          password,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'ثبت‌نام ناموفق بود')
        return
      }

      await refreshUser()
      router.push('/')
      router.refresh()
    } catch {
      setError('خطا در ارتباط با سرور')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse,rgba(124,58,237,0.15),transparent_65%)] pointer-events-none" />

      <div className="w-full max-w-[440px] relative z-10">
        <Link href="/" className="block text-center text-[13px] text-muted hover:text-text mb-4 transition-colors">
          ← بازگشت به صفحه اصلی
        </Link>

        <div className="bg-card border border-border rounded-3xl p-10">
          <div className="text-center mb-7">
            <div className="w-[52px] h-[52px] bg-gradient-to-br from-purple to-purple-2 rounded-2xl flex items-center justify-center font-display text-lg font-bold text-white mx-auto mb-3 shadow-[0_8px_28px_rgba(124,58,237,0.4)]">
              DF
            </div>
            <h2 className="font-display text-2xl font-bold">ثبت‌نام در DiGiFACE</h2>
          </div>

          <div className="flex items-center gap-2 mb-7">
            {(['phone', 'otp', 'profile'] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    step === s
                      ? 'bg-purple text-white'
                      : ['phone', 'otp', 'profile'].indexOf(step) > i
                      ? 'bg-green text-bg'
                      : 'bg-card2 border border-border text-muted'
                  }`}
                >
                  {['phone', 'otp', 'profile'].indexOf(step) > i ? '✓' : i + 1}
                </div>
                {i < 2 && (
                  <div
                    className={`flex-1 h-px ${
                      ['phone', 'otp', 'profile'].indexOf(step) > i ? 'bg-green' : 'bg-border'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2 mb-4">
              {error}
              {error.includes('ثبت‌نام شده') && (
                <>
                  {' '}
                  <Link href="/auth/login" className="text-purple-light underline">
                    ورود
                  </Link>
                </>
              )}
            </p>
          )}

          {step === 'phone' && (
            <div className="flex flex-col gap-3">
              <div className="text-[12px] text-green font-bold mb-1">مرحله ۱ — تأیید شماره موبایل</div>
              <div
                className="flex items-center gap-2.5 bg-white/[0.04] border border-border rounded-xl px-4 py-3.5 focus-within:border-green/50 transition-colors"
                dir="ltr"
              >
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0912..."
                  inputMode="tel"
                  className="bg-transparent border-none outline-none flex-1 text-sm text-text placeholder:text-muted2 text-left"
                  disabled={loading}
                />
                <span className="text-muted text-[15px]">📱</span>
              </div>
              <p className="text-[10px] text-muted2 leading-relaxed">
                فعلاً SMS واقعی ارسال نمی‌شود. کد تست بعد از ارسال نمایش داده می‌شود.
              </p>
              <Button className="w-full" size="lg" onClick={handleSendOtp} disabled={loading || !phone.trim()}>
                {loading ? 'در حال ارسال...' : 'دریافت کد تأیید'}
              </Button>
            </div>
          )}

          {step === 'otp' && (
            <div className="flex flex-col gap-3">
              <div className="text-[12px] text-green font-bold mb-1">مرحله ۲ — کد تأیید</div>
              <p className="text-center text-[13px] text-muted mb-1">
                کد ۶ رقمی برای <span dir="ltr">{phone}</span>
              </p>
              {testCodeHint && (
                <p className="text-center text-[11px] text-gold-2 bg-gold/10 border border-gold/20 rounded-xl px-3 py-2">
                  {testCodeHint}
                </p>
              )}
              <div className="flex gap-2.5 justify-center my-2" dir="ltr">
                {otp.map((d, i) => (
                  <input
                    key={i}
                    id={`reg-otp-${i}`}
                    value={d}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    maxLength={1}
                    className="w-[46px] h-[54px] bg-white/[0.04] border border-border rounded-xl text-center text-xl font-bold text-white outline-none focus:border-purple transition-colors"
                    disabled={loading}
                  />
                ))}
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={handleVerifyOtp}
                disabled={loading || getOtpCode().length !== 6}
              >
                {loading ? 'در حال بررسی...' : 'تأیید کد'}
              </Button>
              <button
                type="button"
                className="text-center text-xs text-muted2 mt-1"
                onClick={() => {
                  setStep('phone')
                  setOtp(['', '', '', '', '', ''])
                  setError('')
                }}
              >
                تغییر شماره
              </button>
            </div>
          )}

          {step === 'profile' && (
            <div className="flex flex-col gap-3">
              <div className="text-[12px] text-gold-2 font-bold mb-1">مرحله ۳ — تکمیل پروفایل</div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-muted font-semibold">نام و نام خانوادگی</label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-white/[0.04] border border-border rounded-xl px-4 py-3 text-sm text-text outline-none focus:border-purple/50 transition-colors"
                  placeholder="مثلاً سارا احمدی"
                  disabled={loading}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-muted font-semibold">یوزرنیم</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-white/[0.04] border border-border rounded-xl px-4 py-3 text-sm text-text outline-none focus:border-purple/50 transition-colors"
                  placeholder="username"
                  dir="ltr"
                  disabled={loading}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-muted font-semibold">رمز عبور</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/[0.04] border border-border rounded-xl px-4 py-3 text-sm text-text outline-none focus:border-purple/50 transition-colors"
                  placeholder="حداقل ۶ کاراکتر"
                  dir="ltr"
                  disabled={loading}
                />
              </div>

              <label className="flex items-start gap-2 bg-purple/5 border border-purple/20 rounded-xl px-3 py-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="accent-purple mt-0.5"
                  disabled={loading}
                />
                <span className="text-[11px] text-purple-light">
                  <Link href="/legal" className="underline">
                    قوانین و مقررات DiGiFACE
                  </Link>{' '}
                  را می‌پذیرم
                </span>
              </label>

              <Button
                className="w-full mt-1"
                size="lg"
                disabled={!agreed || loading}
                onClick={handleRegister}
              >
                {loading ? 'در حال ثبت‌نام...' : 'تکمیل ثبت‌نام'}
              </Button>
            </div>
          )}

          <div className="text-center text-xs text-muted2 mt-5">
            حساب کاربری دارید؟{' '}
            <Link href="/auth/login" className="text-purple-light cursor-pointer">
              ورود
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
