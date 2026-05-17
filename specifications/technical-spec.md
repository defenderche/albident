# Technical Spec — Albident

Описывает, **как** реализуется проект: технологический стек, архитектура, маршрутизация, хранение контента, формы, отправка заявок, деплой, производительность.

Связанные документы: `global-spec.md`, `functional-map.md`, `feature-spec-*.md`.

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
  services.ts                     # 8 услуг
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

UI-переводы (кнопки, лейблы, ошибки) — отдельно, в `messages/{ru,en,tr}.json` (стандарт `next-intl`).

**Заявки с формы `/booking`** — единственная сущность, которая хранится в БД, а не в файлах. Структура — в §5.1 «Схема таблицы bookings».

## 5. Формы и валидация

- Единственная форма — на `/booking`.
- Управление состоянием — `react-hook-form`.
- Схема валидации — `zod`, лежит в `lib/validation/booking.ts`.
- Та же схема используется на клиенте (через `@hookform/resolvers/zod`) и на сервере (Server Action валидирует ещё раз).
- Интеграция RHF и shadcn — через компонент `Form` из `components/ui/form.tsx`.
- Состояния формы (idle / loading / success / error) — управляются через `formState` от RHF; конкретное поведение — в `feature-spec-booking.md`.

## 5.1 Схема таблицы `bookings`

Единственная таблица в БД (Supabase Postgres):

| Поле | Тип | Описание |
|---|---|---|
| `id` | `uuid` (PK) | Генерируется Supabase автоматически |
| `name` | `text` | Имя пациента |
| `phone` | `text` | Телефон / WhatsApp |
| `city` | `text` \| `null` | Город / страна |
| `service` | `text` \| `null` | Slug услуги (`implants`, `therapy`, ...) или `'other'` |
| `preferred_time` | `text` \| `null` | Удобное время для звонка |
| `comment` | `text` \| `null` | Комментарий пациента |
| `consent` | `boolean` | Согласие на обработку ПДн |
| `locale` | `text` | `'ru'` \| `'en'` \| `'tr'` |
| `created_at` | `timestamp` | Заполняется автоматически |

Типы для TypeScript генерируются командой `supabase gen types typescript` и складываются в `lib/db/types.generated.ts`. Файл не редактируется вручную.

**Просмотр заявок:** менеджер использует дашборд Supabase (Table Editor — фильтры, поиск, сортировка). Внутренней админки на сайте нет.

**Удаление данных:** менеджер удаляет строку из дашборда вручную при email-запросе пациента (см. `global-spec §14`).

## 6. Отправка заявки

**Поток:**

1. Пациент отправляет форму → вызывается **Server Action** `submitBooking` в `lib/actions/booking.ts`.
2. Server Action валидирует данные через Zod-схему.
3. **Запись в БД:** Server Action вставляет строку в таблицу `bookings` через Supabase-клиент.
4. **Отправка email** (только если шаг 3 прошёл успешно): собирается HTML-письмо через **react-email** шаблон (`lib/email/templates/booking.tsx`), отправляется через **Resend** (`lib/email/client.ts`) на `CLINIC_EMAIL`.
5. Если шаг 3 упал — Server Action возвращает `{ error: '...' }`, пациент видит сообщение об ошибке (см. `feature-spec-booking §5.4`).
6. Если шаг 3 прошёл, а шаг 4 упал — заявка считается успешной (пациент видит `success`), ошибка отправки логируется. Менеджер увидит заявку в дашборде Supabase даже без email-уведомления.
7. Server Action возвращает `{ success: true }` или `{ error: string }`.

**Содержимое письма** (см. `feature-spec-booking.md`): все поля формы, дата подачи, локаль сайта.

## 6.1 Чат-ассистент

Подробная спецификация — `feature-spec-chat.md`. Здесь — техническая часть.

**Поток:**

1. Пациент пишет сообщение в плавающую панель чата.
2. Браузер отправляет историю переписки + новое сообщение в API-роут `/api/chat`.
3. Роут проверяет лимиты через `@vercel/kv` (per-IP, общий потолок). При превышении возвращает HTTP 429.
4. Роут собирает системный промпт (`lib/chat/prompt.ts`) + контекст клиники из `content/` (`lib/chat/context.ts`).
5. Роут вызывает OpenAI API (модель `gpt-4o-mini`) со стримингом.
6. Браузер получает поток токенов и постепенно отображает ответ.

**Хранение переписки:** только в `sessionStorage` браузера. В БД ничего не пишется.

**Лимиты:** конкретные значения — `feature-spec-chat §8`. Технически: счётчик per-session живёт в `sessionStorage`, счётчики per-IP и общий потолок — в Vercel KV (ключи с TTL 24 ч). При превышении any из них роут возвращает HTTP 429.

**Кеширование промпта:** системный промпт + контент клиники — статичные части запроса. OpenAI применяет автоматическую кеш-скидку 50% на повторяющиеся префиксы.

## 7. Деплой

- Хостинг: **Vercel**.
- Деплой автоматический при push в Git-ветку `main`.
- Все `process.env.*` настраиваются в Vercel Dashboard → Settings → Environment Variables.
- **Domain verification для Resend:** перед production-отправкой почты с собственного домена нужно верифицировать домен в Resend (добавить TXT/MX/CNAME записи в DNS). Для разработки используется тестовый адрес `onboarding@resend.dev` — без верификации.

## 8. Security Headers

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

## 9. Доступность (a11y baseline)

Базовый уровень доступности закладывается на этапе разработки, чтобы не приходилось ретрофитить компоненты позже.

**Правила:**

- **Семантические HTML-теги** обязательны там, где это уместно: `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<button>`, `<a>`, заголовки `<h1>`–`<h6>`. `<div>` — только для чисто структурных контейнеров без семантического значения.
- **Изображения** имеют атрибут `alt` (описание) либо `aria-hidden="true"` для чисто декоративных элементов.
- **Атрибут `lang`** на `<html>` устанавливается автоматически через `next-intl` в зависимости от текущей локали.
- **Focus-стили** видимы для пользователей клавиатуры. Не отключаем `outline` без замены на собственные стили.
- **Семантика форм** — `<label>` связан с инпутом через `htmlFor` / `id`. Ошибки валидации связаны с полем через `aria-describedby`.

**Что обеспечивает shadcn/ui автоматически:**

Большая часть базовой доступности уже встроена — компоненты shadcn построены на Radix UI, который покрывает keyboard navigation, ARIA-атрибуты, focus management. От нас требуется не сломать это и придерживаться правил выше при написании собственных компонентов.

## 10. Производительность

- **SSG (Static Site Generation)** по умолчанию для всех страниц.
- Для `/services/[slug]` используется `generateStaticParams` — все 8 страниц услуг создаются на этапе сборки.
- **Шрифты** — через `next/font` (с подключением subsets: `latin`, `latin-ext`, `cyrillic` — для покрытия русского, турецкого, английского).
- **Изображения** — через `next/image` (lazy load, WebP, оптимизация). Силуэты — SVG в `public/`.
- На Vercel дополнительно работают: CDN, Image Optimization, HTTP/2 — без отдельной настройки.

## 11. Environment Variables

| Переменная | Назначение | Где задать |
|---|---|---|
| `RESEND_API_KEY` | Ключ от сервиса Resend | `.env.local` (dev), Vercel Dashboard (prod) |
| `RESEND_FROM_EMAIL` | Адрес отправителя писем (`onboarding@resend.dev` для dev, `noreply@<verified-domain>` для prod) | `.env.local` (dev), Vercel Dashboard (prod) |
| `CLINIC_EMAIL` | Email клиники, на который приходят заявки | `.env.local` (dev), Vercel Dashboard (prod) |
| `NEXT_PUBLIC_SITE_URL` | Публичный URL сайта (для абсолютных ссылок в metadata) | `.env.local` (dev), Vercel Dashboard (prod) |
| `OPENAI_API_KEY` | Ключ от OpenAI API | `.env.local` (dev), Vercel Dashboard (prod) |
| `SUPABASE_URL` | URL проекта Supabase | `.env.local` (dev), Vercel Dashboard (prod) |
| `SUPABASE_ANON_KEY` | Публичный ключ Supabase (для чтения, RLS) | `.env.local` (dev), Vercel Dashboard (prod) |
| `SUPABASE_SERVICE_ROLE_KEY` | Серверный ключ Supabase (для записи через Server Action) | `.env.local` (dev), Vercel Dashboard (prod) |
| `KV_REST_API_URL` | URL Vercel KV для счётчиков лимитов чата | `.env.local` (dev), Vercel Dashboard (prod) |
| `KV_REST_API_TOKEN` | Токен Vercel KV | `.env.local` (dev), Vercel Dashboard (prod) |

Шаблон с пустыми значениями — в `.env.example` (в репозитории). Реальные значения — в `.env.local` (gitignored) и Vercel Dashboard.

---

**Версия:** 1.3
**Дата:** 2026-05-06
