'use client'

import { useState } from 'react'
import { Button, Pill } from '@/components/ui'

export default function AdminCampaignsPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">کمپین‌ها</h1>
          <p className="text-sm text-muted mt-1">ایجاد و مدیریت کمپین‌های تخفیف پلتفرم</p>
        </div>
        <Button size="sm" onClick={() => setShowForm((v) => !v)}>+ کمپین جدید</Button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="text-[13px] font-bold mb-3">کمپین جدید</div>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-muted font-semibold">عنوان کمپین</label>
              <input className="input-base" placeholder="مثلاً جشنواره زمستانه" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-muted font-semibold">درصد تخفیف</label>
              <input className="input-base" dir="ltr" placeholder="30" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-muted font-semibold">کمیسیون ویژه کمپین (٪)</label>
              <input className="input-base" dir="ltr" placeholder="25" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-muted font-semibold">مدت (روز)</label>
              <input className="input-base" dir="ltr" placeholder="5" />
            </div>
          </div>
          <div className="flex flex-col gap-1 mb-3">
            <label className="text-[11px] text-muted font-semibold">پیام راهنما (قبل از نمایش به فروشگاه)</label>
            <textarea className="input-base resize-none" rows={3} placeholder="توضیح کامل روند شرکت در کمپین برای فروشگاه‌ها..." />
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="gold" onClick={() => setShowForm(false)}>ایجاد کمپین (پیش‌نویس)</Button>
            <Button size="sm" variant="ghost" onClick={() => setShowForm(false)}>انصراف</Button>
          </div>
        </div>
      )}

      {/* ACTIVE CAMPAIGN */}
      <div>
        <div className="text-[13px] font-bold mb-3">کمپین فعال</div>
        <div className="bg-gold/5 border border-gold/18 rounded-2xl p-4">
          <div className="flex justify-between items-center flex-wrap gap-2 mb-3">
            <div className="text-[14px] font-bold text-gold-2">🎪 جشنواره پاییزه</div>
            <Pill color="green">فعال — ۵ روز باقی‌مانده</Pill>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-card2 border border-border rounded-lg p-2.5 text-center">
              <div className="text-[10px] text-muted">تخفیف</div>
              <div className="text-[13px] font-bold">۳۰٪</div>
            </div>
            <div className="bg-card2 border border-border rounded-lg p-2.5 text-center">
              <div className="text-[10px] text-muted">کمیسیون</div>
              <div className="text-[13px] font-bold">۲۵٪</div>
            </div>
            <div className="bg-card2 border border-border rounded-lg p-2.5 text-center">
              <div className="text-[10px] text-muted">پذیرفته</div>
              <div className="text-[13px] font-bold text-green">۱۲ فروشگاه</div>
            </div>
          </div>
          <div className="text-[11px] text-muted mb-3">
            فروشندگان پذیرفته‌اند می‌توانند انتخاب کنند تخفیف روی همه یا بخشی از محصولاتشان اعمال شود.
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost">مشاهده فروشگاه‌های پذیرفته</Button>
            <Button size="sm" variant="danger">پایان زودهنگام کمپین</Button>
          </div>
        </div>
      </div>

      {/* PAST CAMPAIGNS */}
      <div>
        <div className="text-[13px] font-bold mb-3">کمپین‌های گذشته</div>
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-right p-3 text-muted font-semibold">عنوان</th>
                <th className="text-right p-3 text-muted font-semibold">تخفیف</th>
                <th className="text-right p-3 text-muted font-semibold">شرکت‌کنندگان</th>
                <th className="text-right p-3 text-muted font-semibold">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-purple/3">
                <td className="p-3">کمپین تابستانه</td>
                <td className="p-3">۱۵٪</td>
                <td className="p-3 text-muted">۸ فروشگاه</td>
                <td className="p-3"><Pill color="muted">پایان‌یافته</Pill></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}