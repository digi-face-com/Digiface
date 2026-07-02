'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Package, ChevronLeft } from 'lucide-react'
import { Pill } from '@/components/ui'

function formatToman(n: number) {
  return n.toLocaleString('fa-IR')
}

const statusConfig: Record<string, { label: string; color: 'blue' | 'orange' | 'green' | 'red' | 'muted' }> = {
  pending_shop: { label: 'منتظر تأیید فروشنده', color: 'orange' },
  on_the_way: { label: 'در راه است', color: 'blue' },
  delivered: { label: 'تحویل شده', color: 'green' },
  completed: { label: 'تکمیل شده', color: 'green' },
  cancelled: { label: 'لغو شده', color: 'red' },
}

const orders = [
  { id: 'DF-045', shop: 'آرایشگاه رز', items: 'باکس مراقبت + سرم ویتامین C', total: 420000, status: 'on_the_way', date: '۱۰ دقیقه پیش' },
  { id: 'DF-044', shop: 'بیوتی استور', items: 'کرم ضدآفتاب × ۲', total: 370000, status: 'pending_shop', date: '۱ ساعت پیش' },
  { id: 'DF-042', shop: 'آرایشگاه رز', items: 'ماسک شبانه × ۳', total: 360000, status: 'delivered', date: 'دیروز' },
  { id: 'DF-041', shop: 'آرایشگاه رز', items: 'سرم ویتامین C + تونر', total: 385000, status: 'completed', date: '۲ روز پیش' },
  { id: 'DF-039', shop: 'گلدن بیوتی', items: 'باکس هدیه ویژه', total: 650000, status: 'cancelled', date: '۵ روز پیش' },
]

const tabs = [
  { key: 'all', label: 'همه' },
  { key: 'active', label: 'در جریان' },
  { key: 'completed', label: 'تکمیل‌شده' },
]

export default function OrdersPage() {
  const [tab, setTab] = useState('all')

  const filtered = orders.filter((o) => {
    if (tab === 'all') return true
    if (tab === 'active') return ['pending_shop', 'on_the_way'].includes(o.status)
    if (tab === 'completed') return ['delivered', 'completed', 'cancelled'].includes(o.status)
    return true
  })

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Package className="h-7 w-7 text-purple-light" />
          سفارشات من
        </h1>
        <p className="text-sm text-muted mt-1">تاریخچه کامل خریدها و سفارشات جاری</p>
      </div>

      <div className="flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-[12px] font-semibold border transition-all ${
              tab === t.key ? 'bg-purple text-white border-purple' : 'border-border text-muted hover:text-text'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {filtered.map((order, i) => {
          const sc = statusConfig[order.status]
          return (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className={`flex items-center gap-3 px-4 py-3.5 hover:bg-purple/3 transition-colors ${
                i < filtered.length - 1 ? 'border-b border-purple/5' : ''
              }`}
            >
              <div className="w-9 h-9 bg-purple/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="h-4 w-4 text-purple-light" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold truncate">{order.items}</div>
                <div className="text-[11px] text-muted">{order.shop} · #{order.id.split('-')[1]}</div>
              </div>
              <div className="text-left flex-shrink-0">
                <div className="text-[13px] font-bold">{formatToman(order.total)} ت</div>
                <div className="text-[10px] text-muted2">{order.date}</div>
              </div>
              <Pill color={sc.color}>{sc.label}</Pill>
              <ChevronLeft className="h-4 w-4 text-muted2 shrink-0 hidden sm:block" />
            </Link>
          )
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-sm text-muted">سفارشی در این دسته یافت نشد.</div>
        )}
      </div>
    </div>
  )
}
