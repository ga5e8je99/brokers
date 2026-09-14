# FXENGIN Brokers Backend API (NestJS + PostgreSQL)

خدمة الباك إند الرسمية لمنصة وسطاء FXENGIN، مبنية باستخدام **NestJS** و **PostgreSQL** مع **TypeORM**، وتوفر منظومة متكاملة لإدارة الوسطاء، عروض البونص، روابط الشركاء، واستقبال وفحص طلبات تفعيل اشتراكات الـ VIP آلياً عبر محرك فحص الوكالة (Agency IB Checker).

---

## 🌟 الميزات الرئيسية (Key Features)

1. **إدارة الوسطاء وعروض الشراكة (Brokers Management):**
   - جلب وتصنيف الوسطاء (فوركس وسلع، شركات تمويل، إلخ).
   - دعم كامل للغتين (العربية والإنجليزية).
   - بيانات تفصيلية للشعارات، التراخيص، نسب السبريد، والرافعة المالية.

2. **بيانات لوحة وAPI الشريك للأدمن (Partner Dashboard & API):**
   - حقل خاص برابط لوحة تحكم الشريك لدى كل وسيط (`partnerDashboardUrl`).
   - حقل خاص برابط الـ API البرمجي لفحص العملاء (`partnerApiUrl`).
   - مفتاح المصادقة والـ Token الخاص بالـ API (`partnerApiKey`).
   - كود الشريك والوكالة (`partnerIbCode`) لكل وسيط (مثل `KTW63`, `348216`).

3. **دالة ومحرك فحص حساب المتداول تحت الوكالة (`checkAccountUnderAgency`):**
   - فحص آلي فوري لرقم حساب التداول المدخل من قبل العميل بمجرد تقديم طلب الـ VIP.
   - التحقق من تسجيل الحساب تحت كود الـ IB الخاص بـ FXENGIN عبر استدعاء API الوسيط.
   - إمكانية إعادة الفحص البرمجي بنقرة زر من لوحة تحكم الأدمن.
   - دعم الفحص اليدوي السلس عبر تحويل الطلب لـ `PENDING` وتوفير رابط لوحة الوسيط المباشر للأدمن.

4. **توثيق تفاعلي كامل (Swagger OpenAPI):**
   - واجهة توثيق واختبار تفاعلية متوفرة على الرابط: `http://localhost:3000/api/docs`.

---

## 🛠️ متطلبات التشغيل والتثبيت (Setup & Installation)

### 1. المتطلبات:
- Node.js (v18 أو أعلى)
- قاعدة بيانات PostgreSQL (محلياً أو عبر سحابة مثل Supabase / Neon / Railway)

### 2. إعداد ملف البيئة (.env):
قم بنسخ ملف البيئة وضبط بيانات الاتصال بقاعدة البيانات:
```bash
cp .env.example .env
```

محتوى ملف `.env`:
```env
PORT=3000
NODE_ENV=development

# PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=fxengin_brokers
DB_SYNC=true
DB_LOGGING=false

# Admin Secret
ADMIN_API_KEY=fxengin_super_admin_secret_key_2026
```

> **ملاحظة:** لتشغيل PostgreSQL بسرعة عبر Docker:
> ```bash
> docker run --name fxengin-pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=fxengin_brokers -p 5432:5432 -d postgres:16-alpine
> ```

### 3. تثبيت الحزم والبناء:
```bash
npm install
npm run build
```

### 4. تعبئة البيانات الأولية (Seed Data):
يقوم هذا الأمر بإنشاء الوسطاء السبعة المعتمدين (XM, MultiBank, HFM, PropXP, YWO, Doo Prime, INGOT) ببياناتهم الكاملة وروابط الداشبورد:
```bash
npm run seed
```

### 5. تشغيل السيرفر:
```bash
# وضع التطوير مع التحديث التلقائي:
npm run start:dev

# وضع الإنتاج:
npm run start:prod
```

---

## 📡 جدول الـ Endpoints (API Reference)

### أ. مسارات الواجهة العامة (Public Endpoints)

| المسار | الطريقة | الوصف |
|---|---|---|
| `GET /api/brokers` | GET | جلب الوسطاء المفعلين مع دعم الفلترة حسب التصنيف (`?category=forex`) واللغة (`?lang=ar` أو `?lang=en`) |
| `GET /api/brokers/:slug` | GET | جلب تفاصيل وسيط محدد بواسطة الـ slug |
| `POST /api/vip/verify-request` | POST | تقديم طلب تفعيل VIP (يقوم باستدعاء دالة الفحص الآلي فورياً) |
| `GET /api/vip/status/:accountNumber` | GET | استعلام المتداول عن حالة تفعيل حسابه |

#### مثال على Body تقديم طلب VIP:
```json
{
  "brokerIdOrSlug": "xm",
  "accountNumber": "8594021",
  "telegramUsername": "@trader_fx"
}
```

---

### ب. مسارات لوحة تحكم الأدمن (Admin Endpoints)

| المسار | الطريقة | الوصف |
|---|---|---|
| `GET /api/admin/stats` | GET | إحصائيات عامة (عدد الوسطاء، الطلبات المعلقة، الحسابات المؤكدة) |
| `GET /api/admin/brokers` | GET | جلب كافة الوسطاء مع روابط الداشبورد ومفاتيح الـ API |
| `POST /api/admin/brokers` | POST | إضافة وسيط جديد مع تخصيص `partnerDashboardUrl` و `partnerApiUrl` |
| `PUT /api/admin/brokers/:id` | PUT | تعديل وسيط أو تحديث إعدادات الـ API |
| `DELETE /api/admin/brokers/:id` | DELETE | حذف وسيط |
| `POST /api/admin/brokers/:id/test-partner-api` | POST | اختبار الاتصال بـ API شريك الوسيط والتحقق من الاستجابة |
| `GET /api/admin/vip-requests` | GET | جلب طلبات الـ VIP مع الفلترة حسب الحالة (`?status=PENDING`) |
| `GET /api/admin/vip-requests/:id` | GET | عرض تفاصيل الطلب وسجل الفحص الكامل |
| `POST /api/admin/vip-requests/:id/recheck` | POST | إعادة تشغيل دالة الفحص الآلي لحساب تداول معين |
| `PATCH /api/admin/vip-requests/:id/status` | PATCH | اعتماد أو رفض الحساب يدوياً وتحديث الملاحظات |

---

## 🔍 كيف تعمل دالة فحص الوكالة (`checkAccountUnderAgency`)؟

توجد الخدمة في: `src/modules/agency-checker/services/agency-checker.service.ts`:

1. تستقبل `broker` و `accountNumber`.
2. تتحقق من وجود `partnerApiUrl` و `partnerApiKey` الخاص بالوسيط.
3. ترسل طلباً آمناً إلى نظام الشركاء بالوسيط لمطابقة رقم الحساب مع كود الوكالة `partnerIbCode`.
4. تعيد النتيجة وتحدد حالة الطلب:
   - `VERIFIED_UNDER_AGENCY`: الحساب مؤكد ومسجل تحت وكالتك.
   - `NOT_UNDER_AGENCY`: الحساب موجود لكن غير مرتبط بوكالتك.
   - `PENDING`: الوسيط يتطلب مراجعة يدوية، ويتم إرفاق رابط الداشبورد (`partnerDashboardUrl`) لفتحه بنقرة واحدة من الأدمن.
