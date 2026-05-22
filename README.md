# منصة بيع بطاقات وشحن الألعاب الرقمية (Digital Gift Shop)

منصة متكاملة لبيع بطاقات Google Play, iTunes, Steam, PlayStation, Xbox، وشحن UC (PUBG)، Diamonds (Free Fire)، V-Bucks (Fortnite) مع 3 طرق شراء: API تلقائي، تحقق يدوي، ورصيد داخلي.

## الميزات التقنية
- **Frontend:** Next.js 14 (App Router) + Tailwind CSS (RTL, Dark/Light mode, responsive)
- **Backend:** Node.js + Express (TypeScript)
- **Database:** PostgreSQL + Prisma ORM
- **Queue:** BullMQ (Redis) لإعادة المحاولات وإدارة الطلبات الفاشلة
- **Payment:** NowPayments (USDT/BTC), Moyasar (Mada, Apple Pay, STC Pay), Vodafone Cash, تحويل بنكي يدوي
- **Providers API:** GamerBox, G4A مع نظام Fallback تلقائي
- **Security:** Rate limiting, CSRF, Webhook signature, تشفير المفاتيح, قفل الرصيد (Row-level lock)

## متطلبات التشغيل المحلي
- Node.js 18+
- Docker & Docker Compose
- حساب NowPayments / Moyasar للاختبار

## خطوات التشغيل
1. استنساخ المشروع
```bash
git clone https://github.com/username/digital-gift-shop.git
cd digital-gift-shop