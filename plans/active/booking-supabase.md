---
name: booking-supabase
branch: feature/booking-supabase
status: active
created: 2026-05-28
---

# План: Форма записи — Supabase (этап 2 из 3)

## Цель
Подключить форму `/booking` к облачному Supabase: миграция таблицы `bookings`, типизированный service-role клиент, реальный `submitBooking`, который пишет заявку в БД. Email-нотификация клинике — этап 3, не в этом PR.

## Контекст
Спеки: `specifications/feature-specs/feature-spec-booking.md`, `specifications/technical-specs/technical-spec-booking.md §2-3`. UI и Zod-схема уже на месте (`components/booking/BookingForm.tsx`, `lib/validation/booking.ts`), `lib/actions/booking.ts` сейчас — стаб с искусственной задержкой.

Окружение:
- Supabase проект в облаке, регион Frankfurt.
- CLI `supabase` v2.101.0 у разработчика установлен.
- `SUPABASE_URL` и `SUPABASE_SERVICE_ROLE_KEY` уже в `.env.local`.

Этапы фичи:
- **1/3 — готово.** UI-форма + Zod-валидация.
- **2/3 — текущий.** БД, миграция, Server Action с реальным insert.
- **3/3.** Email-уведомление клинике через Resend.

## Шаги
- [ ] `supabase init` в корне проекта (создаст `supabase/config.toml`, `supabase/migrations/`).
- [ ] `supabase link --project-ref wagfjkmeeoewojebuisk` — связать локальный CLI с облачным проектом.
- [ ] `supabase migration new create_bookings` — создать пустой SQL-файл миграции.
- [ ] Написать SQL: `CREATE TABLE bookings (id uuid PK, name text, phone text, city text null, service text null, preferred_time text null, comment text null, consent boolean, locale text, created_at timestamp default now())` + `ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;`. Политик не пишем.
- [ ] `supabase db push` — применить миграцию к облачному проекту.
- [ ] `supabase gen types typescript --linked > lib/db/types.generated.ts` — сгенерировать типы.
- [ ] `npm install @supabase/supabase-js` через приём «снести node_modules + lockfile», чтобы CI не упал.
- [ ] `lib/db/supabase.ts` — фабрика service-role клиента, типизирован сгенерированной `Database`.
- [ ] `lib/actions/booking.ts` — заменить стаб на реальный `insert`: конвертация `""` опциональных полей в `null`, обработка ошибки insert через `console.error` + возврат `{ error }`.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm test` зелёные.
- [ ] Ручная проверка: открыть `/ru/booking`, заполнить, отправить, убедиться, что строка появилась в Supabase Dashboard → Table Editor.

## Критерии готовности
- Миграция в `supabase/migrations/` коммитится, видна в дашборде Supabase, RLS включён (проверить в дашборде).
- `lib/db/types.generated.ts` коммитится, актуален.
- При успешной отправке формы пациент видит сообщение `states.success`, в Supabase Dashboard появляется строка со всеми заполненными полями. `created_at` заполняется БД автоматически.
- Опциональные пустые поля сохраняются как `NULL`, не как пустые строки.
- При недоступности БД (например, разорванный интернет) форма показывает `states.error`, в Vercel-логах виден `console.error`.
- Email пока не отправляется (этап 3).
- `npm run lint`, `npx tsc --noEmit`, `npm test` зелёные. CI на PR зелёный.
