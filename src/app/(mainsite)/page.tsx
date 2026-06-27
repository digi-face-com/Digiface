import { Navbar, Footer } from '@/components/layout/navbar-footer'
import { BigDataIndicator, Button, Pill, Section, SectionHeader, AiBadge } from '@/components/ui'
import { Chatbot, ShopCard, BoxCard, CampaignBanner } from '@/components/shop-shared'

// ── نمونه داده — بعداً از دیتابیس می‌آد ──
const featuredShops = [
  { id: '1', name: 'آرایشگاه رز', emoji: '🌹', category: 'مراقبت پوست', city: 'تهران', rating: 4.9, reviews: 234, products: 128, badge: 'برتر' },
  { id: '2', name: 'بیوتی استور', emoji: '💄', category: 'آرایشی', city: 'مشهد', rating: 4.8, reviews: 189, products: 96, badge: 'جدید' },
  { id: '3', name: 'گلدن بیوتی', emoji: '✨', category: 'مو و ناخن', city: 'اصفهان', rating: 4.7, reviews: 312, products: 215, badge: 'ویژه' },
  { id: '4', name: 'پرفکت لوک', emoji: '🌸', category: 'عطر و ادکلن', city: 'شیراز', rating: 4.9, reviews: 156, products: 74, badge: 'برتر' },
]

const featuredBoxes = [
  { id: '1', shop: 'آرایشگاه رز', name: 'باکس مراقبت پوست', emoji: '🎁', items: 5, price: 850000, oldPrice: 1100000, discount: 23, tag: 'پرفروش' },
  { id: '2', shop: 'بیوتی استور', name: 'ست آرایش کامل', emoji: '💝', items: 7, price: 1200000, oldPrice: 1600000, discount: 25, tag: 'لاکچری' },
  { id: '3', shop: 'گلدن بیوتی', name: 'باکس هدیه ویژه', emoji: '🎀', items: 4, price: 650000, oldPrice: 850000, discount: 24, tag: 'هدیه' },
]

const steps = [
  { icon: '🔍', num: '۱', title: 'جستجو کن', desc: 'محصول یا فروشگاه مورد نظرت رو پیدا کن' },
  { icon: '🛒', num: '۲', title: 'انتخاب کن', desc: 'محصول یا باکس رو به سبد اضافه کن' },
  { icon: '🔒', num: '۳', title: 'پرداخت امن', desc: 'با درگاه امن زرین‌پال پرداخت کن' },
  { icon: '⚡', num: '۴', title: 'تحویل سریع', desc: 'سفارشت رو سریع و ایمن دریافت کن' },
]

export default function HomePage() {
  return (
    <>
      <Navbar />
      <BigDataIndicator />

      {/* ═══ HERO ═══ */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-[radial-gradient(ellipse,rgba(124,58,237,0.15)_0%,transparent_65%)]" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-[radial-gradient(ellipse,rgba(201,151,58,0.1)_0%,transparent_65%)]" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)',
              backgroundSize: '72px 72px',
              maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)',
            }}
          />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <Pill color="gold" className="mb-8 animate-fade-up">
            ✦ اولین مارکت‌پلیس تخصصی آرایشی ایران
          </Pill>

          <h1 className="font-display text-[clamp(52px,8vw,96px)] font-bold leading-[1.05] -tracking-wide mb-3 animate-fade-up [animation-delay:0.1s]">
            <span className="block text-text">چند کلیک</span>
            <span className="block text-gold-gradient animate-shimmer">تا زیبایی</span>
          </h1>

          <p className="text-[17px] text-muted leading-[1.8] max-w-[520px] mx-auto mb-11 font-light animate-fade-up [animation-delay:0.2s]">
            بهترین فروشگاه‌های آرایشی ایران در یک پلتفرم —{' '}
            <strong className="text-purple-light font-medium">خرید محصول</strong>، باکس ویژه و هدیه لاکچری
          </p>

          <div className="flex gap-3 justify-center flex-wrap mb-12 animate-fade-up [animation-delay:0.3s]">
            <Button size="lg">🛍 کشف فروشگاه‌ها</Button>
            <Button variant="gold" size="lg">🎁 باکس‌های ویژه</Button>
            <Button variant="ghost" size="lg">← ثبت فروشگاه</Button>
          </div>

          {/* Search bar */}
          <div className="flex gap-2.5 max-w-[550px] mx-auto mb-12 animate-fade-up [animation-delay:0.35s]">
            <div className="flex-1 flex items-center gap-2 bg-card2 border border-border rounded-xl px-4 py-3">
              <span className="text-muted">🔍</span>
              <input
                placeholder="جستجو در محصولات، فروشگاه‌ها..."
                className="bg-transparent border-none outline-none flex-1 text-sm text-text placeholder:text-muted2 text-right"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[800px] mx-auto animate-fade-up [animation-delay:0.5s]">
            {[
              { icon: '🏪', num: '۵۰۰+', label: 'فروشگاه فعال' },
              { icon: '📦', num: '۱۲K+', label: 'محصول' },
              { icon: '⭐', num: '۴.۹', label: 'امتیاز میانگین' },
              { icon: '❤️', num: '۳۰K+', label: 'مشتری راضی' },
            ].map((s) => (
              <div key={s.label} className="bg-card/80 border border-border rounded-2xl p-5 text-center backdrop-blur-md hover:border-border2 hover:-translate-y-1 transition-all">
                <span className="text-xl mb-2 block">{s.icon}</span>
                <div className="font-display text-3xl font-bold text-white mb-1">{s.num}</div>
                <div className="text-xs text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CHATBOT ═══ */}
      <Section className="!py-0 pb-12">
        <Chatbot />
      </Section>

      {/* ═══ ACTIVE CAMPAIGN ═══ */}
      <Section className="!py-0 pb-12">
        <CampaignBanner
          title="جشنواره پاییزه"
          description="تا ۴۰٪ تخفیف روی محصولات منتخب"
          days="۰۲"
          hours="۱۴"
          minutes="۳۲"
        />
      </Section>

      {/* ═══ FEATURED SHOPS ═══ */}
      <Section className="!pt-0">
        <SectionHeader
          eyebrow="فروشگاه‌های منتخب"
          title="بهترین‌ها را"
          accent="انتخاب کن"
          action={
            <a href="/shops" className="text-[13px] text-muted hover:text-purple-light transition-colors flex items-center gap-1.5">
              مشاهده همه ←
            </a>
          }
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredShops.map((shop) => (
            <ShopCard key={shop.id} {...shop} />
          ))}
        </div>
        <p className="text-[11px] text-muted mt-4">
          📍 اولویت نمایش با فروشگاه‌های نزدیک به آدرس انتخابی شماست — اگر آدرس ثبت نکرده‌اید، فروشگاه منتخب شهر شما نمایش داده می‌شود.
        </p>
      </Section>

      {/* ═══ FEATURED BOXES ═══ */}
      <Section className="!pt-0">
        <SectionHeader
          eyebrow="باکس‌های ویژه"
          title="بسته‌های"
          accent="لاکچری"
          action={
            <a href="/boxes" className="text-[13px] text-muted hover:text-purple-light transition-colors flex items-center gap-1.5">
              همه باکس‌ها ←
            </a>
          }
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredBoxes.map((box) => (
            <BoxCard key={box.id} {...box} />
          ))}
        </div>
      </Section>

      {/* ═══ HOW IT WORKS ═══ */}
      <Section className="bg-gradient-to-b from-transparent via-purple/5 to-transparent">
        <SectionHeader eyebrow="چطور کار می‌کنه" title="خرید" accent="راحت در ۴ قدم" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-10 right-[12.5%] left-[12.5%] h-px bg-gradient-to-r from-transparent via-purple/30 to-transparent" />
          {steps.map((s) => (
            <div key={s.num} className="text-center relative">
              <div className="w-[82px] h-[82px] mx-auto mb-5 bg-card border border-border rounded-[22px] flex items-center justify-center text-3xl relative z-10 hover:border-border2 hover:shadow-[0_12px_36px_rgba(124,58,237,0.2)] hover:-translate-y-1 transition-all">
                {s.icon}
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-purple to-purple-2 rounded-lg text-xs font-extrabold text-white flex items-center justify-center">
                  {s.num}
                </span>
              </div>
              <div className="text-[15px] font-bold mb-1.5">{s.title}</div>
              <div className="text-xs text-muted leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ CTA BANNER ═══ */}
      <Section className="!pb-24">
        <div className="max-w-[1200px] mx-auto bg-gradient-to-br from-[#1e0a3c] via-[#2d1060] to-[#1a0a30] border border-purple/30 rounded-[28px] p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(124,58,237,0.12),transparent)] pointer-events-none" />
          <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <span className="text-5xl mb-5 block relative z-10">👑</span>
          <h2 className="font-display text-[clamp(28px,4vw,46px)] font-bold text-white mb-3.5 relative z-10">
            فروشگاهت رو آنلاین کن
          </h2>
          <p className="text-base text-white/70 max-w-[500px] mx-auto mb-9 leading-relaxed relative z-10 font-light">
            به صدها فروشگاه موفق بپیوند. ثبت‌نام رایگان، کمیسیون تنها ۷٪
          </p>
          <div className="flex gap-3 justify-center flex-wrap relative z-10">
            <Button variant="gold" size="lg">همین الان شروع کن</Button>
            <Button variant="ghost" size="lg">مشاهده پنل نمونه</Button>
          </div>
          <div className="flex gap-7 justify-center mt-7 text-[13px] text-gold/80 flex-wrap relative z-10">
            {['ثبت‌نام رایگان', 'بدون هزینه اولیه', 'پشتیبانی ۲۴/۷', 'کمیسیون فقط ۷٪'].map((p) => (
              <span key={p} className="flex items-center gap-1.5">
                <span className="text-gold-2 font-bold">✓</span> {p}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <Footer />
    </>
  )
}