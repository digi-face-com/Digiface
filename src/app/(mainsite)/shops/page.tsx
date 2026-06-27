'use client'

import { useState } from 'react'
import { Navbar, Footer } from '@/components/layout/navbar-footer'
import { BigDataIndicator } from '@/components/ui'
import { ShopCard } from '@/components/shop-shared'

const categories = ['همه', 'مراقبت پوست', 'آرایشی', 'مو و ناخن', 'عطر و ادکلن']
const cities = ['همه شهرها', 'تهران', 'مشهد', 'اصفهان', 'شیراز', 'تبریز']

const allShops = [
  { id: '1', name: 'آرایشگاه رز', emoji: '🌹', category: 'مراقبت پوست', city: 'تهران', rating: 4.9, reviews: 234, products: 128, badge: 'برتر', desc: 'متخصص محصولات مراقبت از پوست — واردات مستقیم از کره' },
  { id: '2', name: 'بیوتی استور', emoji: '💄', category: 'آرایشی', city: 'مشهد', rating: 4.8, reviews: 189, products: 96, badge: 'جدید', desc: 'جدیدترین محصولات آرایشی اروپایی و کره‌ای' },
  { id: '3', name: 'گلدن بیوتی', emoji: '✨', category: 'مو و ناخن', city: 'اصفهان', rating: 4.7, reviews: 312, products: 215, badge: 'ویژه', desc: 'تخصصی مو، ناخن و محصولات حرفه‌ای سالنی' },
  { id: '4', name: 'پرفکت لوک', emoji: '🌸', category: 'عطر و ادکلن', city: 'شیراز', rating: 4.9, reviews: 156, products: 74, badge: 'برتر', desc: 'بزرگترین مجموعه عطر و ادکلن اورجینال' },
  { id: '5', name: 'مگنولیا', emoji: '🪷', category: 'مراقبت پوست', city: 'تهران', rating: 4.6, reviews: 98, products: 55, desc: 'محصولات طبیعی و ارگانیک مراقبت از پوست' },
  { id: '6', name: 'استایل پرو', emoji: '👑', category: 'آرایشی', city: 'تبریز', rating: 4.8, reviews: 201, products: 182, badge: 'برتر', desc: 'محصولات حرفه‌ای میکاپ و آرایش دائمی' },
]

export default function ShopsPage() {
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('همه شهرها')
  const [category, setCategory] = useState('همه')

  const filtered = allShops.filter((s) => {
    const matchSearch = search === '' || s.name.includes(search) || s.category.includes(search)
    const matchCity = city === 'همه شهرها' || s.city === city
    const matchCat = category === 'همه' || s.category === category
    return matchSearch && matchCity && matchCat
  })

  return (
    <>
      <Navbar />
      <BigDataIndicator />

      <div className="pt-24 px-6 md:px-10 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-display text-3xl md:text-4xl font-bold">فروشگاه‌ها</h1>
          <p className="text-sm text-muted mt-1.5">{filtered.length} فروشگاه فعال در پلتفرم</p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex gap-3 mb-4 flex-col sm:flex-row">
            <div className="flex-1 flex items-center gap-2.5 bg-card border border-border rounded-xl px-4 py-3">
              <span className="text-muted">🔍</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="جستجوی فروشگاه، دسته‌بندی..."
                className="bg-transparent border-none outline-none flex-1 text-sm text-text placeholder:text-muted2 text-right"
              />
            </div>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-card border border-border rounded-xl px-4 py-3 text-[13px] text-text outline-none cursor-pointer"
            >
              {cities.map((c) => (
                <option key={c} value={c} className="bg-card">
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4.5 py-2 rounded-full text-xs font-semibold border transition-all ${
                  category === c
                    ? 'bg-purple text-white border-purple shadow-[0_4px_16px_rgba(124,58,237,0.3)]'
                    : 'border-border text-muted hover:text-text hover:border-border2'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Shop grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
            {filtered.map((shop) => (
              <ShopWithDesc key={shop.id} {...shop} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted text-sm">هیچ فروشگاهی با این فیلتر یافت نشد.</div>
        )}
      </div>

      <Footer />
    </>
  )
}

// Extended shop card with description (for list view)
function ShopWithDesc({
  id,
  name,
  emoji,
  category,
  city,
  rating,
  reviews,
  products,
  badge,
  desc,
}: {
  id: string
  name: string
  emoji: string
  category: string
  city: string
  rating: number
  reviews: number
  products: number
  badge?: string
  desc: string
}) {
  return (
    <a
      href={`/shops/${id}`}
      className="bg-card border border-border rounded-[20px] p-6 cursor-pointer transition-all hover:border-purple/40 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(124,58,237,0.15)] block"
    >
      <div className="flex items-start gap-4 mb-3.5">
        <div className="w-[52px] h-[52px] bg-gradient-to-br from-[#3b1f6e] to-[#1e0a3c] rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
          {emoji}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-bold">{name}</h3>
            {badge && (
              <span className="bg-gold/15 border border-gold/30 rounded-full px-2.5 py-1 text-[10px] text-gold-2 font-semibold flex-shrink-0">
                {badge}
              </span>
            )}
          </div>
          <div className="text-xs text-muted flex items-center gap-1 mt-0.5">📍 {city}</div>
        </div>
      </div>

      <p className="text-[13px] text-muted leading-relaxed mb-3.5">{desc}</p>

      <div className="flex justify-between items-center pt-3.5 border-t border-purple/10">
        <div className="flex items-center gap-1.5 text-gold-2 text-xs">
          ⭐ <span className="text-white font-bold">{rating}</span>
          <small className="text-muted2">({reviews})</small>
        </div>
        <div className="text-xs text-muted">{products} محصول</div>
      </div>
    </a>
  )
}