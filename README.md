# فروشگاه استاتیک Jekyll

## نصب و اجرا (Local)

```bash
npm install
bundle install
npm run dev          # اجرای Tailwind در حالت watch (ترمینال جدا)
bundle exec jekyll serve
```

## قرارگیری فونت Vazirmatn

فایل‌های فونت را در مسیر زیر قرار دهید:

```
assets/fonts/
├── Vazirmatn-Regular.woff2
├── Vazirmatn-Regular.woff
├── Vazirmatn-Medium.woff2
├── Vazirmatn-Medium.woff
├── Vazirmatn-SemiBold.woff2
├── Vazirmatn-SemiBold.woff
├── Vazirmatn-Bold.woff2
└── Vazirmatn-Bold.woff
```

## Deploy روی GitHub Pages

1. ریپازیتوری بسازید و کد را پوش کنید.
2. Settings → Pages → Source را روی "GitHub Actions" بگذارید.
3. با هر push به main، workflow در `.github/workflows/deploy.yml` به‌صورت خودکار build و deploy می‌کند.

## نکته مهم

از پلاگین کاستوم `_plugins/number_filter.rb` استفاده شده که فقط با build از طریق GitHub Actions کار می‌کند (نه حالت قدیمی "Deploy from branch").
