'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Star,
  AlertTriangle,
  Info,
  Moon,
} from 'lucide-react'
import { Button, Pill, ScoreBadge, Timer } from '@/components/ui'

function formatToman(n: number) {
  return n.toLocaleString('fa-IR')
}

const userData = {
  name: 'سارا احمدی',
  totalOrders: 12,
  activeOrders: 2,
  walletBalance: 240000,
  score: 320,
  tier: 'SILVER' as const,
  tierMax: 500,
}

const activeOrder = {
  code: 'DF-045',
  status: 'on_the_way',
}

const pendingReview = {
  code: 'DF-042',
  shop: 'آرایشگاه رز',
  items: 'ماسک شبانه × ۳',
  hoursLeft: 4,
  minutesLeft: 23,
}

const orderStatusSteps = [
  { key: 'registered', label: 'ثبت', icon: CheckCircle2 },
  { key: 'shop_confirmed', label: 'تأیید فروشنده', icon: CheckCircle2 },
  { key: 'on_the_way', label: 'پیک در راه', icon: Truck },
  { key: 'delivered', label: 'تحویل', icon: Package },
]

export default function AccountDashboard() {
  const [reviewChoice, setReviewChoice] = useState<string | null>(null)
  const currentStepIdx = orderStatusSteps.findIndex((s) => s.key === activeOrder.status)

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-sm text-muted mt-1">داشبورد حساب کاربری شما</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-card2 border border-border rounded-xl p-4">
          <div className="text-xl font-extrabold text-white">{userData.totalOrders}</div>
          <div className="text-[10px] text-muted mt-0.5">سفارش کل</div>
        </div>
        <div className="bg-card2 border border-border rounded-xl p-4">
          <div className="text-xl font-extrabold text-white">{userData.activeOrders}</div>
          <div className="text-[10px] text-muted mt-0.5">در جریان</div>
        </div>
        <Link href="/account/wallet" className="bg-gradient-to-br from-[#1e0a3c] to-[#2d1060] border border-purple/30 rounded-xl p-4 hover:border-purple/50 transition-colors">
          <div className="text-[9px] text-gold/70">کیف پول</div>
          <div className="text-lg font-extrabold mt-0.5">{formatToman(userData.walletBalance)} ت</div>
          <span className="text-[10px] text-muted hover:text-text underline mt-1.5 inline-block">
            مشاهده جزئیات
          </span>
        </Link>
        <div className="bg-gradient-to-br from-[#1a1000] to-[#2a1a00] border border-gold/25 rounded-xl p-4">
          <div className="text-[9px] text-gold-2 mb-1">امتیاز من</div>
          <ScoreBadge tier={userData.tier} />
          <div className="text-[9px] text-muted mt-1.5">{userData.score} / {userData.tierMax}</div>
          <div className="bg-white/[0.08] rounded-sm h-1 mt-1 overflow-hidden">
            <div
              className="bg-gold-2 h-full rounded-sm"
              style={{ width: `${(userData.score / userData.tierMax) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-card2 border border-border rounded-xl p-3.5 text-[11px] text-muted leading-loose flex gap-2">
        <Info className="h-4 w-4 shrink-0 text-purple-light mt-0.5" />
        <p>
          <span className="text-text font-semibold">معیارهای امتیاز:</span> هر خرید (+۵) · هر ۵۰هزار تومان خرید (+۱) · ارزیابی به‌موقع سفارش (+۳) · دعوت دوست (+۲۰) · بدون تخلف ماهانه (+۲)
        </p>
      </div>

      {activeOrder && (
        <div className="bg-blue/5 border border-blue/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-[13px] font-bold text-blue mb-4">
            <MapPin className="h-4 w-4" />
            وضعیت سفارش جاری #{activeOrder.code}
          </div>
          <div className="flex items-center gap-1.5">
            {orderStatusSteps.map((step, i) => {
              const StepIcon = step.icon
              const done = i < currentStepIdx
              const active = i === currentStepIdx
              return (
                <div key={step.key} className="flex items-center flex-1 last:flex-initial">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        done
                          ? 'bg-green text-bg'
                          : active
                          ? 'bg-blue/20 border-2 border-blue text-blue'
                          : 'bg-card2 border border-border text-muted'
                      }`}
                    >
                      {done ? (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      ) : (
                        <StepIcon className="h-3.5 w-3.5" />
                      )}
                    </div>
                    <span
                      className={`text-[10px] whitespace-nowrap ${
                        done ? 'text-green' : active ? 'text-blue' : 'text-muted'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < orderStatusSteps.length - 1 && (
                    <div
                      className={`flex-1 h-px mx-1 mb-4 ${
                        i < currentStepIdx ? 'bg-green' : i === currentStepIdx ? 'border-t border-dashed border-blue' : 'bg-border'
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
          <div className="mt-3 text-[11px] text-muted2 flex items-start gap-1.5">
            <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            هزینه پیک پس از زدن «تحویل گرفتم» توسط شما و ارزیابی سفارش، پرداخت می‌شود
          </div>
        </div>
      )}

      {pendingReview && (
        <div className="bg-orange/5 border border-orange/25 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <div className="flex items-center gap-2 text-[13px] font-bold text-orange">
              <Clock className="h-4 w-4" />
              ارزیابی سفارش #{pendingReview.code}
            </div>
            <Timer label={`${pendingReview.hoursLeft.toString().padStart(2, '0')}:${pendingReview.minutesLeft.toString().padStart(2, '0')} مانده`} />
          </div>
          <div className="text-[12px] text-muted mb-3">
            {pendingReview.items} — {pendingReview.shop}
          </div>
          <div className="flex gap-2.5 flex-wrap mb-2">
            <button
              onClick={() => setReviewChoice('great')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] border transition-all ${
                reviewChoice === 'great' ? 'bg-green/15 border-green/40 text-green' : 'bg-green/8 border-green/20 hover:border-green/30'
              }`}
            >
              <Star className="h-3.5 w-3.5" />
              تجربه عالی
            </button>
            <button
              onClick={() => setReviewChoice('normal')}
              className={`px-4 py-2 rounded-lg text-[12px] border transition-all ${
                reviewChoice === 'normal' ? 'bg-card2 border-border2' : 'bg-card2 border-border'
              }`}
            >
              معمولی
            </button>
            <button
              onClick={() => setReviewChoice('report')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] border transition-all ${
                reviewChoice === 'report' ? 'bg-red/15 border-red/40 text-red' : 'bg-red/7 border-red/20 hover:border-red/30'
              }`}
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              گزارش مشکل
            </button>
          </div>
          {reviewChoice === 'report' && (
            <div className="mt-2 mb-3">
              <textarea
                placeholder="توضیح دهید چه مشکلی پیش آمده..."
                className="input-base resize-none"
                rows={2}
              />
              <div className="flex gap-2 mt-2 flex-wrap">
                <Pill color="red">تحویل نگرفتم</Pill>
                <Pill color="red">رفتار ناپسند</Pill>
                <Pill color="muted">سایر</Pill>
              </div>
            </div>
          )}
          {reviewChoice && (
            <Button size="sm" className="mt-1">ثبت نظر</Button>
          )}
          <div className="text-[10px] text-muted2 mt-3 flex items-start gap-1.5">
            <Moon className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            تایمر از ۷ شب تا ۸ صبح متوقف می‌شود (همشهری) — سفارش‌های خارج‌شهر ۹۶ ساعت فرصت دارند | پشتیبانی سفارش: ۱ هفته فعال
          </div>
        </div>
      )}

      <div className="bg-red/4 border border-red/15 rounded-2xl p-4">
        <div className="text-[12px] font-bold text-red mb-1.5">لغو سفارش</div>
        <div className="text-[11px] text-muted mb-3">امکان لغو فقط قبل از تأیید فروشنده وجود دارد</div>
        <div className="flex gap-2 flex-wrap">
          <button className="bg-red/12 text-red border border-red/25 px-3 py-1.5 rounded-lg text-[11px] font-bold hover:bg-red/18 transition-colors">
            لغو سفارش
          </button>
          <Link
            href="/account/wallet"
            className="border border-border text-muted px-3 py-1.5 rounded-lg text-[11px] hover:text-text transition-colors inline-flex items-center"
          >
            درخواست بازگشت وجه به حساب
          </Link>
        </div>
      </div>
    </div>
  )
}
