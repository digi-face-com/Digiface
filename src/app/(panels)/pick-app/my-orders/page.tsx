'use client'

import { useState } from 'react'

type OrderStage = 'pickup' | 'delivery'

interface ActiveOrder {
  code: string
  shop: string
  stage: OrderStage
  customer?: {
    name: string
    address: string
    phone: string
  }
}

const initialOrder: ActiveOrder = {
  code: 'DF-043',
  shop: 'آرایشگاه رز',
  stage: 'pickup',
}

export default function MyOrdersPage() {
  const [order, setOrder] = useState<ActiveOrder>(initialOrder)
  const [codeInput, setCodeInput] = useState('')
  const [contactMode, setContactMode] = useState<'secure' | 'direct'>('secure')
  const [navProvider, setNavProvider] = useState<string | null>(null)
  const [returned, setReturned] = useState(false)
  const [delivered, setDelivered] = useState(false)

  const confirmPickup = () => {
    if (codeInput.trim() !== order.code) return
    setOrder({
      ...order,
      stage: 'delivery',
      customer: {
        name: 'کریمی',
        address: 'تهران، سعادت‌آباد، بلوار دریا، پلاک ۲۲',
        phone: '0912xxxxxxx',
      },
    })
  }

  if (delivered) {
    return (
      <div className="bg-[#0a1a12] border border-green/15 rounded-2xl p-8 text-center mt-10">
        <div className="text-4xl mb-3">✅</div>
        <div className="text-lg font-bold text-green mb-2">تحویل با موفقیت ثبت شد</div>
        <p className="text-[12px] text-muted leading-relaxed">
          منتظر ارزیابی مشتری بمانید. پس از ارزیابی، هزینه پیک به کیف پول شما واریز می‌شود.
        </p>
      </div>
    )
  }

  if (returned) {
    return (
      <div className="bg-red/8 border border-red/20 rounded-2xl p-8 text-center mt-10">
        <div className="text-4xl mb-3">↩️</div>
        <div className="text-lg font-bold text-red mb-2">عودت ثبت شد</div>
        <p className="text-[12px] text-red/70 leading-relaxed">
          ۱.۵ برابر هزینه پیک از کیف پول مشتری کسر و به شما پرداخت می‌شود. سفارش لغو شد.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold text-white">سفارشات من</h1>

      {/* STAGE 1: PICKUP */}
      {order.stage === 'pickup' && (
        <div className="bg-gold/6 border border-gold/20 rounded-2xl p-4">
          <div className="text-[11px] text-gold-2 font-bold mb-1.5">مرحله ۱ — تحویل از فروشگاه</div>
          <div className="text-base font-bold text-white mb-1">#{order.code} — {order.shop}</div>
          <div className="text-[11px] text-muted mb-3">کد سفارش روی بسته را با کد زیر تطبیق دهید</div>

          <input
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            placeholder="کد سفارش روی بسته را وارد کنید"
            dir="ltr"
            className="w-full bg-white/[0.04] border border-border rounded-xl px-4 py-3 text-base text-center font-bold text-white outline-none focus:border-gold/50 transition-colors mb-3"
          />

          <button
            onClick={confirmPickup}
            disabled={codeInput.trim() === ''}
            className="w-full bg-green text-[#060f0a] font-extrabold text-base py-3.5 rounded-xl active:scale-95 transition-transform disabled:opacity-40"
          >
            ✓ تحویل گرفتم از فروشگاه
          </button>
          <div className="text-[10px] text-muted2 text-center mt-2">کد صحیح: {order.code}</div>
        </div>
      )}

      {/* STAGE 2: DELIVERY */}
      {order.stage === 'delivery' && order.customer && (
        <div className="bg-green/6 border-2 border-green/25 rounded-2xl p-4">
          <div className="text-[11px] text-green font-bold mb-2">مرحله ۲ — اطلاعات مشتری</div>

          <div className="bg-green/4 border border-green/12 rounded-xl p-3 mb-3">
            <div className="text-base font-bold text-white mb-1">{order.customer.name}</div>
            <div className="text-[12px] text-green/70 mb-1">{order.customer.address}</div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setContactMode('secure')}
                className={`text-[11px] px-3 py-1.5 rounded-lg border transition-all ${
                  contactMode === 'secure' ? 'bg-green/15 border-green/30 text-green' : 'bg-card2 border-border text-muted'
                }`}
              >
                📞 تماس امن
              </button>
              <button
                onClick={() => setContactMode('direct')}
                className={`text-[11px] px-3 py-1.5 rounded-lg border transition-all ${
                  contactMode === 'direct' ? 'bg-green/15 border-green/30 text-green' : 'bg-card2 border-border text-muted'
                }`}
              >
                مستقیم (انتخاب مشتری)
              </button>
            </div>
          </div>

          {/* MAP */}
          <div className="bg-gradient-to-br from-[#0d1f12] to-[#0a1a0e] border border-green/15 rounded-xl h-[110px] flex items-center justify-center relative overflow-hidden mb-3">
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(52,211,153,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(52,211,153,0.05) 1px,transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
            <span className="relative z-10 text-2xl">🛵</span>
          </div>

          {/* NAVIGATOR CHOICE */}
          <div className="text-[10px] text-muted mb-1.5">مسیریاب — انتخاب کنید:</div>
          <div className="flex gap-1.5 mb-3">
            {[
              { id: 'neshan', label: '🗺 نشان', color: 'green' },
              { id: 'balad', label: '📍 بلد', color: 'blue' },
              { id: 'google', label: '🌍 Google', color: 'muted' },
            ].map((n) => (
              <button
                key={n.id}
                onClick={() => setNavProvider(n.id)}
                className={`flex-1 text-[11px] py-2 rounded-lg border transition-all ${
                  navProvider === n.id
                    ? n.color === 'green'
                      ? 'bg-green/15 border-green/30 text-green'
                      : n.color === 'blue'
                      ? 'bg-blue/15 border-blue/30 text-blue'
                      : 'bg-white/10 border-white/20'
                    : 'bg-card2 border-border text-muted'
                }`}
              >
                {n.label}
              </button>
            ))}
          </div>

          {/* TIMER */}
          <div className="bg-orange/10 border border-orange/25 rounded-lg py-2 text-center text-[12px] font-bold text-orange mb-3">
            ⏱ تحویل دادن: ۲:۴۸ مانده
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setDelivered(true)}
              className="flex-1 bg-green text-[#060f0a] font-extrabold text-base py-3.5 rounded-xl active:scale-95 transition-transform"
            >
              ✓ تحویل دادم
            </button>
            <button
              onClick={() => setReturned(true)}
              className="bg-red/12 text-red border border-red/25 px-4 py-3.5 rounded-xl text-sm font-bold active:scale-95 transition-transform"
            >
              عودت
            </button>
          </div>
          <div className="text-[9px] text-green/40 text-center mt-2">
            تحویل دادم → مشتری ارزیابی می‌کند → هزینه پیک پرداخت می‌شود
          </div>
        </div>
      )}

      {/* RETURN POLICY */}
      <div className="bg-red/4 border border-red/12 rounded-xl p-3">
        <div className="text-[11px] text-red font-bold mb-1">⚠️ قانون عودت</div>
        <div className="text-[10px] text-red/65 leading-relaxed">
          ×۱.۵ هزینه پیک از کیف پول مشتری کسر می‌شود. اگر موجودی مشتری ناکافی باشد، حساب او منفی شده و در خرید بعدی فاکتور می‌شود. شما پس از واریز مشتری پرداخت دریافت می‌کنید.
        </div>
      </div>
    </div>
  )
}