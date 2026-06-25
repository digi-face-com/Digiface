'use client'

import { useState } from 'react'
import Link from 'next/link'

type Mode = 'login' | 'register'

export default function PickAuthPage() {
  const [mode, setMode] = useState<Mode>('login')
  const [files, setFiles] = useState<Record<string, string | null>>({
    vehicleDoc: null,
    license: null,
  })

  return (
    <div className="min-h-screen bg-[#060f0a] flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-sm">
        <Link href="/" className="block text-center text-[12px] text-muted mb-4">
          ← بازگشت به سایت اصلی
        </Link>

        <div className="bg-[#0a1a12] border border-green/14 rounded-2xl p-5">
          <div className="text-center mb-5">
            <div className="w-12 h-12 bg-green rounded-xl flex items-center justify-center text-xl mx-auto mb-2">🛵</div>
            <h2 className="text-lg font-bold text-white">DiGiFACE Pick</h2>
          </div>

          {/* Tabs */}
          <div className="flex bg-white/[0.04] rounded-xl p-1 mb-4">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 rounded-[9px] text-[13px] font-semibold transition-all ${
                mode === 'login' ? 'bg-green text-[#060f0a]' : 'text-muted'
              }`}
            >
              ورود
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2.5 rounded-[9px] text-[13px] font-semibold transition-all ${
                mode === 'register' ? 'bg-green text-[#060f0a]' : 'text-muted'
              }`}
            >
              ثبت‌نام
            </button>
          </div>

          {mode === 'login' ? (
            <div className="flex flex-col gap-3">
              <input
                placeholder="یوزرنیم یا شماره موبایل"
                className="w-full bg-white/[0.04] border border-green/15 rounded-xl px-4 py-3 text-[13px] text-white outline-none focus:border-green/40 transition-colors"
              />
              <input
                type="password"
                placeholder="رمز عبور"
                className="w-full bg-white/[0.04] border border-green/15 rounded-xl px-4 py-3 text-[13px] text-white outline-none focus:border-green/40 transition-colors"
              />
              <button className="w-full bg-green text-[#060f0a] font-extrabold text-base py-3.5 rounded-xl active:scale-95 transition-transform">
                ورود
              </button>
              <div className="text-center text-[11px] text-muted">یا ورود با کد یک‌بارمصرف SMS</div>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              <FieldGreen placeholder="نام و نام خانوادگی" />
              <FieldGreen placeholder="کد ملی" dir="ltr" />
              <textarea
                placeholder="آدرس تشریحی محل سکونت"
                rows={2}
                className="w-full bg-white/[0.04] border border-green/15 rounded-xl px-4 py-3 text-[13px] text-white outline-none focus:border-green/40 transition-colors resize-none"
              />
              <FieldGreen placeholder="شماره همراه + وریفای" dir="ltr" />

              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-green/70 font-semibold">نوع وسیله</label>
                <select className="w-full bg-white/[0.04] border border-green/15 rounded-xl px-4 py-3 text-[13px] text-white outline-none">
                  <option className="bg-[#0a1a12]">موتورسیکلت</option>
                  <option className="bg-[#0a1a12]">خودرو</option>
                </select>
              </div>

              <FileUploadGreen
                label="آپلود تصویر پشت/روی کارت خودرو یا موتور"
                value={files.vehicleDoc}
                onChange={(v) => setFiles((f) => ({ ...f, vehicleDoc: v }))}
              />
              <FileUploadGreen
                label="آپلود تصویر پشت/روی گواهینامه"
                value={files.license}
                onChange={(v) => setFiles((f) => ({ ...f, license: v }))}
              />

              <FieldGreen placeholder="یوزرنیم" dir="ltr" />
              <FieldGreen placeholder="رمز عبور" dir="ltr" type="password" />

              <label className="flex items-start gap-2 bg-green/5 border border-green/15 rounded-xl px-3 py-2.5">
                <input type="checkbox" className="accent-green mt-0.5" />
                <span className="text-[11px] text-green">قرارداد پیک DiGiFACE را می‌پذیرم</span>
              </label>

              <div className="bg-green/6 border border-green/15 rounded-xl p-2.5 text-[11px] text-green/70 text-center">
                ⏳ پس از ارسال، در دست بررسی کارشناس — ۱ تا ۴ روز کاری
              </div>

              <button className="w-full bg-green text-[#060f0a] font-extrabold text-base py-3.5 rounded-xl active:scale-95 transition-transform mt-1">
                ارسال فرم
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FieldGreen({ placeholder, dir, type = 'text' }: { placeholder: string; dir?: string; type?: string }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      dir={dir as any}
      className="w-full bg-white/[0.04] border border-green/15 rounded-xl px-4 py-3 text-[13px] text-white outline-none focus:border-green/40 transition-colors"
    />
  )
}

function FileUploadGreen({ label, value, onChange }: { label: string; value: string | null; onChange: (v: string | null) => void }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] text-green/70 font-semibold">{label}</label>
      <label className="block bg-white/[0.03] border border-dashed border-green/25 rounded-xl p-3 text-center cursor-pointer">
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
          <div className="text-[11px] text-green/50">📁 انتخاب فایل</div>
        )}
      </label>
    </div>
  )
}