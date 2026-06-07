---
name: hero-copy
branch: feature/hero-copy
status: completed
created: 2026-06-07
completed: 2026-06-07
---

# План: Текст hero на главной

## Цель
Заменить заголовок и подзаголовок hero-секции главной на более читабельный
клиентский текст во всех трёх локалях. Структура hero не меняется.

## Контекст
- `feature-spec-home.md` §1.1 — hero = заголовок + краткое описание + CTA + полоса цифр (структура сохраняется).
- Тон по `global-spec.md` §5 (без превосходных степеней и клише), контент по §15.
- Расхождения со спекой нет — правится только контент, поэтому спека не редактируется.
- Текст согласован с пользователем.

Итоговый текст:
- **RU** — Здоровые зубы и `<accent>уверенная улыбка</accent>` · Имплантация, эстетика, ортодонтия и базовое лечение. Прозрачные цены, гарантии и приём на трёх языках.
- **EN** — Healthy teeth and a `<accent>confident smile</accent>` · Implants, aesthetics, orthodontics, and general dentistry. Transparent prices, guarantees, and care in three languages.
- **TR** — Sağlıklı dişler ve `<accent>kendinden emin bir gülüş</accent>` · İmplant, estetik, ortodonti ve genel diş hekimliği. Şeffaf fiyatlar, garantiler ve üç dilde hizmet.

## Шаги
- [x] `messages/ru.json` — heading/description
- [x] `messages/en.json` — heading/description
- [x] `messages/tr.json` — heading/description

## Критерии готовности
- На `/ru`, `/en`, `/tr` hero показывает новый текст, акцент на нужном слове.
- `npx tsc --noEmit` чист.
