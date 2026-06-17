---
name: services-db
branch: feature/services-db
status: active
created: 2026-06-17
---

# План: Услуги в БД (этап 1 — хребет админки)

## Цель
Перенести услуги из `content/services.ts` в таблицу Supabase `services` и
перевести весь сайт (и чат, и форму записи) на чтение из БД. Снаружи поведение
не меняется. Это фундамент под админ-панель; авторизация и CRUD — следующие этапы.

## Контекст
- Спека: `specifications/technical-specs/technical-spec-admin.md` §1–4, §10, §14 (этап 1);
  `feature-spec-admin.md`.
- Образец миграции: `supabase/migrations/20260527212344_create_bookings.sql`
  (таблица + RLS без политик). Клиент: `lib/db/supabase.ts` (`getServiceRoleClient`).
- Supabase подключён и работает (подтверждено). Применение миграций — `supabase db push`.

## Шаги
- [ ] Миграция `create_services` — таблица по схеме техспеки (колонки + JSONB, RLS, без политик)
- [ ] Seed-миграция: сгенерировать INSERT-SQL из `content/services.ts` одноразовым скриптом
      (8 услуг 1:1; `show_on_home` для 5 «домашних», `sort_order`)
- [ ] Применить миграции к Supabase, регенерировать `lib/db/types.generated.ts`
- [ ] Слой `lib/services/` — `getServices` / `getServiceBySlug` / `getHomeServices`
      (service-role, кэш с тегом `services`, маппинг snake_case → `Service`)
- [ ] Тип `Service`: `slug: string`, добавить `id` / `showOnHome` / `sortOrder`
- [ ] Перевести потребителей на слой: страницы услуг, `ServicesGrid/Card/Preview`,
      `sitemap`, `chat/context`, `parseBookingMarker`, `BookingForm` + `lib/validation/booking.ts`
- [ ] Удалить `content/services.ts`; обновить `booking.test.ts` под динамический список
- [ ] Проверки: `tsc`, `lint`, `test`, ручная проверка /services, /services/[slug], главная, чат, форма

## Критерии готовности
- Сайт читает услуги из БД; визуально и функционально без изменений.
- `content/services.ts` удалён, ни один потребитель на него не ссылается.
- `tsc` / `lint` / `test` зелёные.
- Авто-перевод, slug-генерация, ревалидация по записи — НЕ здесь (этапы 2–3),
  кроме тега кэша `services`, заложенного в слой чтения.
