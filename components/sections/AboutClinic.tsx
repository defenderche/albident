import { getTranslations } from "next-intl/server";

const points = ["diagnostics", "equipment", "team"] as const;

export async function AboutClinic() {
  const t = await getTranslations("About.clinic");
  return (
    <section className="bg-card pt-12 pb-20 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{t("heading")}</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
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
    </section>
  );
}
