'use client'

import { useState } from 'react'
import { Button, Pill } from '@/components/ui'

interface ViolationReport {
  id: string
  reason: string
  reporter: string
  pickId?: string
  shopId?: string
  status: 'pending' | 'resolved'
}

const initialReports: ViolationReport[] = [
  { id: '1', reason: 'رفتار ناپسند پیک', reporter: 'زهرا موسوی', pickId: 'P-12', status: 'pending' },
  { id: '2', reason: 'تحویل نگرفتم', reporter: 'سارا احمدی', pickId: 'P-08', status: 'pending' },
  { id: '3', reason: 'کیفیت محصول متفاوت با تصویر', reporter: 'مریم رضایی', shopId: 'S-04', status: 'pending' },
]

export default function ViolationsPage() {
  const [reports, setReports] = useState(initialReports)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [callMode, setCallMode] = useState<string | null>(null)

  const resolve = (id: string) => setReports((list) => list.filter((r) => r.id !== id))

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">گزارش‌های تخلف</h1>
        <p className="text-sm text-muted mt-1">بررسی ظرف ۲۴ ساعت</p>
      </div>

      <div className="flex flex-col gap-3">
        {reports.map((r) => (
          <div key={r.id} className="bg-card border border-red/15 rounded-2xl p-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-red/12 rounded-lg flex items-center justify-center text-base">⚠️</div>
                <div>
                  <div className="text-[13px] font-bold">{r.reason}</div>
                  <div className="text-[11px] text-muted">
                    گزارش‌دهنده: {r.reporter} {r.pickId && `| پیک #${r.pickId}`} {r.shopId && `| فروشگاه #${r.shopId}`}
                  </div>
                </div>
              </div>
              <div className="flex gap-1.5">
                <Button size="sm" variant="ghost" onClick={() => setExpanded(expanded === r.id ? null : r.id)}>
                  بررسی
                </Button>
                <Button size="sm" onClick={() => resolve(r.id)}>حل شد</Button>
              </div>
            </div>

            {expanded === r.id && (
              <div className="mt-3 pt-3 border-t border-red/10">
                <div className="text-[11px] text-muted mb-3">جزئیات سفارش، چت‌ها و سابقه طرفین در اینجا نمایش داده می‌شود.</div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => setCallMode(r.id)}>
                    📞 تماس + ضبط مکالمه
                  </Button>
                  <Button size="sm" variant="danger">اعمال جریمه</Button>
                </div>
                {callMode === r.id && (
                  <div className="mt-2 bg-red/4 border border-dashed border-red/15 rounded-lg p-3">
                    <div className="text-[11px] text-red mb-2">در حال تماس با کاربر — مکالمه ضبط می‌شود</div>
                    <textarea className="input-base resize-none" rows={2} placeholder="نتیجه تماس و توضیحات..." />
                    <Button size="sm" className="mt-2">ثبت نتیجه و بستن گزارش</Button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {reports.length === 0 && (
          <div className="text-center py-12 text-sm text-muted bg-card border border-border rounded-2xl">
            هیچ گزارش تخلفی در انتظار بررسی نیست.
          </div>
        )}
      </div>
    </div>
  )
}