'use client'

const eventTypes = [
  { label: 'بازدید صفحه', count: '۱۲,۴۵۶', icon: '👁' },
  { label: 'جستجو', count: '۸,۲۳۴', icon: '🔍' },
  { label: 'افزودن به سبد', count: '۱,۱۲۸', icon: '🛒' },
  { label: 'مشاهده فروشگاه', count: '۴,۸۹۰', icon: '🏪' },
  { label: 'مشاهده باکس', count: '۲,۳۴۰', icon: '🎁' },
  { label: 'چت با دستیار AI', count: '۶۷۸', icon: '🤖' },
]

const topSearches = [
  { term: 'کرم ضدآفتاب', count: 892 },
  { term: 'سرم ویتامین C', count: 654 },
  { term: 'باکس هدیه', count: 521 },
  { term: 'عطر زنانه', count: 445 },
  { term: 'ماسک مو', count: 312 },
]

export default function BigDataPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">📊 Big Data — رفتار کاربران</h1>
        <p className="text-sm text-muted mt-1">تحلیل رویدادهای ثبت‌شده برای بهینه‌سازی پلتفرم</p>
      </div>

      {/* EVENT GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {eventTypes.map((e) => (
          <div key={e.label} className="bg-card2 border border-border rounded-xl p-4 text-center">
            <div className="text-xl mb-1.5">{e.icon}</div>
            <div className="text-lg font-extrabold text-white">{e.count}</div>
            <div className="text-[10px] text-muted mt-0.5">{e.label} — امروز</div>
          </div>
        ))}
      </div>

      {/* TOP SEARCHES */}
      <div>
        <div className="text-[13px] font-bold mb-3">پرسرچ‌ترین عبارات هفته</div>
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {topSearches.map((s, i) => (
            <div key={s.term} className={`flex items-center justify-between p-3 ${i < topSearches.length - 1 ? 'border-b border-purple/5' : ''}`}>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-muted2 w-5">{i + 1}.</span>
                <span className="text-[12px]">{s.term}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-white/[0.08] rounded h-1.5 overflow-hidden">
                  <div className="bg-purple h-full rounded" style={{ width: `${(s.count / 892) * 100}%` }} />
                </div>
                <span className="text-[11px] text-muted w-10 text-left">{s.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* USAGE NOTE */}
      <div className="bg-card2 border border-border rounded-xl p-4 text-[11px] text-muted leading-loose">
        <div className="text-text font-semibold mb-1.5">کاربردهای داده:</div>
        تحلیل ترندهای بازار و پیشنهاد محصول به فروشگاه‌ها · بهینه‌سازی نمایش نتایج جستجو و باکس‌ها · شخصی‌سازی پیشنهادات برای کاربران · مقایسه آماری عملکرد شهرها و فروشگاه‌ها · ورودی برای مدل‌های AI (بررسی محصول، اندازه بسته، دسته‌بندی تیکت)
      </div>
    </div>
  )
}