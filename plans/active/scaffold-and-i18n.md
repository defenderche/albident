---
name: scaffold-and-i18n
branch: chore/scaffold-and-i18n
status: active
created: 2026-05-21
---

# План: Скаффолд Next.js + CI + i18n

## Цель

Получить работающий каркас проекта: установлен Next.js (App Router, TS strict, Tailwind), настроен Prettier, инициализирован shadcn/ui, подключён Vitest, заведена i18n через `next-intl` (ru/en/tr, ru по умолчанию, path-based), настроены security headers, в `.env.example` лежит шаблон всех будущих переменных, CI на GitHub Actions гоняет `lint` + `tsc` + `test`. На выходе `npm run dev` отдаёт минимальную страницу на `/ru` — фундамент, на котором дальше собираются страницы по отдельным планам.

## Контекст

Основная спека — `specifications/technical-specs/technical-spec.md` (§1 стек, §3 i18n, §6 security headers, §9 env, §11 тесты, §12 CI).

Дополнительно — `specifications/global-spec.md` §4 (3 локали) и §17 (Lighthouse ≥90 как критерий MVP, но не для scaffold).

Шрифты (`next/font`), `app/robots.ts`, `app/sitemap.ts`, content/-файлы, страницы кроме минимальной `/`, security CSP — **сознательно вне этого плана**, идут отдельными планами после появления контента и страниц.

## Шаги

- [x] Скаффолд Next.js — `create-next-app@latest` (TS strict, Tailwind, ESLint, App Router, без `src/`). В корне `Albident/`.
- [x] Prettier + `eslint-config-prettier` (отдельной установкой, `create-next-app` их не ставит).
- [x] `npx shadcn@latest init` (нейтральная база, без компонентов).
- [x] Vitest: `vitest.config.ts` + один тривиальный тест рядом с `lib/utils/cn.ts`, чтобы `npm test` имело что запускать.
- [x] next-intl: установка пакета, `i18n/request.ts`, `proxy.ts` в корне (Next 16: `proxy.ts` вместо `middleware.ts`; ru/en/tr, default `ru`, path-based с обязательным префиксом, корень `/` → редирект на `/ru`).
- [x] Минимальные `messages/{ru,en,tr}.json` (только нужные ключи — заголовок страницы).
- [x] `app/[locale]/layout.tsx` с `NextIntlClientProvider` + `app/[locale]/page.tsx` с заголовком «Albident» и `export const metadata`.
- [x] Security headers в `next.config.ts` через `headers()` — `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` (per technical-spec §6).
- [x] `.env.example` со всеми переменными из technical-spec §9 (пустые значения, как документация будущих интеграций).
- [x] `.github/workflows/ci.yml` — три шага на каждый PR в `main`: `npm run lint` → `npx tsc --noEmit` → `npm test`.
- [x] README — обновить актуальные команды и текущий статус.

## Критерии готовности

- `npm run dev` — открыв `http://localhost:3000/`, попадаешь на `/ru` и видишь страницу «Albident».
- `npm run lint`, `npx tsc --noEmit`, `npm test` — все три зелёные локально.
- CI на PR — зелёный (lint + tsc + test).
- Vercel preview — если проект подключён к Vercel, preview-build собирается без ошибок.
