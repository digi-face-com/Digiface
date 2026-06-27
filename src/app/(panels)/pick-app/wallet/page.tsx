'use client'

function formatToman(n: number) {
  return n.toLocaleString('fa-IR')
}

const payouts = [
  { code: 'DF-042', status: 'paid' as const, amount: 23500 },
  { code: 'DF-041', status: 'paid' as const, amount: 31500 },
  { code: 'DF-040', status: 'pending' as const, amount: 25200 },
]

export default function PickWalletPage() {
  const net = 450000
  const gross = 535715
  const commission = gross - net // 16%

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold text-white">کیف پول</h1>

      {/* BALANCE CARD */}
      <div className="bg-gradient-to-br from-[#1e0a3c] to-[#2d1060] border border-purple/30 rounded-2xl p-5">
        <div className="text-[10px] text-gold/70 mb-1.5">موجودی (خالص دریافتی)</div>
        <div className="text-3xl font-bold text-white mb-1">{formatToman(net)} ت</div>

        <div className="border-t border-white/10 my-3" />

        <div className="flex justify-between text-[12px] mb-1.5">
          <span className="text-muted">ناخالص کارکرد</span>
          <span className="text-white">{formatToman(gross)} ت</span>
        </div>
        <div className="flex justify-between text-[12px] mb-3">
          <span className="text-muted">کمیسیون پلتفرم (۱۶٪)</span>
          <span className="text-red">-{formatToman(commission)} ت</span>
        </div>

        <button className="w-full bg-green text-[#060f0a] font-extrabold text-base py-3 rounded-xl active:scale-95 transition-transform">
          درخواست تسویه
        </button>
        <div className="text-[9px] text-green/40 text-center mt-2">
          تغییر درصد کمیسیون → اطلاع‌رسانی → نیاز به تأیید شما
        </div>
      </div>

      {/* PAYOUT HISTORY */}
      <div>
        <div className="text-[13px] font-bold text-white mb-2">سوابق پرداخت</div>
        <div className="flex flex-col gap-2">
          {payouts.map((p) => (
            <div key={p.code} className="bg-[#0a1a12] border border-green/14 rounded-xl p-3 flex items-center justify-between">
              <div className="text-[12px] text-white font-bold">#{p.code}</div>
              <div
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                  p.status === 'paid' ? 'bg-green/12 text-green border-green/20' : 'bg-orange/12 text-orange border-orange/20'
                }`}
              >
                {p.status === 'paid' ? 'پرداخت شد' : '⏳ انتظار ارزیابی'}
              </div>
              <div className={`text-[13px] font-bold ${p.status === 'paid' ? 'text-green' : 'text-orange'}`}>
                +{formatToman(p.amount)}
              </div>
            </div>
          ))}
        </div>
        <div className="text-[10px] text-muted2 mt-2 text-center">
          تایمر ۷ ساعته برای ارزیابی مشتری — پس از آن کارشناس پیگیری می‌کند
        </div>
      </div>
    </div>
  )
}