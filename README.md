# Albident

Учебный проект — сайт стоматологического центра «Albident» в Стамбуле, район Şişli. Универсальная стоматология среднего сегмента, восемь направлений. Аудитория — местные пациенты и дентал-туристы из России / СНГ и Европы. Реальной клиники с этим именем нет.

## Статус

Ранняя стадия. Спецификации в основном завершены; инфраструктура (GitHub workflow, правила, roadmap) настроена. Заскаффолжен Next.js + i18n (ru/en/tr, ru по умолчанию) + Vitest + CI. Текущее состояние по областям — [`roadmap/roadmap.md`](roadmap/roadmap.md).

## Команды

- `npm run dev` — dev-сервер на http://localhost:3000 (корень редиректит на `/ru`)
- `npm run build` — production-сборка
- `npm run start` — запуск production-сборки
- `npm run lint` — ESLint
- `npm run format` — Prettier (форматирование), `npm run format:check` — проверка без правки
- `npm test` — Vitest (юнит-тесты)
- `npx tsc --noEmit` — TypeScript-проверка типов

## Стек

Next.js (App Router) · TypeScript (strict) · Tailwind CSS · React 19 · Supabase (Postgres + RLS) · Resend (email) · OpenAI `gpt-4o-mini` (чат-ассистент) · Vercel KV (лимиты чата) · Vitest (тесты) · Vercel (хостинг).

## Структура

- [`specifications/`](specifications/) — спеки: продуктовые описания страниц в [`feature-specs/`](specifications/feature-specs/), техническая реализация в [`technical-specs/`](specifications/technical-specs/), общие документы (`global-spec.md`, `functional-map.md`, `user-stories.md`) — в корне.
- [`plans/active/`](plans/active/) — планы в работе.
- [`plans/completed/`](plans/completed/) — архив завершённых планов.
- [`roadmap/roadmap.md`](roadmap/roadmap.md) — прогресс по областям.
- [`CLAUDE.md`](CLAUDE.md) — правила работы (workflow, конвенции, технические соглашения).

## Локали

Контент сайта на трёх языках: RU (по умолчанию), EN, TR. URL-схема — path-based (`/ru/...`, `/en/...`, `/tr/...`).
