---
name: chat-ui-shell
branch: feature/chat-ui-shell
status: active
created: 2026-05-27
---

# План: Чат-ассистент — UI-каркас (этап 1 из 3)

## Цель
Собрать клиентскую часть чата (плавающая кнопка + панель) без бэкенда. После этапа на всех страницах сайта доступен виджет, переписка сохраняется в `sessionStorage`, сессионный лимит 10 сообщений работает, ответов модели ещё нет — это этап 2.

## Контекст
Спеки: `specifications/feature-specs/feature-spec-chat.md`, `specifications/technical-specs/technical-spec-chat.md`.

Этапы фичи (см. roadmap):
- **1/3 — текущий.** UI-каркас без API.
- **2/3.** `/api/chat` + OpenAI streaming, системный промпт, парсинг `[BOOK:slug]`.
- **3/3.** Vercel KV лимиты (per-IP, общесайтовый), fail-open.

В этапе 1 отправка сообщения добавляет user-message в историю и в `sessionStorage`, ответа модели не появляется — это позволит в этапе 2 подключить стрим без перекройки UI.

## Шаги
- [ ] Добавить ключи в `messages/{ru,en,tr}.json`: `greeting`, `disclaimer`, `placeholder`, `sendLabel`, `closeLabel`, `openLabel`, `limitMessage`.
- [ ] `lib/chat/storage.ts` — обёртка над `sessionStorage`: типы `Message`, чтение/запись истории, счётчик сессии (лимит 10).
- [ ] `lib/chat/storage.test.ts` — юнит-тесты на storage.
- [ ] `components/chat/ChatButton.tsx` — плавающая кнопка (60/48 px, иконка `lucide-react`, `aria-label`).
- [ ] `components/chat/ChatMessage.tsx` — отрисовка одного сообщения.
- [ ] `components/chat/ChatPanel.tsx` — панель: заголовок, кнопка X, история, поле ввода, дисклеймер. `role="dialog"`, Esc, focus, `aria-live="polite"`.
- [ ] `components/chat/ChatWidget.tsx` — обёртка с состоянием open/closed, скрытие на мобильной `/booking`.
- [ ] Подключить `<ChatWidget />` в `app/[locale]/layout.tsx`.
- [ ] Ручная проверка во всех трёх локалях, на desktop и mobile, проверить скрытие на `/booking` mobile, Esc, восстановление истории из `sessionStorage`, сессионный лимит 10.

## Критерии готовности
- Виджет виден на всех страницах сайта, кроме мобильной `/booking`.
- Открытие/закрытие работает по кнопке X и по Esc, фокус управляется.
- Сообщения пользователя видны в окне и сохраняются в `sessionStorage`, восстанавливаются при повторном открытии в той же вкладке.
- Сессионный лимит 10 срабатывает: поле блокируется, появляется локализованный `limitMessage`.
- 3 локали отображаются корректно (greeting + disclaimer + placeholder).
- `npm run lint`, `npx tsc --noEmit`, `npm test` зелёные.
