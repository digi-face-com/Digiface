import Link from 'next/link'
import { Pill, AiBadge } from '@/components/ui'

const kpis = [
  { value: '۲', label: 'فروشگاه منتظر تأیید', color: 'gold', href: '/admin/shops' },
  { value: '۵', label: 'پیک منتظر تأیید', color: 'red', href: '/admin/picks' },
  { value: '۸', label: 'سفارش خارج‌شهر', color: 'blue', href: '/admin/intercity' },
  { value: '۳', label: 'گزارش تخلف', color: 'red', href: '/admin/violations' },
]

const ticketStats = [
  { label: 'آپلود محتوا', pct: 65, color: 'bg-purple' },
  { label: 'مالی / تسویه', pct: 40, color: 'bg-gold' },
  { label: 'پیک / تحویل', pct: 28, color: 'bg-green' },
]

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">داشبورد کارشناس</h1>
        <p className="text-sm text-muted mt-1">نمای کلی وضعیت پلتفرم</p>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {kpis.map((k) => (
          <Link
            key={k.label}
            href={k.href}
            className={`bg-card2 border rounded-xl p-4 hover:-translate-y-0.5 transition-all ${
              k.color === 'gold' ? 'border-gold/30' : 'border-red/30'
            }`}
          >
            <div className={`text-xl font-extrabold ${k.color === 'gold' ? 'text-gold-2' : 'text-red'}`}>{k.value}</div>
            <div className="text-[10px] text-muted mt-1">{k.label}</div>
          </Link>
        ))}
      </div>

      {/* CITY OVERVIEW */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-[13px] font-bold">مدیریت شهرها</div>
          <Link href="/admin/cities" className="text-[11px] text-purple-light hover:underline">مشاهده همه →</Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="bg-green/5 border border-green/18 rounded-xl p-4">
            <div className="flex justify-between items-center mb-1.5">
              <div className="text-[13px] font-bold text-green">تهران</div>
              <Pill color="green">فعال</Pill>
            </div>
            <div className="text-[11px] text-muted">۱۸ فروشگاه | ۱۲ پیک فعال | ۳ پیک منتخب خارج‌شهر</div>
          </div>
          <div className="bg-blue/5 border border-blue/18 rounded-xl p-4">
            <div className="flex justify-between items-center mb-1.5">
              <div className="text-[13px] font-bold text-blue">اصفهان</div>
              <Pill color="blue">فعال</Pill>
            </div>
            <div className="text-[11px] text-muted">۵ فروشگاه | ۳ پیک منتخب خارج‌شهر</div>
          </div>
        </div>
      </div>

      {/* CAMPAIGN OVERVIEW */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-[13px] font-bold">کمپین فعال</div>
          <Link href="/admin/campaigns" className="text-[11px] text-purple-light hover:underline">مدیریت →</Link>
        </div>
        <div className="bg-gold/5 border border-gold/18 rounded-xl p-4">
          <div className="flex justify-between items-center flex-wrap gap-2 mb-3">
            <div className="text-[13px] font-bold text-gold-2">🎪 جشنواره پاییزه</div>
            <Pill color="green">فعال — ۱۲ فروشگاه پذیرفت</Pill>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-card2 border border-border rounded-lg p-2.5 text-center">
              <div className="text-[10px] text-muted">تخفیف</div>
              <div className="text-[13px] font-bold">۳۰٪</div>
            </div>
            <div className="bg-card2 border border-border rounded-lg p-2.5 text-center">
              <div className="text-[10px] text-muted">کمیسیون</div>
              <div className="text-[13px] font-bold">۲۵٪</div>
            </div>
            <div className="bg-card2 border border-border rounded-lg p-2.5 text-center">
              <div className="text-[10px] text-muted">مدت</div>
              <div className="text-[13px] font-bold">۵ روز</div>
            </div>
          </div>
        </div>
      </div>

      {/* BIG DATA SNAPSHOT */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-[13px] font-bold flex items-center gap-2">📊 Big Data — رفتار کاربران</div>
          <Link href="/admin/bigdata" className="text-[11px] text-purple-light hover:underline">مشاهده کامل →</Link>
        </div>
        <div className="bg-purple/5 border border-purple/18 rounded-xl p-4 grid grid-cols-3 gap-3">
          <div className="bg-card2 border border-border rounded-lg p-3 text-center">
            <div className="text-lg mb-1">👤</div>
            <div className="text-[13px] font-bold">۳۰,۴۵۶</div>
            <div className="text-[10px] text-muted">رویداد امروز</div>
          </div>
          <div className="bg-card2 border border-border rounded-lg p-3 text-center">
            <div className="text-lg mb-1">🔍</div>
            <div className="text-[13px] font-bold">۸,۲۳۴</div>
            <div className="text-[10px] text-muted">جستجو</div>
          </div>
          <div className="bg-card2 border border-border rounded-lg p-3 text-center">
            <div className="text-lg mb-1">🛒</div>
            <div className="text-[13px] font-bold">۱,۱۲۸</div>
            <div className="text-[10px] text-muted">سبد خرید</div>
          </div>
        </div>
      </div>

      {/* TICKET STATS */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-[13px] font-bold flex items-center gap-2">
            آمار تیکت‌ها <AiBadge>دسته‌بندی</AiBadge>
          </div>
          <Link href="/admin/tickets" className="text-[11px] text-purple-light hover:underline">مشاهده همه →</Link>
        </div>
        <div className="bg-card2 border border-border rounded-xl p-4">
          <div className="flex flex-col gap-2.5">
            {ticketStats.map((t) => (
              <div key={t.label} className="flex items-center justify-between">
                <span className="text-[12px]">{t.label}</span>
                <div className="flex items-center gap-2">
                  <div className="w-28 bg-white/[0.08] rounded h-1.5 overflow-hidden">
                    <div className={`${t.color} h-full rounded`} style={{ width: `${t.pct}%` }} />
                  </div>
                  <span className="text-[11px] text-muted w-8">{t.pct}٪</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-muted2 mt-3">
            بایگانی کامل — پروفایل کاربر + سوابق + مکالمات قابل استخراج
          </div>
        </div>
      </div>

      {/* SECURITY */}
      <div className="bg-red/4 border border-red/14 rounded-xl p-4">
        <div className="text-[12px] font-bold text-red mb-1.5">🔐 امنیت چندسطحی</div>
        <div className="text-[11px] text-muted leading-loose">
          هر کارشناس: یوزر اختصاصی + ورود با شماره موبایل | تمام فعالیت‌ها در Audit Log ثبت می‌شود | دسترسی‌ها توسط مدیر اصلی تعریف می‌شود | SMS فقط برای موارد ضروری ارسال می‌شود
        </div>
      </div>
    </div>
  )
}