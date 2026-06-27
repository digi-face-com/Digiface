'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button, AiBadge, Pill } from '@/components/ui'

const shopTypes = ['آرایشی و بهداشتی', 'مراقبت پوست', 'مو و ناخن', 'عطر و ادکلن', 'سالن زیبایی', 'سایر']

export default function ShopRegisterPage() {
  const [formData, setFormData] = useState({
    managerName: '',
    nationalId: '',
    phone: '',
    shopName: '',
    shopType: '',
    addressDetail: '',
    username: '',
    password: '',
  })
  const [agreed, setAgreed] = useState(false)
  const [licenseFile, setLicenseFile] = useState<string | null>(null)
  const [bannerFile, setBannerFile] = useState<string | null>(null)

  const update = (key: string, val: string) => setFormData((f) => ({ ...f, [key]: val }))

  return (
    <div className="min-h-screen px-6 py-16 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse,rgba(201,151,58,0.1),transparent_65%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <Link href="/" className="block text-center text-[13px] text-muted hover:text-text mb-4 transition-colors">
          ← بازگشت به صفحه اصلی
        </Link>

        <div className="bg-card border border-border rounded-3xl p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="text-3xl mb-3">🏪</div>
            <h2 className="font-display text-2xl font-bold text-gold-2">ثبت‌نام فروشگاه</h2>
            <p className="text-[12px] text-muted mt-1">به شبکه فروشگاه‌های DiGiFACE بپیوندید</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-3">
              <Field label="نام و نام خانوادگی مدیر فروشگاه">
                <input
                  value={formData.managerName}
                  onChange={(e) => update('managerName', e.target.value)}
                  className="input-base"
                  placeholder="مثلاً علی محمدی"
                />
              </Field>

              <Field label="کد ملی" hint="باید با شماره تماس تطابق داشته باشد">
                <input
                  value={formData.nationalId}
                  onChange={(e) => update('nationalId', e.target.value)}
                  className="input-base"
                  dir="ltr"
                  placeholder="0123456789"
                  maxLength={10}
                />
              </Field>

              <Field label="شماره تماس">
                <div className="flex gap-2">
                  <input
                    value={formData.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    className="input-base flex-1"
                    dir="ltr"
                    placeholder="0912..."
                  />
                  <Button size="sm">وریفای</Button>
                </div>
              </Field>

              <Field label="نام فروشگاه">
                <input
                  value={formData.shopName}
                  onChange={(e) => update('shopName', e.target.value)}
                  className="input-base"
                  placeholder="مثلاً آرایشگاه رز"
                />
              </Field>

              <Field label="نوع فروشگاه">
                <select
                  value={formData.shopType}
                  onChange={(e) => update('shopType', e.target.value)}
                  className="input-base"
                >
                  <option value="">انتخاب کنید...</option>
                  {shopTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="یوزرنیم (برای ورود بدون SMS)">
                <input
                  value={formData.username}
                  onChange={(e) => update('username', e.target.value)}
                  className="input-base"
                  dir="ltr"
                  placeholder="@shopname"
                />
              </Field>

              <Field label="رمز عبور">
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => update('password', e.target.value)}
                  className="input-base"
                  dir="ltr"
                  placeholder="••••••••"
                />
              </Field>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-3">
              <Field label="آدرس فروشگاه" hint="با مکان‌یاب + توضیح تشریحی">
                <div className="bg-gradient-to-br from-[#0d1f12] to-[#0a1a0e] border border-green/15 rounded-xl h-[100px] flex items-center justify-center relative overflow-hidden mb-2">
                  <div
                    className="absolute inset-0 opacity-50"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(52,211,153,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(52,211,153,0.05) 1px,transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                  <span className="relative z-10 text-2xl">📍</span>
                  <Button size="sm" className="absolute bottom-2 right-2 z-10">
                    انتخاب موقعیت
                  </Button>
                </div>
                <textarea
                  value={formData.addressDetail}
                  onChange={(e) => update('addressDetail', e.target.value)}
                  className="input-base resize-none"
                  rows={2}
                  placeholder="آدرس تشریحی فروشگاه..."
                />
              </Field>

              <Field label="آپلود مجوز فروشگاه">
                <FileUpload value={licenseFile} onChange={setLicenseFile} accept="تصویر یا PDF" />
              </Field>

              {/* AI Compression upload */}
              <Field label="آپلود تصویر / بنر فروشگاه">
                <div className="bg-purple/5 border border-purple/20 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-[11px] font-bold">🖼 بنر فروشگاه</span>
                    <AiBadge>فشرده‌سازی</AiBadge>
                  </div>
                  <FileUpload value={bannerFile} onChange={setBannerFile} accept="حداکثر ۱۰ مگابایت" />
                  <p className="text-[10px] text-muted2 mt-2">
                    AI محتوای آپلودی را برای بایگانی فشرده می‌کند تا فضای کمتری اشغال شود.
                  </p>
                </div>
              </Field>

              <label className="flex items-start gap-2 bg-purple/5 border border-purple/20 rounded-xl px-3 py-2.5 cursor-pointer mt-1">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="accent-purple mt-0.5"
                />
                <span className="text-[11px] text-purple-light">
                  <Link href="/legal/shop-contract" className="underline">قرارداد فروشگاه DiGiFACE</Link> را
                  مطالعه کرده و می‌پذیرم
                </span>
              </label>

              <div className="bg-gold/7 border border-gold/20 rounded-xl px-3 py-2.5 text-[11px] text-gold-2 flex items-center gap-2">
                ⏳ پس از ارسال، فرم در انتظار بررسی کارشناس حضوری قرار می‌گیرد — ۱ تا ۳ روز کاری
              </div>
            </div>
          </div>

          <Button className="w-full mt-6" size="lg" variant="gold" disabled={!agreed}>
            ارسال فرم ثبت‌نام
          </Button>

          <div className="text-center text-xs text-muted2 mt-5">
            قبلاً ثبت‌نام کرده‌اید؟{' '}
            <Link href="/shop-panel" className="text-gold-2 cursor-pointer">
              ورود به پنل فروشگاه
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// ════════════════════════════════════════
// Helper components
// ════════════════════════════════════════
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] text-muted font-semibold">{label}</label>
      {children}
      {hint && <p className="text-[10px] text-muted2">{hint}</p>}
    </div>
  )
}

function FileUpload({
  value,
  onChange,
  accept,
}: {
  value: string | null
  onChange: (v: string | null) => void
  accept: string
}) {
  return (
    <label className="block bg-white/[0.03] border border-dashed border-purple/30 rounded-lg p-4 text-center cursor-pointer hover:border-purple/50 transition-colors">
      <input
        type="file"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onChange(file.name)
        }}
      />
      {value ? (
        <div className="text-[11px] text-green">✓ {value}</div>
      ) : (
        <>
          <div className="text-lg mb-1">📁</div>
          <div className="text-[10px] text-muted">{accept}</div>
        </>
      )}
    </label>
  )
}