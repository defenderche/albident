---
name: chat-api-streaming
branch: feature/chat-api-streaming
status: completed
created: 2026-05-27
completed: 2026-05-27
---

# План: Чат-ассистент — /api/chat + OpenAI streaming (этап 2 из 3)

## Цель
Подключить UI-каркас чата (этап 1) к OpenAI: реальные ответы от `gpt-4o-mini` стримом, системный промпт с контекстом клиники, парсинг маркера `[BOOK:slug]` и рендер кнопки записи. Без KV-лимитов — это этап 3.

## Контекст
Спеки: `specifications/feature-specs/feature-spec-chat.md`, `specifications/technical-specs/technical-spec-chat.md`.

Этапы фичи:
- **1/3 — готово.** UI-каркас без API.
- **2/3 — текущий.** `/api/chat`, OpenAI streaming, контекст клиники, парсинг маркера, кнопка записи.
- **3/3.** Vercel KV лимиты (per-IP 20/сутки, общесайтовый 300/сутки), fail-open.

В этапе 2 действуют только сессионный лимит 10 (уже есть) и `max_tokens: 300`.

## Шаги
- [ ] `npm install openai`, добавить `OPENAI_API_KEY` в `.env.example`.
- [ ] `lib/validation/chat.ts` — Zod-схема тела запроса (`messages`, `locale`) + тесты.
- [ ] `lib/chat/context.ts` — сборка контекста клиники из `content/*` для заданной локали.
- [ ] `lib/chat/prompt.ts` — системный промпт: идентичность, разрешения, запреты, маркер `[BOOK:slug]`, локаль.
- [ ] `lib/chat/parseBookingMarker.ts` — чистая утилита: извлечь slug, валидировать по `content/services.ts`, вырезать маркер из текста + тесты.
- [ ] `app/api/chat/route.ts` — POST со стримингом: валидация → промпт + контекст → OpenAI → `ReadableStream`. Логирование ошибок через `console.error`.
- [ ] `lib/chat/storage.ts` — расширить `ChatMessage` опциональным `bookingSlug?: string`, обновить валидацию и тесты.
- [ ] `components/chat/ChatPanel.tsx` — после отправки user-сообщения дёргать `/api/chat`, читать поток, дописывать токены в assistant-сообщение, после стрима парсить маркер. Обработка ошибок: 30-секундный timeout первого токена через `AbortController`, HTTP 5xx, сетевые сбои — показать "Не удалось получить ответ" + кнопка «Повторить».
- [ ] `components/chat/ChatMessage.tsx` — если у сообщения есть `bookingSlug`, рендерить кнопку «Записаться на <услугу>» со ссылкой `/booking?service=<slug>`.
- [ ] `messages/{ru,en,tr}.json` — ключи `errorMessage`, `retryLabel`, `bookForService`.
- [ ] Ручная проверка с реальным `OPENAI_API_KEY` в `.env.local`: ответы на всех трёх локалях, стрим виден, маркер парсится, кнопка ведёт на правильный URL, ошибки и retry работают.

## Критерии готовности
- Чат отвечает на вопросы о клинике на 3 языках, не выходит за медицинские границы.
- Ответ виден по словам (стрим работает).
- При упоминании конкретной услуги в ответе появляется кнопка «Записаться», ведущая на `/booking?service=<slug>`.
- Невалидный slug в маркере не ломает UI — кнопка не рендерится, сам маркер вырезан из текста.
- Ошибки сети, HTTP 5xx и 30-секундный timeout показывают сообщение об ошибке и кнопку «Повторить». Автоматического retry нет.
- Сессионный лимит 10 продолжает работать.
- `npm run lint`, `npx tsc --noEmit`, `npm test` зелёные.
