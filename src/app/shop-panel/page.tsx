'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button, Pill, AiBadge, Timer } from '@/components/ui'

function formatToman(n: number) {
  return n.toLocaleString('fa-IR')
}

const pendingOrder = {
  id: 'DF-045',
  customer: 'سارا احمدی',
  items: 'باکس مراقبت + سرم ویتامین C',
  time: '۱۰ دقیقه پیش',
  hoursLeft: 6,
  minutesLeft: 30,
}

const products = [
  { id: '1', name: 'کرم ضدآفتاب SPF50', emoji: '☀️', price: 185000, status: 'approved' as const },
  { id: '2', name: 'سرم ویتامین C', emoji: '✨', price: 240000, status: 'pending_ai' as const },
  { id: '3', name: 'ماسک شبانه', emoji: '🌙', price: 120000, status: 'rejected_ai' as const, note: 'قیمت غیرمعمول — بازبینی شود' },
]

export default function ShopDashboard() {
  const [showCancelFlow, setShowCancelFlow] = useState(false)
  const [cancelReason, setCancelReason] = useState<'out_of_stock_all' | 'out_of_stock_partial' | null>(null)

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">سلام، آرایشگاه رز! 👋</h1>
        <p className="text-sm text-muted mt-1">خلاصه فروشگاه شما</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-card2 border border-border rounded-xl p-4">
          <div className="text-xl font-extrabold text-white">۱۲.۴M</div>
          <div className="text-[10px] text-muted mt-0.5">فروش این ماه (ت)</div>
          <div className="text-[9px] text-green mt-1.5">↑ ۱۸٪ نسبت به ماه قبل</div>
        </div>
        <div className="bg-card2 border border-border rounded-xl p-4">
          <div className="text-xl font-extrabold text-white">۴۷</div>
          <div className="text-[10px] text-muted mt-0.5">سفارشات این ماه</div>
          <div className="text-[9px] text-green mt-1.5">↑ ۱۲٪ نسبت به ماه قبل</div>
        </div>
        <div className="bg-card2 border border-border rounded-xl p-4">
          <div className="text-xl font-extrabold text-white">۴.۹</div>
          <div className="text-[10px] text-muted mt-0.5">امتیاز میانگین</div>
        </div>
        <div className="bg-gradient-to-br from-[#1e0a3c] to-[#2d1060] border border-purple/30 rounded-xl p-4">
          <div className="text-[9px] text-gold/70">کیف پول</div>
          <div className="text-lg font-extrabold mt-0.5">۸.۲M ت</div>
          <Link href="/shop-panel/wallet" className="text-[10px] text-muted hover:text-text underline mt-1.5 inline-block">
            درخواست تسویه
          </Link>
        </div>
      </div>

      {/* CAMPAIGN NOTIFICATION */}
      <div className="bg-gold/6 border border-gold/25 rounded-2xl p-4">
        <div className="flex justify-between items-start flex-wrap gap-3">
          <div>
            <div className="text-[12px] font-bold text-gold-2 mb-1">🔔 اطلاعیه — کمپین جدید</div>
            <div className="text-[13px] mb-0.5">جشنواره پاییزه — تخفیف ۳۰٪</div>
            <div className="text-[11px] text-muted">کمیسیون ویژه کمپین: ۲۵٪</div>
          </div>
          <div className="flex gap-2">
            <Link href="/shop-panel/campaigns">
              <Button size="sm">اطلاعات بیشتر</Button>
            </Link>
            <Button size="sm" variant="ghost">بعداً</Button>
          </div>
        </div>
      </div>

      {/* PENDING ORDERS with timer */}
      <div className="bg-orange/4 border border-orange/20 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="text-[13px] font-bold text-orange">⚡ سفارشات در انتظار تأیید</div>
          <Timer label={`${pendingOrder.hoursLeft}:${pendingOrder.minutesLeft.toString().padStart(2, '0')} از ۷ ساعت`} />
        </div>

        <div className="bg-card2 rounded-xl p-3 flex items-center gap-3 mb-2">
          <div className="w-7 h-7 bg-orange/12 rounded-md flex items-center justify-center text-[10px] font-bold text-orange flex-shrink-0">
            #{pendingOrder.id.split('-')[1]}
          </div>
          <div className="flex-1">
            <div className="text-[12px] font-semibold">{pendingOrder.customer} — {pendingOrder.items}</div>
            <div className="text-[10px] text-muted">SMS ارسال شد • {pendingOrder.time}</div>
          </div>
          <div className="flex gap-1.5">
            <Button size="sm">تأیید</Button>
            <button
              onClick={() => setShowCancelFlow((v) => !v)}
              className="bg-red/12 text-red border border-red/25 px-2.5 py-1.5 rounded-md text-[11px] font-bold hover:bg-red/18 transition-colors"
            >
              رد با توضیح
            </button>
          </div>
        </div>

        {/* PARTIAL CANCEL FLOW */}
        {showCancelFlow && (
          <div className="bg-red/4 border border-dashed border-red/20 rounded-lg p-3 mt-2">
            <div className="text-[11px] font-bold text-red mb-2">دلیل رد سفارش</div>
            <div className="flex gap-2 flex-wrap mb-3">
              <button
                onClick={() => setCancelReason('out_of_stock_all')}
                className={`px-3 py-1.5 rounded-md text-[11px] border transition-all ${
                  cancelReason === 'out_of_stock_all' ? 'bg-red/15 border-red/40 text-red' : 'bg-card2 border-border'
                }`}
              >
                موجود نبودن اکثر اقلام (رد کامل)
              </button>
              <button
                onClick={() => setCancelReason('out_of_stock_partial')}
                className={`px-3 py-1.5 rounded-md text-[11px] border transition-all ${
                  cancelReason === 'out_of_stock_partial' ? 'bg-orange/15 border-orange/40 text-orange' : 'bg-card2 border-border'
                }`}
              >
                موجود نبودن بخشی از اقلام (رد جزئی)
              </button>
              <button
                onClick={() => setCancelReason(null)}
                className="px-3 py-1.5 rounded-md text-[11px] border bg-card2 border-border text-muted"
              >
                سایر
              </button>
            </div>

            {cancelReason === 'out_of_stock_partial' && (
              <div className="mb-3">
                <label className="text-[11px] text-muted font-semibold mb-1 block">اقلام موجود (اختیاری — جزئیات را وارد کنید)</label>
                <textarea className="input-base resize-none" rows={2} placeholder="مثلاً: کرم ضدآفتاب موجود است، سرم ویتامین C ناموجود" />
                <div className="text-[10px] text-muted2 mt-1.5">
                  در صورت تأیید مشتری: اقلام ناموجود حذف و مبلغ به کیف پول مشتری بازمی‌گردد
                </div>
              </div>
            )}

            {cancelReason === 'out_of_stock_all' && (
              <div className="text-[10px] text-muted2 mb-3">
                سفارش به طور کامل لغو و مبلغ کامل به کیف پول مشتری بازمی‌گردد
              </div>
            )}

            <Button size="sm" variant="danger">ثبت و ارسال به مشتری</Button>
          </div>
        )}

        <div className="bg-red/4 border border-dashed border-red/15 rounded-lg p-2.5 mt-2 text-[10px] text-red/70">
          محصول ناموجود → خودکار محو (کم‌رنگ) در صفحه فروشگاه + اطلاعیه در پنل برای اصلاح بعدی
        </div>
      </div>

      {/* PRODUCTS — AI CHECK PREVIEW */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-[13px] font-bold">محصولات — بررسی AI</div>
          <Link href="/shop-panel/products" className="text-[11px] text-purple-light hover:underline">
            مدیریت همه محصولات →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {products.map((p) => (
            <div
              key={p.id}
              className={`bg-card2 border rounded-xl overflow-hidden ${
                p.status === 'pending_ai' ? 'border-orange/30' : p.status === 'rejected_ai' ? 'border-red/30' : 'border-border'
              }`}
            >
              <div className="h-16 bg-gradient-to-br from-[#1e0d38] to-[#150928] flex items-center justify-center text-3xl">
                {p.emoji}
              </div>
              <div className="p-2.5">
                <div className="text-[12px] font-bold">{p.name}</div>
                <div className="flex justify-between items-center mt-1.5">
                  <span className="text-[12px]">{formatToman(p.price)} ت</span>
                  {p.status === 'approved' && <Pill color="green">✓ تأیید AI</Pill>}
                  {p.status === 'pending_ai' && <Pill color="orange"><AiBadge>در صف</AiBadge></Pill>}
                  {p.status === 'rejected_ai' && <Pill color="red">⚠️ رد AI</Pill>}
                </div>
                {p.status === 'pending_ai' && <div className="text-[10px] text-orange mt-1.5">حداکثر ۱ ساعت بررسی</div>}
                {p.status === 'rejected_ai' && (
                  <>
                    <div className="text-[10px] text-red mt-1.5">{p.note}</div>
                    <button className="w-full mt-1.5 bg-red/12 text-red border border-red/25 rounded-md py-1 text-[10px] font-bold hover:bg-red/18 transition-colors">
                      گزارش به ادمین (AI اشتباه کرد)
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}