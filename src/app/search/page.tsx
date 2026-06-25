'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Navbar, Footer } from '@/components/layout/navbar-footer'
import { BigDataIndicator, Pill } from '@/components/ui'

function formatToman(n: number) {
  return n.toLocaleString('fa-IR')
}

// ── نمونه نتایج — بعداً از API با query واقعی ──
const tier1 = [
  // اولویت ۱: همین محصول، فروشگاه‌های همشهری
  { id: '1', name: 'کرم SPF50 کره‌ای', emoji: '☀️', shop: 'آرایشگاه رز', distance: '۱.۲km', price: 185000 },
  { id: '2', name: 'SPF50+ آنتی‌اژ', emoji: '☀️', shop: 'بیوتی استور', distance: '۳.۴km', price: 210000 },
  { id: '3', name: 'ضدآفتاب رنگی', emoji: '☀️', shop: 'مگنولیا', distance: '۵km', price: 160000 },
]

const tier2 = [
  // اولویت ۲: محصولات مشابه، همشهری
  { id: '4', name: 'لوسیون محافظ UV', emoji: '🧴', shop: 'گلدن بیوتی', price: 140000 },
  { id: '5', name: 'کرم روز SPF30', emoji: '🌿', shop: 'پرفکت لوک', price: 125000 },
]

const tier3 = [
  // اولویت ۳: همین محصول، شهرهای دیگر (پستی)
  { id: '6', name: 'کرم SPF50', emoji: '☀️', shop: 'اصفهان', eta: '۳-۵ روز', price: 175000 },
]

function SearchResults() {
  const params = useSearchParams()
  const q = params.get('q') || 'کرم ضدآفتاب'

  return (
    <>
      <Navbar />
      <BigDataIndicator />

      <div className="pt-24 px-6 md:px-10 max-w-[1200px] mx-auto pb-20">
        <div className="mb-6 flex items-center gap-3 flex-wrap">
          <div className="flex-1 flex items-center gap-2.5 bg-card border border-border rounded-xl px-4 py-3 max-w-md">
            <span className="text-muted">🔍</span>
            <input
              defaultValue={q}
              className="bg-transparent border-none outline-none flex-1 text-sm text-text text-right"
            />
          </div>
          <div className="text-[13px] text-muted flex items-center gap-1.5">📍 تهران</div>
        </div>

        {/* TIER 1 */}
        <section className="mb-10">
          <div className="flex items-center gap-2.5 mb-4">
            <Pill color="green">اولویت ۱</Pill>
            <h2 className="text-sm font-bold">همین محصول — فروشگاه‌های همشهری</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {tier1.map((p) => (
              <ResultCard key={p.id} {...p} />
            ))}
          </div>
        </section>

        {/* TIER 2 */}
        <section className="mb-10">
          <div className="flex items-center gap-2.5 mb-4">
            <Pill color="gold">اولویت ۲</Pill>
            <h2 className="text-sm font-bold">محصولات مشابه — همشهری</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 opacity-90">
            {tier2.map((p) => (
              <ResultCard key={p.id} {...p} />
            ))}
            <div className="bg-card2 border border-border rounded-xl flex items-center justify-center text-xs text-muted opacity-60 p-6">
              + ۸ محصول مشابه دیگر
            </div>
          </div>
        </section>

        {/* TIER 3 */}
        <section>
          <div className="flex items-center gap-2.5 mb-4">
            <Pill color="blue">اولویت ۳</Pill>
            <h2 className="text-sm font-bold">همین محصول — شهرهای دیگر (ارسال پستی)</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 opacity-70">
            {tier3.map((p) => (
              <ResultCard key={p.id} {...p} />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}

interface ResultCardProps {
  name: string
  emoji: string
  shop: string
  distance?: string
  eta?: string
  price: number
}

function ResultCard({ name, emoji, shop, distance, eta, price }: ResultCardProps) {
  return (
    <div className="bg-card2 border border-border rounded-xl p-3.5 flex gap-3 items-center hover:border-purple/30 transition-colors cursor-pointer">
      <div className="text-3xl">{emoji}</div>
      <div className="flex-1">
        <div className="text-[13px] font-bold">{name}</div>
        <div className="text-[11px] text-muted flex items-center gap-1">
          {shop} {distance && `• ${distance}`}
          {eta && <span className="text-blue">• {eta}</span>}
        </div>
        <div className="text-[13px] font-extrabold text-white mt-0.5">{formatToman(price)} ت</div>
      </div>
    </div>
  )
}

// Suspense wrapper required for useSearchParams in Next.js
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <SearchResults />
    </Suspense>
  )
}