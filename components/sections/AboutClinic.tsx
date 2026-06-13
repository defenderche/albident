import Image from "next/image";
import { getTranslations } from "next-intl/server";

const points = ["diagnostics", "equipment", "team"] as const;

export async function AboutClinic() {
  const tHero = await getTranslations("About.hero");
  const t = await getTranslations("About.clinic");
  return (
    <section className="bg-card">
      <div className="grid md:grid-cols-2 md:items-stretch">
        {/* Текстовая колонка: заголовок и intro страницы + подход */}
        <div className="flex flex-col justify-center px-6 py-12 md:py-16 md:pl-10 md:pr-12 lg:pl-16 xl:pl-24">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {tHero("heading")}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {tHero("intro")}
          </p>

          <h2 className="mt-10 text-3xl font-extrabold tracking-tight md:text-4xl">
            {t("heading")}
          </h2>
          <div className="mt-6 grid gap-6">
            {points.map((key) => (
              <div key={key}>
                <h3 className="text-lg font-bold text-foreground">{t(`points.${key}.title`)}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  {t(`points.${key}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Фото-колонка: интерьер во всю высоту секции, в правый край экрана */}
        <div className="relative min-h-[340px] md:min-h-0">
          <Image
            src="/clinic/interior.jpg"
            alt="Интерьер клиники Albident — ресепшен"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          {/* Белая S-кривая поверх левого края фото — переход от текста к снимку.
              Видна только на desktop, где колонки стоят рядом. */}
          <svg
            className="absolute inset-y-0 left-[-1px] hidden h-full w-[64px] md:block"
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M0,0 L50,0 C92,250 18,560 56,800 C76,920 60,962 40,1000 L0,1000 Z"
              className="fill-card"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
