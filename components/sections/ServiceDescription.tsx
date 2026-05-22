import { getTranslations } from "next-intl/server";
import type { Service } from "@/types/service";
import type { Locale } from "@/types/site";

type Props = {
  service: Service;
  locale: Locale;
};

export async function ServiceDescription({ service, locale }: Props) {
  const t = await getTranslations("ServicePage");
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {t("descriptionHeading")}
        </h2>
        <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-foreground/90">
          {service.fullDescription[locale]}
        </p>
      </div>
    </section>
  );
}
