import { getLocale, getTranslations } from "next-intl/server";
import { site } from "@/content/site";
import type { Locale } from "@/types/site";

export async function ContactHours() {
  const t = await getTranslations("Contacts.hours");
  const locale = (await getLocale()) as Locale;

  return (
    <section className="border-t border-border bg-muted/20 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{t("heading")}</h2>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/90">
          {site.hours[locale]}
        </p>
      </div>
    </section>
  );
}
