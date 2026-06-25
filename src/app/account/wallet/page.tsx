'use client'

import { useState } from 'react'
import { Button, Pill } from '@/components/ui'

function formatToman(n: number) {
  return n.toLocaleString('fa-IR')
}

const transactions = [
  { id: '1', date: '۱۴۰۵/۰۷/۱۲', desc: 'بازگشت وجه — سفارش لغو شده #DF-039', amount: 650000, type: 'in' },
  { id: '2', date: '۱۴۰۵/۰۷/۱۰', desc: 'پرداخت سفارش #DF-042', amount: -360000, type: 'out' },
  { id: '3', date: '۱۴۰۵/۰۷/۰۸', desc: 'کش‌بک کمپین پاییزه', amount: 50000, type: 'in' },
]

export default function WalletPage() {
  const [showRefundForm, setShowRefundForm] = useState(false)
  const balance = 240000

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">کیف پول</h1>
        <p className="text-sm text-muted mt-1">موجودی، تاریخچه تراکنش‌ها و بازگشت وجه</p>
      </div>

      {/* Balance card */}
      <div className="bg-gradient-to-br from-[#1e0a3c] to-[#2d1060] border border-purple/30 rounded-2xl p-6">
        <div className="text-[11px] text-gold/70 mb-1">موجودی کیف پول</div>
        <div className="font-display text-4xl font-bold text-white mb-4">{formatToman(balance)} ت</div>
        <div className="flex gap-2 flex-wrap">
          <Button size="sm" onClick={() => setShowRefundForm((v) => !v)}>
            درخواست بازگشت وجه به حساب بانکی
          </Button>
        </div>
      </div>

      {/* Refund request form */}
      {showRefundForm && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="text-[13px] font-bold mb-3">درخواست بازگشت وجه</div>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-muted font-semibold">شماره شبا</label>
              <input className="input-base" dir="ltr" placeholder="IR..." />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-muted font-semibold">به نام</label>
              <input className="input-base" placeholder="نام صاحب حساب" />
            </div>
          </div>
          <div className="flex flex-col gap-1 mb-3">
            <label className="text-[11px] text-muted font-semibold">مبلغ درخواستی</label>
            <input className="input-base" dir="ltr" placeholder={balance.toString()} />
          </div>
          <div className="bg-gold/7 border border-gold/20 rounded-xl px-3 py-2.5 text-[11px] text-gold-2 mb-3">
            📞 پس از ثبت درخواست، کارشناس برای تأیید نهایی با شما تماس می‌گیرد
          </div>
          <Button size="sm">ثبت درخواست</Button>
        </div>
      )}

      {/* Transaction history */}
      <div>
        <div className="text-[13px] font-bold mb-3">تاریخچه تراکنش‌ها</div>
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-right p-3 text-muted font-semibold">تاریخ</th>
                <th className="text-right p-3 text-muted font-semibold">شرح</th>
                <th className="text-right p-3 text-muted font-semibold">مبلغ</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b border-purple/5 last:border-none hover:bg-purple/3">
                  <td className="p-3 text-muted">{t.date}</td>
                  <td className="p-3">{t.desc}</td>
                  <td className={`p-3 font-bold ${t.type === 'in' ? 'text-green' : 'text-red'}`}>
                    {t.type === 'in' ? '+' : ''}
                    {formatToman(t.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-card2 border border-border rounded-xl p-3.5 text-[11px] text-muted">
        ⚠️ توجه: در صورت عودت کالا توسط پیک، ۱.۵ برابر هزینه پیک از کیف پول کسر می‌شود. در صورت کسری موجودی، حساب منفی شده و در خرید بعدی محاسبه خواهد شد.
      </div>
    </div>
  )
}