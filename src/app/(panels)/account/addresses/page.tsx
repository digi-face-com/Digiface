'use client'

import { useState } from 'react'
import {
  MapPin,
  Home,
  Briefcase,
  Plus,
  Trash2,
  Star,
  Info,
  Navigation,
} from 'lucide-react'
import { Button, Pill } from '@/components/ui'

interface AddressItem {
  id: string
  label: 'home' | 'work' | 'other'
  title: string
  city: string
  detail: string
  isDefault: boolean
}

const iconMap = {
  home: Home,
  work: Briefcase,
  other: MapPin,
}

const initialAddresses: AddressItem[] = [
  { id: '1', label: 'home', title: 'خانه', city: 'تهران', detail: 'ولیعصر، پلاک ۱۲، واحد ۳', isDefault: true },
  { id: '2', label: 'work', title: 'محل کار', city: 'تهران', detail: 'ونک، خ توانیر، پلاک ۴۵', isDefault: false },
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
      { id: Date.now().toString(), label: 'other', title: newTitle, city: newCity, detail: newDetail, isDefault: false },
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
          <h1 className="font-display text-2xl md:text-3xl font-bold flex items-center gap-2">
            <MapPin className="h-7 w-7 text-purple-light" />
            آدرس‌های من
          </h1>
          <p className="text-sm text-muted mt-1">آدرس‌های ذخیره‌شده برای تحویل سریع‌تر</p>
        </div>
        <Button size="sm" onClick={() => setShowForm((v) => !v)} className="inline-flex items-center gap-1.5">
          <Plus className="h-4 w-4" />
          افزودن آدرس
        </Button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="text-[13px] font-bold mb-3">آدرس جدید</div>

          <div className="bg-gradient-to-br from-[#0d1f12] to-[#0a1a0e] border border-green/15 rounded-xl h-[100px] flex items-center justify-center relative overflow-hidden mb-3">
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(52,211,153,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(52,211,153,0.05) 1px,transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
            <MapPin className="relative z-10 h-8 w-8 text-green/60" />
            <Button size="sm" className="absolute bottom-2 right-2 z-10 inline-flex items-center gap-1.5">
              <Navigation className="h-3.5 w-3.5" />
              انتخاب موقعیت روی نقشه
            </Button>
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

      <div className="grid sm:grid-cols-2 gap-3">
        {addresses.map((addr) => {
          const Icon = iconMap[addr.label]
          return (
            <div
              key={addr.id}
              className={`rounded-2xl p-4 border ${addr.isDefault ? 'bg-purple/7 border-purple/30' : 'bg-card2 border-border'}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${addr.isDefault ? 'bg-purple/20 text-purple-light' : 'bg-white/[0.04] text-muted'}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-[13px] font-bold">{addr.title}</span>
                </div>
                {addr.isDefault && <Pill color="green">پیش‌فرض</Pill>}
              </div>
              <div className="text-[12px] text-muted mb-3">
                {addr.city}، {addr.detail}
              </div>
              <div className="flex gap-3 items-center">
                {!addr.isDefault && (
                  <button
                    onClick={() => setDefault(addr.id)}
                    className="inline-flex items-center gap-1 text-[11px] text-purple-light hover:underline"
                  >
                    <Star className="h-3 w-3" />
                    تنظیم پیش‌فرض
                  </button>
                )}
                <button
                  onClick={() => remove(addr.id)}
                  className="inline-flex items-center gap-1 text-[11px] text-red hover:underline mr-auto"
                >
                  <Trash2 className="h-3 w-3" />
                  حذف
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-card2 border border-border rounded-xl p-3.5 text-[11px] text-muted flex gap-2">
        <Info className="h-4 w-4 shrink-0 text-purple-light mt-0.5" />
        فروشگاه‌های نزدیک به آدرس پیش‌فرض شما با اولویت بیشتر در صفحه اصلی و نتایج جستجو نمایش داده می‌شوند.
      </div>
    </div>
  )
}
