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
        <dl className="mt-8 space-y-6">
          {warranties.map((w, idx) => (
            <div key={idx}>
              <dt className="text-base font-medium text-foreground">{w.service[locale]}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {w.term[locale]}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
