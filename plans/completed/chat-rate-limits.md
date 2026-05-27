---
name: chat-rate-limits
branch: feature/chat-rate-limits
status: completed
created: 2026-05-27
completed: 2026-05-27
---

# План: Чат-ассистент — Vercel KV лимиты (этап 3 из 3)

## Цель
Подключить серверные лимиты чата через Vercel KV: 20 сообщений на IP в сутки и 300 сообщений на сайт в сутки. При превышении — HTTP 429, фронт показывает локализованное лимит-сообщение и блокирует поле ввода. Fail-open при недоступности KV или отсутствии env-переменных.

## Контекст
Спеки: `specifications/feature-specs/feature-spec-chat.md §8, §9`, `specifications/technical-specs/technical-spec-chat.md §3`.

Этапы фичи:
- **1/3 — готово.** UI-каркас.
- **2/3 — готово.** `/api/chat` + OpenAI streaming, маркер [BOOK:slug].
- **3/3 — текущий.** Vercel KV лимиты per-IP и общесайтовый, fail-open.

PR закрывает только код. Реальный KV подключается отдельно — это инфраструктурная задача, происходит при подключении к Vercel (см. Ближайшие приоритеты в roadmap). До тех пор fail-open оставляет чат рабочим.

## Шаги
- [ ] `npm install @vercel/kv` через node-скрипт для чистого lockfile (избежать рассинхрона CI).
- [ ] `lib/chat/rateLimit.ts` — `checkChatRateLimit(ip, deps?)`. Счётчики: ключ `chat:ip:<ip>:<date>` (лимит 20) и `chat:global:<date>` (лимит 300). TTL 24 ч ставится при первом инкременте. Fail-open при ошибке KV или отсутствии env — `console.error` + `allowed: true`. Зависимости инжектируются через параметр для тестируемости; дефолтная фабрика создаёт Vercel KV клиент.
- [ ] `lib/chat/rateLimit.test.ts` — IP под лимитом, IP превышен, глобал превышен, оба ок, fail-open при ошибке `incr`, fail-open без env, TTL ставится при первом инкременте.
- [ ] `app/api/chat/route.ts` — извлечь IP из `x-forwarded-for` (fallback на `x-real-ip` и `'unknown'`), вызвать `checkChatRateLimit` до OpenAI. При `!allowed` → HTTP 429 с кодом причины.
- [ ] `components/chat/ChatPanel.tsx` — обработать 429 отдельно: новое состояние `limit` (как сессионный лимит, но триггерится с сервера). Поле блокируется, показывается `limitMessage`, кнопки Retry нет. 5xx и сетевые сбои — по-прежнему `error` с Retry.
- [ ] Ручная проверка без KV в `.env.local`: чат продолжает отвечать, в логах сервера видно сообщение fail-open.

## Критерии готовности
- Без `KV_REST_API_URL` / `KV_REST_API_TOKEN` чат работает как раньше; fail-open логируется `console.error`.
- Юнит-тесты покрывают: IP лимит, глобальный лимит, оба ок, fail-open при ошибке KV, fail-open при отсутствии env, TTL на первом инкременте.
- При HTTP 429 фронт переходит в состояние `limit`: поле заблокировано, видна `limitMessage`, кнопки Retry нет.
- Сессионный лимит 10 продолжает работать как отдельный (первый) барьер.
- `npm run lint`, `npx tsc --noEmit`, `npm test` зелёные.
- CI на PR проходит зелёным.
