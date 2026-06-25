'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui'

// ════════════════════════════════════════
// Navbar
// ════════════════════════════════════════
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [city, setCity] = useState('انتخاب شهر')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-[100] flex items-center justify-between px-6 md:px-10 transition-all duration-400 ${
        scrolled ? 'bg-bg/85 backdrop-blur-2xl border-b border-border py-3' : 'py-4'
      }`}
    >
      <Link href="/" className="flex items-center gap-2.5">
        <div className="w-9 h-9 bg-gradient-to-br from-purple to-purple-2 rounded-[10px] flex items-center justify-center font-display text-sm font-bold text-white shadow-[0_4px_20px_rgba(124,58,237,0.4)]">
          DF
        </div>
        <div className="font-display text-xl font-bold tracking-wide">
          <span>DiGi</span>
          <span className="text-gold-gradient">FACE</span>
        </div>
      </Link>

      <div className="hidden md:flex items-center gap-1">
        <Link href="/" className="px-4 py-2 rounded-lg text-[13px] text-muted hover:text-text hover:bg-purple/10 transition-all">
          خانه
        </Link>
        <Link href="/shops" className="px-4 py-2 rounded-lg text-[13px] text-muted hover:text-text hover:bg-purple/10 transition-all">
          فروشگاه‌ها
        </Link>
        <Link href="/boxes" className="px-4 py-2 rounded-lg text-[13px] text-muted hover:text-text hover:bg-purple/10 transition-all">
          باکس‌ها
        </Link>
        <button
          onClick={() => setCity(city === 'انتخاب شهر' ? 'تهران' : 'انتخاب شهر')}
          className="px-4 py-2 rounded-lg text-[13px] text-gold-2 bg-gold/10 border border-gold/30 hover:bg-gold/15 transition-all flex items-center gap-1.5"
        >
          📍 {city} ▾
        </button>
      </div>

      <div className="flex items-center gap-2">
        <Link href="/auth/login" className="hidden sm:block px-4 py-2 rounded-lg text-[13px] text-muted hover:text-text transition-all">
          ورود
        </Link>
        <Link href="/auth/shop-register">
          <Button size="sm">ثبت فروشگاه رایگان</Button>
        </Link>
      </div>
    </nav>
  )
}

// ════════════════════════════════════════
// Footer with shortcuts to all panels
// ════════════════════════════════════════
const shortcuts = [
  { href: '/auth/login', icon: '👤', title: 'ورود مشتری', sub: 'خرید و سفارشات' },
  { href: '/shop-panel', icon: '🏪', title: 'پنل فروشگاه', sub: 'مدیریت و فروش' },
  { href: '/pick-app', icon: '🛵', title: 'اپ پیک', sub: 'پنل پیک‌ها' },
  { href: '/b2b', icon: '🏭', title: 'کارخانه / پخش؟', sub: 'همکاری B2B', highlight: true },
]

export function Footer() {
  return (
    <footer className="border-t border-border px-6 md:px-10 py-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-3">
          <div className="font-display text-2xl font-bold">
            DiGi<span className="text-gold-gradient">FACE</span>
          </div>
          <div className="text-xs text-muted">چند کلیک تا زیبایی</div>
        </div>

        {/* Shortcut grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {shortcuts.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`bg-card border rounded-xl p-4 text-center transition-all hover:-translate-y-0.5 ${
                s.highlight ? 'border-gold/25 hover:border-gold/50' : 'border-border hover:border-border2'
              }`}
            >
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className={`text-[13px] font-bold ${s.highlight ? 'text-gold-2' : ''}`}>{s.title}</div>
              <div className="text-[11px] text-muted mt-0.5">{s.sub}</div>
            </Link>
          ))}
        </div>

        <div className="border-t border-border pt-6 flex justify-between items-center text-[12px] text-muted2 flex-wrap gap-3">
          <span>© ۱۴۰۵ دیجی‌فیس — digi-face.ir</span>
          <div className="flex gap-5">
            <Link href="/legal" className="hover:text-muted transition-colors">قوانین</Link>
            <Link href="/privacy" className="hover:text-muted transition-colors">حریم خصوصی</Link>
            <Link href="/contact" className="hover:text-muted transition-colors">تماس</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}