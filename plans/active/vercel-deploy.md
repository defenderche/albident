---
name: vercel-deploy
branch: chore/vercel-deploy
status: active
created: 2026-07-02
---

# План: Деплой на Vercel

## Цель
Живой сайт: preview-сборка на каждый PR, production из `main`. Подключить реальные
Vercel KV (чат-лимиты) и все env-переменные, снять инфраструктурные 🟡.

## Контекст
- `technical-spec.md` — раздел деплоя/env.
- Все переменные окружения перечислены в `.env.example` (в репо).
- Стек: Next 16.2.6, App Router. `vercel.json` нет — Vercel определяет Next автоматически.
- KV-код готов (`lib/chat/`), ждёт реального инстанса.
- Роадмап: «Инфраструктура → Деплой (Vercel)» ⬜, «Vercel KV» 🟡.

## Разделение труда
**Ты (в вебе Vercel — я не имею доступа):**
- Импорт репозитория `defenderche/albident` в Vercel.
- Создание KV-инстанса (Vercel KV / Upstash) — даёт `KV_REST_API_URL`, `KV_REST_API_TOKEN`.
- Ввод env-переменных в Project Settings (значения секретов — только у тебя).
- Нажать Deploy, прислать мне URL и лог при ошибке.

**Я (в коде/репо):**
- Проверить, что сборка проходит локально (`npm run build`) перед деплоем.
- При необходимости — `vercel.json` (регион, заголовки) или правки конфигов.
- Разобрать ошибки сборки/рантайма по логам.
- Обновить `.env.example`/доку, если всплывут расхождения.

## Env-переменные (из .env.example) — для ввода в Vercel
Production + Preview:
- `NEXT_PUBLIC_SITE_URL` — бесплатный `*.vercel.app`; точный адрес известен после импорта
  репо, вписываем после первого деплоя
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CLINIC_EMAIL`
- `KV_REST_API_URL`, `KV_REST_API_TOKEN` (из KV-инстанса)

## Шаги
- [ ] Прогнать `npm run build` локально — убедиться, что прод-сборка зелёная
- [ ] Ты: импорт репо в Vercel, создание KV-инстанса
- [ ] Ты: ввод env-переменных (Production + Preview)
- [ ] Ты: первый Deploy, прислать URL / лог
- [ ] Проверить живой сайт: главная, /booking (заявка → Supabase + email), чат (стриминг + лимит), /admin (вход + CRUD)
- [ ] Проверить preview-сборку из тестового PR
- [ ] Снять 🟡/⬜ в роадмапе (Деплой ✅, Vercel KV ✅)

## Критерии готовности
- Production-сайт открывается по прод-URL, все ключевые флоу работают.
- PR порождает preview-сборку.
- Чат-лимиты считаются реальным KV.
