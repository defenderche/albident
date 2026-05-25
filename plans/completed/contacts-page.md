---
name: contacts-page
branch: feature/contacts-page
status: completed
created: 2026-05-25
completed: 2026-05-25
---

# План: Страница «Контакты» (`/contacts`)

## Цель

Реализовать страницу `/contacts` по `feature-spec-contacts.md` — 4 блока (Hero / Контактные данные / Часы работы / Финальный CTA-блок). Все 3 локали, SSG, метаданные по спеке §3.

## Контекст

Основная спека — `specifications/feature-specs/feature-spec-contacts.md`.
Дополнительно — `global-spec.md` §15 (контент-placeholder), `functional-map.md` §2.1 (правило финального CTA-блока).

**Готовая инфра из прошлых планов:**

- `content/site.ts` — адрес, телефон, email, часы, соцсети (whatsapp URL). Требует мелкой правки (см. ниже).
- `WhatsAppIcon` в `components/layout/SocialIcons.tsx` — переиспользуем для кнопки рядом с номером.
- `FinalCta` — переиспользуем для §1.4.

**Решения, согласованные до старта:**

- **Адрес в `content/site.ts`** обновляется до точного плейсхолдера из спеки §1.2: «Halaskargazi Cd., No: 100, Şişli, İstanbul». Одинаковая строка во всех 3 локалях — название улицы не переводится. Владелец заменит на реальный адрес.
- **Часы работы** дополняются явным указанием выходного — «Пн–Сб: 10:00–20:00 · Вс: выходной» (и переводы в каждой локали).
- **Layout контактных данных** — двухколоночный magazine-pattern, как `AboutWarranties` (название поля слева, значение справа). Унифицирует с `/about`. На mobile — стек.
- **Иконки** — `Phone` из `lucide-react` (уже стоит) + инлайн `WhatsAppIcon` из `components/layout/SocialIcons.tsx`. Без новых зависимостей.
- **Часы работы — отдельная секция** по спеке §1.3. Простая текстовая строка (placeholder в `content/site.ts`), без таблицы per-day. Владелец расширит позже при необходимости.
- **Heading-rail** — `max-w-6xl` на внешнем контейнере, body — `max-w-3xl` слева. Как на `/about`.

## Шаги

- [x] Обновить `content/site.ts`: address на «Halaskargazi Cd., No: 100, Şişli, İstanbul» (одна строка для всех локалей), hours с явным «Вс: выходной» в трёх локалях.
- [x] Расширить `messages/{ru,en,tr}.json` — namespace `Contacts`: `metaTitle`, `metaDescription` (RU дословно по спеке §3), `hero.{heading, intro}`, `details.{heading, addressLabel, phoneLabel, emailLabel, callAria, whatsappAria}`, `hours.{heading}`, `finalCta.{heading, cta}`.
- [x] Создать `components/sections/ContactsHero.tsx` — server component: `h1` + intro в magazine-pattern (heading в `max-w-6xl`, intro в `max-w-3xl`).
- [x] Создать `components/sections/ContactDetails.tsx` — server component: `dl` с тремя строками (адрес / телефон + иконки звонка и WhatsApp / email). Адрес — `<address>` с не-italic, кликабельные значения. Heading-rail / body в `max-w-3xl`.
- [x] Создать `components/sections/ContactHours.tsx` — server component: heading + текст часов из `content/site.ts`. Heading-rail / body в `max-w-3xl`.
- [x] Создать `app/[locale]/contacts/page.tsx` — `ContactsHero` + `ContactDetails` + `ContactHours` + `FinalCta`, `generateMetadata` по спеке §3.
- [x] Локальная проверка: `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` (должно стать +3 SSG → 42 страницы). `npm run dev` — открываются все 3 локали, телефон / WhatsApp / email кликабельны.

## Критерии готовности

- `/[locale]/contacts` рендерит 4 блока: Hero → Контактные данные → Часы работы → Финальный CTA-блок.
- Адрес показывается одинаково на всех локалях (название улицы не переводится).
- Телефон кликабелен через `tel:` (без пробелов в href), WhatsApp ведёт на `wa.me/...` из `site.social.whatsapp`, email кликабелен через `mailto:`.
- Часы работы видны с явным указанием воскресенья как выходного.
- `<title>` и `<meta description>` на `/ru/contacts` — дословно по спеке §3.
- Все три локали (`/ru`, `/en`, `/tr`) — переведённые тексты.
- Заголовки секций выровнены по той же вертикали, что на `/about` (`max-w-6xl` heading-rail).
- Финальный CTA-блок ведёт на `/[locale]/booking` (страница пока 404 — ожидаемо).
- Главная, `/services`, `/services/[slug]`, `/about` — без визуальных регрессий.
- `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` — зелёные. CI на PR — зелёный.
