---
name: booking-form-ui
branch: feature/booking-form-ui
status: completed
created: 2026-05-26
completed: 2026-05-26
---

# План: /booking — UI-форма без отправки (этап 1 из 3)

## Цель
Страница `/booking` с рабочей формой, клиент-серверной Zod-валидацией и всеми 4 состояниями (idle/loading/success/error). Server Action — stub, возвращает success после задержки. Backend (Supabase, Resend) подключаются на этапах 2 и 3 без переделки UI.

## Контекст
- Спеки: `feature-spec-booking.md`, `technical-spec-booking.md`, `global-spec.md §14` (согласие).
- /booking — главный CTA сайта. Сейчас все кнопки «Записаться» (header, footer, FinalCta) ведут в 404.
- Этап 1 даёт пациенту работающую форму. Записи в БД и email — этапы 2 и 3.
- Чат-виджет ещё не существует в проекте — пункт «скрыть на mobile /booking» откладывается до фичи чата.

## Шаги
- [x] Установить зависимости: `react-hook-form`, `zod`, `@hookform/resolvers`. Добавить shadcn-компоненты Form/Input/Textarea/Select/Checkbox.
- [x] `lib/validation/booking.ts` — Zod-схема: `name` (min 2), `phone` (min 10 цифр), `city` / `preferredTime` / `comment` (optional), `service` (enum slugs + `'other'`, optional), `consent` (literal true). Одна схема для клиента и сервера.
- [x] `lib/validation/booking.test.ts` — позитивные/негативные кейсы Zod.
- [x] `lib/actions/booking.ts` — stub `submitBooking('use server')`: валидирует Zod, спит ~800ms, возвращает `{ success: true }` или `{ error }`. На этапе 2 заменится на реальный INSERT.
- [x] `messages/{ru,en,tr}.json` — namespace `Booking`: `metaTitle`, `metaDescription`, `heading`, `fields.*` (лейблы), `placeholders.*`, `errors.*` (валидация), `states.success` / `states.error`, `submit`, `submitting`, `consentLabel`, `consentLink`, `services.other`.
- [x] `app/[locale]/booking/page.tsx` — серверный компонент с `generateMetadata`, читает `?service` из `searchParams`, передаёт `defaultService` в клиент-компонент.
- [x] `components/booking/BookingForm.tsx` — `'use client'`, RHF + Zod + shadcn Form. Состояния через `formState` + локальный success/error флаг. На success — inline-сообщение вместо формы. На error — блок над формой, данные сохранены.

## Критерии готовности
- `/ru/booking`, `/en/booking`, `/tr/booking` рендерят форму.
- Клиентская валидация показывает ошибки под полями.
- Submit → loading (кнопка disabled + текст «Отправляется…») → success-блок.
- Deeplink `/ru/booking?service=implants` предзаполняет dropdown.
- Список услуг в dropdown — 8 услуг из `content/services.ts` + «Другое» из messages.
- Чекбокс согласия со ссылкой на `/privacy`, без галки submit заблокирован Zod-валидацией.
- `npm run lint`, `npx tsc --noEmit`, `npm test` — зелёные.
