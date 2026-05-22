import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FinalCta } from "@/components/sections/FinalCta";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ServicesHero } from "@/components/sections/ServicesHero";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tFinalCta = await getTranslations({ locale, namespace: "Services.finalCta" });

  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <FinalCta heading={tFinalCta("heading")} cta={tFinalCta("cta")} />
    </>
  );
}
