import { getTranslations } from "next-intl/server";

export async function AboutClinic() {
  const t = await getTranslations("About.clinic");
  return (
    <section className="bg-card pt-12 pb-20 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{t("heading")}</h2>
        <p className="mt-6 max-w-3xl whitespace-pre-line text-base leading-relaxed text-foreground/90">
          {t("body")}
        </p>
      </div>
    </section>
  );
}
