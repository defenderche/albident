---
name: privacy-page
branch: feature/privacy-page
status: completed
created: 2026-05-25
completed: 2026-05-26
---

# План: Страница /privacy (legal-заглушка)

## Цель
Закрыть архитектурную заглушку из `global-spec.md §14`: страница `/privacy` существует, ссылка из футера ведёт на работающий URL, текст — placeholder, который владелец заменит позже.

## Контекст
- Источник: `global-spec.md §14`. Полноценный KVKK / GDPR / ФЗ-152 — out of scope MVP (§13).
- Ссылка `/privacy` в `components/layout/Footer.tsx:115` уже есть → сейчас даёт 404, после плана работает.
- Текст должен упомянуть три факта: заявки сохраняются в БД клиники; чат-сообщения проходят через OpenAI; для удаления данных пациент пишет на email клиники (`info@albident.example` из `content/site.ts`).
- Контентные тексты — в `content/*.ts` по локалям (как `site`, `services`, `doctors`). Не в `messages/*.json`.

## Шаги
- [ ] `content/privacy.ts` + тип в `types/`: `updatedAt`, `title`, `intro`, три раздела (`bookings`, `chat`, `dataDeletion`), у каждого `heading` и `body` на ru/en/tr.
- [ ] `app/[locale]/privacy/page.tsx` — серверный компонент, читает из `content/privacy.ts` по `locale`, рендерит заголовок → дату → преамбулу → 3 раздела. `max-w-2xl`, без Hero. `mailto:` на email клиники в разделе «Удаление данных».
- [ ] `generateMetadata` с локализованными `title` / `description`.
- [ ] Ручная проверка: `/ru/privacy`, `/en/privacy`, `/tr/privacy` рендерятся, ссылка из футера ведёт корректно, mailto открывается.

## Критерии готовности
- На всех трёх локалях `/privacy` отдаёт 200 и валидный контент.
- Текст содержит все три факта из `global-spec.md §14`.
- Ссылка из футера работает, без 404.
- `npm run lint`, `npx tsc --noEmit`, `npm test` — зелёные.
