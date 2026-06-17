import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookingForm } from "@/components/booking/BookingForm";
import { getServiceMenu } from "@/lib/services";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ service?: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Booking" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function BookingPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Booking" });
  const sp = await searchParams;

  const serviceMenu = await getServiceMenu();
  const defaultService =
    sp.service && serviceMenu.some((s) => s.slug === sp.service)
      ? sp.service
      : undefined;

  return (
    <section className="bg-background py-20 md:py-24">
      <div className="mx-auto max-w-2xl px-4 md:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          {t("heading")}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {t("intro")}
        </p>
        <div className="mt-10">
          <BookingForm
            defaultService={defaultService}
            locale={locale}
            services={serviceMenu}
          />
        </div>
      </div>
    </section>
  );
}
