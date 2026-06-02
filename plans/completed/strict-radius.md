---
name: strict-radius
branch: feature/strict-radius
status: completed
created: 2026-06-02
completed: 2026-06-02
---

# План: Строгие скругления (клиничный вид)

## Цель
Перенести строгую шкалу скруглений из дизайн-карты в код — сайт перестаёт
выглядеть «несерьёзно» (капсула-шапка и pill-кнопки → строгие углы).

## Контекст
Правка дизайн-токенов через skill `albident-design-map`. Шкала в карте уже
согласована: lg 8px (блоки/карточки/шапка), md 6px (поля), sm 4px (мелкое),
btn 4px (кнопки), xs 3px (чекбокс), pill 999 — только аватары и кнопка чата.

## Шаги
- [x] 1. `app/globals.css`: клиничная шкала — sm 4 / md 6 / lg,xl,2xl,3xl → 8px.
- [x] 2. Де-капсуляция `rounded-full` → строгий радиус: Button, FinalCta-кнопка,
      ChatPanel send, ChatMessage BOOK, ContactDetails иконки, Footer соц-иконки,
      ServiceDetails номера этапов → `rounded-sm`; Header → `rounded-lg`. Плюс
      иконочные плашки `rounded-[15px]`→`rounded-md`, чекбокс `rounded-[6px]`→`[3px]`.
- [x] 3. Оставить круглым: монограмма (ReviewCard), кнопка чата (ChatButton),
      спиннеры/радио/статус-точки.
- [x] 4. ChatPanel textarea `rounded-xl` → `rounded-md`.
- [x] 5. Коммит согласованной карты (`design-map/index.html`) в этой ветке.
- [x] 6. Проверка: tsc, lint, test (65), build (48/48). Визуальная сверка — за пользователем.

## Критерии готовности
- Сайт визуально совпадает с обновлённой картой.
- Шапка — строгая панель, кнопки прямоугольные, карточки 8px.
- Круглыми остались только аватары и кнопка чата.
- Зелёные lint / tsc / test.
