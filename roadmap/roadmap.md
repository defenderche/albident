# Albident — Roadmap

**Фаза:** MVP в разработке.
**Обновлено:** 2026-07-02 (уточнены статусы контента: услуги/доктора — технически готовы, наполнение за владельцем; следующий шаг — деплой на Vercel).

Файл показывает текущее состояние проекта по областям. Не дублирует спеки (`specifications/`) и не повторяет планы (`plans/`) — это агрегат. Обновляется одним коммитом вместе с переносом плана в `plans/completed/` (см. CLAUDE.md → Plans workflow §5).

**Легенда:** ✅ готово · 🟡 в работе · ⬜ запланировано · ❌ не делаем.

## Сейчас в работе

—

## Ближайшие приоритеты

1. Подключение к Vercel (preview из PR, production из main).
2. ✅ Админ-панель управления услугами завершена: ✅ услуги в БД (services-db) → ✅ авторизация `/admin` (admin-auth) → ✅ CRUD-формы + авто-перевод (admin-services-crud). Дальнейшее (ручная правка EN/TR, переупорядочивание, иконки новых услуг) — по необходимости.

## Прогресс по областям

### Инфраструктура
- ✅ Next.js scaffold (App Router, TS strict)
- ✅ Tailwind + shadcn/ui
- ✅ Supabase (клиент + миграции)
- ✅ Resend (email-нотификации)
- 🟡 Vercel KV (лимиты чата) — код готов, реальный KV подключается при деплое
- ✅ CI (GitHub Actions: lint + tsc + test)
- ⬜ Деплой (Vercel)

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
- 🟡 Лимиты чата (Vercel KV) — код готов, реальный KV подключается при деплое

### i18n
- ✅ next-intl: ru / en / tr, path-based роутинг
- 🟡 Переводы UI (`messages/*.json`) — каркас на месте, ключи добавляются по мере страниц
- ⬜ Локализация контента (услуги, доктора, отзывы, FAQ)

### Контент
> Раздел — про **наполнение реальными данными**, а не про разработку. Технический слой (БД, карточки, секции) готов; финальные тексты/аватары заводит владелец. Placeholder-состояние — ожидаемое для MVP, не незакрытая задача.
- ✅ Услуги (8 направлений) — в БД `services`; тексты владелец правит через `/admin` (не задача разработки)
- ✅ Доктора — решение по рисованным AI-аватарам принято; 5 карточек-заглушек в `content/doctors.ts`, финальные аватары/ФИО заводит владелец
- ✅ Отзывы — 6 отзывов на TR/EN/RU в `content/reviews.ts`; реальные заводятся правкой файла (админки для отзывов нет)
- ✅ FAQ — общий FAQ главной на TR/EN/RU в `content/faq.ts`; пер-услугой FAQ — в таблице `services` (JSONB, правится через `/admin`)

### Качество
- 🟡 A11y baseline (семантика, focus, контраст WCAG AA) — форма записи: `aria-required`; навигация: `aria-current`
- ✅ Security headers в `next.config.ts`
- ⬜ Lighthouse ≥90 (mobile)
- 🟡 Метаданные страниц (`title`, `description` на каждой) — есть на `/`, `/services`, всех `/services/[slug]`, `/about`, `/contacts`, `/privacy` и `/booking`, остальные по мере страниц
- 🟡 Юнит-тесты (Vitest): Zod-схемы валидации (есть для booking), лимиты чата, чистые утилиты
- ✅ SEO-файлы: `robots.txt` и `sitemap.xml` через `app/robots.ts` и `app/sitemap.ts` (3 локали + hreflang)

### Юридическое
- ✅ `/privacy` placeholder
- ✅ Чекбокс согласия в форме записи

## Отложено / out of scope MVP

См. CLAUDE.md → раздел **«Что НЕ входит в MVP»** (единый источник). Здесь не дублируем.
