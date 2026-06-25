'use client'

import { useState } from 'react'
import { Button, Pill, Toggle } from '@/components/ui'

function formatToman(n: number) {
  return n.toLocaleString('fa-IR')
}

const ownProducts = [
  { id: '1', name: 'کرم ضدآفتاب SPF50', emoji: '☀️', price: 185000, selected: true },
  { id: '2', name: 'سرم ویتامین C', emoji: '✨', price: 240000, selected: false },
  { id: '3', name: 'لایه‌بردار ملایم', emoji: '🌿', price: 98000, selected: false },
]

const cityFilters = [
  { label: 'مراقبت پوست', color: 'purple' as const },
  { label: 'حداکثر ۵ قلم', color: 'gold' as const },
  { label: 'برند ایرانی', color: 'blue' as const },
  { label: 'اندازه: کوچک', color: 'green' as const },
]

export default function BoxesPage() {
  const [interShopEnabled, setInterShopEnabled] = useState(true)
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState(ownProducts)

  const toggleProduct = (id: string) => {
    setProducts((list) => list.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p)))
  }

  const filteredProducts = products.filter((p) => p.name.includes(search))

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">مدیریت باکس‌ها</h1>
        <p className="text-sm text-muted mt-1">سفارشی‌سازی باکس + باکس بین‌فروشگاهی (فاز ۱)</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* LEFT: Active boxes */}
        <div>
          <div className="text-[13px] font-bold mb-3">باکس‌های فعال</div>

          <div className="bg-card border border-border rounded-2xl p-4 mb-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[13px] font-bold">باکس مراقبت کامل</div>
              <Pill color="green">فعال</Pill>
            </div>
            <div className="text-[11px] text-muted mb-3">۴ محصول | {formatToman(650000)} ت | کمیسیون ۲۰٪</div>
            <div className="flex gap-2">
              <Button size="sm">ویرایش محصولات</Button>
              <Button size="sm" variant="ghost">غیرفعال</Button>
            </div>
          </div>

          <button className="w-full bg-card2 border border-dashed border-border rounded-2xl p-5 text-center hover:border-border2 transition-colors">
            <div className="text-xl text-muted mb-1">＋</div>
            <div className="text-[12px] text-muted">ایجاد باکس جدید</div>
          </button>
        </div>

        {/* RIGHT: Box editor */}
        <div>
          <div className="text-[13px] font-bold mb-3">ویرایش باکس — افزودن محصول</div>
          <div className="bg-card border border-border rounded-2xl p-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-base mb-3"
              placeholder="🔍 سرچ محصول..."
            />

            <div className="text-[10px] text-muted mb-1.5">فیلترهای ادمین برای این شهر:</div>
            <div className="flex gap-1.5 flex-wrap mb-3">
              {cityFilters.map((f) => (
                <Pill key={f.label} color={f.color}>{f.label}</Pill>
              ))}
            </div>

            <div className="flex flex-col gap-1.5 mb-3">
              {filteredProducts.map((p) => (
                <label
                  key={p.id}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-2 border cursor-pointer transition-all ${
                    p.selected ? 'bg-green/5 border-green/15' : 'bg-card2 border-border'
                  }`}
                >
                  <input type="checkbox" checked={p.selected} onChange={() => toggleProduct(p.id)} className="accent-purple" />
                  <span className="text-[12px]">{p.emoji} {p.name}</span>
                  <span className="text-[11px] text-muted mr-auto">{formatToman(p.price)}</span>
                </label>
              ))}
            </div>

            <div className="border-t border-dashed border-border pt-3">
              <div className="text-[11px] text-orange mb-1.5">+ محصول فقط برای این باکس (نیاز به تأیید ادمین)</div>
              <input className="input-base mb-2" placeholder="نام محصول..." />
              <div className="grid grid-cols-2 gap-2">
                <input className="input-base" dir="ltr" placeholder="قیمت" />
                <input className="input-base" placeholder="توضیح کوتاه" />
              </div>
            </div>

            <Button size="sm" className="mt-3 w-full">ذخیره تغییرات باکس</Button>
          </div>
        </div>
      </div>

      {/* INTER-SHOP BOX */}
      <div>
        <div className="text-[13px] font-bold mb-3">باکس بین‌فروشگاهی — فاز ۱</div>
        <div className="bg-green/5 border border-green/18 rounded-2xl p-5">
          <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
            <div>
              <div className="text-[13px] font-bold text-green mb-1">📦 باکس DiGiFACE در فروشگاه‌های منتخب</div>
              <div className="text-[11px] text-muted">
                اگر موجودی کافی برای این باکس نداری، پیک می‌تواند کالا را از فروشگاه دیگری تأمین کند
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-muted">شرکت در باکس بین‌فروشگاهی</span>
              <Toggle on={interShopEnabled} onChange={setInterShopEnabled} />
            </div>
          </div>

          {interShopEnabled && (
            <>
              {/* FLOW */}
              <div className="flex items-center gap-1.5 flex-wrap mb-3">
                {['سفارش مشتری', 'پیک تأمین از فروشگاه منتخب', 'فاکتور جداگانه', 'تحویل به مشتری'].map((step, i) => (
                  <div key={step} className="flex items-center gap-1.5">
                    <div
                      className={`rounded-md px-2.5 py-1.5 text-[10px] border ${
                        i === 0 || i === 3
                          ? 'bg-green/8 border-green/15'
                          : i === 1
                          ? 'bg-blue/8 border-blue/15'
                          : 'bg-gold/8 border-gold/15'
                      }`}
                    >
                      {step}
                    </div>
                    {i < 3 && <span className="text-muted">←</span>}
                  </div>
                ))}
              </div>
              <div className="text-[10px] text-muted2">
                الگوریتم: مانند سفارش مشتری از فروشگاه گالری | هزینه تأمین کالا روی فاکتور جداگانه برای فروشگاه درخواست‌کننده ثبت می‌شود
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}