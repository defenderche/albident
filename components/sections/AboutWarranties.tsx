import { getLocale, getTranslations } from "next-intl/server";
import { warranties } from "@/content/warranties";
import type { Locale } from "@/types/site";

export async function AboutWarranties() {
  const t = await getTranslations("About.warranties");
  const locale = (await getLocale()) as Locale;

  return (
    <section className="border-t border-border bg-muted/20 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{t("heading")}</h2>
        <div className="max-w-3xl">
          <p className="mt-6 text-base leading-relaxed text-foreground/90">{t("intro")}</p>
          <dl className="mt-10 divide-y divide-border/60">
            {warranties.map((w, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 py-6 first:pt-0 sm:grid-cols-[1fr_2fr] sm:gap-x-6"
              >
                <dt className="text-base font-semibold text-foreground sm:text-lg">
                  {w.service[locale]}
                </dt>
                <dd className="mt-2 text-sm font-medium text-foreground/80 sm:col-start-2 sm:mt-0">
                  {w.term[locale]}
                </dd>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground sm:col-start-2">
                  {w.description[locale]}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 text-sm leading-relaxed text-muted-foreground">{t("footnote")}</p>
        </div>
      </div>
    </section>
  );
}
