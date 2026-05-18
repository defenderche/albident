# Technical Spec — Форма записи (`/booking`)

Техническая реализация формы записи. Продуктовое описание (поля, валидация для пользователя, состояния UI, тексты сообщений) — в `feature-spec-booking.md`.

Связанные документы: `feature-spec-booking.md`, общий `technical-spec.md`.

---

## 1. Формы и валидация

- Единственная форма на сайте — на `/booking`.
- Управление состоянием — `react-hook-form`.
- Схема валидации — `zod`, лежит в `lib/validation/booking.ts`.
- Та же схема используется на клиенте (через `@hookform/resolvers/zod`) и на сервере (Server Action валидирует ещё раз).
- Интеграция RHF и shadcn — через компонент `Form` из `components/ui/form.tsx`.
- Состояния формы (idle / loading / success / error) — управляются через `formState` от RHF; конкретное поведение — в `feature-spec-booking.md §5`.

## 2. Схема таблицы `bookings`

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

**Удаление данных:** менеджер удаляет строку из дашборда вручную при email-запросе пациента (см. `global-spec.md §14`).

## 3. Поток отправки заявки

1. Пациент отправляет форму → вызывается **Server Action** `submitBooking` в `lib/actions/booking.ts`.
2. Server Action валидирует данные через Zod-схему.
3. **Запись в БД:** Server Action вставляет строку в таблицу `bookings` через Supabase-клиент.
4. **Отправка email** (только если шаг 3 прошёл успешно): собирается HTML-письмо через **react-email** шаблон (`lib/email/templates/booking.tsx`), отправляется через **Resend** (`lib/email/client.ts`) на `CLINIC_EMAIL`.
5. Если шаг 3 упал — Server Action возвращает `{ error: '...' }`, пациент видит сообщение об ошибке (см. `feature-spec-booking.md §5.4`).
6. Если шаг 3 прошёл, а шаг 4 упал — заявка считается успешной (пациент видит `success`), ошибка отправки логируется. Менеджер увидит заявку в дашборде Supabase даже без email-уведомления.
7. Server Action возвращает `{ success: true }` или `{ error: string }`.

**Содержимое письма** (тема, поля) — описано в `feature-spec-booking.md §4`.

---

**Версия:** 1.0
**Дата:** 2026-05-18
