import { getLocale, getTranslations } from "next-intl/server";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { buttonVariants } from "@/components/ui/button";
import { services } from "@/content/services";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { ServiceSlug } from "@/types/service";
import type { Locale } from "@/types/site";

const HOMEPAGE_SLUGS: ServiceSlug[] = [
  "implants",
  "aesthetics",
  "orthodontics",
  "therapy",
  "hygiene",
];

export async function ServicesPreview() {
  const t = await getTranslations("Home.services");
  const locale = (await getLocale()) as Locale;

  const featured = HOMEPAGE_SLUGS.map((slug) =>
    services.find((s) => s.slug === slug),
  ).filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">{t("heading")}</h2>
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
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
        <div className="mt-10 flex justify-center">
          <Link href="/services" className={cn(buttonVariants({ variant: "outline" }))}>
            {t("allServicesButton")}
          </Link>
        </div>
      </div>
    </section>
  );
}
