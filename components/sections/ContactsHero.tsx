import { getTranslations } from "next-intl/server";

export async function ContactsHero() {
  const t = await getTranslations("Contacts.hero");
  return (
    <section className="bg-card pt-12 md:pt-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          {t("heading")}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {t("intro")}
        </p>
      </div>
    </section>
  );
}
