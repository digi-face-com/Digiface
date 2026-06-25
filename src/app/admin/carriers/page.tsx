'use client'

import { useState } from 'react'
import { Button, Toggle, AiBadge } from '@/components/ui'

interface CarrierService {
  id: string
  name: string
  icon: string
  eta: string
  active: boolean
}

interface CityCarriers {
  city: string
  color: 'green' | 'blue'
  services: CarrierService[]
}

const initialData: CityCarriers[] = [
  {
    city: 'تهران',
    color: 'green',
    services: [
      { id: '1', name: 'پست ایران', icon: '📮', eta: '۳-۵ روز', active: true },
      { id: '2', name: 'الوپیک', icon: '🚚', eta: '۱-۲ روز', active: true },
      { id: '3', name: 'تیپاکس', icon: '📦', eta: '۲-۳ روز', active: false },
    ],
  },
  {
    city: 'اصفهان',
    color: 'blue',
    services: [
      { id: '4', name: 'پست ایران', icon: '📮', eta: '۳-۵ روز', active: true },
      { id: '5', name: 'الوپیک', icon: '🚚', eta: '۱-۲ روز', active: false },
    ],
  },
]

export default function CarriersPage() {
  const [data, setData] = useState(initialData)
  const [showAdd, setShowAdd] = useState<string | null>(null)

  const toggleService = (cityIdx: number, serviceId: string) => {
    setData((prev) =>
      prev.map((c, i) =>
        i === cityIdx
          ? { ...c, services: c.services.map((s) => (s.id === serviceId ? { ...s, active: !s.active } : s)) }
          : c
      )
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">سرویس‌های حمل</h1>
        <p className="text-sm text-muted mt-1">تعریف سرویس‌های فعال و زمان‌بندی برای هر شهر — استفاده در ارسال خارج‌شهر خودکار</p>
      </div>

      <div className="bg-purple/5 border border-purple/18 rounded-xl p-3.5 flex items-center gap-2">
        <AiBadge>خودکار</AiBadge>
        <span className="text-[11px] text-muted">
          سرویس‌های فعال در محاسبه و انتخاب خودکار ارسال خارج‌شهر استفاده می‌شوند — بدون نیاز به پردازش دستی
        </span>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {data.map((cityData, cityIdx) => (
          <div
            key={cityData.city}
            className={`rounded-2xl p-4 border ${
              cityData.color === 'green' ? 'bg-green/5 border-green/18' : 'bg-blue/5 border-blue/18'
            }`}
          >
            <div className={`text-[13px] font-bold mb-3 ${cityData.color === 'green' ? 'text-green' : 'text-blue'}`}>
              {cityData.city}
            </div>

            <div className="flex flex-col gap-2 mb-3">
              {cityData.services.map((s) => (
                <div key={s.id} className="flex justify-between items-center bg-white/[0.02] rounded-lg px-3 py-2">
                  <span className="text-[12px]">{s.icon} {s.name}</span>
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] text-muted">{s.eta}</span>
                    <Toggle on={s.active} onChange={() => toggleService(cityIdx, s.id)} />
                  </div>
                </div>
              ))}
            </div>

            {showAdd === cityData.city ? (
              <div className="bg-white/[0.02] rounded-lg p-2.5 flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <input className="input-base" placeholder="نام سرویس" />
                  <input className="input-base" placeholder="زمان تخمینی (مثلاً ۲-۳ روز)" />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => setShowAdd(null)}>افزودن</Button>
                  <Button size="sm" variant="ghost" onClick={() => setShowAdd(null)}>انصراف</Button>
                </div>
              </div>
            ) : (
              <Button size="sm" className="w-full" onClick={() => setShowAdd(cityData.city)}>
                + افزودن سرویس
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* SHIPMENT COST FORMULA */}
      <div className="bg-card2 border border-border rounded-xl p-3.5 text-[11px] text-muted leading-loose">
        <span className="text-text font-semibold">فرمول هزینه ارسال خارج‌شهر:</span> هزینه پست محلی × ۱.۳ + هزینه پلتفرم بین‌شهری. این محاسبه به‌صورت خودکار توسط AI انجام می‌شود و سبد خرید مشتری با لینک پرداخت آپدیت‌شده، از طریق SMS اطلاع‌رسانی می‌شود.
      </div>
    </div>
  )
}