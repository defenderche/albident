import type { ComponentType } from "react";
import { Activity, Anchor, Braces, Droplets, Sparkles } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
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

const iconBySlug: Partial<Record<ServiceSlug, ComponentType<{ className?: string }>>> = {
  therapy: Activity,
  implants: Anchor,
  orthodontics: Braces,
  aesthetics: Sparkles,
  hygiene: Droplets,
};

export async function ServicesPreview() {
  const t = await getTranslations("Home.services");
  const locale = (await getLocale()) as Locale;

  const featured = HOMEPAGE_SLUGS.map((slug) =>
    services.find((s) => s.slug === slug),
  ).filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{t("heading")}</h2>
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {featured.map((service) => {
            const Icon = iconBySlug[service.slug] ?? Activity;
            return (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-background p-5 transition-colors hover:border-foreground/30"
                >
                  <Icon className="size-6 text-foreground/70 transition-colors group-hover:text-foreground" />
                  <h3 className="text-base font-medium">{service.name[locale]}</h3>
                  <p className="flex-1 text-sm text-muted-foreground">
                    {service.shortDescription[locale]}
                  </p>
                  <p className="text-sm font-medium text-foreground/90">
                    {t("priceRange", {
                      from: `$${service.priceFrom}`,
                      to: `$${service.priceTo}`,
                    })}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-8 flex justify-center">
          <Link href="/services" className={cn(buttonVariants({ variant: "outline" }))}>
            {t("allServicesButton")}
          </Link>
        </div>
      </div>
    </section>
  );
}
