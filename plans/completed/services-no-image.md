---
name: services-no-image
branch: feature/services-no-image
status: completed
created: 2026-06-09
completed: 2026-06-09
---

# План: Убрать hero-изображение со страниц услуг

## Цель
Страницы услуг без hero-картинки — чище и минималистичнее. Hero услуги =
название + краткое описание + строка «Услугу ведёт: …».

## Контекст
- Расхождение со спекой (вердикт «б»): `feature-spec-service-page.md` §1.1 сейчас требует изображение 16:9.
- Решение пользователя: убрать изображение совсем. Порядок: спека → design-map → код.
- Изменение вида → правка прототипа в design-map до кода.
- `service.image` используется только в `types/service.ts`, `ServiceHero.tsx`, `content/services.ts` (в SEO/мете нет).

## Шаги
- [x] Спека `feature-spec-service-page.md` §1.1 — убрать пункт про изображение, версия 1.5.
- [x] design-map — убран `sv-hero-img` (+ его CSS) из прототипа страницы услуги. Согласовано.
- [x] Код: `ServiceHero.tsx` — убран блок `<Image>` и импорт; `types/service.ts` — убран `image`; `content/services.ts` — убраны 8 строк `image`; удалён `public/services/_placeholder.svg`.
- [x] `npx tsc --noEmit` + lint чисто, карта = сайт.

## Критерии готовности
- На `/ru/services/[slug]` нет hero-картинки; hero = заголовок + описание + строка врача.
- design-map и сайт совпадают.
- Сборка/типы/линт чисты.
