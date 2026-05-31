import { getLocale, getTranslations } from "next-intl/server";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { services } from "@/content/services";
import type { Locale } from "@/types/site";

export async function ServicesGrid() {
  const t = await getTranslations("Services");
  const locale = (await getLocale()) as Locale;

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <li key={service.slug}>
              <ServiceCard
                service={service}
                locale={locale}
                priceRangeLabel={t("priceRange", {
                  from: `$${service.priceFrom}`,
                  to: `$${service.priceTo}`,
                })}
                detailsLabel={t("cardDetails")}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
