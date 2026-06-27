import Link from 'next/link'
import { Suspense } from 'react'
import { LoginForm } from './LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse,rgba(124,58,237,0.15),transparent_65%)] pointer-events-none" />

      <div className="w-full max-w-[440px] relative z-10">
        <Link href="/" className="block text-center text-[13px] text-muted hover:text-text mb-4 transition-colors">
          ← بازگشت به صفحه اصلی
        </Link>

        <div className="bg-card border border-border rounded-3xl p-10">
          <div className="text-center mb-8">
            <div className="w-[52px] h-[52px] bg-gradient-to-br from-purple to-purple-2 rounded-2xl flex items-center justify-center font-display text-lg font-bold text-white mx-auto mb-3 shadow-[0_8px_28px_rgba(124,58,237,0.4)]">
              DF
            </div>
            <h2 className="font-display text-2xl font-bold">DiGiFACE</h2>
            <p className="text-[13px] text-muted mt-1">ورود با یوزرنیم یا موبایل</p>
          </div>

          <Suspense
            fallback={
              <div className="text-center text-sm text-muted py-8">در حال بارگذاری...</div>
            }
          >
            <LoginForm />
          </Suspense>
        </div>

        <div className="flex justify-center gap-4 mt-6 text-[11px] text-muted2 flex-wrap">
          <Link href="/auth/shop-register" className="hover:text-muted transition-colors">
            🏪 ثبت‌نام فروشگاه
          </Link>
          <Link href="/pick-app/auth" className="hover:text-muted transition-colors">
            🛵 ورود پیک
          </Link>
        </div>
      </div>
    </div>
  )
}
