---
name: about-page
branch: feature/about-page
status: completed
created: 2026-05-25
completed: 2026-05-25
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

- [x] `types/review.ts` — `Review = { quote: LocalizedString; author: LocalizedString }`.
- [x] `types/warranty.ts` — `Warranty = { service: LocalizedString; term: LocalizedString }`.
- [x] `content/reviews.ts` — 5-6 placeholder-отзывов на 3 локалях (реалистичные имена/подписи: «Алексей, Москва», «Mehmet, İstanbul», «Sarah, London» — без избыточной аутентичности).
- [x] `content/warranties.ts` — 6 строк по `global-spec §10`, дословные термины гарантий в 3 локалях.
- [x] Расширить `messages/{ru,en,tr}.json` — namespace `About`: `metaTitle`, `metaDescription`, `hero.{heading, intro}`, `clinic.{heading, body}`, `warranties.{heading, columnService, columnTerm}`, `team.{heading}`, `reviews.{heading}`, `finalCta.{heading, cta}`.
- [x] `components/sections/AboutHero.tsx` — server component: `h1` + intro в стиле `max-w-3xl` left-align, без CTA (per functional-map §2.1).
- [x] `components/sections/AboutClinic.tsx` — server component: `h2` + длинный текст (рендерим `whitespace-pre-line`).
- [x] `components/sections/AboutWarranties.tsx` — server component: `<table>` с двумя колонками (услуга / срок). Адаптив: на mobile — stack, на ≥sm — таблица.
- [x] `components/sections/AboutTeam.tsx` — server component: сетка `DoctorCard` для всех 5 врачей из `content/doctors.ts`. Сетка 1/2/3 (mobile/tablet/desktop) per `global-spec §11.2`.
- [x] `components/sections/ReviewCard.tsx` — server component: цитата + подпись автора. Без аватара.
- [x] `components/sections/AboutReviews.tsx` — server component: сетка `ReviewCard` 1/2/3 (mobile/tablet/desktop) per `global-spec §11.2`.
- [x] `app/[locale]/about/page.tsx` — `AboutHero` + `AboutClinic` + `AboutWarranties` + `AboutTeam` + `AboutReviews` + `FinalCta`, `generateMetadata` по спеке §3 (RU дословно, EN/TR — placeholder-переводы).
- [x] Локальная проверка: `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` (должно стать +3 SSG к итогу — `/ru/about`, `/en/about`, `/tr/about`). `npm run dev` — 6 блоков рендерятся, ссылка из Header «О нас» работает.

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

## Изменения после первоначальной реализации

После того как 6 блоков были собраны, фидбэк по скриншотам дал три уточнения — поправили без отдельной ветки, в той же ветке:

1. **Гарантии: коробка-таблица → definition-list без коробки** (коммит `ff28f4f`). Первоначально гарантии были в `<table>` с rounded border + серым header-row. Это admin-panel вид, ломает magazine-flow. Перевели на стек `dt`/`dd` без коробки.
2. **Гарантии: раскрыли в три уровня — intro + per-item description + footnote** (коммит `826d222`). Изначально показывали только название + срок. Добавлен вводный параграф «что такое гарантия в нашей клинике» (особенно для дентал-туристов), пояснение по каждой позиции (что покрывает) и условия сохранения гарантии в футере. Спека `feature-spec-about` (1.0 → 1.1): §1.3 переписан в три части.
3. **Гарантии: двухколоночный magazine-row с hairline-разделителями** (коммит `dc79b7c`). После раскрытия три уровня (название / срок / описание) визуально сливались. Перевели на `grid-cols-[1fr_2fr]` (на sm+): слева название (text-lg font-semibold), справа стек термa + описания. Между категориями — тонкий `divide-y divide-border/60`, без коробки. На mobile разваливается в стек.
4. **Единый heading-rail для всех секций /about** (коммит `ba8e599`). Изначально текстовые секции (Hero, О клинике, Гарантии) были в `max-w-3xl`, а Команда и Отзывы — в `max-w-6xl` (для 3-колоночных сеток per global-spec §11.2). На desktop заголовки этих секций стояли на разных вертикалях. Перевели все секции на `max-w-6xl` на внешнем контейнере (заголовки выровнены), а body-контент текстовых секций оставили в `max-w-3xl` слева внутри (узкая колонка для читабельности). Magazine-pattern «широкий heading + узкая body-колонка».

«Почему» этих изменений: ровно как с `service-page` — формальная страница по спеке в живом виде требует визуальных корректировок (иерархия, ритм, выравнивание). Сборка по плану была правильной, но визуальные нюансы лучше видны на работающей странице.
