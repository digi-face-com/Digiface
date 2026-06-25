'use client'

import { useState } from 'react'
import { Button, Pill, Timer } from '@/components/ui'

function formatToman(n: number) {
  return n.toLocaleString('fa-IR')
}

const statusConfig: Record<string, { label: string; color: 'blue' | 'orange' | 'green' | 'red' | 'muted' }> = {
  pending: { label: 'منتظر تأیید', color: 'orange' },
  confirmed: { label: 'تأیید شده — در جستجوی پیک', color: 'blue' },
  out_for_delivery: { label: 'در حال ارسال', color: 'blue' },
  delivered: { label: 'تحویل شده', color: 'green' },
  completed: { label: 'تکمیل شده', color: 'green' },
  cancelled: { label: 'لغو شده', color: 'red' },
}

const orders = [
  { id: 'DF-045', customer: 'سارا احمدی', items: 'باکس مراقبت + سرم ویتامین C', total: 420000, status: 'pending', type: 'local' as const, time: '۱۰ دقیقه پیش', deadline: { h: 6, m: 30 } },
  { id: 'DF-044', customer: 'مریم رضایی', items: 'کرم ضدآفتاب × ۲', total: 370000, status: 'confirmed', type: 'local' as const, time: '۱ ساعت پیش' },
  { id: 'DF-043', customer: 'نگین کریمی', items: 'باکس هدیه ویژه', total: 650000, status: 'out_for_delivery', type: 'intercity' as const, time: '۳ ساعت پیش', deadline: { h: 28, m: 0 } },
  { id: 'DF-042', customer: 'فاطمه نوری', items: 'ماسک شبانه × ۳', total: 360000, status: 'delivered', type: 'local' as const, time: 'دیروز' },
  { id: 'DF-041', customer: 'زهرا موسوی', items: 'سرم ویتامین C + تونر', total: 385000, status: 'completed', type: 'local' as const, time: '۲ روز پیش' },
]

const tabs = [
  { key: 'pending', label: 'در انتظار تأیید' },
  { key: 'active', label: 'در جریان' },
  { key: 'completed', label: 'تکمیل‌شده' },
]

export default function ShopOrdersPage() {
  const [tab, setTab] = useState('pending')

  const filtered = orders.filter((o) => {
    if (tab === 'pending') return o.status === 'pending'
    if (tab === 'active') return ['confirmed', 'out_for_delivery'].includes(o.status)
    if (tab === 'completed') return ['delivered', 'completed', 'cancelled'].includes(o.status)
    return true
  })

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">سفارشات</h1>
        <p className="text-sm text-muted mt-1">مدیریت سفارشات جاری و گذشته</p>
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
            {t.key === 'pending' && <span className="ml-1.5 bg-red text-white text-[9px] px-1.5 py-0.5 rounded">1</span>}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((order) => {
          const sc = statusConfig[order.status]
          return (
            <div key={order.id} className="bg-card border border-border rounded-2xl p-4">
              <div className="flex items-start justify-between flex-wrap gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-purple/10 rounded-lg flex items-center justify-center text-[11px] font-bold text-purple-light flex-shrink-0">
                    #{order.id.split('-')[1]}
                  </div>
                  <div>
                    <div className="text-[13px] font-bold">{order.customer}</div>
                    <div className="text-[11px] text-muted">{order.items}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {order.type === 'intercity' && <Pill color="blue">خارج‌شهر</Pill>}
                  <Pill color={sc.color}>{sc.label}</Pill>
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="text-[13px] font-bold">{formatToman(order.total)} ت</div>
                <div className="flex items-center gap-2">
                  {order.time && <span className="text-[10px] text-muted2">{order.time}</span>}
                  {order.deadline && (
                    <Timer
                      label={
                        order.type === 'local'
                          ? `${order.deadline.h}:${order.deadline.m.toString().padStart(2, '0')} از ۷ ساعت`
                          : `${order.deadline.h}h از ۳۶ ساعت (خارج‌شهر)`
                      }
                      urgent={order.deadline.h < 1}
                    />
                  )}
                </div>
              </div>

              {order.status === 'pending' && (
                <div className="flex gap-2 mt-3">
                  <Button size="sm">تأیید سفارش</Button>
                  <button className="bg-red/12 text-red border border-red/25 px-3 py-1.5 rounded-md text-[11px] font-bold hover:bg-red/18 transition-colors">
                    رد با توضیح
                  </button>
                </div>
              )}
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-sm text-muted bg-card border border-border rounded-2xl">
            سفارشی در این دسته یافت نشد.
          </div>
        )}
      </div>

      {/* TIMER RULES */}
      <div className="bg-card2 border border-border rounded-xl p-3.5 text-[11px] text-muted leading-loose">
        <span className="text-text font-semibold">قوانین تایمر:</span> همشهری ۷ ساعت برای تأیید — اگر ۳:۳۰ گذشت، به‌صورت موازی به ادمین هم اطلاع می‌رود. خارج‌شهر ۳۶ ساعت فرصت دارد. عدم تأیید کامل ظرف زمان → سفارش به میز ادمین ارجاع می‌شود.
      </div>
    </div>
  )
}