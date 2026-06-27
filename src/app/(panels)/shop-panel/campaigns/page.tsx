'use client'

import { useState } from 'react'
import { Button, Pill } from '@/components/ui'

const products = [
  { id: '1', name: 'کرم ضدآفتاب SPF50', emoji: '☀️', selected: true },
  { id: '2', name: 'سرم ویتامین C', emoji: '✨', selected: true },
  { id: '3', name: 'ماسک شبانه', emoji: '🌙', selected: false },
  { id: '4', name: 'لایه‌بردار ملایم', emoji: '🌿', selected: false },
]

export default function CampaignsPage() {
  const [showIntro, setShowIntro] = useState(true)
  const [accepted, setAccepted] = useState(false)
  const [applyToAll, setApplyToAll] = useState(true)
  const [selectedProducts, setSelectedProducts] = useState(products)

  const toggle = (id: string) => {
    setSelectedProducts((list) => list.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p)))
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">کمپین‌ها</h1>
        <p className="text-sm text-muted mt-1">شرکت در کمپین‌های تخفیف پلتفرم</p>
      </div>

      {/* INTRO MESSAGE — appears before showing campaign details */}
      {showIntro && !accepted && (
        <div className="bg-purple/5 border border-purple/20 rounded-2xl p-5">
          <div className="text-[13px] font-bold text-purple-light mb-2">📋 راهنمای شرکت در کمپین</div>
          <p className="text-[12px] text-muted leading-relaxed mb-3">
            با پذیرش این کمپین، روی محصولات منتخب شما تخفیف ویژه اعمال می‌شود و در ازای آن کمیسیون پلتفرم برای محصولات
            شرکت‌کننده موقتاً تغییر می‌کند. می‌توانید انتخاب کنید که تخفیف روی همه محصولات یا فقط بخشی از آن‌ها اعمال شود.
            این کمپین در صفحه اصلی به صورت برجسته نمایش داده می‌شود و می‌تواند بازدید فروشگاه شما را افزایش دهد.
          </p>
          <Button size="sm" onClick={() => setShowIntro(false)}>متوجه شدم، ادامه</Button>
        </div>
      )}

      {!showIntro && !accepted && (
        <div className="bg-gold/6 border border-gold/25 rounded-2xl p-5">
          <div className="flex justify-between items-start flex-wrap gap-3 mb-4">
            <div>
              <div className="text-[14px] font-bold text-gold-2 mb-1">🎪 کمپین جشنواره پاییزه</div>
              <div className="text-[12px] text-muted">۵ روز باقی‌مانده</div>
            </div>
            <Pill color="green">قابل شرکت</Pill>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-card2 border border-border rounded-lg p-3 text-center">
              <div className="text-[10px] text-muted mb-1">تخفیف</div>
              <div className="text-[15px] font-bold">۳۰٪</div>
            </div>
            <div className="bg-card2 border border-border rounded-lg p-3 text-center">
              <div className="text-[10px] text-muted mb-1">کمیسیون کمپین</div>
              <div className="text-[15px] font-bold">۲۵٪</div>
            </div>
            <div className="bg-card2 border border-border rounded-lg p-3 text-center">
              <div className="text-[10px] text-muted mb-1">مدت</div>
              <div className="text-[15px] font-bold">۵ روز</div>
            </div>
          </div>

          {/* Apply to all or select products */}
          <div className="text-[12px] font-bold mb-2">تخفیف روی کدام محصولات اعمال شود؟</div>
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setApplyToAll(true)}
              className={`flex-1 py-2 rounded-lg text-[12px] border transition-all ${
                applyToAll ? 'bg-purple/12 border-purple/35 text-purple-light' : 'bg-card2 border-border text-muted'
              }`}
            >
              همه محصولات فروشگاه
            </button>
            <button
              onClick={() => setApplyToAll(false)}
              className={`flex-1 py-2 rounded-lg text-[12px] border transition-all ${
                !applyToAll ? 'bg-purple/12 border-purple/35 text-purple-light' : 'bg-card2 border-border text-muted'
              }`}
            >
              انتخاب محصولات خاص
            </button>
          </div>

          {!applyToAll && (
            <div className="flex flex-col gap-1.5 mb-4">
              {selectedProducts.map((p) => (
                <label
                  key={p.id}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-2 border cursor-pointer transition-all ${
                    p.selected ? 'bg-gold/5 border-gold/20' : 'bg-card2 border-border'
                  }`}
                >
                  <input type="checkbox" checked={p.selected} onChange={() => toggle(p.id)} className="accent-gold" />
                  <span className="text-[12px]">{p.emoji} {p.name}</span>
                </label>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="gold" size="sm" onClick={() => setAccepted(true)}>پذیرش و شرکت در کمپین</Button>
            <Button variant="ghost" size="sm">اطلاعات بیشتر</Button>
          </div>
        </div>
      )}

      {accepted && (
        <div className="bg-green/5 border border-green/20 rounded-2xl p-5 text-center">
          <div className="text-2xl mb-2">✅</div>
          <div className="text-[13px] font-bold text-green mb-1">با موفقیت در کمپین ثبت شدید</div>
          <div className="text-[11px] text-muted">
            تخفیف ۳۰٪ روی {applyToAll ? 'همه محصولات' : `${selectedProducts.filter((p) => p.selected).length} محصول منتخب`} شما اعمال شد.
          </div>
        </div>
      )}

      {/* PAST CAMPAIGNS */}
      <div>
        <div className="text-[13px] font-bold mb-3">کمپین‌های گذشته</div>
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-3.5 border-b border-purple/5">
            <div>
              <div className="text-[12px] font-semibold">کمپین تابستانه</div>
              <div className="text-[10px] text-muted">۱۵٪ تخفیف — کمیسیون ۲۰٪</div>
            </div>
            <Pill color="muted">پایان‌یافته</Pill>
          </div>
        </div>
      </div>
    </div>
  )
}