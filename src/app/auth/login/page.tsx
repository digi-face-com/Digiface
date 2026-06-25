'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui'

type LoginMode = 'password' | 'sms'

export default function LoginPage() {
  const [mode, setMode] = useState<LoginMode>('password')
  const [identifier, setIdentifier] = useState('') // یوزرنیم یا شماره
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])

  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return
    const next = [...otp]
    next[i] = val
    setOtp(next)
    if (val && i < 5) {
      const nextInput = document.getElementById(`otp-${i + 1}`)
      nextInput?.focus()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 relative">
      {/* glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse,rgba(124,58,237,0.15),transparent_65%)] pointer-events-none" />

      <div className="w-full max-w-[440px] relative z-10">
        <Link href="/" className="block text-center text-[13px] text-muted hover:text-text mb-4 transition-colors">
          ← بازگشت به صفحه اصلی
        </Link>

        <div className="bg-card border border-border rounded-3xl p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-[52px] h-[52px] bg-gradient-to-br from-purple to-purple-2 rounded-2xl flex items-center justify-center font-display text-lg font-bold text-white mx-auto mb-3 shadow-[0_8px_28px_rgba(124,58,237,0.4)]">
              DF
            </div>
            <h2 className="font-display text-2xl font-bold">DiGiFACE</h2>
            <p className="text-[13px] text-muted mt-1">چند کلیک تا زیبایی</p>
          </div>

          {/* Mode tabs */}
          <div className="flex bg-white/[0.04] rounded-xl p-1 mb-6">
            <button
              onClick={() => setMode('password')}
              className={`flex-1 text-center py-2.5 rounded-[9px] text-[13px] font-semibold transition-all ${
                mode === 'password' ? 'bg-purple text-white shadow-[0_4px_14px_rgba(124,58,237,0.4)]' : 'text-muted'
              }`}
            >
              🔑 یوزر / پسورد
            </button>
            <button
              onClick={() => setMode('sms')}
              className={`flex-1 text-center py-2.5 rounded-[9px] text-[13px] font-semibold transition-all ${
                mode === 'sms' ? 'bg-purple text-white shadow-[0_4px_14px_rgba(124,58,237,0.4)]' : 'text-muted'
              }`}
            >
              📱 ورود با SMS
            </button>
          </div>

          {/* PASSWORD MODE */}
          {mode === 'password' && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5 bg-white/[0.04] border border-border rounded-xl px-4 py-3.5 focus-within:border-purple/50 transition-colors">
                <span className="text-muted text-[15px]">👤</span>
                <input
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="یوزرنیم یا شماره موبایل"
                  className="bg-transparent border-none outline-none flex-1 text-sm text-text placeholder:text-muted2 text-right"
                />
              </div>
              <div className="flex items-center gap-2.5 bg-white/[0.04] border border-border rounded-xl px-4 py-3.5 focus-within:border-purple/50 transition-colors">
                <span className="text-muted text-[15px]">🔒</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="رمز عبور"
                  className="bg-transparent border-none outline-none flex-1 text-sm text-text placeholder:text-muted2 text-right"
                />
              </div>

              <Button className="w-full mt-1" size="lg">ورود</Button>

              <div className="text-center text-xs text-muted2 mt-1">
                رمز عبور را فراموش کرده‌اید؟{' '}
                <Link href="/auth/forgot-password" className="text-purple-light cursor-pointer">
                  بازیابی
                </Link>
              </div>
            </div>
          )}

          {/* SMS MODE */}
          {mode === 'sms' && (
            <div className="flex flex-col gap-3">
              {!otpSent ? (
                <>
                  <div className="flex items-center gap-2.5 bg-white/[0.04] border border-border rounded-xl px-4 py-3.5 focus-within:border-purple/50 transition-colors" dir="ltr">
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0912..."
                      inputMode="tel"
                      className="bg-transparent border-none outline-none flex-1 text-sm text-text placeholder:text-muted2 text-left"
                    />
                    <span className="text-muted text-[15px]">📱</span>
                  </div>
                  <p className="text-[10px] text-muted2 leading-relaxed">
                    💡 اگر قبلاً با این شماره ثبت‌نام کرده‌اید، مستقیم به پنل خود وارد می‌شوید. در غیر این صورت، فرم ثبت‌نام برایتان باز می‌شود.
                  </p>
                  <Button className="w-full" size="lg" onClick={() => setOtpSent(true)}>
                    ارسال کد تأیید
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-center text-[13px] text-muted mb-1">
                    کد ۶ رقمی به <span dir="ltr">{phone || '۰۹۱۲xxxxxxx'}</span> ارسال شد
                  </p>
                  <div className="flex gap-2.5 justify-center my-2" dir="ltr">
                    {otp.map((d, i) => (
                      <input
                        key={i}
                        id={`otp-${i}`}
                        value={d}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        maxLength={1}
                        className="w-[46px] h-[54px] bg-white/[0.04] border border-border rounded-xl text-center text-xl font-bold text-white outline-none focus:border-purple transition-colors"
                      />
                    ))}
                  </div>
                  <Button className="w-full" size="lg">تأیید و ورود</Button>
                  <div className="text-center text-xs text-muted2 mt-1 cursor-pointer">ارسال مجدد (۱:۳۰)</div>
                </>
              )}
            </div>
          )}

          <div className="text-center text-xs text-muted2 mt-5">
            حساب کاربری ندارید؟{' '}
            <Link href="/auth/register" className="text-purple-light cursor-pointer">
              ثبت‌نام
            </Link>
          </div>
        </div>

        {/* Quick links to other panels */}
        <div className="flex justify-center gap-4 mt-6 text-[11px] text-muted2 flex-wrap">
          <Link href="/auth/shop-register" className="hover:text-muted transition-colors">🏪 ثبت‌نام فروشگاه</Link>
          <Link href="/pick-app/auth" className="hover:text-muted transition-colors">🛵 ورود پیک</Link>
          <Link href="/admin/auth" className="hover:text-muted transition-colors">🔐 ورود کارشناس</Link>
        </div>
      </div>
    </div>
  )
}