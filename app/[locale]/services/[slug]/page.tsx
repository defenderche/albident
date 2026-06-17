import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ServiceDetails } from "@/components/sections/ServiceDetails";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { routing } from "@/i18n/routing";
import { getServiceBySlug, getServiceSlugs } from "@/lib/services";
import type { Locale } from "@/types/site";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await getServiceBySlug(slug);
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
  const service = await getServiceBySlug(slug);
  if (!service) notFound();
  setRequestLocale(locale);
  const typedLocale = locale as Locale;

  return (
    <>
      <ServiceHero service={service} locale={typedLocale} />
      <ServiceDetails service={service} locale={typedLocale} />
    </>
  );
}
