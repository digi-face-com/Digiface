'use client'

import { AiBadge, Pill, Button } from '@/components/ui'

function formatToman(n: number) {
  return n.toLocaleString('fa-IR')
}

const intercityOrders = [
  { id: 'DF-043', from: 'تهران', to: 'اصفهان', items: 'باکس مراقبت پوست', total: 850000, carrier: 'الوپیک', status: 'processed' as const },
  { id: 'DF-046', from: 'تهران', to: 'شیراز', items: '۲ کالا', total: 420000, carrier: null, status: 'processing' as const },
]

export default function IntercityPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">سفارشات خارج‌شهر</h1>
        <p className="text-sm text-muted mt-1">پردازش خودکار توسط AI — نظارت کارشناس</p>
      </div>

      <div className="bg-purple/5 border border-purple/18 rounded-xl p-3.5 flex items-center gap-2">
        <AiBadge>خودکار</AiBadge>
        <span className="text-[11px] text-muted">
          محاسبه هزینه، انتخاب سرویس حمل فعال، ذخیره سبد و ارسال لینک پرداخت به‌صورت کامل خودکار انجام می‌شود. کارشناس فقط در صورت خطا یا گزارش دخالت می‌کند.
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {intercityOrders.map((order) => (
          <div key={order.id} className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
              <div className="flex items-center gap-3">
                <Pill color="blue">{order.from} ← {order.to}</Pill>
                <div>
                  <div className="text-[12px] font-bold">#{order.id} — {order.items}</div>
                  <div className="text-[11px] text-muted">{formatToman(order.total)} ت</div>
                </div>
              </div>
              {order.status === 'processed' ? (
                <Pill color="green">✓ پردازش شد — {order.carrier}</Pill>
              ) : (
                <Pill color="orange"><AiBadge>در حال پردازش</AiBadge></Pill>
              )}
            </div>

            {order.status === 'processing' && (
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="ghost">مشاهده جزئیات</Button>
                <Button size="sm" variant="danger">دخالت دستی</Button>
              </div>
            )}

            {order.status === 'processed' && (
              <div className="text-[10px] text-muted2 mt-1">
                لینک پرداخت SMS شد و پیک منتخب اصفهان برای تحویل به {order.carrier} اطلاع‌رسانی شد
              </div>
            )}
          </div>
        ))}
      </div>

      {/* COST FORMULA REMINDER */}
      <div className="bg-card2 border border-border rounded-xl p-3.5 text-[11px] text-muted leading-loose">
        <span className="text-text font-semibold">فرمول هزینه:</span> هزینه پست محلی × ۱.۳ + هزینه پلتفرم بین‌شهری | بسته بزرگ (نیاز خودرو): ضریب ×۱.۶ روی هزینه پیک محلی
      </div>
    </div>
  )
}