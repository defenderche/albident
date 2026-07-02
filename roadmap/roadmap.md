# Albident — Roadmap

**Фаза:** MVP в разработке.
**Обновлено:** 2026-07-02 (техдолг: миграция лимитов чата с deprecated `@vercel/kv` на `@upstash/redis`).

Файл показывает текущее состояние проекта по областям. Не дублирует спеки (`specifications/`) и не повторяет планы (`plans/`) — это агрегат. Обновляется одним коммитом вместе с переносом плана в `plans/completed/` (см. CLAUDE.md → Plans workflow §5).

**Легенда:** ✅ готово · 🟡 в работе · ⬜ запланировано · ❌ не делаем.

## Сейчас в работе

—

## Ближайшие приоритеты

1. ✅ Деплой на Vercel завершён: production `albident.vercel.app` из `main`, preview из PR, Upstash Redis для чат-лимитов.
2. ✅ Админ-панель управления услугами завершена: ✅ услуги в БД (services-db) → ✅ авторизация `/admin` (admin-auth) → ✅ CRUD-формы + авто-перевод (admin-services-crud). Дальнейшее (ручная правка EN/TR, переупорядочивание, иконки новых услуг) — по необходимости.

## Прогресс по областям

### Инфраструктура
- ✅ Next.js scaffold (App Router, TS strict)
- ✅ Tailwind + shadcn/ui
- ✅ Supabase (клиент + миграции)
- ✅ Resend (email-нотификации)
- ✅ Redis для лимитов чата — Upstash Redis, клиент `@upstash/redis` напрямую (ушли с deprecated `@vercel/kv`), переменные `KV_REST_API_*` в проекте
- ✅ CI (GitHub Actions: lint + tsc + test)
- ✅ Деплой (Vercel) — production `albident.vercel.app` из `main`, preview из PR

### Страницы
- ✅ `/` — главная
- ✅ `/services` — обзор услуг
- ✅ `/services/[slug]` — страница услуги
- ✅ `/about` — о клинике
- ✅ `/contacts` — контакты
- ✅ `/booking` — форма записи
- ✅ `/privacy` — legal-заглушка

### Компоненты
- ✅ Дизайн-система применена в коде (Manrope, кобальт-синий акцент, токены/тени по `design-map/index.html`)
- ✅ Header (sticky, навигация, переключатель языка)
- ✅ Footer (соцсети, ссылки)
- ✅ ChatWidget (плавающая кнопка) + ChatPanel
- ✅ Секции: Hero, ServicesPreview, ServicesGrid, ServicesHero, ServiceCard, ServiceHero, ServiceDetails, DoctorCard, ReviewCard, WhyUs, FAQ, FinalCta, AboutClinic (заголовок + intro + подход + фото интерьера), AboutWarranties, AboutTeam, AboutReviews, ContactsHero, ContactDetails, ContactHours

### Backend
- ✅ Server Action `submitBooking` → Supabase
- ✅ Услуги в БД Supabase (таблица `services`) + слой чтения `lib/services/` (этап 1 админки)
- ✅ Авторизация `/admin` через Supabase Auth (`@supabase/ssr`, защита в `proxy.ts`) — этап 2 админки
- ✅ CRUD услуг в `/admin` (Server Actions, авто-перевод RU→EN/TR через OpenAI, генерация slug, `updateTag`) — этап 3 админки
- ✅ Email-нотификация клинике (Resend)
- ✅ API `/api/chat` (OpenAI, streaming)
- ✅ Лимиты чата — Upstash Redis (`@upstash/redis`) на проде

### i18n
- ✅ next-intl: ru / en / tr, path-based роутинг
- 🟡 Переводы UI (`messages/*.json`) — каркас на месте, ключи добавляются по мере страниц
- ⬜ Локализация контента (услуги, доктора, отзывы, FAQ)

### Контент
> Технический слой (БД, карточки, секции) готов. Доктора и отзывы — **финальный контент** (решение владельца от 2026-07-03: реальным не заменяется). Услуги владелец при необходимости правит через `/admin`.
- ✅ Услуги (8 направлений) — в БД `services`; тексты владелец правит через `/admin`
- ✅ Доктора — рисованные AI-аватары + ФИО/роль/достижения на `ru/en/tr` (`content/doctors.ts`). Финальный контент, замене не подлежит
- ✅ Отзывы — 6 отзывов на TR/EN/RU (`content/reviews.ts`). Финальный контент, замене не подлежит
- ✅ FAQ — общий FAQ главной на TR/EN/RU в `content/faq.ts`; пер-услугой FAQ — в таблице `services` (JSONB, правится через `/admin`)

### Качество
- 🟡 A11y baseline (семантика, focus, контраст WCAG AA) — контраст токенов доведён до AA (`--primary` `#2a5fe0`, `--muted-foreground` `#5f6673`); переключатель языка: доступное имя; форма записи: `aria-required`; навигация: `aria-current`. Lighthouse a11y = 100
- ✅ Security headers в `next.config.ts`
- ⬜ Lighthouse ≥90 (mobile)
- 🟡 Метаданные страниц (`title`, `description` на каждой) — есть на `/`, `/services`, всех `/services/[slug]`, `/about`, `/contacts`, `/privacy` и `/booking`, остальные по мере страниц
- 🟡 Юнит-тесты (Vitest): ✅ Zod-схемы валидации (booking), ✅ лимиты чата (`rateLimit` — 14 кейсов: границы, IP/global, изоляция, суточное окно, fail-open); чистые утилиты — по мере появления
- ✅ SEO-файлы: `robots.txt` и `sitemap.xml` через `app/robots.ts` и `app/sitemap.ts` (3 локали + hreflang)

### Юридическое
- ✅ `/privacy` placeholder
- ✅ Чекбокс согласия в форме записи

## Отложено / out of scope MVP

См. CLAUDE.md → раздел **«Что НЕ входит в MVP»** (единый источник). Здесь не дублируем.
