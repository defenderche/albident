---
name: service-card-blue
branch: feature/service-card-blue
status: completed
created: 2026-06-10
completed: 2026-06-10
---

# План: Синий акцент на карточках услуг

## Цель
Карточки услуг — белые, но с явным синим акцентом проектного оттенка: рамка
карточки становится синей `--blue-600` (#2f6bff), на ховере — глубже `--blue-700`.
Текст и фон не меняются (читаемость сохраняется).

## Контекст
- Изменение вида → сначала design-map, после «да» — код (skill `albident-design-map`).
- Касается только **карточек услуг** (на главной-превью и на `/services`) — один компонент `ServiceCard.tsx`.
- Решение пользователя: «белая карточка + синий акцент», оттенок — проектный `--blue-600`. Этот вид уже был согласован до отката.
- Токены: `--primary` = #2f6bff (= `--blue-600`), `--accent-foreground` = #1f54e0 (= `--blue-700`).

## Шаги
- [x] design-map: `.hp-service` и `.card-service` — рамка `--line` → `--blue-600`, ховер → `--blue-700`. Согласовано.
- [x] Код: `ServiceCard.tsx` — `border-border` → `border-primary`, `hover:border-primary/30` → `hover:border-accent-foreground`.
- [x] tsc + lint чисто, карта = сайт.

## Критерии готовности
- На главной и `/services` карточки услуг с синей рамкой проектного оттенка, ховер глубже.
- design-map и сайт совпадают.
- `npx tsc --noEmit` + lint чисты.
