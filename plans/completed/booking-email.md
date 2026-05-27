---
name: booking-email
branch: feature/booking-email
status: completed
created: 2026-05-28
completed: 2026-05-28
---

# План: Форма записи — Email-нотификация клинике (этап 3 из 3)

## Цель
После успешной записи заявки в Supabase отправлять email-уведомление на `CLINIC_EMAIL` через Resend. Если email падает — заявка всё равно считается успешной (пациент видит success), ошибка только в логах.

## Контекст
Спеки: `feature-spec-booking.md §4`, `technical-spec-booking.md §3`. БД-часть закрыта в этапе 2. UI-форма и Server Action `submitBooking` уже работают, после insert ничего не делается — это место добавляем.

Этапы фичи:
- **1/3 — готово.** UI-форма + Zod.
- **2/3 — готово.** Supabase + insert.
- **3/3 — текущий.** Resend email-нотификация.

## Шаги
- [ ] `npm install resend @react-email/components` через приём чистого lockfile.
- [ ] `lib/email/client.ts` — фабрика Resend с проверкой env (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CLINIC_EMAIL`), ленивая инициализация и кеш.
- [ ] `lib/email/templates/booking-notification.tsx` — React Email шаблон письма по спеке §4: имя, телефон, город, услуга, время, комментарий, локаль (RU/EN/TR), дата подачи.
- [ ] `lib/email/send-booking-notification.ts` — рендер шаблона + вызов `resend.emails.send`. Возвращает `{ ok: true } | { ok: false; error: string }`. Сам ничего не бросает.
- [ ] `lib/actions/booking.ts` — после успешного insert вызвать `sendBookingNotification(data)`. Если результат `!ok` — `console.error`, но в любом случае вернуть `{ success: true }`.
- [ ] Lint / tsc / test.
- [ ] Ручная проверка: отправить заявку через `/ru/booking`, убедиться что письмо пришло на `CLINIC_EMAIL`, тема и содержимое соответствуют спеке.

## Критерии готовности
- При успешной отправке формы строка появляется в Supabase **и** письмо приходит на `CLINIC_EMAIL` за несколько секунд.
- Тема письма: «Новая заявка с сайта — {Имя}». Тело включает все поля из спеки §4. Согласие в письме не показывается.
- При сбое Resend (например, удалить `RESEND_API_KEY`) пациент видит success, в логах сервера `console.error` с деталями.
- При сбое БД email не отправляется (по спеке).
- `npm run lint`, `npx tsc --noEmit`, `npm test` зелёные. CI зелёный.
