'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  Wallet,
  MapPin,
  LogOut,
  ChevronLeft,
  type LucideIcon,
} from 'lucide-react'
import { useAuth } from '@/context/auth-context'

type NavItem = {
  href: string
  label: string
  icon: LucideIcon
  description: string
}

const navItems: NavItem[] = [
  { href: '/account', label: 'داشبورد', icon: LayoutDashboard, description: 'خلاصه حساب' },
  { href: '/account/orders', label: 'سفارشات', icon: Package, description: 'تاریخچه خرید' },
  { href: '/account/wallet', label: 'کیف پول', icon: Wallet, description: 'موجودی و تراکنش' },
  { href: '/account/addresses', label: 'آدرس‌ها', icon: MapPin, description: 'مدیریت آدرس' },
]

function isNavActive(pathname: string, href: string) {
  if (href === '/account') return pathname === '/account'
  return pathname === href || pathname.startsWith(`${href}/`)
}

function NavLink({ item, compact = false }: { item: NavItem; compact?: boolean }) {
  const pathname = usePathname()
  const active = isNavActive(pathname, item.href)
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-2.5 rounded-xl transition-all ${
        compact ? 'px-3 py-2 shrink-0' : 'px-3 py-2.5 mb-0.5'
      } ${
        active
          ? 'bg-purple/15 text-purple-light border border-purple/25'
          : 'text-muted hover:text-text hover:bg-purple/7 border border-transparent'
      }`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          active ? 'bg-purple/20 text-purple-light' : 'bg-white/[0.04] text-muted'
        }`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="flex flex-col min-w-0">
        <span className={`text-[13px] font-semibold ${compact ? 'whitespace-nowrap' : ''}`}>{item.label}</span>
        {!compact && <span className="text-[10px] text-muted2 truncate">{item.description}</span>}
      </span>
    </Link>
  )
}

function AccountSidebar() {
  const { user, logout } = useAuth()
  const displayName = user?.fullName || user?.username || 'کاربر'
  const avatarLetter = (user?.username?.[0] || user?.fullName?.[0] || user?.phone?.[0] || 'U').toUpperCase()

  return (
    <aside className="hidden md:flex w-[240px] bg-card border-l border-border flex-shrink-0 fixed top-[72px] right-0 bottom-0 z-40 flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple to-purple-2 text-sm font-bold text-white">
            {avatarLetter}
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-bold truncate">{displayName}</div>
            {user?.username && (
              <div className="text-[10px] text-muted truncate">@{user.username}</div>
            )}
          </div>
        </div>
      </div>

      <nav className="flex-1 p-2.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>

      <div className="p-2.5 border-t border-border space-y-1">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] text-muted hover:text-text hover:bg-purple/7 transition-all"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04]">
            <ChevronLeft className="h-4 w-4" />
          </span>
          بازگشت به سایت
        </Link>
        <button
          type="button"
          onClick={() => void logout()}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] text-red hover:bg-red/5 transition-all"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red/10">
            <LogOut className="h-4 w-4" />
          </span>
          خروج
        </button>
      </div>
    </aside>
  )
}

function AccountMobileNav() {
  return (
    <div className="md:hidden sticky top-[72px] z-30 -mx-6 px-6 py-3 bg-bg/90 backdrop-blur-xl border-b border-border">
      <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-none">
        {navItems.map((item) => (
          <NavLink key={item.href} item={item} compact />
        ))}
      </div>
    </div>
  )
}

export function AccountShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-24 min-h-screen">
      <AccountSidebar />
      <div className="md:mr-[240px]">
        <div className="px-6 md:px-10 max-w-[900px] mx-auto pb-20">
          <AccountMobileNav />
          <div className="pt-4 md:pt-0">{children}</div>
        </div>
      </div>
    </div>
  )
}
