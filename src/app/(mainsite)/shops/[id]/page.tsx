'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar, Footer } from '@/components/layout/navbar-footer'
import { BigDataIndicator, Button, Pill } from '@/components/ui'

// نمونه داده — بعداً از دیتابیس با params.id
const shop = {
  name: 'آرایشگاه رز',
  emoji: '🌹',
  city: 'تهران',
  hours: '۹ تا ۲۱',
  badge: 'برتر',
  rating: 4.9,
  reviews: 234,
  products: 128,
  buyers: 234,
  satisfaction: 98,
}

const products = [
  { id: '1', name: 'کرم ضدآفتاب SPF50', emoji: '☀️', category: 'مراقبت پوست', rating: 4.8, price: 185000, inStock: true },
  { id: '2', name: 'سرم ویتامین C', emoji: '✨', category: 'مراقبت پوست', rating: 4.9, price: 240000, inStock: true },
  { id: '3', name: 'ماسک صورت شبانه', emoji: '🌙', category: 'مراقبت پوست', rating: 4.7, price: 120000, inStock: true },
  { id: '4', name: 'کرم دور چشم', emoji: '👁️', category: 'مراقبت پوست', rating: 4.6, price: 195000, inStock: false },
  { id: '5', name: 'لایه‌بردار ملایم', emoji: '🌿', category: 'مراقبت پوست', rating: 4.8, price: 98000, inStock: true },
  { id: '6', name: 'تونر آبرسان', emoji: '💧', category: 'مراقبت پوست', rating: 4.7, price: 145000, inStock: true },
]

const boxes = [
  { id: '1', name: 'باکس مراقبت کامل', emoji: '🎁', items: 4, price: 650000, oldPrice: 810000, discount: 20 },
  { id: '2', name: 'باکس پوست درخشان', emoji: '💝', items: 3, price: 480000, oldPrice: 565000, discount: 15 },
]

function formatToman(n: number) {
  return n.toLocaleString('fa-IR')
}

export default function ShopDetailPage() {
  const [tab, setTab] = useState<'products' | 'boxes'>('products')
  const [cart, setCart] = useState<Record<string, boolean>>({})

  const addToCart = (id: string) => setCart((c) => ({ ...c, [id]: true }))

  return (
    <>
      <Navbar />
      <BigDataIndicator />

      {/* Cover */}
      <div className="h-[260px] bg-gradient-to-br from-[#1e0d38] via-[#2d1060] to-[#1e0a28] relative overflow-hidden mt-[72px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_30%_50%,rgba(201,151,58,0.15),transparent_55%),radial-gradient(ellipse_60%_80%_at_70%_50%,rgba(124,58,237,0.2),transparent_55%)]" />
        <div className="absolute inset-0 flex items-center justify-center text-[120px] opacity-10">{shop.emoji}</div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 md:px-10 pb-20">
        <Link href="/shops" className="block text-[13px] text-muted hover:text-text mb-4 pt-3 transition-colors">
          ← بازگشت به فروشگاه‌ها
        </Link>

        {/* Profile card */}
        <div className="bg-card border border-border rounded-3xl p-7 md:p-9 -mt-[60px] relative z-10">
          <div className="flex items-start gap-6 flex-wrap">
            <div className="w-[88px] h-[88px] bg-gradient-to-br from-[#3b1f6e] to-[#1e0a3c] rounded-[22px] flex items-center justify-center text-4xl flex-shrink-0 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border-4 border-bg">
              {shop.emoji}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                <h2 className="font-display text-3xl font-bold">{shop.name}</h2>
                {shop.badge && <Pill color="gold">{shop.badge}</Pill>}
              </div>
              <div className="flex gap-5 flex-wrap text-[13px] text-muted">
                <span className="flex items-center gap-1.5">📍 {shop.city}</span>
                <span className="flex items-center gap-1.5">🕘 {shop.hours}</span>
                <span className="flex items-center gap-1.5">📦 {shop.products} محصول</span>
              </div>
            </div>

            <div className="bg-card2 border border-border rounded-2xl px-6 py-4 text-center">
              <div className="font-display text-4xl font-bold text-white leading-none">{shop.rating}</div>
              <div className="text-gold-2 text-xs my-1">⭐⭐⭐⭐⭐</div>
              <div className="text-[11px] text-muted">{shop.reviews} نظر</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-purple/10">
            <Stat num={shop.products} label="محصول" />
            <Stat num={shop.buyers} label="خریدار" />
            <Stat num={`${shop.satisfaction}٪`} label="رضایت" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 my-7">
          <button
            onClick={() => setTab('products')}
            className={`px-6 py-2.5 rounded-xl text-[13px] font-semibold border transition-all ${
              tab === 'products'
                ? 'bg-purple text-white border-purple shadow-[0_4px_16px_rgba(124,58,237,0.3)]'
                : 'border-border text-muted hover:text-text'
            }`}
          >
            محصولات
          </button>
          <button
            onClick={() => setTab('boxes')}
            className={`px-6 py-2.5 rounded-xl text-[13px] font-semibold border transition-all ${
              tab === 'boxes'
                ? 'bg-purple text-white border-purple shadow-[0_4px_16px_rgba(124,58,237,0.3)]'
                : 'border-border text-muted hover:text-text'
            }`}
          >
            باکس‌های ویژه
          </button>
        </div>

        {/* PRODUCTS TAB */}
        {tab === 'products' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {products.map((p) => (
              <div
                key={p.id}
                className={`bg-card2 border border-border rounded-2xl overflow-hidden transition-all hover:border-purple/40 hover:-translate-y-0.5 ${
                  !p.inStock ? 'opacity-60' : ''
                }`}
              >
                <div className="h-[110px] bg-gradient-to-br from-[#1e0d38] to-[#150928] flex items-center justify-center text-4xl">
                  {p.emoji}
                </div>
                <div className="p-3.5">
                  <div className="text-[10px] text-muted2 mb-1">{p.category}</div>
                  <div className="text-sm font-semibold mb-2">{p.name}</div>
                  <div className="flex items-center gap-1 text-[11px] text-gold-2 mb-2.5">⭐ {p.rating}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-white">
                      {formatToman(p.price)} <small className="text-[10px] text-muted font-normal">تومان</small>
                    </div>
                    {p.inStock ? (
                      cart[p.id] ? (
                        <span className="bg-green/15 text-green text-[11px] px-3.5 py-1.5 rounded-lg border border-green/25 font-bold">
                          ✓ افزوده شد
                        </span>
                      ) : (
                        <button
                          onClick={() => addToCart(p.id)}
                          className="bg-purple text-white text-[11px] px-3.5 py-1.5 rounded-lg font-bold hover:bg-purple-2 transition-colors"
                        >
                          افزودن
                        </button>
                      )
                    ) : (
                      <span className="text-[11px] text-red">ناموجود</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BOXES TAB */}
        {tab === 'boxes' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {boxes.map((b) => (
              <div key={b.id} className="bg-card2 border border-border rounded-3xl overflow-hidden hover:border-gold/35 hover:-translate-y-1 transition-all">
                <div className="h-[190px] bg-gradient-to-br from-[#1e0d38] via-[#2d1060] to-[#1a0930] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(201,151,58,0.2),transparent_55%),radial-gradient(ellipse_at_70%_50%,rgba(124,58,237,0.2),transparent_55%)]" />
                  <span className="absolute top-3 right-3 bg-gradient-to-br from-[#c97820] to-[#8b4d10] text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full z-10">
                    {b.discount}٪ تخفیف
                  </span>
                  <span className="text-7xl relative z-[1] animate-float">{b.emoji}</span>
                </div>
                <div className="p-5">
                  <div className="text-base font-bold mb-1">{b.name}</div>
                  <div className="text-xs text-muted2 mb-4">{b.items} محصول</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-extrabold text-white">
                        {formatToman(b.price)} <small className="text-xs text-muted font-normal">تومان</small>
                      </div>
                      <div className="text-xs text-muted2 line-through">{formatToman(b.oldPrice)}</div>
                    </div>
                    <Button variant="gold" size="sm">سفارش</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}

function Stat({ num, label }: { num: string | number; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-extrabold text-white">{num}</div>
      <div className="text-[11px] text-muted mt-0.5">{label}</div>
    </div>
  )
}