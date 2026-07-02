'use client'

import { useState } from 'react'
import { Wallet, ArrowDownLeft, ArrowUpRight, Phone, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui'

function formatToman(n: number) {
  return n.toLocaleString('fa-IR')
}

const transactions = [
  { id: '1', date: '۱۴۰۵/۰۷/۱۲', desc: 'بازگشت وجه — سفارش لغو شده #DF-039', amount: 650000, type: 'in' as const },
  { id: '2', date: '۱۴۰۵/۰۷/۱۰', desc: 'پرداخت سفارش #DF-042', amount: -360000, type: 'out' as const },
  { id: '3', date: '۱۴۰۵/۰۷/۰۸', desc: 'کش‌بک کمپین پاییزه', amount: 50000, type: 'in' as const },
]

export default function WalletPage() {
  const [showRefundForm, setShowRefundForm] = useState(false)
  const balance = 240000

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Wallet className="h-7 w-7 text-purple-light" />
          کیف پول
        </h1>
        <p className="text-sm text-muted mt-1">موجودی، تاریخچه تراکنش‌ها و بازگشت وجه</p>
      </div>

      <div className="bg-gradient-to-br from-[#1e0a3c] to-[#2d1060] border border-purple/30 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-[11px] text-gold/70 mb-1">
          <Wallet className="h-3.5 w-3.5" />
          موجودی کیف پول
        </div>
        <div className="font-display text-4xl font-bold text-white mb-4">{formatToman(balance)} ت</div>
        <Button size="sm" onClick={() => setShowRefundForm((v) => !v)}>
          درخواست بازگشت وجه به حساب بانکی
        </Button>
      </div>

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
          <div className="bg-gold/7 border border-gold/20 rounded-xl px-3 py-2.5 text-[11px] text-gold-2 mb-3 flex items-start gap-2">
            <Phone className="h-4 w-4 shrink-0 mt-0.5" />
            پس از ثبت درخواست، کارشناس برای تأیید نهایی با شما تماس می‌گیرد
          </div>
          <Button size="sm">ثبت درخواست</Button>
        </div>
      )}

      <div>
        <div className="text-[13px] font-bold mb-3">تاریخچه تراکنش‌ها</div>
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="hidden sm:block">
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

          <div className="sm:hidden divide-y divide-purple/5">
            {transactions.map((t) => {
              const TxIcon = t.type === 'in' ? ArrowDownLeft : ArrowUpRight
              return (
                <div key={t.id} className="flex items-center gap-3 p-4">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${t.type === 'in' ? 'bg-green/10 text-green' : 'bg-red/10 text-red'}`}>
                    <TxIcon className="h-4 w-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] truncate">{t.desc}</div>
                    <div className="text-[10px] text-muted2 mt-0.5">{t.date}</div>
                  </div>
                  <div className={`text-[13px] font-bold shrink-0 ${t.type === 'in' ? 'text-green' : 'text-red'}`}>
                    {t.type === 'in' ? '+' : ''}
                    {formatToman(t.amount)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="bg-card2 border border-border rounded-xl p-3.5 text-[11px] text-muted flex gap-2">
        <AlertTriangle className="h-4 w-4 shrink-0 text-orange mt-0.5" />
        در صورت عودت کالا توسط پیک، ۱.۵ برابر هزینه پیک از کیف پول کسر می‌شود. در صورت کسری موجودی، حساب منفی شده و در خرید بعدی محاسبه خواهد شد.
      </div>
    </div>
  )
}
