import { getLocale, getTranslations } from "next-intl/server";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { services } from "@/content/services";
import type { ServiceSlug } from "@/types/service";
import type { Locale } from "@/types/site";

// Flagship services for dental tourism — highlighted with a "popular" badge.
const FLAGSHIP_SLUGS: ServiceSlug[] = ["implants", "aesthetics", "orthodontics"];

export async function ServicesGrid() {
  const t = await getTranslations("Services");
  const locale = (await getLocale()) as Locale;

  return (
    <section className="bg-secondary py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                popularLabel={
                  FLAGSHIP_SLUGS.includes(service.slug) ? t("popularBadge") : undefined
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
