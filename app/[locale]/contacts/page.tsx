import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { ContactsHero } from "@/components/sections/ContactsHero";
import { FinalCta } from "@/components/sections/FinalCta";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contacts" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ContactsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tFinalCta = await getTranslations({ locale, namespace: "Contacts.finalCta" });

  return (
    <>
      <ContactsHero />
      <ContactDetails />
      <FinalCta
        heading={tFinalCta("heading")}
        subtitle={tFinalCta("subtitle")}
        cta={tFinalCta("cta")}
      />
    </>
  );
}
