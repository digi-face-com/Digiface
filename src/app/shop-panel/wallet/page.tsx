'use client'

import { useState } from 'react'
import { Button } from '@/components/ui'

function formatToman(n: number) {
  return n.toLocaleString('fa-IR')
}

const transactions = [
  { id: '1', date: '۱۴۰۵/۰۷/۱۲', desc: 'واریز سفارش #DF-042', amount: 610000, type: 'in' },
  { id: '2', date: '۱۴۰۵/۰۷/۱۱', desc: 'واریز سفارش #DF-041', amount: 357000, type: 'in' },
  { id: '3', date: '۱۴۰۵/۰۷/۱۰', desc: 'برداشت — تسویه هفتگی', amount: -5000000, type: 'out' },
  { id: '4', date: '۱۴۰۵/۰۷/۰۸', desc: 'واریز سفارش #DF-038', amount: 245000, type: 'in' },
]

export default function ShopWalletPage() {
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [showBankChange, setShowBankChange] = useState(false)
  const [step2FA, setStep2FA] = useState(false)
  const balance = 8200000

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">کیف پول</h1>
        <p className="text-sm text-muted mt-1">موجودی، تسویه و تاریخچه تراکنش‌ها</p>
      </div>

      <div className="bg-gradient-to-br from-[#1e0a3c] to-[#2d1060] border border-purple/30 rounded-2xl p-6">
        <div className="text-[11px] text-gold/70 mb-1">موجودی کیف پول فروشگاه</div>
        <div className="font-display text-4xl font-bold text-white mb-4">{formatToman(balance)} ت</div>
        <div className="flex gap-2 flex-wrap">
          <Button size="sm" onClick={() => setShowWithdraw((v) => !v)}>درخواست برداشت</Button>
          <Button size="sm" variant="ghost" onClick={() => setShowBankChange((v) => !v)}>تغییر حساب بانکی (۲FA)</Button>
        </div>
      </div>

      {/* WITHDRAWAL FORM */}
      {showWithdraw && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="text-[13px] font-bold mb-3">درخواست برداشت</div>
          <div className="flex flex-col gap-1 mb-3">
            <label className="text-[11px] text-muted font-semibold">مبلغ درخواستی (تومان)</label>
            <input className="input-base" dir="ltr" placeholder={balance.toString()} />
          </div>
          <div className="text-[11px] text-muted mb-3">واریز به حساب ثبت‌شده فروشگاه طی ۲۴ تا ۴۸ ساعت کاری انجام می‌شود.</div>
          <Button size="sm">ثبت درخواست</Button>
        </div>
      )}

      {/* BANK CHANGE — 2FA */}
      {showBankChange && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="text-[13px] font-bold mb-3">تغییر حساب بانکی — تأیید دو مرحله‌ای</div>
          {!step2FA ? (
            <>
              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-muted font-semibold">شماره شبا جدید</label>
                  <input className="input-base" dir="ltr" placeholder="IR..." />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-muted font-semibold">به نام</label>
                  <input className="input-base" placeholder="نام صاحب حساب" />
                </div>
              </div>
              <Button size="sm" onClick={() => setStep2FA(true)}>ارسال کد تأیید</Button>
            </>
          ) : (
            <>
              <p className="text-[12px] text-muted mb-3">کد تأیید به شماره ثبت‌شده شما ارسال شد. لطفاً کد را وارد کنید:</p>
              <div className="flex gap-2 justify-center mb-3" dir="ltr">
                {[...Array(6)].map((_, i) => (
                  <input key={i} maxLength={1} className="w-10 h-12 bg-white/[0.04] border border-border rounded-lg text-center text-lg font-bold outline-none focus:border-purple transition-colors" />
                ))}
              </div>
              <Button size="sm">تأیید و ذخیره</Button>
            </>
          )}
        </div>
      )}

      {/* HISTORY */}
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

      {/* COMMISSION INFO */}
      <div className="bg-card2 border border-border rounded-xl p-3.5 text-[11px] text-muted leading-loose">
        <span className="text-text font-semibold">کمیسیون فعلی:</span> محصولات ۷٪ — باکس‌ها ۲۰٪. در صورت تغییر کمیسیون، پیش از اعمال به شما اطلاع‌رسانی می‌شود و برای فعال ماندن فروشگاه باید تأیید کنید.
      </div>
    </div>
  )
}