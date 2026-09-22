

### 3. الإعدادات
```bash
cp .env.example .env
```
افتراضيًا شغال بـ **SQLite** (`DB_DIALECT=sqlite`) — يعني هيشتغل فورًا من غير ما تحتاج تظبط أي داتابيز، مثالي للتطوير والتجربة.

لما تكون جاهز تربطه بـ **Azure SQL**، غيّر في `.env`:
```
DB_DIALECT=mssql
DB_HOST=...
DB_NAME=...
DB_USER=...
DB_PASSWORD=...
```

### 4. التشغيل
```bash
npm run dev
```
هيشتغل على `http://localhost:4000` (نفس البورت اللي يوسف حاطه في الـ Flutter بالظبط: `10.0.2.2:4000` من الـ emulator).

### 5. تجربة سريعة
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@test.com","password":"123456","role":"patient"}'
```

---

## هيكل المشروع
```
src/
├── config/db.js          # اتصال قاعدة البيانات (sqlite محليًا / mssql على Azure)
├── models/                # Sequelize models — مطابقة للـ Class Diagram المحدّث
├── routes/                 # كل route هنا، مقسّم حسب الموضوع
├── controllers/            # منطق الـ Auth فقط دلوقتي (باقي الكنترولرز لسه جايين)
├── middleware/auth.js       # JWT verification + role-based access
└── app.js                   # بيجمع كل الـ routes مع بعض
server.js                     # نقطة البداية — بيوصل الداتابيز ويشغّل السيرفر
```

## الحالة الحالية
- ✅ `/api/auth/*` (register, login, forgot-password) شغال بالكامل، اتعمله اختبار حقيقي (تسجيل + دخول + JWT + حماية الأدوار كلها شغالة)
- 🔲 باقي الـ routes موجودة بمسارها الصحيح بس بترجع `501 Not Implemented` — دي التاسكات الجاية

## أي endpoint جديد (مش موجود عند يوسف)؟
أي route فيه تعليق `// NEW` في أول ملف الـ routes بتاعه معناها إنه ضيف على شكل يوسف الأصلي (زي Links, Safe Zones, تفاصيل SmartWatch, Notifications, AI, Doctor, User Profile) — كلها كانت ناقصة من الـ SRS الأصلي.

## ملاحظات مهمة
- كل الردود بشكل موحّد: `{ success, message, data }` أو `{ success: false, message, errors }` — نفس شكل يوسف بالظبط
- الأدوار بحروف صغيرة: `"patient"` / `"caregiver"` / `"doctor"` (مش Enum زي المحاولة الأولى بـ .NET)
- راجع `MindGuard_API_Contracts_v3.pdf` لشكل كل endpoint بالتفصيل، موضّح فيه إيه اللي كان موجود عند يوسف وإيه اللي اتضاف
