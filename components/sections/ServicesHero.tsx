import { getTranslations } from "next-intl/server";

export async function ServicesHero() {
  const t = await getTranslations("Services.hero");
  return (
    <section className="border-b border-border bg-background py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {t("heading")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          {t("description")}
        </p>
      </div>
    </section>
  );
}
