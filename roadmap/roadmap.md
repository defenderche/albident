# Albident — Roadmap

**Фаза:** MVP в разработке.
**Обновлено:** 2026-05-12.

Файл показывает текущее состояние проекта по областям. Не дублирует спеки (`specifications/`) и не повторяет планы (`plans/`) — это агрегат. Обновляется одним коммитом вместе с переносом плана в `plans/completed/` (см. CLAUDE.md → Plans workflow §5).

**Легенда:** ✅ готово · 🟡 в работе · ⬜ запланировано · ❌ не делаем.

## Сейчас в работе

—

## Ближайшие приоритеты

1. Скаффолд Next.js (App Router, TS strict, Tailwind, ESLint).
2. Каркас layout (Header, Footer) + базовая i18n (ru как дефолт).
3. Страница `/` (Hero + ключевые блоки).

## Прогресс по областям

### Инфраструктура
- ⬜ Next.js scaffold (App Router, TS strict)
- ⬜ Tailwind + shadcn/ui
- ⬜ Supabase (клиент + миграции)
- ⬜ Resend (email-нотификации)
- ⬜ Vercel KV (лимиты чата)
- ⬜ Деплой (Vercel)

### Страницы
- ⬜ `/` — главная
- ⬜ `/services` — обзор услуг
- ⬜ `/services/[slug]` — страница услуги
- ⬜ `/about` — о клинике
- ⬜ `/contacts` — контакты
- ⬜ `/booking` — форма записи
- ⬜ `/privacy` — legal-заглушка

### Компоненты
- ⬜ Header (sticky, навигация, переключатель языка)
- ⬜ Footer (соцсети, ссылки)
- ⬜ ChatWidget (плавающая кнопка) + ChatPanel
- ⬜ Секции: Hero, ServicesGrid, TeamGrid, ReviewsCarousel, FAQ

### Backend
- ⬜ Server Action `submitBooking` → Supabase
- ⬜ Email-нотификация клинике (Resend)
- ⬜ API `/api/chat` (OpenAI, streaming)
- ⬜ Лимиты чата (Vercel KV)

### i18n
- ⬜ next-intl: ru / en / tr, path-based роутинг
- ⬜ Переводы UI (`messages/*.json`)
- ⬜ Локализация контента (услуги, доктора, отзывы, FAQ)

### Контент
- ⬜ Услуги (8 направлений)
- ⬜ Доктора (силуэты + ФИО + достижения)
- ⬜ Отзывы
- ⬜ FAQ

### Качество
- ⬜ A11y baseline (семантика, focus, контраст WCAG AA)
- ⬜ Security headers в `next.config.ts`
- ⬜ Lighthouse ≥90 (mobile)
- ⬜ Метаданные страниц (`title`, `description` на каждой)

### Юридическое
- ⬜ `/privacy` placeholder
- ⬜ Чекбокс согласия в форме записи

## Отложено / out of scope MVP

См. CLAUDE.md → раздел **«Что НЕ входит в MVP»** (единый источник). Здесь не дублируем.
