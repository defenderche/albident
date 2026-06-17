---
name: admin-auth
branch: feature/admin-auth
status: completed
created: 2026-06-17
completed: 2026-06-18
---

# План: Авторизация /admin (этап 2 админки)

## Цель
Закрытый раздел `/admin` за входом по логину через Supabase Auth: экран входа,
защита маршрутов, пустой каркас панели с выходом. CRUD услуг — этап 3.

## Контекст
- Спека: `specifications/technical-specs/technical-spec-admin.md` §5–6, §11–12, §14 (этап 2);
  `feature-spec-admin.md` §2–3, §8.
- `/admin` живёт вне `[locale]` (только RU), вне локального роутинга и редиректа `/`→`/ru`.
- `proxy.ts` — next-intl middleware; нужно разветвить: `/admin*` → проверка сессии,
  остальное → локали.
- Зависимость: `@supabase/ssr` (cookie-сессии App Router).

## На стороне пользователя
- env в `.env.local` (+ `.env.example`): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Создать админ-пользователя вручную: Supabase dashboard → Authentication → Users.

## Шаги
- [x] `npm install @supabase/ssr`
- [x] env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` в `.env.local` (готово).
      В `.env.example` — за пользователем (env-файлы недоступны для правки из инструментов)
- [x] Клиенты Supabase Auth: браузерный (`createBrowserClient`) + серверный (`createServerClient`)
- [x] `proxy.ts`: ветка `/admin*` (проверка сессии → редирект на `/admin/login`), остальное — intl; `/admin` вне локалей
- [x] `app/admin/layout.tsx` — корневой layout админки + `noindex`
- [x] `app/admin/login/page.tsx` — форма входа (`signInWithPassword`)
- [x] `app/admin/page.tsx` — каркас: «Вошли как …» + «Выйти» (`signOut`)
- [x] `robots` — запрет `/admin`
- [x] Проверки: `tsc`/`lint`/`test`/`build` зелёные; вживую — редирект на логин, вход, выход подтверждены

## Критерии готовности
- `/admin` без сессии → редирект на `/admin/login`; с сессией → каркас.
- Вход и выход работают; `/admin` не индексируется и не локализуется.
- Проверки зелёные. CRUD услуг — НЕ здесь.
