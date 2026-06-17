---
name: admin-auth
branch: feature/admin-auth
status: active
created: 2026-06-17
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
- [ ] `npm install @supabase/ssr`
- [ ] env: добавить `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` в `.env.example`
- [ ] Клиенты Supabase Auth: браузерный (`createBrowserClient`) + серверный (`createServerClient`)
- [ ] `proxy.ts`: ветка `/admin*` (проверка сессии → редирект на `/admin/login`), остальное — intl; `/admin` вне локалей
- [ ] `app/admin/layout.tsx` — проверка сессии + `noindex`
- [ ] `app/admin/login/page.tsx` — форма входа (`signInWithPassword`)
- [ ] `app/admin/page.tsx` — каркас: «Вошли как …» + «Выйти» (`signOut`)
- [ ] `robots` — запрет `/admin`
- [ ] Проверки: `tsc`/`lint`/`test`/`build`; вживую — редирект на логин, вход, выход

## Критерии готовности
- `/admin` без сессии → редирект на `/admin/login`; с сессией → каркас.
- Вход и выход работают; `/admin` не индексируется и не локализуется.
- Проверки зелёные. CRUD услуг — НЕ здесь.
