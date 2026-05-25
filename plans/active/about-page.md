---
name: about-page
branch: feature/about-page
status: active
created: 2026-05-25
---

# План: Страница «О нас» (`/about`)

## Цель

Реализовать страницу `/about` по `feature-spec-about.md` — 6 блоков (Hero / О клинике / Гарантии / Команда / Отзывы / Финальный CTA-блок). Все 3 локали, статическая генерация, метаданные по спеке.

## Контекст

Основная спека — `specifications/feature-specs/feature-spec-about.md`.
Дополнительно — `global-spec.md` §10 (таблица гарантий), §11.2 (адаптив отзывов 1/2/3 колонки), §12 (силуэты вместо фото), §15 (контент — placeholder).

**Готовая инфра из прошлых планов:**

- `DoctorCard.tsx` и `content/doctors.ts` (5 врачей) — переиспользуем как есть для блока «Команда».
- `FinalCta` (с heading/cta props и optional href) — используем для §1.6 как стандартный финальный блок.

**Корректировка правила финального CTA-блока** была сделана коммитом `c40efd8` в этой же ветке (предшествует плану): финальный CTA-блок теперь стоит на всех страницах, кроме `/services/[slug]` и `/booking`. На `/about` он стандартно присутствует.

**Решения, согласованные до старта:**

- **Hero без изображения** — плэйн текстовый Hero (заголовок + intro в 1-2 строки). Спека образ не требует.
- **Карточки отзывов — без аватаров/силуэтов**, чистый текст (цитата + автор). Силуэт используется только для врачей.
- **«О клинике» — текст в `messages.About.clinic.body`** как длинная строка с `\n\n` между абзацами; рендерим `whitespace-pre-line`. Не плодим отдельный `content/about.ts`.
- **Отзывы и гарантии — отдельные content-файлы** (`content/reviews.ts`, `content/warranties.ts`), потому что это списочные данные, их легче редактировать отдельно от UI-переводов.
- **Тексты — placeholder**, владелец заменит (`global-spec §15`).
- **Гарантии — таблица** по спеке `global-spec §10` (6 строк: имплантация, коронки и виниры, терапия, эндодонтия, съёмные протезы, гигиена/ортодонтия). Рендерим как семантическую `<table>`.

## Шаги

- [ ] `types/review.ts` — `Review = { quote: LocalizedString; author: LocalizedString }`.
- [ ] `types/warranty.ts` — `Warranty = { service: LocalizedString; term: LocalizedString }`.
- [ ] `content/reviews.ts` — 5-6 placeholder-отзывов на 3 локалях (реалистичные имена/подписи: «Алексей, Москва», «Mehmet, İstanbul», «Sarah, London» — без избыточной аутентичности).
- [ ] `content/warranties.ts` — 6 строк по `global-spec §10`, дословные термины гарантий в 3 локалях.
- [ ] Расширить `messages/{ru,en,tr}.json` — namespace `About`: `metaTitle`, `metaDescription`, `hero.{heading, intro}`, `clinic.{heading, body}`, `warranties.{heading, columnService, columnTerm}`, `team.{heading}`, `reviews.{heading}`, `finalCta.{heading, cta}`.
- [ ] `components/sections/AboutHero.tsx` — server component: `h1` + intro в стиле `max-w-3xl` left-align, без CTA (per functional-map §2.1).
- [ ] `components/sections/AboutClinic.tsx` — server component: `h2` + длинный текст (рендерим `whitespace-pre-line`).
- [ ] `components/sections/AboutWarranties.tsx` — server component: `<table>` с двумя колонками (услуга / срок). Адаптив: на mobile — stack, на ≥sm — таблица.
- [ ] `components/sections/AboutTeam.tsx` — server component: сетка `DoctorCard` для всех 5 врачей из `content/doctors.ts`. Сетка 1/2/3 (mobile/tablet/desktop) per `global-spec §11.2`.
- [ ] `components/sections/ReviewCard.tsx` — server component: цитата + подпись автора. Без аватара.
- [ ] `components/sections/AboutReviews.tsx` — server component: сетка `ReviewCard` 1/2/3 (mobile/tablet/desktop) per `global-spec §11.2`.
- [ ] `app/[locale]/about/page.tsx` — `AboutHero` + `AboutClinic` + `AboutWarranties` + `AboutTeam` + `AboutReviews` + `FinalCta`, `generateMetadata` по спеке §3 (RU дословно, EN/TR — placeholder-переводы).
- [ ] Локальная проверка: `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` (должно стать +3 SSG к итогу — `/ru/about`, `/en/about`, `/tr/about`). `npm run dev` — 6 блоков рендерятся, ссылка из Header «О нас» работает.

## Критерии готовности

- `/[locale]/about` рендерит 6 блоков в порядке: Hero → О клинике → Гарантии → Команда → Отзывы → Финальный CTA-блок.
- Таблица гарантий — 6 строк дословно из `global-spec §10`.
- 5 карточек врачей с силуэтами + ФИО + ролью + достижениями.
- 5-6 отзывов в адаптивной сетке.
- Финальный CTA-блок (тёмная подложка, «Готовы записаться?») ведёт на `/[locale]/booking` (страница пока 404 — ожидаемо).
- `<title>` и `<meta description>` на `/ru/about` — дословно по спеке §3.
- Все три локали (`/ru`, `/en`, `/tr`) — переведённые тексты.
- Главная (`/ru`), `/ru/services`, `/ru/services/<slug>` — без визуальных регрессий. FinalCta на `/services` восстановлен и виден.
- `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` — зелёные. CI на PR — зелёный.
