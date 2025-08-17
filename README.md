# تكليف منصة ثمانية للبودكاست 🎙️

![ثمانية بودكاست](./thmanyah-podcasts-frontend/public/favicon.svg) هذا المشروع بني كتكليف من منصة ثمانية من مهند الحطامي وتم نشره بتاريخ 17-8-2025 من أجل مشاركته مع شركة ثمانية وهو مشروع تجريبي يستخدم خدمات آيتونز للبحث عن البودكاست واسترجاعها.


## 🛠️ التقنيات المستخدمة

### Backend
- **Fastify** - لبناء واجهات برمجة التطبيقات (APIs)
- **TypeScript** - للكتابة الآمنة والواضحة
- **AWS DynamoDB** - قاعدة بيانات NoSQL متطورة
- **iTunes Search API** - للحصول على بيانات البودكاست

### Frontend
- **Next.js 15** - لبناء الواجهة
- **TypeScript** - للكتابة الآمنة والواضحة
- **Tailwind CSS** - للتصميم السريع لعناصر الصفحة
- **Framer Motion** - لإضافة بعض تأثير الأنميشن البسيط بالمنصة
- **Lucide React** - للأيقونات المستعملة بالمنصة


## ✨ الميزات الرئيسية

- 🔍 **بحث متقدم**: ابحث في مئات الآلاف من البودكاست بسرعة وسهولة
- 🎨 **تصميم أنيق**: واجهة مستخدم حديثة وتفاعلية مع المستخدم
- ⚡ **أداء سريع**: مُحسّن للسرعة والأداء باستخدام Next.js 15
- 🔄 **تجربة سلسة**: انتقالات وأنيميشنات ناعمة تحسن تجربة المستخدم
- 📱 **متجاوب**: يعمل بشكل مثالي على جميع الأجهزة

## استعراض الواجهات


https://github.com/user-attachments/assets/851a92fe-66d7-4dcc-b1b2-526de89a3474



## 🚀 البدء السريع

### متطلبات النظام
- Node.js 18+ 
- npm أو yarn
- Git

### أدوات التطوير
- **Visual Studio Code**
- **Postman**
- **GIT & GitHub**
- **NoSQL Workbench**
- **DynamoDB Local**

### التثبيت

1. **استنساخ المشروع**
   ```bash
   git clone https://github.com/m0ohannad/thmanyah-podcasts.git
   cd thmanyah-podcasts
   ```

2. **تثبيت التبعيات للباكند**
   ```bash
   cd thmanyah-podcasts-backend
   npm install
   ```

3. **تهيئة متغيرات البيئة للباكند**
   ```bash
   cp .env.example .env
   # قم بتعديل ملف .env وإضافة بياناتك
   ```

4. **تشغيل الباكند**
   ```bash
   npm run dev
   ```

5. **تثبيت التبعيات للفرونتند**
   ```bash
   cd ../thmanyah-podcasts-frontend
   npm install
   ```

6. **تهيئة متغيرات البيئة للفرونتند**
   ```bash
   cp .env.example .env.local
   # قم بتعديل الملف حسب الحاجة
   ```

7. **تشغيل الفرونتند**
   ```bash
   npm run dev
   ```

8. **افتح المتصفح**
   ```
   http://localhost:3000
   ```

## 📁 هيكل المشروع

```
thmanyah-podcasts/
├── thmanyah-podcasts-backend/          # الباكند     Fastify
│   ├── src/
│   │   ├── config/                     # الداتابيس   DynamoDB
│   │   ├── models/
│   │   ├── plugins/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── scripts/
│   └── package.json
├── thmanyah-podcasts-frontend/         # الفرونتند   Next.js
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── fonts/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   ├── public/
│   └── package.json
└── README.md
```

## 🔧 إعدادات البيئة

### Backend (.env)
```env
PORT=3001
NODE_ENV=development
AWS_REGION=me-south-1 
DYNAMODB_ENDPOINT=http://localhost:8000
TABLE_PODCASTS=Podcasts
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Thmanyah Podcasts
```

## 📦 البناء والنشر

### بناء الباكند
```bash
cd thmanyah-podcasts-backend
npm run build
npm start
```

### بناء الفرونتند
```bash
cd thmanyah-podcasts-frontend
npm run build
npm start
```


## 📈 الأداء والتحسين

- ⚡ **تحميل سريع**: أقل من 2 ثانية لتحميل الصفحة الرئيسية
- 🎯 **SEO محسّن**: تحسين محركات البحث
- 📱 **متجاوب**: يعمل على جميع أحجام الشاشات
- ♿ **الوصولية**: متوافق مع معايير WCAG
- 🔄 **PWA جاهز**: يمكن تحويله لتطبيق ويب متقدم


## 🙏 شكر وتقدير ومراجع

- [شركة ثمانية](https://thmanyah.com) لإتاحة الفرصة بالمشاركة في التكليف
- [Podbay.fm](https://podbay.fm) لاستلهام التصماميم
- [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/) لبيانات البودكاست

---

<div align="center">
  <p>بناه مهند 🗡️ بـ ❤️ لثمانية</p>
  <p>© 2025 مهند الحطامي. جميع الحقوق محفوظة.</p>
</div>

