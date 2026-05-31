---
name: design-system-port
branch: feature/design-system-port
status: active
created: 2026-05-31
---

# План: Перенос дизайн-системы в код

## Цель
Привести реальный сайт к виду графической карты `design-map/index.html`:
кобальт-синий акцент, Plus Jakarta Sans, крупные скругления, мягкие тени,
карточки/кнопки/секции в стиле карты — на всех страницах.

## Контекст
Дизайн уже зафиксирован и согласован в `design-map/index.html` (skill
`albident-design-map`), поэтому это путь «уже в карте → внедряем в код 1:1».
Стек: Tailwind v4 (токены — OKLCH-переменные в `app/globals.css`, без
`tailwind.config`), shadcn-компоненты на cva, секции на семантических токенах.
Главный рычаг: правка токенов в `globals.css` каскадом перекрашивает весь сайт.

Идём фазами; после каждой — сборка/типы зелёные и чекпойнт на просмотр.

## Шаги (фазами)
- [ ] **Фаза 1 — Foundations.** `globals.css`: палитра (акцент-синий, remap
      primary/ring/accent, bg, card, cream), радиусы, тени; шрифт Plus Jakarta
      Sans через `next/font` + `--font-sans`/`--font-heading`.
- [ ] **Фаза 2 — UI-примитивы.** Button (pill, размеры, тень, primary=синий),
      Input/Textarea/Select/Checkbox/Label (focus-ring синий, радиус, padding),
      Accordion (±, стиль), Sheet (мобильное меню).
- [ ] **Фаза 3 — Layout.** Header (pill-контейнер, sticky, nav), Footer,
      HeaderMobile, LocaleSwitcher, SocialIcons.
- [ ] **Фаза 4 — Секции.** Hero (акцентные слова + полоса статистики + визуал),
      ServicesPreview/Grid/Card (иконка-плитка, ценник, «Подробнее»), WhyUs
      (feature-карточки), Faq, FinalCta (синий баннер), DoctorCard (силуэт),
      ReviewCard (cream + монограмма), About*/Contact*/Service*.
- [ ] **Фаза 5 — Чат.** ChatWidget (плавающая кнопка + панель + пузыри + ввод).
- [ ] **Фаза 6 — Проверка.** `npm run build`, `lint`, `tsc --noEmit` зелёные;
      визуальная сверка с картой. (Lighthouse/a11y — отдельной задачей.)

## Открытые детали
- Полоса статистики в Hero требует placeholder-значений — добавить в
  `content/` или `messages/` (см. `feature-spec-home §1.1`).
- Акцентные слова в заголовке Hero — через разметку/rich-перевод.

## Критерии готовности
- Сайт визуально совпадает с `design-map/index.html` на всех страницах.
- `build` / `lint` / `tsc` зелёные.
