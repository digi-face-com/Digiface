'use client'

import { useState } from 'react'
import { Button, Pill, AiBadge } from '@/components/ui'

function formatToman(n: number) {
  return n.toLocaleString('fa-IR')
}

interface ProductItem {
  id: string
  name: string
  emoji: string
  category: string
  price: number
  status: 'approved' | 'pending_ai' | 'rejected_ai' | 'out_of_stock'
  note?: string
  pendingEdit?: boolean
}

const initialProducts: ProductItem[] = [
  { id: '1', name: 'کرم ضدآفتاب SPF50', emoji: '☀️', category: 'مراقبت پوست', price: 185000, status: 'approved' },
  { id: '2', name: 'سرم ویتامین C', emoji: '✨', category: 'مراقبت پوست', price: 240000, status: 'pending_ai' },
  { id: '3', name: 'ماسک شبانه', emoji: '🌙', category: 'مراقبت پوست', price: 120000, status: 'rejected_ai', note: 'قیمت غیرمعمول نسبت به محصولات مشابه — لطفاً بازبینی کنید' },
  { id: '4', name: 'کرم دور چشم', emoji: '👁️', category: 'مراقبت پوست', price: 195000, status: 'out_of_stock' },
  { id: '5', name: 'لایه‌بردار ملایم', emoji: '🌿', category: 'مراقبت پوست', price: 98000, status: 'approved' },
  { id: '6', name: 'تونر آبرسان', emoji: '💧', category: 'مراقبت پوست', price: 145000, status: 'approved', pendingEdit: true },
]

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts)
  const [showForm, setShowForm] = useState(false)
  const [forceEdit, setForceEdit] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">محصولات</h1>
          <p className="text-sm text-muted mt-1">مدیریت محصولات — بررسی توسط AI</p>
        </div>
        <Button onClick={() => setShowForm((v) => !v)}>+ افزودن محصول</Button>
      </div>

      {/* ADD PRODUCT FORM */}
      {showForm && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="text-[13px] font-bold mb-3">محصول جدید</div>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-muted font-semibold">نام محصول</label>
              <input className="input-base" placeholder="مثلاً سرم نیاسینامید" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-muted font-semibold">دسته‌بندی</label>
              <select className="input-base">
                <option>مراقبت پوست</option>
                <option>آرایشی</option>
                <option>مو و ناخن</option>
                <option>عطر و ادکلن</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-muted font-semibold">قیمت (تومان)</label>
              <input className="input-base" dir="ltr" placeholder="150000" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-muted font-semibold">اندازه بسته (تخمین اولیه)</label>
              <select className="input-base">
                <option>کوچک</option>
                <option>متوسط</option>
                <option>بزرگ</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1 mb-3">
            <label className="text-[11px] text-muted font-semibold">توضیحات</label>
            <textarea className="input-base resize-none" rows={2} placeholder="توضیح محصول..." />
          </div>
          <div className="flex flex-col gap-1 mb-3">
            <label className="text-[11px] text-muted font-semibold">تصویر / ویدیو محصول (کم‌حجم)</label>
            <label className="block bg-white/[0.03] border border-dashed border-purple/30 rounded-lg p-4 text-center cursor-pointer hover:border-purple/50 transition-colors">
              <input type="file" className="hidden" />
              <div className="text-lg mb-1">📁</div>
              <div className="text-[10px] text-muted">تصویر یا ویدیوی کوتاه</div>
            </label>
          </div>
          <div className="bg-purple/5 border border-purple/20 rounded-lg p-2.5 text-[11px] text-purple-light flex items-center gap-2 mb-3">
            <AiBadge>بررسی خودکار</AiBadge> این محصول پس از ثبت توسط AI بررسی می‌شود — معمولاً کمتر از ۱ ساعت
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => setShowForm(false)}>ثبت محصول</Button>
            <Button size="sm" variant="ghost" onClick={() => setShowForm(false)}>انصراف</Button>
          </div>
        </div>
      )}

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {products.map((p) => (
          <div
            key={p.id}
            className={`bg-card2 border rounded-xl overflow-hidden transition-all ${
              p.status === 'pending_ai'
                ? 'border-orange/30'
                : p.status === 'rejected_ai'
                ? 'border-red/30'
                : p.status === 'out_of_stock'
                ? 'border-border opacity-50'
                : 'border-border'
            }`}
          >
            <div className="h-20 bg-gradient-to-br from-[#1e0d38] to-[#150928] flex items-center justify-center text-4xl relative">
              {p.emoji}
              {p.pendingEdit && (
                <span className="absolute top-2 right-2">
                  <AiBadge>ویرایش در صف</AiBadge>
                </span>
              )}
            </div>
            <div className="p-3">
              <div className="text-[10px] text-muted2 mb-0.5">{p.category}</div>
              <div className="text-[13px] font-bold mb-1.5">{p.name}</div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[13px] font-bold">{formatToman(p.price)} ت</span>
                {p.status === 'approved' && <Pill color="green">✓ تأیید</Pill>}
                {p.status === 'pending_ai' && <Pill color="orange"><AiBadge>در صف</AiBadge></Pill>}
                {p.status === 'rejected_ai' && <Pill color="red">⚠️ رد AI</Pill>}
                {p.status === 'out_of_stock' && <Pill color="muted">ناموجود — محو شده</Pill>}
              </div>

              {p.status === 'pending_ai' && (
                <div className="text-[10px] text-orange">⏳ بررسی AI — حداکثر ۱ ساعت</div>
              )}

              {p.status === 'rejected_ai' && (
                <>
                  <div className="text-[10px] text-red mb-2">{p.note}</div>
                  <div className="flex gap-1.5">
                    <button className="flex-1 bg-purple/12 text-purple-light border border-purple/25 rounded-md py-1.5 text-[10px] font-bold hover:bg-purple/18 transition-colors">
                      ویرایش محصول
                    </button>
                    <button
                      onClick={() => setForceEdit(forceEdit === p.id ? null : p.id)}
                      className="flex-1 bg-red/12 text-red border border-red/25 rounded-md py-1.5 text-[10px] font-bold hover:bg-red/18 transition-colors"
                    >
                      گزارش به ادمین
                    </button>
                  </div>
                  {forceEdit === p.id && (
                    <div className="mt-2 bg-red/4 border border-dashed border-red/15 rounded-lg p-2">
                      <textarea className="input-base resize-none text-[11px]" rows={2} placeholder="توضیح دهید چرا فکر می‌کنید AI اشتباه کرده..." />
                      <Button size="sm" variant="danger" className="mt-1.5 w-full">ارسال برای بررسی کارشناس</Button>
                    </div>
                  )}
                </>
              )}

              <div className="flex gap-1.5 mt-2">
                <button className="flex-1 border border-border text-muted rounded-md py-1.5 text-[10px] hover:text-text transition-colors">
                  ویرایش
                </button>
                <button className="flex-1 border border-border text-muted rounded-md py-1.5 text-[10px] hover:text-text transition-colors">
                  حذف
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT QUEUE EXPLAINER */}
      <div className="bg-card2 border border-border rounded-xl p-3.5 text-[11px] text-muted leading-loose">
        <span className="text-text font-semibold">قوانین ویرایش:</span> هر ویرایش وارد صف بررسی AI/کارشناس می‌شود (حداقل ۱ ساعت). اگر تغییر جدیدی قبل از تأیید تغییر قبلی ثبت شود، تغییر قبلی از صف حذف می‌شود. در صورت رد شدن، اگر طی ۳۰ دقیقه اصلاح نشود، به کارشناس اطلاع داده می‌شود.
      </div>
    </div>
  )
}