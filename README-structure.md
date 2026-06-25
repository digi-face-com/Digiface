# ساختار پروژه DiGiFACE (Next.js 14 — App Router)

```
digiface/
├── prisma/
│   └── schema.prisma          ← همون چیزی که ساختیم
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                  ← layout اصلی (فونت، RTL)
│   │   ├── page.tsx                    ← صفحه اصلی (Landing)
│   │   ├── globals.css                 ← متغیرهای رنگ + استایل پایه
│   │   │
│   │   ├── (shop-list)/
│   │   │   └── shops/page.tsx          ← لیست فروشگاه‌ها
│   │   │   └── shops/[id]/page.tsx     ← صفحه فروشگاه
│   │   │
│   │   ├── boxes/page.tsx              ← لیست باکس‌ها
│   │   ├── search/page.tsx             ← نتایج جستجو (۳ اولویت)
│   │   ├── cart/page.tsx               ← سبد خرید + ارسال
│   │   │
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── shop-register/page.tsx
│   │   │
│   │   ├── b2b/page.tsx                ← لندینگ کارخانه/پخش
│   │   │
│   │   ├── account/                    ← پنل کاربر عادی
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                ← داشبورد
│   │   │   ├── orders/page.tsx
│   │   │   ├── addresses/page.tsx
│   │   │   └── wallet/page.tsx
│   │   │
│   │   ├── shop-panel/                 ← پنل فروشگاه
│   │   │   ├── layout.tsx              ← sidebar
│   │   │   ├── page.tsx                ← داشبورد
│   │   │   ├── products/page.tsx
│   │   │   ├── boxes/page.tsx
│   │   │   ├── orders/page.tsx
│   │   │   ├── campaigns/page.tsx
│   │   │   ├── wallet/page.tsx
│   │   │   └── support/page.tsx
│   │   │
│   │   ├── pick-app/                   ← اپ پیک (mobile-first)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                ← سفارشات جاری
│   │   │   ├── my-orders/page.tsx
│   │   │   └── wallet/page.tsx
│   │   │
│   │   ├── admin/                      ← پنل ادمین
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── cities/page.tsx
│   │   │   ├── shops/page.tsx
│   │   │   ├── picks/page.tsx
│   │   │   ├── violations/page.tsx
│   │   │   ├── campaigns/page.tsx
│   │   │   └── tickets/page.tsx
│   │   │
│   │   └── api/                        ← API Routes
│   │       ├── auth/
│   │       │   ├── send-otp/route.ts
│   │       │   ├── verify-otp/route.ts
│   │       │   └── login/route.ts
│   │       ├── orders/route.ts
│   │       ├── products/route.ts
│   │       ├── shops/route.ts
│   │       └── ...
│   │
│   ├── components/
│   │   ├── ui/                         ← کامپوننت‌های پایه (دکمه، کارت، پیل، ...)
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Pill.tsx
│   │   │   ├── Timer.tsx
│   │   │   └── Toggle.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── shop/
│   │   │   ├── ShopCard.tsx
│   │   │   └── BoxCard.tsx
│   │   └── shared/
│   │       ├── Chatbot.tsx
│   │       ├── ScoreBadge.tsx
│   │       └── BigDataIndicator.tsx
│   │
│   ├── lib/
│   │   ├── prisma.ts                   ← اتصال دیتابیس
│   │   ├── auth.ts                     ← JWT helpers
│   │   └── utils.ts                    ← فرمت قیمت، تاریخ شمسی، ...
│   │
│   └── styles/
│       └── theme.ts                    ← رنگ‌ها به صورت JS (برای Tailwind)
│
├── public/
│   └── fonts/
│
├── .env                                 ← DATABASE_URL و...
├── next.config.js
├── tailwind.config.ts
├── package.json
└── tsconfig.json
```

## ترتیب ساخت پیشنهادی

1. **پایه**: `globals.css` + `theme.ts` + `layout.tsx` + کامپوننت‌های UI پایه
2. **صفحه اصلی**: `page.tsx` (Landing با Hero, Search, Campaigns, Boxes, Footer)
3. **احراز هویت**: صفحات auth
4. **پنل کاربر**
5. **پنل فروشگاه**
6. **اپ پیک**
7. **پنل ادمین**
8. **API Routes** (موازی با هر بخش)

شروع می‌کنم با مرحله ۱ و ۲ — پایه + صفحه اصلی.
