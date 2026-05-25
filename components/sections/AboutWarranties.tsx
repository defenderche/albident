import { getLocale, getTranslations } from "next-intl/server";
import { warranties } from "@/content/warranties";
import type { Locale } from "@/types/site";

export async function AboutWarranties() {
  const t = await getTranslations("About.warranties");
  const locale = (await getLocale()) as Locale;

  return (
    <section className="border-t border-border bg-muted/20 py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{t("heading")}</h2>
        <p className="mt-6 text-base leading-relaxed text-foreground/90">{t("intro")}</p>
        <dl className="mt-10 space-y-8">
          {warranties.map((w, idx) => (
            <div key={idx}>
              <dt className="text-base font-medium text-foreground">{w.service[locale]}</dt>
              <dd className="mt-1 text-sm font-medium text-foreground/80">{w.term[locale]}</dd>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {w.description[locale]}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 text-sm leading-relaxed text-muted-foreground">{t("footnote")}</p>
      </div>
    </section>
  );
}
