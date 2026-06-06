import { getTranslations } from "next-intl/server";

export async function ServicesHero() {
  const t = await getTranslations("Services.hero");

  return (
    <section className="bg-card">
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-10 md:px-6 md:pt-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          {t("heading")}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          {t("description")}
        </p>
      </div>
    </section>
  );
}
