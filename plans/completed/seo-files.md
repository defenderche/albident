---
name: seo-files
branch: feature/seo-files
status: completed
created: 2026-06-02
completed: 2026-06-02
---

# План: SEO-файлы (robots.txt + sitemap.xml)

## Цель
Сайт отдаёт `/robots.txt` и `/sitemap.xml` с тремя языковыми вариантами каждого URL
и `hreflang`-аннотациями — закрывает последний ⬜ пункт SEO из роадмапа.

## Контекст
`specifications/technical-specs/technical-spec.md` §10 (SEO). Базовый URL — из
`NEXT_PUBLIC_SITE_URL` (§9). Локали `ru/en/tr`, `localePrefix: "always"`.
8 услуг: therapy, surgery, implants, prosthetics, orthodontics, aesthetics, hygiene, periodontology.

## Шаги
- [x] `lib/utils/siteUrl.ts` — helper для базового URL (env + фолбэк, без хвостового `/`)
- [x] `app/robots.ts` — разрешить всех ботов, указать sitemap
- [x] `app/sitemap.ts` — статика + 8 услуг × 3 локали с `alternates.languages` + `x-default` → ru
- [x] Юнит-тест на чистую логику построения URL (`lib/utils/sitemap.test.ts`)
- [x] Проверка: build, tsc, test, глазами `/robots.txt` и `/sitemap.xml` (42 URL, hreflang ok)

## Критерии готовности
- `/robots.txt` и `/sitemap.xml` корректно генерируются на dev.
- Sitemap содержит все страницы на трёх локалях с hreflang.
- Зелёные lint / tsc / test.
