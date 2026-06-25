'use client'

import { useState } from 'react'
import { Button, Pill } from '@/components/ui'

interface PendingShop {
  id: string
  name: string
  manager: string
  city: string
  type: string
  submittedAgo: string
}

const initialShops: PendingShop[] = [
  { id: '1', name: 'بیوتی لند', manager: 'حسین رضایی', city: 'تهران', type: 'آرایشی و بهداشتی', submittedAgo: '۲ روز پیش' },
  { id: '2', name: 'پارادایس بیوتی', manager: 'مینا کاظمی', city: 'اصفهان', type: 'مراقبت پوست', submittedAgo: '۱ روز پیش' },
]

export default function AdminShopsPage() {
  const [shops, setShops] = useState(initialShops)
  const [expanded, setExpanded] = useState<string | null>(null)

  const handle = (id: string, action: 'approve' | 'reject') => {
    setShops((list) => list.filter((s) => s.id !== id))
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">فروشگاه‌ها</h1>
        <p className="text-sm text-muted mt-1">بررسی و تأیید فروشگاه‌های جدید</p>
      </div>

      <div className="flex flex-col gap-3">
        {shops.map((shop) => (
          <div key={shop.id} className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center text-base">🏪</div>
                <div>
                  <div className="text-[13px] font-bold">{shop.name}</div>
                  <div className="text-[11px] text-muted">
                    مدیر: {shop.manager} — {shop.city} — {shop.type}
                  </div>
                  <div className="text-[10px] text-muted2 mt-0.5">ثبت: {shop.submittedAgo}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handle(shop.id, 'approve')}>تأیید</Button>
                <Button size="sm" variant="danger" onClick={() => handle(shop.id, 'reject')}>رد</Button>
                <Button size="sm" variant="ghost" onClick={() => setExpanded(expanded === shop.id ? null : shop.id)}>
                  مدارک
                </Button>
              </div>
            </div>

            {expanded === shop.id && (
              <div className="mt-3 pt-3 border-t border-border grid sm:grid-cols-2 gap-3">
                <div className="bg-card2 border border-border rounded-lg p-3 text-[11px]">
                  <div className="text-muted mb-1">مجوز فروشگاه</div>
                  <div className="text-purple-light underline cursor-pointer">📄 license_{shop.id}.pdf</div>
                </div>
                <div className="bg-card2 border border-border rounded-lg p-3 text-[11px]">
                  <div className="text-muted mb-1">بنر فروشگاه (فشرده‌شده AI)</div>
                  <div className="text-purple-light underline cursor-pointer">🖼 banner_{shop.id}.jpg</div>
                </div>
                <div className="bg-card2 border border-border rounded-lg p-3 text-[11px] sm:col-span-2">
                  <div className="text-muted mb-1">آدرس ثبت‌شده</div>
                  <div>تهران، خیابان ولیعصر، پلاک ۱۲۳</div>
                </div>
              </div>
            )}
          </div>
        ))}

        {shops.length === 0 && (
          <div className="text-center py-12 text-sm text-muted bg-card border border-border rounded-2xl">
            هیچ فروشگاهی در انتظار تأیید نیست.
          </div>
        )}
      </div>

      {/* ACTIVE SHOPS */}
      <div>
        <div className="text-[13px] font-bold mb-3">فروشگاه‌های فعال</div>
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-right p-3 text-muted font-semibold">فروشگاه</th>
                <th className="text-right p-3 text-muted font-semibold">شهر</th>
                <th className="text-right p-3 text-muted font-semibold">کمیسیون</th>
                <th className="text-right p-3 text-muted font-semibold">امتیاز</th>
                <th className="text-right p-3 text-muted font-semibold">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-purple/5 hover:bg-purple/3">
                <td className="p-3">🌹 آرایشگاه رز</td>
                <td className="p-3 text-muted">تهران</td>
                <td className="p-3">۷٪ / ۲۰٪</td>
                <td className="p-3 text-gold-2">۴.۹</td>
                <td className="p-3"><Pill color="green">فعال</Pill></td>
              </tr>
              <tr className="hover:bg-purple/3">
                <td className="p-3">💄 بیوتی استور</td>
                <td className="p-3 text-muted">مشهد</td>
                <td className="p-3">۷٪ / ۲۰٪</td>
                <td className="p-3 text-gold-2">۴.۸</td>
                <td className="p-3"><Pill color="green">فعال</Pill></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}