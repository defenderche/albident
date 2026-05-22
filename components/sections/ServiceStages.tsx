import { getTranslations } from "next-intl/server";
import type { Service } from "@/types/service";
import type { Locale } from "@/types/site";

type Props = {
  service: Service;
  locale: Locale;
};

export async function ServiceStages({ service, locale }: Props) {
  const t = await getTranslations("ServicePage");
  return (
    <section className="border-t border-border bg-muted/20 py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {t("stagesHeading")}
        </h2>
        <ol className="mt-8 space-y-6">
          {service.stages.map((stage, idx) => (
            <li key={idx} className="flex gap-4">
              <span
                aria-hidden
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background"
              >
                {idx + 1}
              </span>
              <div>
                <h3 className="text-base font-medium">{stage.title[locale]}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {stage.description[locale]}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
