'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/auth-context'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { refreshUser } = useAuth()
  const nextPath = searchParams.get('next') || '/'

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ identifier, password }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'ورود ناموفق بود')
        return
      }

      await refreshUser()
      router.push(nextPath)
      router.refresh()
    } catch {
      setError('خطا در ارتباط با سرور')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5 bg-white/[0.04] border border-border rounded-xl px-4 py-3.5 focus-within:border-purple/50 transition-colors">
          <span className="text-muted text-[15px]">👤</span>
          <input
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="یوزرنیم یا شماره موبایل"
            className="bg-transparent border-none outline-none flex-1 text-sm text-text placeholder:text-muted2 text-right"
            disabled={loading}
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
            disabled={loading}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
        </div>

        {error && (
          <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
            {error}
          </p>
        )}

        <Button className="w-full mt-1" size="lg" onClick={handleLogin} loading={loading}>
          ورود
        </Button>

        <div className="text-center text-[11px] text-muted2 bg-white/[0.03] border border-border rounded-xl px-3 py-2.5">
          ورود با SMS در فاز بعد فعال می‌شود
        </div>
      </div>

      <div className="text-center text-xs text-muted2 mt-5">
        حساب کاربری ندارید؟{' '}
        <Link href="/auth/register" className="text-purple-light cursor-pointer">
          ثبت‌نام
        </Link>
      </div>
    </>
  )
}
