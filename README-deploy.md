# راهنمای راه‌اندازی DiGiFACE روی هاست پارس‌پک

این راهنما رو می‌تونی مستقیم به دوستت بدی.

---

## ۱. پکیج‌های لازم (نصب یک‌بار روی کامپیوتر برای ساخت پروژه)

```bash
# Node.js نسخه 18 یا بالاتر باید نصب باشه
node -v
npm -v
```

اگه نصب نیست از [nodejs.org](https://nodejs.org) نسخه LTS رو نصب کن.

---

## ۲. ساخت پروژه از صفر

```bash
npx create-next-app@14 digiface --typescript --tailwind --app --src-dir --import-alias "@/*"
cd digiface
```

سوالات نصب رو این‌طور جواب بده:
- ESLint: Yes
- src/ directory: Yes
- App Router: Yes
- import alias: `@/*`

---

## ۳. نصب پکیج‌های اضافی

```bash
npm install @prisma/client
npm install -D prisma
```

---

## ۴. کپی فایل‌ها

تمام فایل‌هایی که در این چت ساخته شدن رو دقیقاً با همون مسیر و اسم کپی کن:

```
prisma/schema.prisma
src/app/globals.css
src/app/layout.tsx
src/app/page.tsx
tailwind.config.ts

src/components/ui/index.tsx
src/components/layout/Navbar.tsx  (و Footer از همون فایل جدا کن)
src/components/shop/ShopCard.tsx
src/components/shop/BoxCard.tsx
src/components/shop/CampaignBanner.tsx
src/components/shared/Chatbot.tsx

src/app/auth/login/page.tsx
src/app/auth/register/page.tsx
src/app/auth/shop-register/page.tsx

src/app/shops/page.tsx
src/app/shops/[id]/page.tsx
src/app/boxes/page.tsx
src/app/search/page.tsx
src/app/cart/page.tsx

src/app/account/layout.tsx
src/app/account/page.tsx
src/app/account/orders/page.tsx
src/app/account/addresses/page.tsx
src/app/account/wallet/page.tsx

src/app/shop-panel/layout.tsx
src/app/shop-panel/page.tsx
src/app/shop-panel/products/page.tsx
src/app/shop-panel/boxes/page.tsx
src/app/shop-panel/orders/page.tsx
src/app/shop-panel/campaigns/page.tsx
src/app/shop-panel/wallet/page.tsx
src/app/shop-panel/support/page.tsx
src/app/shop-panel/notifications/page.tsx

src/app/pick-app/layout.tsx
src/app/pick-app/page.tsx
src/app/pick-app/my-orders/page.tsx
src/app/pick-app/wallet/page.tsx
src/app/pick-app/support/page.tsx
src/app/pick-app/auth/page.tsx

src/app/admin/layout.tsx
src/app/admin/page.tsx
src/app/admin/cities/page.tsx
src/app/admin/carriers/page.tsx
src/app/admin/shops/page.tsx
src/app/admin/picks/page.tsx
src/app/admin/intercity/page.tsx
src/app/admin/violations/page.tsx
src/app/admin/unassigned/page.tsx
src/app/admin/campaigns/page.tsx
src/app/admin/tickets/page.tsx
src/app/admin/users/page.tsx
src/app/admin/bigdata/page.tsx
src/app/admin/access/page.tsx
```

> ⚠️ نکته: چندتا فایل (مثل `Navbar.tsx + Footer.tsx` یا `ui/index.tsx`) چند کامپوننت با هم دارن. هر کامپوننت با کامنت جداکننده `// ════` مشخص شده — اگه فایل جدا لازم بود (مثل `Footer.tsx`)، اون بخش رو در فایل خودش با export مربوطه کپی کن و import مسیرها رو اصلاح کن.

---

## ۵. تنظیم دیتابیس (MySQL پارس‌پک)

### الف) ساخت دیتابیس در cPanel
1. وارد cPanel پارس‌پک شو
2. بخش **MySQL Databases**
3. یک دیتابیس بساز (مثلاً `digiface_db`)
4. یک یوزر بساز و پسورد بده
5. یوزر رو به دیتابیس با دسترسی **All Privileges** اضافه کن
6. اسم کامل دیتابیس و یوزر معمولاً به فرم `cpaneluser_digiface_db` می‌شه

### ب) فایل `.env`
در روت پروژه فایل `.env` بساز:

```env
DATABASE_URL="mysql://USERNAME:PASSWORD@localhost:3306/DATABASE_NAME"
```

مقادیر رو با اطلاعات واقعی دیتابیس جایگزین کن.

### ج) اجرای Migration
```bash
npx prisma generate
npx prisma migrate dev --name init
```

این دستور جدول‌ها رو طبق `schema.prisma` در MySQL می‌سازه.

---

## ۶. تست لوکال (قبل از آپلود)

```bash
npm run dev
```

برو به `http://localhost:3000` و چک کن همه چی درست لود می‌شه.

---

## ۷. Build برای production

```bash
npm run build
```

اگه بدون خطا تموم شد، آماده آپلودی.

---

## ۸. آپلود روی پارس‌پک

### الف) فعال کردن Node.js App در cPanel
1. وارد cPanel شو
2. بخش **Setup Node.js App**
3. **Create Application** بزن:
   - Node.js version: 18 یا بالاتر
   - Application mode: Production
   - Application root: مثلاً `digiface`
   - Application URL: دامنه یا ساب‌دامین مدنظر (مثلاً `digi-face.ir`)
   - Application startup file: `server.js` (مرحله بعد می‌سازیمش)

### ب) ساخت `server.js`
چون Next.js نیاز به یک سرور Node داره، این فایل رو در روت پروژه بساز:

```javascript
const { createServer } = require('http')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res)
  }).listen(process.env.PORT || 3000, () => {
    console.log('DiGiFACE running on port', process.env.PORT || 3000)
  })
})
```

### ج) آپلود فایل‌ها
از طریق **File Manager** یا **FTP** (مثل FileZilla):
- همه فایل‌های پروژه رو آپلود کن **به جز** `node_modules` و `.next`
- پوشه `.env` رو هم آپلود کن (مطمئن شو فایل‌های مخفی نمایش داده می‌شن)

### د) نصب و build روی سرور
از طریق ترمینال cPanel (یا SSH اگه دسترسی داری):

```bash
cd ~/digiface
npm install
npx prisma generate
npx prisma migrate deploy
npm run build
```

### ه) ری‌استارت اپلیکیشن
در بخش **Setup Node.js App**، روی **Restart** کلیک کن.

---

## ۹. تنظیم دامنه

اگه می‌خوای روی دامنه اصلی (`digi-face.ir`) بالا بیاد:
- در تنظیمات Node.js App، **Application URL** رو به `digi-face.ir` ست کن
- مطمئن شو DNS دامنه به همون هاست اشاره می‌کنه (از قبل که WordPress داشتی، احتمالاً درست هست)
- اگه می‌خوای WordPress فعلی هم بمونه، می‌تونی Next.js رو روی ساب‌دامین (مثلاً `app.digi-face.ir`) بالا بیاری

---

## ۱۰. چک‌لیست نهایی

- [ ] دیتابیس MySQL ساخته و `.env` تنظیم شده
- [ ] `npx prisma migrate deploy` بدون خطا اجرا شده
- [ ] `npm run build` لوکال موفق بوده
- [ ] فایل‌ها (بدون `node_modules`/`.next`) آپلود شده
- [ ] `npm install` روی سرور اجرا شده
- [ ] Node.js App در cPanel ری‌استارت شده
- [ ] سایت روی دامنه/ساب‌دامین باز می‌شه

---

## مشکلات رایج

| مشکل | راه‌حل |
|------|--------|
| `Cannot find module 'next'` | `npm install` رو روی سرور (نه لوکال) اجرا کن |
| خطای اتصال دیتابیس | چک کن `DATABASE_URL` در `.env` درست باشه — یوزرنیم معمولاً پیشوند دارد |
| صفحه سفید / 503 | لاگ‌های Node.js App در cPanel رو ببین — معمولاً مشکل از `server.js` یا پورت است |
| فونت‌ها لود نمی‌شن | مطمئن شو سرور به `fonts.googleapis.com` دسترسی دارد (در ایران گاهی نیاز به بررسی دارد) |

---

## اگه پارس‌پک Node.js را پشتیبانی نکرد

اگه به هر مشکلی برخوردید و Node.js روی پارس‌پک کار نکرد، گزینه جایگزین:
- یک **VPS ارزان** (Arvan Cloud / Hetzner، حدود ۵۰-۱۰۰ هزار تومان/ماه)
- نصب Node.js + PM2 + Nginx روی VPS (راهنمای جدا لازم داره — اگه به اینجا رسیدیم بگو تا برات بسازم)
- دامنه رو DNS-اش به IP همون VPS اشاره بدی

موفق باشید! 🚀
