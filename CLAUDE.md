# Albident

Сайт стоматологического центра «Albident» в Стамбуле (район Şişli). Next.js + TypeScript.

Текущий статус: спецификация завершена → см. `docs/specs/`. Сам Next.js ещё не заскаффолжен.

## Команды

> Будут актуальны после `npx create-next-app@latest .`

- `npm run dev` — dev-сервер на http://localhost:3000
- `npm run build` — production-сборка
- `npm run start` — запуск production-сборки
- `npm run lint` — ESLint
- `npx tsc --noEmit` — проверка типов без эмита

## Стек

- Next.js (App Router) + TypeScript (strict mode)
- React 19+
- Tailwind CSS
- ESLint (стандартный конфиг Next.js) + Prettier
- Supabase (Postgres) + `@supabase/supabase-js`
- OpenAI API (`gpt-4o-mini`) — чат-ассистент
- Vercel KV — счётчики лимитов чата

## Соглашения по коду

- Отступ — 2 пробела.
- Компоненты — `PascalCase.tsx`. Утилиты и хуки — `camelCase.ts`.
- Серверные компоненты по умолчанию; `"use client"` — только при необходимости интерактива.
- Изображения — через `next/image`. Шрифты — через `next/font`.
- Каждая страница экспортирует `metadata` (`title`, `description`).
- Никаких секретов в коде. Переменные окружения — `.env.local` (gitignored), пример — `.env.example` (в репо).

## Соглашения по контенту

- **Язык общения с пользователем — русский.**
- Контент сайта — на трёх языках: TR (турецкий), EN (английский), RU (русский). Язык по умолчанию — RU.
- URL-схема локалей: path-based (`/ru/...`, `/en/...`, `/tr/...`).
- Идентификаторы кода и имена файлов — английский.
- **Сообщения git-коммитов — русский**, без conventional commits префиксов (`feat:`, `fix:` и т.п.). Пример: «Добавлена форма записи».
- Комментарии в коде — на английском, и только если объясняют **почему**, а не **что**.

## Особенности проекта

- **Универсальная стоматология**, средний сегмент. 8 услуг: терапия, хирургия, имплантация, протезирование, ортодонтия, эстетика, гигиена, пародонтология. Без детской.
- **Аудитория** — местные пациенты + дентал-туристы из России/СНГ и Европы.
- **Главное действие** — онлайн-запись через форму на `/booking`. Заявка сохраняется в Supabase + дублируется email'ом клинике. Менеджер связывается с пациентом через **WhatsApp**, заявки просматривает в дашборде Supabase. См. `technical-spec.md §5.1, §6`.
- **Чат-ассистент** на всех страницах (плавающая кнопка в углу), отвечает на вопросы о клинике в рамках жёстких медицинских границ. См. `feature-spec-chat.md`.
- **Фото реальных людей не используются.** Врачи на странице «Команда» отображаются как силуэты с инициалами + ФИО + роль + достижения.
- **Соцсети:** Instagram, WhatsApp, Telegram (без Facebook).
- **Legal-заглушки** для будущего наполнения: страница `/privacy` с placeholder-текстом, ссылка в подвале, **обязательный** чекбокс согласия в форме записи (заявки сохраняются в БД — см. `global-spec.md` §14).
- **Security headers** настроены в `next.config.ts`: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- **A11y baseline** — семантические HTML-теги, alt-тексты, видимые focus-стили, контраст WCAG AA. shadcn/ui обеспечивает большую часть.

## Что НЕ входит в MVP

Сознательно исключено (см. `global-spec.md`):

- Онлайн-оплата
- Личный кабинет пациента
- Блог / статьи
- Калькулятор стоимости
- Видео-консультации
- Интеграция с CRM/МИС
- Полноценные юридические тексты KVKK / GDPR / ФЗ-152 (закладываются только заглушки — см. `global-spec.md` §14)
- Карта на странице контактов
- Schema.org structured data
- Аналитика (Яндекс.Метрика, GA)
- Captcha / антиспам в формах

## Архитектура (плановая)

```
app/
  api/
    chat/              # OpenAI-роут со стримингом
  [locale]/            # Локали: ru / en / tr
    page.tsx           # /
    services/
      page.tsx         # /services
      [slug]/page.tsx  # /services/[slug]
    about/page.tsx     # /about
    contacts/page.tsx  # /contacts
    booking/page.tsx   # /booking
    privacy/page.tsx   # /privacy (legal-заглушка)
components/
  ui/                  # shadcn-компоненты (Button, Input, Form, ...)
  sections/            # Секции страниц (Hero, ServicesGrid, TeamGrid, ...)
  layout/              # Header (sticky), Footer
  chat/                # ChatWidget (плавающая кнопка), ChatPanel
lib/
  actions/             # Server Actions (submitBooking)
  email/               # Resend клиент + шаблоны
  validation/          # Zod-схемы
  utils/               # cn() и т.п.
  db/                  # Supabase-клиент + сгенерированные типы
  chat/                # Системный промпт, контекст, лимиты
content/               # Данные сайта: site, services, doctors, reviews, faq
i18n/                  # Конфигурация next-intl
messages/              # UI-переводы (ru.json, en.json, tr.json)
types/                 # Общие TypeScript-типы
public/                # Статика
middleware.ts          # next-intl middleware: локали и редиректы
```

> Подробная архитектура — в `docs/specs/technical-spec.md`.

## Workflow с Claude

- **Сначала обсуждение, потом действия.** Никаких изменений файлов без явного разрешения пользователя.
- **Работаем строго в папке проекта** — не выходим за пределы `/Users/saidakhmed/Desktop/Albident`.
- Перед крупной фичей — свериться с соответствующим спеком в `docs/specs/`. Если фича расходится со спекой — сначала обновить спеку, после — код.
- Для бага — найти корневую причину, не маскировать `try/catch` или фолбэками.
- Не добавлять зависимости без нужды; перед `npm install <pkg>` — обосновать.
- Тексты UI — без канцелярита и медицинского жаргона.

## Спеки

В `docs/specs/`:

- `global-spec.md` — общее видение, проблема, аудитория, scope.
- `functional-map.md` — карта страниц и навигация.
- `feature-spec-home.md` — главная страница (`/`).
- `feature-spec-services.md` — обзор услуг (`/services`).
- `feature-spec-service-page.md` — динамическая страница услуги (`/services/[slug]`).
- `feature-spec-booking.md` — форма записи (`/booking`).
- `feature-spec-about.md` — страница «О нас» (`/about`).
- `feature-spec-contacts.md` — страница контактов (`/contacts`).
- `feature-spec-chat.md` — чат-ассистент (`/api/chat` + плавающая кнопка).
- `technical-spec.md` — техническая спецификация.
- `user-stories.md` — пользовательские сценарии.
- `visual-rules.md` — визуальная идентичность (палитра, типографика, иконки, углы).
- `PLAN.md` (в корне) — порядок работы (планируется).
