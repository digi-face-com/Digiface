'use client'

import { useState } from 'react'
import { Button, Pill, Toggle } from '@/components/ui'

interface AdminUser {
  id: string
  name: string
  phone: string
  permissions: Record<string, boolean>
  isSuperAdmin: boolean
}

const permissionLabels: Record<string, string> = {
  shops: 'فروشگاه‌ها',
  picks: 'پیک‌ها',
  finance: 'مالی',
  campaigns: 'کمپین‌ها',
  violations: 'تخلفات',
  tickets: 'تیکت‌ها',
  cities: 'مدیریت شهرها',
}

const initialAdmins: AdminUser[] = [
  {
    id: '1',
    name: 'احمدی (شما)',
    phone: '0912xxxxxxx',
    isSuperAdmin: false,
    permissions: { shops: true, picks: true, finance: false, campaigns: true, violations: true, tickets: true, cities: false },
  },
  {
    id: '2',
    name: 'رضوانی',
    phone: '0935xxxxxxx',
    isSuperAdmin: false,
    permissions: { shops: true, picks: false, finance: true, campaigns: false, violations: false, tickets: true, cities: false },
  },
]

export default function AdminAccessPage() {
  const [admins, setAdmins] = useState(initialAdmins)
  const [showAdd, setShowAdd] = useState(false)

  const togglePermission = (adminId: string, key: string) => {
    setAdmins((list) =>
      list.map((a) => (a.id === adminId ? { ...a, permissions: { ...a.permissions, [key]: !a.permissions[key] } } : a))
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">دسترسی‌ها</h1>
          <p className="text-sm text-muted mt-1">تعریف دسترسی کارشناسان — فقط مدیر اصلی</p>
        </div>
        <Button size="sm" onClick={() => setShowAdd((v) => !v)}>+ افزودن کارشناس</Button>
      </div>

      <div className="bg-red/4 border border-red/14 rounded-xl p-3.5 text-[11px] text-red leading-loose">
        🔐 هر کارشناس با یوزر اختصاصی و ورود با شماره موبایل وارد می‌شود. تمام فعالیت‌های ادمین در Audit Log ثبت می‌شود و قابل بازبینی است.
      </div>

      {showAdd && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="text-[13px] font-bold mb-3">کارشناس جدید</div>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <input className="input-base" placeholder="نام و نام خانوادگی" />
            <input className="input-base" dir="ltr" placeholder="شماره موبایل" />
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => setShowAdd(false)}>ایجاد و ارسال دعوت‌نامه</Button>
            <Button size="sm" variant="ghost" onClick={() => setShowAdd(false)}>انصراف</Button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {admins.map((admin) => (
          <div key={admin.id} className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-[13px] font-bold">{admin.name}</div>
                <div className="text-[11px] text-muted" dir="ltr">{admin.phone}</div>
              </div>
              {admin.isSuperAdmin && <Pill color="gold">مدیر اصلی</Pill>}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.entries(permissionLabels).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between bg-card2 border border-border rounded-lg px-2.5 py-2">
                  <span className="text-[11px]">{label}</span>
                  <Toggle on={admin.permissions[key]} onChange={() => togglePermission(admin.id, key)} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* AUDIT LOG */}
      <div>
        <div className="text-[13px] font-bold mb-3">آخرین فعالیت‌ها (Audit Log)</div>
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="flex justify-between p-3 border-b border-purple/5 text-[11px]">
            <span>احمدی تأیید کرد: فروشگاه «بیوتی لند»</span>
            <span className="text-muted2">۲ دقیقه پیش</span>
          </div>
          <div className="flex justify-between p-3 border-b border-purple/5 text-[11px]">
            <span>رضوانی تغییر داد: کمیسیون فروشگاه #۱۲ به ۸٪</span>
            <span className="text-muted2">۱ ساعت پیش</span>
          </div>
          <div className="flex justify-between p-3 text-[11px]">
            <span>احمدی رد کرد: پیک «جواد محمدی»</span>
            <span className="text-muted2">۳ ساعت پیش</span>
          </div>
        </div>
      </div>
    </div>
  )
}