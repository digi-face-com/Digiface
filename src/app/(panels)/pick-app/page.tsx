'use client'

import { useState } from 'react'

function formatToman(n: number) {
  return n.toLocaleString('fa-IR')
}

interface AvailableOrder {
  code: string
  from: string
  to: string
  itemsCount: number
  packageSize: 'small' | 'large'
  fee: number
}

const initialOrders: AvailableOrder[] = [
  { code: 'DF-045', from: 'آرایشگاه رز — ولیعصر', to: 'ونک', itemsCount: 2, packageSize: 'small', fee: 25000 },
  { code: 'DF-044', from: 'بیوتی استور — جردن', to: 'سعادت‌آباد', itemsCount: 1, packageSize: 'large', fee: 40000 },
]

export default function PickAvailableOrdersPage() {
  const [orders, setOrders] = useState(initialOrders)
  const [accepted, setAccepted] = useState<string | null>(null)

  const acceptOrder = (code: string) => {
    setOrders((list) => list.filter((o) => o.code !== code))
    setAccepted(code)
    setTimeout(() => setAccepted(null), 2500)
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="text-[11px] text-green/50 mb-1">سفارشات محدوده شما</div>
        <h1 className="text-xl font-bold text-white">سفارشات جاری</h1>
      </div>

      {accepted && (
        <div className="bg-green/15 border border-green/30 rounded-xl p-3 text-center text-green text-[13px] font-bold">
          ✓ سفارش #{accepted} پذیرفته شد — به «سفارشات من» منتقل شد
        </div>
      )}

      {orders.length === 0 && (
        <div className="bg-[#0a1a12] border border-green/15 rounded-2xl p-8 text-center">
          <div className="text-3xl mb-2">📭</div>
          <div className="text-[13px] text-muted">در حال حاضر سفارش جدیدی در محدوده شما نیست</div>
        </div>
      )}

      {orders.map((order) => (
        <div key={order.code} className="bg-[#0a1a12] border border-green/14 rounded-2xl p-4">
          <div className="flex justify-between items-start mb-2.5">
            <div>
              <div className="text-[10px] text-green/50">#{order.code}</div>
              <div className="text-base font-bold text-white mt-0.5">{order.from} ← {order.to}</div>
            </div>
            <div
              className={`text-[10px] font-bold px-2.5 py-1.5 rounded-full border ${
                order.packageSize === 'small'
                  ? 'bg-green/12 text-green border-green/20'
                  : 'bg-blue/12 text-blue border-blue/20'
              }`}
            >
              {order.itemsCount} قلم · {order.packageSize === 'small' ? 'کوچک' : 'بزرگ · خودرو'}
            </div>
          </div>

          <div className="text-[11px] text-green/60 mb-3">📍 کد سفارش: {order.code}</div>

          <div className="flex justify-between items-center">
            <div className="text-lg font-bold text-white">
              {formatToman(order.fee)} ت
              {order.packageSize === 'large' && <span className="text-[10px] text-blue/70 mr-1">(×۱.۶)</span>}
            </div>
            <button
              onClick={() => acceptOrder(order.code)}
              className="bg-green text-[#060f0a] font-extrabold text-base px-6 py-3 rounded-xl active:scale-95 transition-transform"
            >
              انجام می‌دهم ✓
            </button>
          </div>
        </div>
      ))}

      <div className="bg-red/5 border border-red/12 rounded-xl p-3 text-[11px] text-red/70 text-center">
        ⏰ اگر ظرف ۴ ساعت سفارشی پذیرفته نشود، به کارشناس پیگیری ارجاع می‌شود
      </div>
    </div>
  )
}