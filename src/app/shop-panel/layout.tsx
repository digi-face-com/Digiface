'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BigDataIndicator } from '@/components/ui'

const navItems = [
  { href: '/shop-panel', icon: '📊', label: 'داشبورد' },
  { href: '/shop-panel/products', icon: '📦', label: 'محصولات' },
  { href: '/shop-panel/boxes', icon: '🎁', label: 'باکس‌ها' },
  { href: '/shop-panel/orders', icon: '🛒', label: 'سفارشات', badge: '3' },
  { href: '/shop-panel/notifications', icon: '🔔', label: 'اطلاعیه‌ها', badge: '1', badgeColor: 'gold' as const },
  { href: '/shop-panel/campaigns', icon: '🎪', label: 'کمپین‌ها' },
  { href: '/shop-panel/wallet', icon: '💰', label: 'کیف پول' },
  { href: '/shop-panel/reports', icon: '📈', label: 'گزارش فروش' },
  { href: '/shop-panel/support', icon: '🎫', label: 'پشتیبانی' },
  { href: '/shop-panel/settings', icon: '⚙️', label: 'تنظیمات' },
]

export default function ShopPanelLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex">
      <BigDataIndicator />

      {/* SIDEBAR */}
      <aside className="w-[230px] bg-card border-l border-border flex-shrink-0 fixed top-0 right-0 bottom-0 z-50 flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-purple to-purple-2 rounded-lg flex items-center justify-center text-base">
              🌹
            </div>
            <div>
              <div className="text-[12px] font-bold">آرایشگاه رز</div>
              <div className="text-[10px] text-green flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green rounded-full" /> آنلاین
              </div>
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
                  active ? 'bg-purple/15 text-purple-light' : 'text-muted hover:text-text hover:bg-purple/7'
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

      {/* MAIN */}
      <main className="flex-1 mr-[230px] p-6 md:p-8">{children}</main>
    </div>
  )
}