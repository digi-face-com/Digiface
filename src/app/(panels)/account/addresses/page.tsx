'use client'

import { useState } from 'react'
import { Button, Pill } from '@/components/ui'

interface AddressItem {
  id: string
  label: string
  icon: string
  title: string
  city: string
  detail: string
  isDefault: boolean
}

const initialAddresses: AddressItem[] = [
  { id: '1', label: 'home', icon: '🏠', title: 'خانه', city: 'تهران', detail: 'ولیعصر، پلاک ۱۲، واحد ۳', isDefault: true },
  { id: '2', label: 'work', icon: '💼', title: 'محل کار', city: 'تهران', detail: 'ونک، خ توانیر، پلاک ۴۵', isDefault: false },
]

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(initialAddresses)
  const [showForm, setShowForm] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newCity, setNewCity] = useState('')
  const [newDetail, setNewDetail] = useState('')

  const setDefault = (id: string) => {
    setAddresses((list) => list.map((a) => ({ ...a, isDefault: a.id === id })))
  }

  const remove = (id: string) => {
    setAddresses((list) => list.filter((a) => a.id !== id))
  }

  const add = () => {
    if (!newTitle || !newCity || !newDetail) return
    setAddresses((list) => [
      ...list,
      { id: Date.now().toString(), label: 'other', icon: '📍', title: newTitle, city: newCity, detail: newDetail, isDefault: false },
    ])
    setNewTitle('')
    setNewCity('')
    setNewDetail('')
    setShowForm(false)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">آدرس‌های من</h1>
          <p className="text-sm text-muted mt-1">آدرس‌های ذخیره‌شده برای تحویل سریع‌تر — مثل اسنپ‌فود</p>
        </div>
        <Button size="sm" onClick={() => setShowForm((v) => !v)}>
          + افزودن آدرس جدید
        </Button>
      </div>

      {/* NEW ADDRESS FORM */}
      {showForm && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="text-[13px] font-bold mb-3">آدرس جدید</div>

          {/* Map placeholder */}
          <div className="bg-gradient-to-br from-[#0d1f12] to-[#0a1a0e] border border-green/15 rounded-xl h-[100px] flex items-center justify-center relative overflow-hidden mb-3">
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(52,211,153,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(52,211,153,0.05) 1px,transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
            <span className="relative z-10 text-2xl">📍</span>
            <Button size="sm" className="absolute bottom-2 right-2 z-10">انتخاب موقعیت روی نقشه</Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-muted font-semibold">عنوان آدرس</label>
              <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="input-base" placeholder="مثلاً خانه مادر" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-muted font-semibold">شهر</label>
              <input value={newCity} onChange={(e) => setNewCity(e.target.value)} className="input-base" placeholder="تهران" />
            </div>
          </div>

          <div className="flex flex-col gap-1 mb-3">
            <label className="text-[11px] text-muted font-semibold">آدرس تشریحی</label>
            <textarea value={newDetail} onChange={(e) => setNewDetail(e.target.value)} className="input-base resize-none" rows={2} placeholder="خیابان، کوچه، پلاک، واحد..." />
          </div>

          <div className="flex gap-2">
            <Button size="sm" onClick={add}>ذخیره آدرس</Button>
            <Button size="sm" variant="ghost" onClick={() => setShowForm(false)}>انصراف</Button>
          </div>
        </div>
      )}

      {/* ADDRESS LIST */}
      <div className="grid sm:grid-cols-2 gap-3">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`rounded-2xl p-4 border ${addr.isDefault ? 'bg-purple/7 border-purple/30' : 'bg-card2 border-border'}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{addr.icon}</span>
                <span className="text-[13px] font-bold">{addr.title}</span>
              </div>
              {addr.isDefault && <Pill color="green">پیش‌فرض</Pill>}
            </div>
            <div className="text-[12px] text-muted mb-3">
              {addr.city}، {addr.detail}
            </div>
            <div className="flex gap-2">
              {!addr.isDefault && (
                <button onClick={() => setDefault(addr.id)} className="text-[11px] text-purple-light hover:underline">
                  تنظیم به‌عنوان پیش‌فرض
                </button>
              )}
              <button onClick={() => remove(addr.id)} className="text-[11px] text-red hover:underline mr-auto">
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card2 border border-border rounded-xl p-3.5 text-[11px] text-muted">
        💡 فروشگاه‌های نزدیک به آدرس پیش‌فرض شما با اولویت بیشتر در صفحه اصلی و نتایج جستجو نمایش داده می‌شوند.
      </div>
    </div>
  )
}