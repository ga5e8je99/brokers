# FXENGIN Brokers Platform 🚀

منصة وسطاء التداول الرسمية المعتمدة لـ **FXENGIN** مع لوحة تحكم كاملة للأدمن (Admin Dashboard) وباك إند متطور مبني بـ **NestJS** يدعم فحص حسابات الوكالة (IB Agency Checker) والترجمة التلقائية الفورية ثنائية اللغة (العربية والإنجليزية).

---

## 🌟 المكونات الرئيسية (Key Components)

1. **واجهة المستخدم الرئيسية (`brokers.html` / `index.html`):**
   - عرض الوسطاء المعتمدين وتصنيفهم (فوركس وسلع، شركات تمويل، عملات رقمية).
   - تصميم حديث ومتقدم يدعم الوضع الليلي وتطبيقات تليجرام المصغرة (Telegram Mini App).
   - محرك ترجمة فوري ثنائي اللغة (عربي / إنجليزي) بدون إعادة تحميل الصفحة.
   - نافذة تفاعلية لفحص وتأكيد حسابات الوكالة وطلب اشتراك الـ VIP.

2. **لوحة تحكم الأدمن (`admin.html`):**
   - إدارة كاملة للوسطاء (إضافة، تعديل، حذف).
   - **الترجمة التلقائية الفورية:** إدخال البيانات مرة واحدة بالعربية مع توليد الترجمة الإنجليزية تلقائياً.
   - ربط وتجربة API الشركاء (Partner API Testing).
   - متابعة وإدارة طلبات الـ VIP وإعادة فحص حالة الوكالة بنقرة زر.

3. **خادم الباك إند (`backend/`):**
   - مبني باستخدام **NestJS** و **TypeORM** مع دعم **SQLite** محلياً و **PostgreSQL** للإنتاج.
   - محرك التحقق البرمجي من حسابات الشركاء والوكالة (`checkAccountUnderAgency`).
   - محرك الترجمة الآلي المدمج لمصطلحات الفوركس والتداول (`autoTranslateText`).
   - توثيق تفاعلي كامل عبر **Swagger OpenAPI** على: `http://localhost:3000/api/docs`.

---

## 🚀 التشغيل السريع (Quick Start)

### 1. تشغيل الباك إند (NestJS Backend):
```bash
# من المجلد الرئيسي مباشرة
npm run backend

# أو من داخل مجلد backend
cd backend
npm install
npm run start:dev
```
الباك إند سيعمل على الرابط: `http://localhost:3000/api`  
توثيق الـ API متوفر على: `http://localhost:3000/api/docs`

### 2. فتح الواجهات (Frontend):
- **صفحة المستخدم:** افتح ملف `brokers.html` أو `index.html` مباشرة في المتصفح أو عبر خادم محلي:
  ```bash
  npm run dev
  ```
- **صفحة الإدارة والأدمن:** افتح ملف `admin.html` في المتصفح.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

- **Frontend:** HTML5, CSS3 Custom Tokens, Modern JavaScript (ES Modules), Telegram WebApp SDK.
- **Backend:** NestJS, TypeScript, TypeORM, RxJS, Axios, Class-Validator.
- **Database:** SQLite (Zero-config local development) / PostgreSQL (Production ready).
- **Documentation:** Swagger / OpenAPI 3.0.
