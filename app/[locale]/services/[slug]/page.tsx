import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FinalCta } from "@/components/sections/FinalCta";
import { ServiceDescription } from "@/components/sections/ServiceDescription";
import { ServiceDoctors } from "@/components/sections/ServiceDoctors";
import { ServiceFaq } from "@/components/sections/ServiceFaq";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { ServicePricing } from "@/components/sections/ServicePricing";
import { ServiceStages } from "@/components/sections/ServiceStages";
import { services } from "@/content/services";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/types/site";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((service) => ({ locale, slug: service.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  const t = await getTranslations({ locale, namespace: "ServicePage" });
  const typedLocale = locale as Locale;
  return {
    title: t("metaTitleTemplate", { name: service.name[typedLocale] }),
    description: t("metaDescriptionTemplate", {
      short: service.shortDescription[typedLocale],
      from: service.priceFrom,
    }),
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  setRequestLocale(locale);
  const typedLocale = locale as Locale;
  const tFinalCta = await getTranslations({ locale, namespace: "ServicePage.finalCta" });

  return (
    <>
      <ServiceHero service={service} locale={typedLocale} />
      <ServiceDescription service={service} locale={typedLocale} />
      <ServiceStages service={service} locale={typedLocale} />
      <ServicePricing service={service} locale={typedLocale} />
      <ServiceDoctors service={service} locale={typedLocale} />
      <ServiceFaq service={service} locale={typedLocale} />
      <FinalCta
        heading={tFinalCta("heading")}
        cta={tFinalCta("cta")}
        href={`/booking?service=${service.slug}`}
      />
    </>
  );
}
