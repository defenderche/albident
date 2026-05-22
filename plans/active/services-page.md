---
name: services-page
branch: feature/services-page
status: active
created: 2026-05-22
---

# План: Страница обзора услуг `/services`

## Цель

Страница `/services` по `feature-spec-services.md` — Hero (без CTA), сетка из 8 услуг с диапазонами цен и кнопкой «Подробнее» → `/services/[slug]`, финальный CTA-блок → `/booking`. Адаптив сетки 1/2/4 колонки.

## Контекст

Основная спека — `specifications/feature-specs/feature-spec-services.md`.
Дополнительно — `global-spec.md` §11.2 (адаптив 1/2/4 для 8 услуг), §9 (цены USD «от-до»), `functional-map.md` §2.1 (Hero на `/services` без CTA).

Контент-инфра (`content/services.ts` с 8 услугами) уже создана в плане `home-page`. Шрифт/палитра/Hero-изображение не меняются — то же решение, что и в `home-page` (отдельный план `feature/design-language` потом).

Страница `/services/[slug]` пока не существует — клик по «Подробнее» ведёт в 404 (закроется отдельным планом).

## Шаги

- [ ] Извлечь `components/sections/ServiceCard.tsx` — переиспользуемая карточка услуги. Принимает `Service` + опциональный `detailsLabel` (текст для индикатора «Подробнее →»; если не передан — не показывается).
- [ ] Расширить icon-mapping в `ServiceCard` для всех 8 услуг: `surgery → Scissors`, `prosthetics → Crown`, `periodontology → HeartPulse` (5 уже есть из плана `home-page`).
- [ ] Рефакторить `components/sections/ServicesPreview.tsx` — использовать `ServiceCard` без `detailsLabel`. Визуально на главной ничего не должно меняться.
- [ ] Создать `components/sections/ServicesGrid.tsx` — все 8 услуг из `content/services.ts`, сетка 1/2/4 колонки, карточки с `detailsLabel` из переводов.
- [ ] Создать `components/sections/ServicesHero.tsx` — заголовок + описание (без CTA внутри, per functional-map §2.1).
- [ ] Параметризовать `components/sections/FinalCta.tsx` — принимать `heading` и `cta` пропсами (вместо жёсткой привязки к `Home.finalCta`). На главной — обновить вызов с новыми пропсами.
- [ ] Расширить `messages/{ru,en,tr}.json` — `Services.{metaTitle, metaDescription, hero: {heading, description}, cardDetails, finalCta: {heading, cta}}`.
- [ ] Создать `app/[locale]/services/page.tsx` — `ServicesHero` + `ServicesGrid` + `FinalCta`, `generateMetadata` (RU — дословно из спеки §3, EN/TR — placeholder-переводы).
- [ ] Локальная проверка: `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build`. `npm run dev` — `/services` рендерит 3 блока, сетка адаптивна, карточки кликабельны, главная (`/`) визуально без изменений.

## Критерии готовности

- `/[locale]/services` показывает Hero + 8 карточек в сетке 1/2/4 + финальный CTA-блок.
- Каждая карточка ведёт на `/[locale]/services/[slug]` (страница пока 404 — ожидаемо).
- CTA в FinalCta ведёт на `/[locale]/booking` (страница пока 404 — ожидаемо).
- `title` и `description` на `/ru/services` — точно по спеке §3.
- Все три локали (`/ru`, `/en`, `/tr`) показывают переведённые тексты.
- Главная `/` после рефакторинга `ServiceCard` визуально без изменений (5 карточек, те же иконки и форматирование цен).
- `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` — зелёные. CI на PR — зелёный.
