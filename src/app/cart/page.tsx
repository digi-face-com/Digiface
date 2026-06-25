'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar, Footer } from '@/components/layout/navbar-footer'
import { BigDataIndicator, Button, AiBadge, Phase2Badge, Pill } from '@/components/ui'

function formatToman(n: number) {
  return n.toLocaleString('fa-IR')
}

const cartItems = [
  { id: '1', name: 'کرم ضدآفتاب SPF50', shop: 'آرایشگاه رز', price: 185000, qty: 1 },
  { id: '2', name: 'سرم ویتامین C', shop: 'آرایشگاه رز', price: 240000, qty: 1 },
]

const addresses = [
  { id: '1', label: 'خانه', icon: '🏠', city: 'تهران', detail: 'ولیعصر، پلاک ۱۲', isDefault: true },
  { id: '2', label: 'محل کار', icon: '💼', city: 'تهران', detail: 'ونک، توانیر', isDefault: false },
]

const carriers = [
  { id: 'post', name: 'پست ایران', icon: '📮', eta: '۳-۵ روز کاری', color: 'blue' as const },
  { id: 'alopeyk', name: 'الوپیک', icon: '🚚', eta: '۱-۲ روز کاری', color: 'green' as const },
  { id: 'tipax', name: 'تیپاکس', icon: '📦', eta: '۲-۳ روز کاری', color: 'gold' as const },
]

export default function CartPage() {
  const [selectedAddress, setSelectedAddress] = useState('1')
  const [isIntercity, setIsIntercity] = useState(false) // toggle برای دمو
  const [selectedCarrier, setSelectedCarrier] = useState('alopeyk')

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0)
  const localShippingSmall = 25000
  const localShippingLarge = Math.round(25000 * 1.6)
  const shippingCost = isIntercity ? 0 : localShippingSmall // پستی بعداً محاسبه می‌شه

  return (
    <>
      <Navbar />
      <BigDataIndicator />

      <div className="pt-24 px-6 md:px-10 max-w-[1100px] mx-auto pb-20">
        <h1 className="font-display text-3xl font-bold mb-6">سبد خرید</h1>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
          {/* LEFT: Cart items + addresses */}
          <div className="flex flex-col gap-5">
            {/* Items */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="text-[13px] font-bold mb-3">اقلام سبد خرید</div>
              <div className="flex flex-col gap-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-card2 border border-border rounded-xl p-3 flex justify-between items-center">
                    <div>
                      <div className="text-[13px] font-semibold">{item.name}</div>
                      <div className="text-[11px] text-muted">{item.shop}</div>
                    </div>
                    <div className="text-[13px] font-bold">{formatToman(item.price)} ت</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Address selection */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="text-[13px] font-bold mb-3">آدرس تحویل</div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {addresses.map((addr) => (
                  <button
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr.id)}
                    className={`text-right p-3 rounded-xl border transition-all ${
                      selectedAddress === addr.id
                        ? 'bg-purple/8 border-purple/35'
                        : 'bg-card2 border-border hover:border-border2'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">{addr.icon}</span>
                      <span className="text-[12px] font-bold">{addr.label}</span>
                    </div>
                    <div className="text-[11px] text-muted">
                      {addr.city}، {addr.detail}
                    </div>
                    {addr.isDefault && (
                      <Pill color="green" className="mt-1.5">پیش‌فرض</Pill>
                    )}
                  </button>
                ))}
                <Link
                  href="/account/addresses"
                  className="flex flex-col items-center justify-center gap-1 p-3 rounded-xl border border-dashed border-border text-muted hover:border-border2 transition-colors"
                >
                  <span className="text-lg">＋</span>
                  <span className="text-[11px]">آدرس جدید</span>
                </Link>
              </div>

              {/* demo toggle for intercity */}
              <button
                onClick={() => setIsIntercity((v) => !v)}
                className="text-[10px] text-muted2 underline mt-1"
              >
                (دمو) تغییر به {isIntercity ? 'همشهری' : 'خارج‌شهر'}
              </button>
            </div>

            {/* SHIPPING LOGIC */}
            {!isIntercity ? (
              <div className="bg-green/5 border border-green/20 rounded-2xl p-5">
                <div className="text-[13px] font-bold text-green mb-3 flex items-center gap-2">
                  🛵 ارسال پیک — همشهری
                </div>
                <div className="flex justify-between text-[13px] mb-1.5">
                  <span>بسته کوچک / متوسط</span>
                  <span className="font-bold">{formatToman(localShippingSmall)} ت</span>
                </div>
                <div className="flex justify-between text-[13px] mb-3">
                  <span>بسته بزرگ (نیاز به خودرو)</span>
                  <span className="font-bold text-orange">×۱.۶ = {formatToman(localShippingLarge)} ت</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <AiBadge>اندازه‌گیری</AiBadge>
                  <span className="text-[11px] text-muted">اندازه بسته شما تخمین زده شد: کوچک</span>
                </div>
                <div className="text-[11px] text-muted2">
                  💡 هزینه پیک پس از زدن «تحویل گرفتم» و ارزیابی سفارش پرداخت می‌شود
                </div>

                <div className="mt-3 pt-3 border-t border-green/10 flex items-center gap-2">
                  <Phase2Badge />
                  <span className="text-[11px] text-muted">ارسال وانتی — برای B2B / کاربر ویژه</span>
                </div>
              </div>
            ) : (
              <div className="bg-blue/5 border border-blue/20 rounded-2xl p-5">
                <div className="text-[13px] font-bold text-blue mb-1">📦 ارسال به اصفهان</div>
                <div className="flex items-center gap-2 mb-3">
                  <AiBadge>خودکار</AiBadge>
                  <span className="text-[11px] text-muted">بدون نیاز به پردازش دستی کارشناس</span>
                </div>
                <div className="text-[11px] text-muted mb-2">سرویس‌های فعال (تعریف‌شده توسط ادمین برای اصفهان):</div>
                <div className="flex flex-col gap-2 mb-3">
                  {carriers.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCarrier(c.id)}
                      className={`flex justify-between items-center rounded-lg px-3 py-2 border transition-all ${
                        selectedCarrier === c.id
                          ? `bg-${c.color}/10 border-${c.color}/30`
                          : 'bg-white/[0.02] border-border'
                      }`}
                    >
                      <span className="text-[12px] font-bold">{c.icon} {c.name}</span>
                      <span className={`text-[11px] ${
                        c.color === 'blue' ? 'text-blue' : c.color === 'green' ? 'text-green' : 'text-gold-2'
                      }`}>{c.eta}</span>
                    </button>
                  ))}
                </div>
                <div className="bg-white/[0.02] border border-dashed border-border rounded-lg p-3 text-[11px] text-muted">
                  ⏳ سبد خرید ذخیره شد — قیمت نهایی ارسال محاسبه و لینک پرداخت آپدیت‌شده برای شما SMS می‌شود{' '}
                  <AiBadge>خودکار</AiBadge>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Order summary */}
          <div className="bg-card border border-border rounded-2xl p-5 h-fit sticky top-24">
            <div className="text-[13px] font-bold mb-4">خلاصه سفارش</div>
            <div className="flex flex-col gap-2 text-[13px] mb-4">
              <div className="flex justify-between">
                <span className="text-muted">جمع کالاها</span>
                <span>{formatToman(subtotal)} ت</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">هزینه ارسال</span>
                <span>{isIntercity ? 'پس از محاسبه' : `${formatToman(shippingCost)} ت`}</span>
              </div>
            </div>
            <div className="border-t border-border pt-3 mb-4 flex justify-between items-center">
              <span className="text-[13px] font-bold">مبلغ قابل پرداخت</span>
              <span className="font-display text-xl font-bold">
                {isIntercity ? formatToman(subtotal) : formatToman(subtotal + shippingCost)} ت
              </span>
            </div>

            {!isIntercity ? (
              <Button className="w-full" size="lg">پرداخت و ثبت سفارش</Button>
            ) : (
              <Button className="w-full" size="lg" variant="gold">ذخیره سبد و دریافت لینک پرداخت</Button>
            )}

            <p className="text-[10px] text-muted2 mt-3 text-center">
              پرداخت امن از طریق درگاه زرین‌پال
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}