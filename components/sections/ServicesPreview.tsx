import { getLocale, getTranslations } from "next-intl/server";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Link } from "@/i18n/navigation";
import { getHomeServices } from "@/lib/services";
import type { Locale } from "@/types/site";

export async function ServicesPreview() {
  const t = await getTranslations("Home.services");
  const locale = (await getLocale()) as Locale;

  const featured = await getHomeServices();

  return (
    <section className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.04em] text-primary">
              {t("kicker")}
            </p>
            <h2 className="mt-2 max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">
              {t("heading")}
            </h2>
          </div>
          <Link
            href="/services"
            className="text-[15px] font-bold text-primary transition-colors hover:text-[#1f54e0]"
          >
            {t("allServicesButton")} →
          </Link>
        </div>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {featured.map((service) => (
            <li key={service.slug}>
              <ServiceCard
                service={service}
                locale={locale}
                priceRangeLabel={t("priceRange", {
                  from: `$${service.priceFrom}`,
                  to: `$${service.priceTo}`,
                })}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
