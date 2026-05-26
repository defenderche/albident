# Albident — Roadmap

**Фаза:** MVP в разработке.
**Обновлено:** 2026-05-26 (страница /privacy).

Файл показывает текущее состояние проекта по областям. Не дублирует спеки (`specifications/`) и не повторяет планы (`plans/`) — это агрегат. Обновляется одним коммитом вместе с переносом плана в `plans/completed/` (см. CLAUDE.md → Plans workflow §5).

**Легенда:** ✅ готово · 🟡 в работе · ⬜ запланировано · ❌ не делаем.

## Сейчас в работе

—

## Ближайшие приоритеты

1. Подключение к Vercel (preview из PR, production из main).
2. Дизайн-язык (шрифт, палитра, Hero-изображения) — общий визуальный слой для всех страниц.

## Прогресс по областям

### Инфраструктура
- ✅ Next.js scaffold (App Router, TS strict)
- ✅ Tailwind + shadcn/ui
- ⬜ Supabase (клиент + миграции)
- ⬜ Resend (email-нотификации)
- ⬜ Vercel KV (лимиты чата)
- ✅ CI (GitHub Actions: lint + tsc + test)
- ⬜ Деплой (Vercel)

### Страницы
- ✅ `/` — главная
- ✅ `/services` — обзор услуг
- ✅ `/services/[slug]` — страница услуги
- ✅ `/about` — о клинике
- ✅ `/contacts` — контакты
- ⬜ `/booking` — форма записи
- ✅ `/privacy` — legal-заглушка

### Компоненты
- ✅ Header (sticky, навигация, переключатель языка)
- ✅ Footer (соцсети, ссылки)
- ⬜ ChatWidget (плавающая кнопка) + ChatPanel
- ✅ Секции: Hero, ServicesPreview, ServicesGrid, ServicesHero, ServiceCard, ServiceHero, ServiceDetails, DoctorCard, ReviewCard, WhyUs, FAQ, FinalCta, AboutHero, AboutClinic, AboutWarranties, AboutTeam, AboutReviews, ContactsHero, ContactDetails, ContactHours

### Backend
- ⬜ Server Action `submitBooking` → Supabase
- ⬜ Email-нотификация клинике (Resend)
- ⬜ API `/api/chat` (OpenAI, streaming)
- ⬜ Лимиты чата (Vercel KV)

### i18n
- ✅ next-intl: ru / en / tr, path-based роутинг
- 🟡 Переводы UI (`messages/*.json`) — каркас на месте, ключи добавляются по мере страниц
- ⬜ Локализация контента (услуги, доктора, отзывы, FAQ)

### Контент
- 🟡 Услуги (8 направлений) — placeholder в `content/services.ts`, владелец заменит
- 🟡 Доктора (силуэты с инициалами + ФИО + роль + достижения) — placeholder 5 врачей в `content/doctors.ts`
- 🟡 Отзывы — placeholder 6 отзывов в `content/reviews.ts`
- 🟡 FAQ — placeholder общего FAQ для главной и пер-услугой FAQ внутри `content/services.ts`

### Качество
- ⬜ A11y baseline (семантика, focus, контраст WCAG AA)
- ✅ Security headers в `next.config.ts`
- ⬜ Lighthouse ≥90 (mobile)
- 🟡 Метаданные страниц (`title`, `description` на каждой) — есть на `/`, `/services`, всех `/services/[slug]`, `/about`, `/contacts` и `/privacy`, остальные по мере страниц
- ⬜ Юнит-тесты (Vitest): Zod-схемы валидации, лимиты чата, чистые утилиты
- ⬜ SEO-файлы: `robots.txt` и `sitemap.xml` через `app/robots.ts` и `app/sitemap.ts`

### Юридическое
- ✅ `/privacy` placeholder
- ⬜ Чекбокс согласия в форме записи

## Отложено / out of scope MVP

См. CLAUDE.md → раздел **«Что НЕ входит в MVP»** (единый источник). Здесь не дублируем.
