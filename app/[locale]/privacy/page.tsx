import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { privacy } from "@/content/privacy";
import { site } from "@/content/site";
import type { Locale } from "@/types/site";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Privacy" });
  const loc = locale as Locale;

  const updatedDate = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(privacy.updatedAt));

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-2xl px-4 md:px-6">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {t("heading")}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {t("updatedLabel")}: {updatedDate}
        </p>
        <p className="mt-8 text-base leading-relaxed text-foreground/90">
          {privacy.intro[loc]}
        </p>

        <div className="mt-10 space-y-10">
          <section>
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              {t("sections.bookings")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-foreground/90">
              {privacy.sections.bookings[loc]}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              {t("sections.chat")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-foreground/90">
              {privacy.sections.chat[loc]}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              {t("sections.dataDeletion")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-foreground/90">
              {privacy.sections.dataDeletion[loc]}
            </p>
            <p className="mt-3 text-sm">
              <a
                href={`mailto:${site.email}`}
                className="font-medium text-foreground hover:text-foreground/70"
              >
                {t("emailLabel")}: {site.email}
              </a>
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
