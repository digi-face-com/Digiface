'use client'

import { useState } from 'react'
import { Button, Pill, AiBadge } from '@/components/ui'

const tickets = [
  { id: '1', aiTitle: 'مشکل در آپلود محصول', category: 'آپلود محتوا', role: 'فروشگاه', user: 'آرایشگاه رز', status: 'active' as const, time: '۲ ساعت پیش' },
  { id: '2', aiTitle: 'تأخیر در دریافت سفارش', category: 'پیک / تحویل', role: 'مشتری', user: 'سارا احمدی', status: 'active' as const, time: '۵ ساعت پیش' },
  { id: '3', aiTitle: 'سوال درباره تسویه حساب', category: 'مالی', role: 'پیک', user: 'محمد رحیمی', status: 'resolved' as const, time: 'دیروز' },
]

const categoryStats = [
  { label: 'آپلود محتوا', pct: 65, color: 'bg-purple' },
  { label: 'مالی / تسویه', pct: 40, color: 'bg-gold' },
  { label: 'پیک / تحویل', pct: 28, color: 'bg-green' },
  { label: 'سفارش', pct: 22, color: 'bg-blue' },
  { label: 'فنی', pct: 15, color: 'bg-orange' },
  { label: 'قرارداد', pct: 8, color: 'bg-red' },
  { label: 'کمپین', pct: 5, color: 'bg-purple-light' },
  { label: 'سایر', pct: 3, color: 'bg-muted' },
]

export default function AdminTicketsPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('active')

  const filtered = tickets.filter((t) => filter === 'all' || t.status === filter)

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">تیکت‌ها</h1>
        <p className="text-sm text-muted mt-1">پشتیبانی همه کاربران — دسته‌بندی خودکار AI</p>
      </div>

      {/* CATEGORY STATS */}
      <div className="bg-card2 border border-border rounded-2xl p-4">
        <div className="text-[12px] font-bold mb-3 flex items-center gap-2">
          آمار موضوعات <AiBadge>دسته‌بندی</AiBadge>
        </div>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {categoryStats.map((c) => (
            <div key={c.label} className="flex items-center justify-between">
              <span className="text-[11px]">{c.label}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-white/[0.08] rounded h-1.5 overflow-hidden">
                  <div className={`${c.color} h-full rounded`} style={{ width: `${c.pct}%` }} />
                </div>
                <span className="text-[10px] text-muted w-7">{c.pct}٪</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-[10px] text-muted2 mt-3">
          ۸ موضوع پرتکرار + گزینه «سایر» — قابل تغییر با اولویت AI بر اساس داده‌های پلتفرم
        </div>
      </div>

      {/* TICKET LIST */}
      <div className="flex gap-2">
        {(['active', 'resolved', 'all'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-[12px] font-semibold border transition-all ${
              filter === f ? 'bg-purple text-white border-purple' : 'border-border text-muted hover:text-text'
            }`}
          >
            {f === 'active' ? 'فعال' : f === 'resolved' ? 'حل‌شده' : 'همه'}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {filtered.map((t, i) => (
          <div key={t.id} className={`flex items-center justify-between p-3.5 flex-wrap gap-2 ${i < filtered.length - 1 ? 'border-b border-purple/5' : ''}`}>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[13px] font-bold">{t.aiTitle}</span>
                <AiBadge>{t.category}</AiBadge>
              </div>
              <div className="text-[11px] text-muted">{t.role}: {t.user} — {t.time}</div>
            </div>
            <div className="flex items-center gap-2">
              <Pill color={t.status === 'active' ? 'green' : 'muted'}>{t.status === 'active' ? 'فعال' : 'حل‌شده'}</Pill>
              <Button size="sm" variant="ghost">باز کردن گفتگو</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}