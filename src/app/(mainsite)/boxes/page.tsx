'use client'

import { useState } from 'react'
import { Navbar, Footer } from '@/components/layout/navbar-footer'
import { BigDataIndicator } from '@/components/ui'
import { BoxCard } from '@/components/shop-shared'

const boxCategories = ['همه', 'مراقبت', 'آرایشی', 'هدیه', 'لاکچری']

const allBoxes = [
  { id: '1', shop: 'آرایشگاه رز', name: 'باکس مراقبت پوست', emoji: '🎁', items: 5, price: 850000, oldPrice: 1100000, discount: 23, tag: 'پرفروش', category: 'مراقبت' },
  { id: '2', shop: 'بیوتی استور', name: 'ست آرایش کامل', emoji: '💝', items: 7, price: 1200000, oldPrice: 1600000, discount: 25, tag: 'لاکچری', category: 'لاکچری' },
  { id: '3', shop: 'گلدن بیوتی', name: 'باکس هدیه ویژه', emoji: '🎀', items: 4, price: 650000, oldPrice: 850000, discount: 24, tag: 'هدیه', category: 'هدیه' },
  { id: '4', shop: 'گلدن بیوتی', name: 'باکس مو حرفه‌ای', emoji: '💆', items: 3, price: 550000, oldPrice: 700000, discount: 21, tag: 'جدید', category: 'مراقبت' },
  { id: '5', shop: 'پرفکت لوک', name: 'باکس عطر لاکچری', emoji: '🌸', items: 3, price: 1800000, oldPrice: 2400000, discount: 25, tag: 'لاکچری', category: 'لاکچری' },
  { id: '6', shop: 'استایل پرو', name: 'باکس سورپرایز', emoji: '⭐', items: 5, price: 450000, oldPrice: 600000, discount: 25, tag: 'سورپرایز', category: 'آرایشی' },
]

export default function BoxesPage() {
  const [cat, setCat] = useState('همه')

  const filtered = cat === 'همه' ? allBoxes : allBoxes.filter((b) => b.category === cat)

  return (
    <>
      <Navbar />
      <BigDataIndicator />

      <div className="pt-24 px-6 md:px-10 max-w-[1200px] mx-auto">
        <div className="mb-6">
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            باکس‌های <span className="text-gold-gradient">ویژه</span>
          </h1>
          <p className="text-sm text-muted mt-1.5">بسته‌های کیوریت‌شده توسط بهترین فروشگاه‌های ایران</p>
        </div>

        <div className="flex gap-2 flex-wrap mb-7">
          {boxCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4.5 py-2 rounded-full text-xs font-semibold border transition-all ${
                cat === c
                  ? 'bg-purple text-white border-purple shadow-[0_4px_16px_rgba(124,58,237,0.3)]'
                  : 'border-border text-muted hover:text-text hover:border-border2'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-20">
          {filtered.map((box) => (
            <BoxCard key={box.id} {...box} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}