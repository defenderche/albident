---
name: services-hero-copy
branch: feature/services-hero-copy
status: completed
created: 2026-06-07
completed: 2026-06-07
---

# План: Текст hero на странице услуг

## Цель
Заменить заголовок и подзаголовок hero-секции `/services` на более читабельный
клиентский текст во всех трёх локалях. Структура hero не меняется.

## Контекст
- `feature-spec-services.md` §1.1 — hero = заголовок + краткое описание (точный текст не зафиксирован).
- Тон по `global-spec.md` §5 (без превосходных степеней и клише), контент по §15.
- Расхождения со спекой нет — правится только контент, спека не редактируется.
- Текст согласован с пользователем.

Итоговый текст:
- **RU** — Всё для здоровья ваших зубов · Восемь направлений взрослой стоматологии под одной крышей. Понятные цены в USD, гарантии на работы и приём на трёх языках.
- **EN** — Everything for healthy teeth · Eight areas of adult dentistry under one roof. Clear prices in USD, warranties on our work, and care in three languages.
- **TR** — Sağlıklı dişler için her şey · Tek çatı altında yetişkin diş hekimliğinin sekiz alanı. Anlaşılır USD fiyatları, işlerde garanti ve üç dilde hizmet.

## Шаги
- [x] `messages/ru.json` — `Services.hero.heading` + `.description`
- [x] `messages/en.json` — `Services.hero.heading` + `.description`
- [x] `messages/tr.json` — `Services.hero.heading` + `.description`

## Критерии готовности
- На `/ru/services`, `/en/services`, `/tr/services` hero показывает новый текст.
- `npx tsc --noEmit` чист.
