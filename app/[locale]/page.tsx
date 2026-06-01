import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { WhyUs } from "@/components/sections/WhyUs";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tFinalCta = await getTranslations({ locale, namespace: "Home.finalCta" });

  return (
    <>
      <Hero />
      <ServicesPreview />
      <WhyUs />
      <Faq />
      <FinalCta
        heading={tFinalCta("heading")}
        subtitle={tFinalCta("subtitle")}
        cta={tFinalCta("cta")}
      />
    </>
  );
}
