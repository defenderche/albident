# Technical Spec — Albident

Описывает сквозные технические темы проекта: технологический стек, архитектура папок, маршрутизация и локализация, источник контента, деплой, security headers, доступность, производительность, переменные окружения.

Техника отдельных фич — в `technical-spec-chat.md` и `technical-spec-booking.md`.

Связанные документы: `../global-spec.md`, `../functional-map.md`, `../feature-specs/feature-spec-*.md`, `technical-spec-chat.md`, `technical-spec-booking.md`.

---

## 1. Стек технологий

### Базовый стек

- **Next.js** (App Router) — фреймворк
- **TypeScript** (strict mode) — типизация
- **React** 19+
- **Tailwind CSS** — стили
- **ESLint + Prettier** — линтинг и форматирование (из коробки `create-next-app`)
- **npm** — пакетный менеджер

### Дополнительные библиотеки

| Библиотека | Зачем |
|---|---|
| `next-intl` | Многоязычность, path-based локали |
| `react-hook-form` + `@hookform/resolvers/zod` | Управление формами |
| `zod` | Схемы валидации (общие для клиента и сервера) |
| `shadcn/ui` | UI-компоненты (на Radix + Tailwind) |
| `resend` | Отправка email |
| `react-email` | HTML-шаблоны писем как React-компоненты |
| `@supabase/supabase-js` | Клиент Postgres + автогенерация TypeScript-типов |
| `openai` | Клиент OpenAI API для чат-ассистента |
| `@vercel/kv` | Счётчики лимитов чата (per-IP, общий потолок) |

### Внешние сервисы

- **Supabase** — база данных (Postgres + RLS). Хранит таблицу `bookings`.
- **Resend** — отправка email-уведомлений клинике о новых заявках.
- **OpenAI** — модель `gpt-4o-mini` для чат-ассистента.
- **Vercel KV** — счётчики лимитов чата (per-IP и общий потолок).
- **Vercel** — хостинг и деплой проекта.

## 2. Архитектура папок

```
app/
  api/
    chat/route.ts                 # OpenAI-роут со стримингом
  [locale]/                       # Локали: ru / en / tr
    layout.tsx                    # Layout с NextIntlClientProvider
    page.tsx                      # /
    services/
      page.tsx                    # /services
      [slug]/page.tsx             # /services/[slug]
    about/page.tsx                # /about
    contacts/page.tsx             # /contacts
    booking/page.tsx              # /booking
    privacy/page.tsx              # /privacy (legal-заглушка)
  layout.tsx                      # Корневой layout
components/
  ui/                             # shadcn-компоненты (Button, Input, Form, ...)
  sections/                       # Секции страниц (Hero, ServicesGrid, TeamGrid, FAQ, ...)
  layout/                         # Header (sticky), Footer
  chat/                           # ChatWidget (плавающая кнопка), ChatPanel, ChatMessage
content/
  site.ts                         # Адрес, телефон, WhatsApp, email, часы, соцсети
  services.ts                     # 8 услуг (включая FAQ по каждой услуге)
  doctors.ts                      # 5 врачей
  reviews.ts                      # Отзывы
  faq.ts                          # Общий FAQ для главной
lib/
  actions/                        # Server Actions (submitBooking)
  email/                          # Resend клиент + react-email шаблоны
  validation/                     # Zod-схемы (booking)
  utils/                          # Утилиты (cn() для shadcn и др.)
  db/
    supabase.ts                   # Supabase-клиент
    types.generated.ts            # Codegen Supabase, не редактировать руками
  chat/
    prompt.ts                     # Системный промпт чата
    context.ts                    # Сборка контекста клиники из content/
    rateLimit.ts                  # Лимиты через Vercel KV
i18n/                             # Конфигурация next-intl
messages/                         # UI-переводы
  ru.json
  en.json
  tr.json
public/                           # Статика (силуэты SVG, иконки, фавикон)
types/                            # Общие TypeScript-типы (Service, Doctor, BookingFormData)
middleware.ts                     # next-intl middleware: локали и редиректы
```

## 3. Маршрутизация и i18n

### Локали

- 3 локали: `ru` (default), `en`, `tr`.
- URL-схема: path-based, всегда с префиксом — `/ru/...`, `/en/...`, `/tr/...`.
- Заход на корень `/` без локали → **редирект на `/ru`** (без авто-определения языка из браузера).
- Управление через `next-intl` middleware (`middleware.ts` в корне).

### Динамические маршруты

`/services/[slug]` — страницы услуг. Slug'и:

| Услуга | Slug |
|---|---|
| Терапия | `therapy` |
| Хирургия | `surgery` |
| Имплантация | `implants` |
| Протезирование | `prosthetics` |
| Ортодонтия | `orthodontics` |
| Эстетика | `aesthetics` |
| Гигиена / профилактика | `hygiene` |
| Пародонтология | `periodontology` |

При запросе несуществующего slug — стандартная страница 404 Next.js.

## 4. Источник контента

Контент сайта живёт в `content/` как TypeScript-файлы.

**Принципы:**

- Один файл на сущность (`services.ts`, `doctors.ts`, `reviews.ts`, `site.ts`, `faq.ts`).
- Многоязычные поля — объект с ключами по локалям:
  ```ts
  name: { ru: 'Имплантация', en: 'Dental Implants', tr: 'İmplant' }
  ```
- Числовые значения (цены) — без локализации, в **USD**.
- Типы данных описаны в `types/`.

**FAQ.** Общий FAQ для главной страницы — в `content/faq.ts`. FAQ по конкретной услуге — поле `faq: [{ q, a }]` внутри объекта услуги в `content/services.ts` (живёт рядом с её описанием, ценами и метаданными).

UI-переводы (кнопки, лейблы, ошибки) — отдельно, в `messages/{ru,en,tr}.json` (стандарт `next-intl`).

**Заявки с формы `/booking`** — единственная сущность, которая хранится в БД, а не в файлах. Схема таблицы и поток — в `technical-spec-booking.md`.

## 5. Деплой

- Хостинг: **Vercel**.
- Деплой автоматический при push в Git-ветку `main`.
- Все `process.env.*` настраиваются в Vercel Dashboard → Settings → Environment Variables.
- **Domain verification для Resend:** перед production-отправкой почты с собственного домена нужно верифицировать домен в Resend (добавить TXT/MX/CNAME записи в DNS). Для разработки используется тестовый адрес `onboarding@resend.dev` — без верификации.

## 6. Security Headers

HTTP-заголовки безопасности настраиваются в `next.config.ts` через секцию `headers()`. Применяются ко всем маршрутам.

**Базовый набор:**

| Header | Значение | Защита от |
|---|---|---|
| `X-Frame-Options` | `DENY` | Clickjacking — встраивание сайта в чужой iframe |
| `X-Content-Type-Options` | `nosniff` | MIME-sniffing — подмена типа файла |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Утечка URL через referrer при переходах |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Несанкционированный доступ к камере / микрофону / геолокации |

**Не настраиваются явно:**

- **HSTS** — Vercel применяет автоматически.
- **Content-Security-Policy (CSP)** — добавляется отдельной задачей перед production-деплоем (требует тестирования каждой страницы и подгружаемых ресурсов).

## 7. Доступность (a11y baseline)

Базовый уровень доступности закладывается на этапе разработки, чтобы не приходилось ретрофитить компоненты позже.

**Правила:**

- **Семантические HTML-теги** обязательны там, где это уместно: `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<button>`, `<a>`, заголовки `<h1>`–`<h6>`. `<div>` — только для чисто структурных контейнеров без семантического значения.
- **Изображения** имеют атрибут `alt` (описание) либо `aria-hidden="true"` для чисто декоративных элементов.
- **Атрибут `lang`** на `<html>` устанавливается автоматически через `next-intl` в зависимости от текущей локали.
- **Focus-стили** видимы для пользователей клавиатуры. Не отключаем `outline` без замены на собственные стили.
- **Семантика форм** — `<label>` связан с инпутом через `htmlFor` / `id`. Ошибки валидации связаны с полем через `aria-describedby`.

**Что обеспечивает shadcn/ui автоматически:**

Большая часть базовой доступности уже встроена — компоненты shadcn построены на Radix UI, который покрывает keyboard navigation, ARIA-атрибуты, focus management. От нас требуется не сломать это и придерживаться правил выше при написании собственных компонентов.

## 8. Производительность

- **SSG (Static Site Generation)** по умолчанию для всех страниц.
- Для `/services/[slug]` используется `generateStaticParams` — все 8 страниц услуг создаются на этапе сборки.
- **Шрифты** — через `next/font` (с подключением subsets: `latin`, `latin-ext`, `cyrillic` — для покрытия русского, турецкого, английского).
- **Изображения** — через `next/image` (lazy load, WebP, оптимизация). Силуэты — SVG в `public/`.
- На Vercel дополнительно работают: CDN, Image Optimization, HTTP/2 — без отдельной настройки.

## 9. Environment Variables

| Переменная | Назначение | Где задать |
|---|---|---|
| `RESEND_API_KEY` | Ключ от сервиса Resend | `.env.local` (dev), Vercel Dashboard (prod) |
| `RESEND_FROM_EMAIL` | Адрес отправителя писем (`onboarding@resend.dev` для dev, `noreply@<verified-domain>` для prod) | `.env.local` (dev), Vercel Dashboard (prod) |
| `CLINIC_EMAIL` | Email клиники, на который приходят заявки | `.env.local` (dev), Vercel Dashboard (prod) |
| `NEXT_PUBLIC_SITE_URL` | Публичный URL сайта (для абсолютных ссылок в metadata) | `.env.local` (dev), Vercel Dashboard (prod) |
| `OPENAI_API_KEY` | Ключ от OpenAI API | `.env.local` (dev), Vercel Dashboard (prod) |
| `SUPABASE_URL` | URL проекта Supabase | `.env.local` (dev), Vercel Dashboard (prod) |
| `SUPABASE_SERVICE_ROLE_KEY` | Серверный ключ Supabase. Единственный способ доступа к БД из проекта — все мутации идут через Server Action под этим ключом. Anon-ключ не используется. | `.env.local` (dev), Vercel Dashboard (prod) |
| `KV_REST_API_URL` | URL Vercel KV для счётчиков лимитов чата | `.env.local` (dev), Vercel Dashboard (prod) |
| `KV_REST_API_TOKEN` | Токен Vercel KV | `.env.local` (dev), Vercel Dashboard (prod) |

Шаблон с пустыми значениями — в `.env.example` (в репозитории). Реальные значения — в `.env.local` (gitignored) и Vercel Dashboard.

## 10. SEO

- **`robots.txt`** — генерируется через `app/robots.ts` (Next.js Metadata API). Разрешает индексацию всем ботам. Указывает путь к `sitemap.xml`.
- **`sitemap.xml`** — генерируется через `app/sitemap.ts`. Включает все статические страницы (`/`, `/services`, `/about`, `/contacts`, `/booking`, `/privacy`) и все 8 страниц услуг (`/services/[slug]`). На каждый URL — три языковых варианта (`/ru/...`, `/en/...`, `/tr/...`) с `hreflang`-аннотациями.
- **Базовый URL** для абсолютных ссылок — `NEXT_PUBLIC_SITE_URL` (см. §9).
- **Метаданные страниц** (`title`, `description`) — на каждой странице через `export const metadata` / `generateMetadata`. Конкретные тексты — в соответствующих feature-spec.

## 11. Тестирование

- **Фреймворк:** Vitest.
- **Что покрываем:** только критичные места — Zod-схемы валидации (`lib/validation/`), логика лимитов чата в Vercel KV (`lib/chat/`), чистые утилиты с нетривиальной логикой (`lib/utils/`).
- **Что не покрываем в MVP:** UI-компоненты и визуальные проверки, E2E-сценарии (Playwright/Cypress), Server Components (тестируем только извлекаемую логику, не JSX).
- **Расположение:** тесты лежат рядом с кодом — `<name>.test.ts` рядом с `<name>.ts`.
- **Запуск:** `npm test`.

## 12. CI

- **Платформа:** GitHub Actions. Конфиг — `.github/workflows/ci.yml`.
- **Триггер:** каждый PR в `main`.
- **Шаги:** `npm run lint` (ESLint) → `npx tsc --noEmit` (типы) → `npm test` (Vitest).
- При красном статусе кнопка Merge на PR недоступна.
- **Pre-commit hooks** (husky / lint-staged) не используются — серверные проверки в Actions покрывают всё нужное.
- Дополнительно Vercel при создании PR делает preview-build — отдельная проверка сборки.

---

**Версия:** 2.1
**Дата:** 2026-05-20
