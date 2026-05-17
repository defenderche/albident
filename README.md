# Albident

Сайт стоматологического центра «Albident» в Стамбуле, район Şişli. Универсальная стоматология среднего сегмента, восемь направлений. Аудитория — местные пациенты и дентал-туристы из России / СНГ и Европы.

## Статус

**MVP в разработке.** Спецификации завершены, идёт подготовка перед скаффолдом Next.js. Текущее состояние по областям — [`roadmap/roadmap.md`](roadmap/roadmap.md).

## Стек

Next.js (App Router) · TypeScript (strict) · Tailwind CSS · React 19 · Supabase (Postgres + RLS) · Resend (email) · OpenAI `gpt-4o-mini` (чат-ассистент) · Vercel KV (лимиты чата) · Vitest (тесты) · Vercel (хостинг).

## Структура

- [`specifications/`](specifications/) — продуктовые и технические спеки (фичи, визуальные правила, user stories).
- [`plans/active/`](plans/active/) — планы в работе.
- [`plans/completed/`](plans/completed/) — архив завершённых планов.
- [`roadmap/roadmap.md`](roadmap/roadmap.md) — прогресс по областям.
- [`CLAUDE.md`](CLAUDE.md) — правила работы (workflow, конвенции, технические соглашения).

## Локали

Контент сайта на трёх языках: RU (по умолчанию), EN, TR. URL-схема — path-based (`/ru/...`, `/en/...`, `/tr/...`).
