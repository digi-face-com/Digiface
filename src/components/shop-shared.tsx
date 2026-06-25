// ════════════════════════════════════════
// src/components/shop/ShopCard.tsx
// ════════════════════════════════════════
'use client'
import Link from 'next/link'
import { useState } from 'react'
import { AiBadge, Pill, Button } from '@/components/ui'

interface ShopCardProps {
  id: string
  name: string
  emoji: string
  category: string
  city: string
  rating: number
  reviews: number
  products: number
  badge?: string
}

export function ShopCard({ id, name, emoji, category, city, rating, reviews, products, badge }: ShopCardProps) {
  return (
    <Link
      href={`/shops/${id}`}
      className="group relative bg-card border border-border rounded-[20px] p-6 cursor-pointer transition-all duration-300 hover:border-purple/40 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(124,58,237,0.18)] overflow-hidden block"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(124,58,237,0.07),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {badge && (
        <span className="absolute top-3.5 right-3.5 bg-gold/15 border border-gold/30 rounded-full px-2.5 py-1 text-[10px] text-gold-2 font-semibold">
          {badge}
        </span>
      )}

      <div className="w-[58px] h-[58px] bg-gradient-to-br from-[#3b1f6e] to-[#1e0a3c] rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-[0_6px_20px_rgba(0,0,0,0.4)]">
        {emoji}
      </div>

      <div className="text-base font-bold mb-1">{name}</div>
      <div className="text-xs text-muted mb-4">
        {category} • {city}
      </div>

      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center gap-1.5 text-gold-2">
          ⭐ <span className="text-white font-bold">{rating}</span>
          <small className="text-muted2">({reviews})</small>
        </div>
        <div className="text-muted">{products} محصول</div>
      </div>
    </Link>
  )
}

// ════════════════════════════════════════
// src/components/shop/BoxCard.tsx
// ════════════════════════════════════════
interface BoxCardProps {
  id: string
  shop: string
  name: string
  emoji: string
  items: number
  price: number
  oldPrice: number
  discount: number
  tag?: string
}

function formatToman(n: number) {
  return n.toLocaleString('fa-IR')
}

export function BoxCard({ shop, name, emoji, items, price, oldPrice, discount, tag }: BoxCardProps) {
  return (
    <div className="group bg-card border border-border rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-gold/35 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(201,151,58,0.12)]">
      <div className="h-[190px] bg-gradient-to-br from-[#1e0d38] via-[#2d1060] to-[#1a0930] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(201,151,58,0.2),transparent_55%),radial-gradient(ellipse_at_70%_50%,rgba(124,58,237,0.2),transparent_55%)]" />
        <span className="absolute top-3 right-3 bg-gradient-to-br from-[#c97820] to-[#8b4d10] text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full z-10">
          {discount}٪ تخفیف
        </span>
        {tag && (
          <span className="absolute top-3 left-3 bg-card/85 text-purple-light text-[10px] px-2.5 py-1 rounded-full border border-border z-10">
            {tag}
          </span>
        )}
        <span className="text-7xl relative z-[1] animate-float">{emoji}</span>
      </div>

      <div className="p-5">
        <div className="text-[11px] text-muted mb-1">{shop}</div>
        <div className="text-base font-bold mb-1 group-hover:text-gold-2 transition-colors">{name}</div>
        <div className="text-xs text-muted2 mb-4">{items} محصول منتخب</div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-extrabold text-white">
              {formatToman(price)} <small className="text-xs text-muted font-normal">تومان</small>
            </div>
            <div className="text-xs text-muted2 line-through">{formatToman(oldPrice)}</div>
          </div>
          <button className="bg-gradient-to-br from-gold to-[#8b5010] text-white px-5 py-2 rounded-[10px] text-xs font-bold hover:shadow-[0_6px_20px_rgba(201,151,58,0.35)] hover:-translate-y-0.5 transition-all">
            سفارش
          </button>
        </div>
      </div>
    </div>
  )
}

// ════════════════════════════════════════
// src/components/shop/CampaignBanner.tsx
// ════════════════════════════════════════
interface CampaignBannerProps {
  title: string
  description: string
  days: string
  hours: string
  minutes: string
}

export function CampaignBanner({ title, description, days, hours, minutes }: CampaignBannerProps) {
  return (
    <div className="bg-gradient-to-br from-[#1a0040] via-[#2d0060] to-[#1a0030] border border-gold/30 rounded-2xl p-6 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-2 to-transparent" />
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="text-[10px] text-gold-2 tracking-[2px] font-bold mb-1">🔥 کمپین ویژه</div>
          <div className="font-display text-2xl md:text-3xl font-bold">{title}</div>
          <div className="text-xs text-muted mt-1">{description}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted mb-1.5">پایان کمپین</div>
          <div className="flex gap-1.5">
            {[
              { v: days, l: 'روز' },
              { v: hours, l: 'ساعت' },
              { v: minutes, l: 'دقیقه' },
            ].map((t) => (
              <div key={t.l} className="bg-black/40 rounded-md px-2.5 py-1.5 text-center min-w-[44px]">
                <div className="text-base font-extrabold">{t.v}</div>
                <div className="text-[9px] text-muted">{t.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ════════════════════════════════════════
// src/components/shared/Chatbot.tsx
// ════════════════════════════════════════

const initialMessages = [
  { role: 'bot', text: 'سلام! می‌تونم کمکت کنم محصول مورد نظرت رو پیدا کنی. دنبال چی می‌گردی؟ 😊' },
  { role: 'user', text: 'دنبال کرم ضدآفتاب هستم' },
  { role: 'bot', text: '۱۲ محصول در تهران پیدا کردم. برای مشاهده کامل، ثبت‌نام کن 👇' },
]

export function Chatbot() {
  const [messages] = useState(initialMessages)

  return (
    <div className="bg-purple/5 border border-purple/15 rounded-2xl p-4 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 bg-gradient-to-br from-purple to-purple-2 rounded-lg flex items-center justify-center text-xs">
          🤖
        </div>
        <div className="text-[11px] font-bold">دستیار DiGiFACE</div>
        <AiBadge />
        <Pill color="green">آنلاین</Pill>
        <span className="text-[9px] text-muted mr-auto">رفتار ذخیره می‌شود 📊</span>
      </div>

      <div className="space-y-1.5">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`text-[11px] px-3 py-2 rounded-xl max-w-[82%] ${
              m.role === 'bot'
                ? 'bg-purple/10 border border-purple/20 rounded-tr-[3px]'
                : 'bg-green/10 border border-green/20 rounded-tl-[3px] mr-auto'
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        <Button size="sm">ثبت‌نام رایگان</Button>
        <Button variant="ghost" size="sm">بعداً</Button>
      </div>
    </div>
  )
}