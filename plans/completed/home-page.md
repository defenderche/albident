---
name: home-page
branch: feature/home-page
status: completed
created: 2026-05-22
completed: 2026-05-22
---

# План: Главная страница `/`

## Цель

Главная страница по `feature-spec-home.md` — 5 секций сверху вниз (Hero, Услуги превью, Почему мы, FAQ, Финальный CTA), placeholder-контент, SEO-метаданные по спеке. На дефолтном визуале (системный шрифт + shadcn neutral, без Hero-изображения, без шрифтовых/палитровых изменений).

## Контекст

Основная спека — `specifications/feature-specs/feature-spec-home.md`.
Дополнительно: `global-spec.md` §7 (8 услуг), §9 (цены USD «от-до»), §11.2 (адаптив 1→2→5 для услуг на главной), §15 (тексты пишет владелец после скаффолда).

Решения, согласованные до старта:

- **Hero — без изображения** (чисто текстовый: заголовок + описание + CTA). Hero-картинка пойдёт в отдельный `feature/design-language` план вместе с шрифтом и палитрой.
- **Шрифт и палитра не меняются** — системный шрифт + shadcn neutral. Зафиксируются позже в `feature/design-language`.
- **Контент** — placeholder. Тексты Hero, описания услуг, FAQ — реалистичные но временные. Владелец заменит в `content/*.ts` потом (`global-spec §15`).
- **Иконки на карточках услуг** — `lucide-react` (уже стоит), мелкая визуальная привязка для каждой услуги.
- **FAQ** — shadcn `Accordion` (стандартный паттерн для общего FAQ).
- **Цены** — диапазон «от $X — до $Y» в USD без локализации (global-spec §9).

Сторонние страницы (`/services`, `/services/[slug]`, `/booking`) — пока не существуют; ссылки на них в плане ведут на 404, это ожидаемо и закрывается отдельными планами.

## Шаги

- [x] `types/service.ts` — тип `Service` (slug, name локализованный, shortDescription локализованный, priceFrom, priceTo, faq массив локализованных q/a).
- [x] `content/services.ts` — 8 услуг по global-spec §7, slug по technical-spec §3 (`therapy`, `surgery`, `implants`, `prosthetics`, `orthodontics`, `aesthetics`, `hygiene`, `periodontology`). Placeholder-описания + диапазоны цен.
- [x] `types/faq.ts` + `content/faq.ts` — 4–6 общих FAQ-вопросов (язык приёма, часы, расположение, способы записи и т.п.) с переводами.
- [x] `messages/{ru,en,tr}.json` — ключи `Home.hero` (heading, description, cta), `Home.services` (heading, allServicesButton, priceLabel например «от»–«до»), `Home.whyUs` (heading + 3 пункта `quality`/`trust`/`team` с заголовком и пояснением), `Home.faq` (heading), `Home.finalCta` (heading, cta).
- [x] `npx shadcn@latest add accordion` (для FAQ).
- [x] Заменить упрощённую `generateMetadata` в `app/[locale]/page.tsx` на тексты из спеки §3 (RU дословно: «Albident — стоматологический центр в Стамбуле | Şişli», и подробный description). EN/TR — placeholder-переводы.
- [x] `components/sections/Hero.tsx` — server component: заголовок (`h1`), описание, CTA `<Link href="/booking">` со стилями `buttonVariants({ size: "lg" })`.
- [x] `components/sections/ServicesPreview.tsx` — server component: фильтрует `content/services.ts` по 5 slug'ам, рендерит сетку (mobile 1 col / tablet 2 / desktop 5), карточка с иконкой `lucide-react` + name + shortDescription + диапазон цен + ссылка на `/services/[slug]`. Под сеткой — кнопка «Все услуги» → `/services`.
- [x] `components/sections/WhyUs.tsx` — server component: 3 колонки (mobile вертикально → desktop горизонтально) — Качество / Доверие / Команда из `messages.Home.whyUs`.
- [x] `components/sections/Faq.tsx` — server component: shadcn `Accordion` с вопросами из `content/faq.ts` для текущей локали.
- [x] `components/sections/FinalCta.tsx` — server component: акцентный фон, заголовок, кнопка → `/booking`.
- [x] `app/[locale]/page.tsx` — рендерит 5 секций по порядку, без обёрток main (main уже в layout).
- [x] Локальная проверка: `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build`. `npm run dev` — все 5 секций видны на `/ru`, `/en`, `/tr`; FAQ-аккордеон работает; ссылки ведут на правильные locale-prefixed URL (даже если в 404).

## Критерии готовности

- На `/ru` видны 5 секций в порядке: Hero, Услуги (5 карточек), Почему мы, FAQ, Финальный CTA.
- Карточки услуг ведут на `/[locale]/services/[slug]` (страницы пока нет — 404 ожидаем).
- Кнопка «Все услуги» ведёт на `/[locale]/services` (404 ожидаем).
- Hero CTA и финальный CTA ведут на `/[locale]/booking` (404 ожидаем).
- FAQ-аккордеон раскрывает/сворачивает ответы.
- `title` и `description` на `/ru` — точно по спеке §3.
- Все три локали (`/ru`, `/en`, `/tr`) отдают переведённые тексты.
- `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` — зелёные. CI на PR — зелёный.
