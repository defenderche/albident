---
name: service-page
branch: feature/service-page
status: active
created: 2026-05-22
---

# План: Страница услуги `/services/[slug]`

## Цель

Динамическая страница `/services/[slug]` по `feature-spec-service-page.md` для всех 8 услуг — 7 блоков сверху вниз (Hero / Описание / Этапы / Цены / Врачи / FAQ / Финальный CTA). SSG для всех 8 URL, 404 для неизвестных slug, CTA → `/booking?service=<slug>`, метаданные по шаблону спеки §4. Параллельно создаётся инфра для будущего `/about` (`content/doctors.ts` + `DoctorCard`).

## Контекст

Основная спека — `specifications/feature-specs/feature-spec-service-page.md`.
Дополнительно — `feature-spec-services.md` (уже использовалась), `global-spec.md` §7 (8 услуг), §9 (цены USD), §12 (силуэты вместо фото врачей).

Решения, согласованные до старта:

- **Блок «Связанные врачи» включается в этот план** — создаём минимальный `content/doctors.ts` (5 placeholder-врачей) и базовый `DoctorCard` сейчас, чтобы страница услуги получилась полной (7/7 блоков). `/about` потом реюзит эту инфру.
- **Шрифт/палитра/Hero-изображение не меняются** — тот же дефолт, что в `home-page` и `services-page`. Дизайн-язык — отдельный план `feature/design-language`.
- **Контент** — placeholder во всех новых полях (fullDescription, stages, subProcedures, faq, врачи). Владелец заменит позже (`global-spec §15`).
- **Силуэт врача** — простой SVG-плейсхолдер (круг с инициалами), как требует `global-spec §12`.
- **CTA → `/booking?service=<slug>`** — query параметр будет читаться, когда появится `/booking` (отдельный план).

## Шаги

- [ ] Расширить `types/service.ts`: добавить `fullDescription: LocalizedString`, `stages: { title; description }[]`, `subProcedures: { name; priceFrom; priceTo }[]`, `relatedDoctors: string[]` (slug-и врачей). Сделать `faq` required.
- [ ] Создать `types/doctor.ts` — `Doctor = { slug, name, role, initials, achievements[] }` (всё локализуемое, кроме slug и initials).
- [ ] Создать `content/doctors.ts` — 5 placeholder-врачей с реалистичными ФИО / ролью / 2-3 достижениями каждый.
- [ ] Расширить `content/services.ts` — для каждой из 8 услуг заполнить новые поля placeholder-контентом в трёх локалях (~2-4 stages, ~2-3 subProcedures, ~2-3 faq, 1-3 relatedDoctors). Подпроцедуры с узнаваемыми названиями (per спека §1.4: виниры внутри эстетики, All-on-4 внутри имплантации и т.п.).
- [ ] Создать `components/sections/DoctorCard.tsx` — силуэт-SVG (круг с инициалами на нейтральном фоне) + ФИО + роль + список достижений.
- [ ] Создать 6 секций в `components/sections/`:
  - `ServiceHero.tsx` — `<h1>` с названием + краткое описание + CTA «Записаться» (Link на `/booking?service=<slug>`).
  - `ServiceDescription.tsx` — `fullDescription` (многострочный текст, preserve breaks).
  - `ServiceStages.tsx` — ordered list этапов (`<ol>` с номерами шагов + заголовок + описание).
  - `ServicePricing.tsx` — таблица подуслуг (`<table>` или responsive `<dl>`/grid) с диапазонами цен.
  - `ServiceDoctors.tsx` — сетка `DoctorCard` для врачей из `relatedDoctors` (поиск в `doctors.ts`).
  - `ServiceFaq.tsx` — shadcn `Accordion` с per-service FAQ.
- [ ] Расширить `messages/{ru,en,tr}.json` — namespace `ServicePage` с ключами: `descriptionHeading`, `stagesHeading`, `pricingHeading`, `doctorsHeading`, `faqHeading`, `cta`, `finalCta.{heading,cta}`, `metaTitleTemplate` (`«{name} в Стамбуле — Albident»`), `metaDescriptionTemplate` (`«{short}. Цена от ${from}. Запись онлайн. Стоматология Albident, Şişli, Стамбул.»`).
- [ ] Создать `app/[locale]/services/[slug]/page.tsx`:
  - `generateStaticParams` — все 8 slug-ов × 3 локали (через `routing.locales`).
  - `generateMetadata` по шаблонам спеки §4 (RU дословно, EN/TR — placeholder-переводы).
  - При неизвестном slug → `notFound()`.
  - Рендерит 7 секций по порядку.
- [ ] Локальная проверка: `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` (должно быть 33 SSG страницы: 9 предыдущих + 8 услуг × 3 локали). `npm run dev` — все 8 услуг открываются, 7 блоков рендерятся, `/services/typo` → 404, главная и `/services` без изменений.

## Критерии готовности

- `/[locale]/services/[slug]` для всех 8 услуг рендерит 7 блоков (Hero / Описание / Этапы / Цены / Врачи / FAQ / Финальный CTA).
- Неизвестный slug (например `/services/typo`) → 404 страница.
- Карточки врачей: силуэт-SVG с инициалами + ФИО + роль + 2-3 достижения.
- CTA-кнопки на странице услуги ведут на `/[locale]/booking?service=<slug>` (страница `/booking` пока 404 — query будет читаться позже).
- `<title>` и `<meta description>` собираются по шаблонам спеки §4 для всех 8 услуг × 3 локали.
- Главная (`/ru`) и `/ru/services` после изменений визуально без регрессий.
- `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` — зелёные. CI на PR — зелёный.
