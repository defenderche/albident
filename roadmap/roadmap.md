# Albident — Roadmap

**Фаза:** MVP в разработке.
**Обновлено:** 2026-05-21.

Файл показывает текущее состояние проекта по областям. Не дублирует спеки (`specifications/`) и не повторяет планы (`plans/`) — это агрегат. Обновляется одним коммитом вместе с переносом плана в `plans/completed/` (см. CLAUDE.md → Plans workflow §5).

**Легенда:** ✅ готово · 🟡 в работе · ⬜ запланировано · ❌ не делаем.

## Сейчас в работе

—

## Ближайшие приоритеты

1. Каркас layout: Header (sticky, навигация, переключатель языка) + Footer.
2. Страница `/` (Hero + ключевые блоки).
3. Подключение к Vercel (preview из PR, production из main).

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
- ✅ next-intl: ru / en / tr, path-based роутинг
- 🟡 Переводы UI (`messages/*.json`) — каркас на месте, ключи добавляются по мере страниц
- ⬜ Локализация контента (услуги, доктора, отзывы, FAQ)

### Контент
- ⬜ Услуги (8 направлений)
- ⬜ Доктора (силуэты с инициалами + ФИО + роль + достижения)
- ⬜ Отзывы
- ⬜ FAQ

### Качество
- ⬜ A11y baseline (семантика, focus, контраст WCAG AA)
- ✅ Security headers в `next.config.ts`
- ⬜ Lighthouse ≥90 (mobile)
- ⬜ Метаданные страниц (`title`, `description` на каждой)
- ⬜ Юнит-тесты (Vitest): Zod-схемы валидации, лимиты чата, чистые утилиты
- ⬜ SEO-файлы: `robots.txt` и `sitemap.xml` через `app/robots.ts` и `app/sitemap.ts`

### Юридическое
- ⬜ `/privacy` placeholder
- ⬜ Чекбокс согласия в форме записи

## Отложено / out of scope MVP

См. CLAUDE.md → раздел **«Что НЕ входит в MVP»** (единый источник). Здесь не дублируем.
