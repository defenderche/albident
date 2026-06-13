import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AboutClinic } from "@/components/sections/AboutClinic";
import { AboutReviews } from "@/components/sections/AboutReviews";
import { AboutTeam } from "@/components/sections/AboutTeam";
import { AboutWarranties } from "@/components/sections/AboutWarranties";
import { FinalCta } from "@/components/sections/FinalCta";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tFinalCta = await getTranslations({ locale, namespace: "About.finalCta" });

  return (
    <>
      <AboutClinic />
      <AboutWarranties />
      <AboutTeam />
      <AboutReviews />
      <FinalCta
        heading={tFinalCta("heading")}
        subtitle={tFinalCta("subtitle")}
        cta={tFinalCta("cta")}
      />
    </>
  );
}
