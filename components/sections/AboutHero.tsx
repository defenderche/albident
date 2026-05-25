import { getTranslations } from "next-intl/server";

export async function AboutHero() {
  const t = await getTranslations("About.hero");
  return (
    <section className="bg-background pt-8 md:pt-12">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {t("heading")}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {t("intro")}
        </p>
      </div>
    </section>
  );
}
