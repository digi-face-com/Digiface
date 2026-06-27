'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/pick-app', icon: '📦', label: 'سفارشات جاری' },
  { href: '/pick-app/my-orders', icon: '🛵', label: 'سفارشات من' },
  { href: '/pick-app/wallet', icon: '💰', label: 'کیف پول' },
  { href: '/pick-app/support', icon: '🎫', label: 'پشتیبانی' },
]

// اپ پیک — UI مینیمال و بزرگ، مناسب کاربران با سواد دیجیتالی کمتر
export default function PickAppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#060f0a] flex flex-col">
      {/* HEADER */}
      <header className="bg-green/6 border-b border-green/12 px-5 py-3.5 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-green rounded-xl flex items-center justify-center text-base">🛵</div>
          <div>
            <div className="text-[13px] font-bold text-white">DiGiFACE Pick</div>
            <div className="text-[10px] text-green flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green rounded-full animate-pulse" /> آنلاین
            </div>
          </div>
        </div>
        <Link href="/" className="text-[11px] text-red border border-red/25 bg-red/10 px-3 py-1.5 rounded-lg">
          خروج
        </Link>
      </header>

      {/* CONTENT */}
      <main className="flex-1 p-4 pb-24 max-w-xl mx-auto w-full">{children}</main>

      {/* BOTTOM NAV — large, simple icons */}
      <nav className="fixed bottom-0 inset-x-0 bg-[#060f0a] border-t border-green/12 flex justify-around py-2 z-50">
        {navItems.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                active ? 'text-green bg-green/10' : 'text-muted'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}