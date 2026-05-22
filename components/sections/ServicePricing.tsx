import { getTranslations } from "next-intl/server";
import type { Service } from "@/types/service";
import type { Locale } from "@/types/site";

type Props = {
  service: Service;
  locale: Locale;
};

export async function ServicePricing({ service, locale }: Props) {
  const t = await getTranslations("ServicePage");
  return (
    <section className="border-t border-border py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {t("pricingHeading")}
        </h2>
        <ul className="mt-8 divide-y divide-border overflow-hidden rounded-xl border border-border bg-background">
          {service.subProcedures.map((sub, idx) => (
            <li
              key={idx}
              className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <span className="text-base text-foreground/90">{sub.name[locale]}</span>
              <span className="text-base font-medium text-foreground">
                {t("priceRange", {
                  from: `$${sub.priceFrom}`,
                  to: `$${sub.priceTo}`,
                })}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">{t("pricingDisclaimer")}</p>
      </div>
    </section>
  );
}
