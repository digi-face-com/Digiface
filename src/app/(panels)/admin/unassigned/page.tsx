'use client'

import { Button, Pill, Timer } from '@/components/ui'

function formatToman(n: number) {
  return n.toLocaleString('fa-IR')
}

const unassignedOrders = [
  { id: 'DF-048', shop: 'بیوتی استور', city: 'تهران', total: 280000, reason: 'پیکی ظرف ۴ ساعت قبول نکرد', waitingHours: 4 },
  { id: 'DF-049', shop: 'مگنولیا', city: 'تهران', total: 195000, reason: 'فروشگاه ظرف ۷ ساعت تأیید نکرد', waitingHours: 7 },
]

export default function UnassignedPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">سفارشات بی‌پیک / معطل</h1>
        <p className="text-sm text-muted mt-1">سفارشاتی که از مرحله خودکار خارج شده و نیاز به پیگیری دستی دارند</p>
      </div>

      <div className="flex flex-col gap-3">
        {unassignedOrders.map((o) => (
          <div key={o.id} className="bg-orange/4 border border-orange/20 rounded-2xl p-4">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
              <div>
                <div className="text-[13px] font-bold">#{o.id} — {o.shop}</div>
                <div className="text-[11px] text-muted">{o.city} | {formatToman(o.total)} ت</div>
              </div>
              <Timer label={`${o.waitingHours} ساعت معطل`} urgent={o.waitingHours >= 7} />
            </div>
            <div className="text-[11px] text-orange mb-3">{o.reason}</div>
            <div className="flex gap-2">
              <Button size="sm">تخصیص دستی پیک</Button>
              <Button size="sm" variant="ghost">تماس با فروشگاه</Button>
              <Button size="sm" variant="danger">لغو سفارش</Button>
            </div>
          </div>
        ))}

        {unassignedOrders.length === 0 && (
          <div className="text-center py-12 text-sm text-muted bg-card border border-border rounded-2xl">
            هیچ سفارش معطلی وجود ندارد.
          </div>
        )}
      </div>

      <div className="bg-card2 border border-border rounded-xl p-3.5 text-[11px] text-muted leading-loose">
        <span className="text-text font-semibold">قوانین ارجاع:</span> همشهری — عدم تأیید فروشگاه پس از ۳:۳۰ ساعت یا عدم قبول پیک پس از ۴ ساعت. خارج‌شهر — عدم تأیید فروشگاه پس از ۳۶ ساعت.
      </div>
    </div>
  )
}