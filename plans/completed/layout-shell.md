---
name: layout-shell
branch: feature/layout-shell
status: completed
created: 2026-05-21
completed: 2026-05-21
---

# План: Header + Footer (каркас layout)

## Цель

Header (sticky) и Footer обёртывают все страницы под `app/[locale]/`. Навигация — locale-aware, переключатель локали сохраняет путь, на mobile меню — в shadcn `Sheet` с CTA «Записаться» сверху. Footer содержит контакты, часы, меню, соцсети (Instagram / WhatsApp / Telegram), ссылку на `/privacy` и копирайт. Каркас соответствует `functional-map.md` §2–§3.

## Контекст

Основная спека — `specifications/functional-map.md` §2 (header), §3 (footer), §4 (локали).
Дополнительно — `global-spec.md` §11.2–11.3 (адаптация Header и Footer).

Решения, согласованные до старта:

- **Логотип** — текстовый wordmark «Albident» (font-semibold). SVG-лого подключится позже отдельно.
- **Контактные данные** — placeholder в `content/site.ts` (`Şişli, İstanbul`, `+90 555 000 00 00`, `info@albident.example`, часы, placeholder-URL соцсетей). Владелец заменит на реальные позже (`global-spec §15`).
- **Переключатель локали** — shadcn `DropdownMenu` (`RU ▾`) на всех viewport (один UX и для mobile, и для desktop).
- **Иконки соцсетей** — инлайн-SVG (без отдельной brand-icon библиотеки), чтобы не плодить зависимости.
- **`/booking` и `/privacy`** — ссылки уже ведут на эти URL, но сами страницы создаются отдельными планами. Клик → 404 до тех планов.
- **`next/font`** — не подключается в этом плане; системный шрифт до дизайн-плана главной.

## Шаги

- [x] Установить shadcn-компоненты: `npx shadcn@latest add sheet dropdown-menu`.
- [x] `content/site.ts` — placeholder-объект с контактами, часами, соцсетями. Тип `Site` в `types/site.ts`.
- [x] `i18n/navigation.ts` — обёртки next-intl (`Link`, `useRouter`, `usePathname`, `redirect`, `getPathname` через `createNavigation`).
- [x] `messages/{ru,en,tr}.json` — ключи `Nav` (`home`, `services`, `about`, `contacts`, `bookingCta`) и `Footer` (`contacts`, `hours`, `menu`, `social`, `privacy`, `copyright`, alt-тексты соцсетей).
- [x] `components/layout/LocaleSwitcher.tsx` — client component, shadcn `DropdownMenu`; смена локали через `router.replace(pathname, { locale })`.
- [x] `components/layout/Header.tsx` — server component: лого слева, nav-меню по центру/слева от CTA (desktop), переключатель локали, CTA «Записаться» справа. Sticky через Tailwind (`sticky top-0 z-50`).
- [x] `components/layout/HeaderMobile.tsx` (client) — гамбургер + `Sheet`; внутри Sheet — акцентная CTA сверху, ниже nav-пункты.
- [x] `components/layout/Footer.tsx` — server component: 4 секции (контакты, часы, меню, соцсети с инлайн-SVG); ссылка на `/privacy` + копирайт; responsive (mobile вертикально → tablet 2 cols → desktop горизонтально).
- [x] Подключить Header/Footer в `app/[locale]/layout.tsx` между `<body>` и `{children}`. Удалить временный `flex` из layout и распределить flex-структуру так, чтобы main расширялся между header и footer.
- [x] Локальная проверка: `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build`. `npm run dev` — sticky header, переключение локалей, мобильный Sheet, footer responsive.

## Критерии готовности

- Header виден на всех страницах в `app/[locale]/`, остаётся sticky при скролле.
- Nav-ссылки locale-aware: на `/ru` ведут на `/ru/*`, на `/en` — на `/en/*`.
- Переключатель локали меняет URL, сохраняя путь.
- Mobile: гамбургер открывает Sheet, внутри — CTA сверху + nav-пункты.
- CTA «Записаться» — акцентная, ведёт на `/[locale]/booking` (страницы пока нет → 404; это ожидаемо).
- Footer: 4 секции, 3 инлайн-SVG-иконки соцсетей, ссылка на `/privacy` + копирайт; адаптивная сетка mobile/tablet/desktop.
- Все три языка (`/ru`, `/en`, `/tr`) показывают переведённые тексты в header и footer.
- `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` — зелёные. CI на PR — зелёный.
