'use client'

import Link from 'next/link'
import { Button } from '@/components/ui'

const notifications = [
  {
    id: '1',
    icon: '🎪',
    title: 'کمپین جشنواره پاییزه',
    desc: 'تخفیف ۳۰٪ | کمیسیون ۲۵٪ — می‌توانید روی همه یا بخشی از محصولاتتان تخفیف بزنید',
    time: '۲ ساعت پیش',
    type: 'campaign' as const,
    read: false,
  },
  {
    id: '2',
    icon: '⚠️',
    title: 'محصول «کرم دور چشم» به دلیل ناموجود بودن غیرفعال شد',
    desc: 'این محصول به‌صورت خودکار از صفحه فروشگاه محو شد. لطفاً پس از تأمین موجودی دوباره فعال کنید.',
    time: 'دیروز',
    type: 'product' as const,
    read: true,
  },
  {
    id: '3',
    icon: '💰',
    title: 'تغییر کمیسیون پلتفرم',
    desc: 'کمیسیون محصولات از ۷٪ به ۸٪ تغییر می‌کند. برای فعال ماندن فروشگاه، تأیید کنید.',
    time: '۳ روز پیش',
    type: 'commission' as const,
    read: true,
    needsAction: true,
  },
]

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">اطلاعیه‌ها</h1>
        <p className="text-sm text-muted mt-1">اعلان‌های مهم از پلتفرم</p>
      </div>

      <div className="flex flex-col gap-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`bg-card border rounded-2xl p-4 flex gap-3 ${!n.read ? 'border-purple/25' : 'border-border'}`}
          >
            <div className="w-9 h-9 bg-card2 rounded-lg flex items-center justify-center text-base flex-shrink-0">
              {n.icon}
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-bold mb-1">{n.title}</div>
              <div className="text-[11px] text-muted leading-relaxed mb-2">{n.desc}</div>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-[10px] text-muted2">{n.time}</span>
                {n.type === 'campaign' && (
                  <Link href="/shop-panel/campaigns">
                    <Button size="sm">اطلاعات بیشتر</Button>
                  </Link>
                )}
                {n.needsAction && (
                  <div className="flex gap-2">
                    <Button size="sm">تأیید تغییر</Button>
                  </div>
                )}
              </div>
            </div>
            {!n.read && <span className="w-2 h-2 bg-purple rounded-full flex-shrink-0 mt-1" />}
          </div>
        ))}
      </div>
    </div>
  )
}