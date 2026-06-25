'use client'

import { useState } from 'react'
import { Button, Pill, Toggle } from '@/components/ui'

interface PendingPick {
  id: string
  name: string
  vehicle: string
  city: string
  submittedAgo: string
}

const initialPicks: PendingPick[] = [
  { id: '1', name: 'علی محمدی', vehicle: 'موتورسیکلت', city: 'تهران', submittedAgo: '۲ روز پیش' },
  { id: '2', name: 'رضا کریمی', vehicle: 'خودرو', city: 'تهران', submittedAgo: '۱ روز پیش' },
  { id: '3', name: 'حسن نوری', vehicle: 'موتورسیکلت', city: 'اصفهان', submittedAgo: '۳ روز پیش' },
]

const activePicks = [
  { id: '1', name: 'محمد رحیمی', city: 'تهران', vehicle: 'موتورسیکلت', rating: 4.8, intercitySelected: true, checksSelected: false },
  { id: '2', name: 'سعید توکلی', city: 'اصفهان', vehicle: 'خودرو', rating: 4.6, intercitySelected: true, checksSelected: true },
]

export default function AdminPicksPage() {
  const [pending, setPending] = useState(initialPicks)
  const [active, setActive] = useState(activePicks)

  const handle = (id: string) => setPending((list) => list.filter((p) => p.id !== id))

  const toggleField = (id: string, field: 'intercitySelected' | 'checksSelected') => {
    setActive((list) => list.map((p) => (p.id === id ? { ...p, [field]: !p[field] } : p)))
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">پیک‌ها</h1>
        <p className="text-sm text-muted mt-1">تأیید پیک‌های جدید و مدیریت پیک‌های منتخب</p>
      </div>

      {/* PENDING */}
      <div>
        <div className="text-[13px] font-bold mb-3">پیک‌های منتظر تأیید</div>
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {pending.map((p, i) => (
            <div key={p.id} className={`flex items-center gap-3 p-3.5 ${i < pending.length - 1 ? 'border-b border-purple/5' : ''}`}>
              <div className="w-9 h-9 bg-green/10 rounded-lg flex items-center justify-center text-base">
                {p.vehicle === 'موتورسیکلت' ? '🛵' : '🚗'}
              </div>
              <div className="flex-1">
                <div className="text-[12px] font-bold">{p.name}</div>
                <div className="text-[10px] text-muted">{p.vehicle} — {p.city} | ثبت: {p.submittedAgo}</div>
              </div>
              <div className="flex gap-1.5">
                <Button size="sm" onClick={() => handle(p.id)}>تأیید</Button>
                <Button size="sm" variant="danger" onClick={() => handle(p.id)}>رد</Button>
                <Button size="sm" variant="ghost">مدارک</Button>
              </div>
            </div>
          ))}
          {pending.length === 0 && (
            <div className="text-center py-10 text-sm text-muted">پیکی در انتظار تأیید نیست.</div>
          )}
        </div>
      </div>

      {/* ACTIVE PICKS — selected for intercity/checks */}
      <div>
        <div className="text-[13px] font-bold mb-3">پیک‌های فعال — مدیریت انتخاب</div>
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-right p-3 text-muted font-semibold">پیک</th>
                <th className="text-right p-3 text-muted font-semibold">شهر</th>
                <th className="text-right p-3 text-muted font-semibold">امتیاز</th>
                <th className="text-right p-3 text-muted font-semibold">پیک منتخب خارج‌شهر</th>
                <th className="text-right p-3 text-muted font-semibold">
                  پیک منتخب چک (فاز ۲)
                </th>
              </tr>
            </thead>
            <tbody>
              {active.map((p, i) => (
                <tr key={p.id} className={i < active.length - 1 ? 'border-b border-purple/5' : ''}>
                  <td className="p-3">{p.vehicle === 'موتورسیکلت' ? '🛵' : '🚗'} {p.name}</td>
                  <td className="p-3 text-muted">{p.city}</td>
                  <td className="p-3 text-gold-2">{p.rating}</td>
                  <td className="p-3"><Toggle on={p.intercitySelected} onChange={() => toggleField(p.id, 'intercitySelected')} /></td>
                  <td className="p-3"><Toggle on={p.checksSelected} onChange={() => toggleField(p.id, 'checksSelected')} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-[10px] text-muted2 mt-2">
          پیک منتخب خارج‌شهر: نوتیفیکیشن سفارش‌های خارج‌شهر فقط برای این پیک‌ها ارسال می‌شود | پیک منتخب چک (فاز ۲): مسئول کارهای اداری چک‌های کاربر ویژه در شهر
        </div>
      </div>
    </div>
  )
}