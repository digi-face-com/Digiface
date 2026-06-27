'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BigDataIndicator } from '@/components/ui'

const navItems = [
  { href: '/admin', icon: '📊', label: 'داشبورد' },
  { href: '/admin/cities', icon: '🏙️', label: 'شهرها' },
  { href: '/admin/carriers', icon: '🚚', label: 'سرویس‌های حمل' },
  { href: '/admin/shops', icon: '🏪', label: 'فروشگاه‌ها', badge: '2', badgeColor: 'gold' as const },
  { href: '/admin/picks', icon: '🛵', label: 'پیک‌ها', badge: '5' },
  { href: '/admin/intercity', icon: '📦', label: 'خارج‌شهر' },
  { href: '/admin/violations', icon: '⚠️', label: 'تخلفات', badge: '3' },
  { href: '/admin/unassigned', icon: '🔔', label: 'بی‌پیک' },
  { href: '/admin/campaigns', icon: '🎪', label: 'کمپین‌ها' },
  { href: '/admin/tickets', icon: '🎫', label: 'تیکت‌ها' },
  { href: '/admin/users', icon: '👥', label: 'کاربران' },
  { href: '/admin/bigdata', icon: '📊', label: 'Big Data' },
  { href: '/admin/access', icon: '🔐', label: 'دسترسی‌ها' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex">
      <BigDataIndicator />

      <aside className="w-[220px] bg-card border-l border-border flex-shrink-0 fixed top-0 right-0 bottom-0 z-50 flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-red to-[#b91c1c] rounded-lg flex items-center justify-center text-base">
              🔐
            </div>
            <div>
              <div className="text-[12px] font-bold">پنل کارشناس</div>
              <div className="text-[10px] text-muted">کارشناس #۰۴ — احمدی</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-2.5 overflow-y-auto">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] mb-0.5 transition-all ${
                  active ? 'bg-red/12 text-red' : 'text-muted hover:text-text hover:bg-red/5'
                }`}
              >
                <span className="text-base w-5 text-center">{item.icon}</span>
                {item.label}
                {item.badge && (
                  <span
                    className={`mr-auto text-[9px] px-1.5 py-0.5 rounded ${
                      item.badgeColor === 'gold' ? 'bg-gold text-black' : 'bg-red text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="p-2.5 border-t border-border">
          <Link href="/" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] text-red hover:bg-red/5 transition-colors">
            <span className="text-base w-5 text-center">🚪</span> خروج
          </Link>
        </div>
      </aside>

      <main className="flex-1 mr-[220px] p-6 md:p-8">{children}</main>
    </div>
  )
}