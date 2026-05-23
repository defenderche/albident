import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { Service } from "@/types/service";
import type { Locale } from "@/types/site";

type Props = {
  service: Service;
  locale: Locale;
};

export async function ServiceDetails({ service, locale }: Props) {
  const t = await getTranslations("ServicePage");

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-3xl space-y-12 px-4 md:px-6">
        <p className="whitespace-pre-line text-base leading-relaxed text-foreground/90">
          {service.fullDescription[locale]}
        </p>

        <div>
          <h3 className="text-lg font-semibold tracking-tight">{t("stagesHeading")}</h3>
          <ol className="mt-5 space-y-5">
            {service.stages.map((stage, idx) => (
              <li key={idx} className="flex gap-4">
                <span
                  aria-hidden
                  className="flex size-7 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background"
                >
                  {idx + 1}
                </span>
                <div>
                  <h4 className="text-sm font-medium">{stage.title[locale]}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {stage.description[locale]}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="text-lg font-semibold tracking-tight">{t("pricingHeading")}</h3>
          <ul className="mt-5 divide-y divide-border overflow-hidden rounded-xl border border-border bg-background">
            {service.subProcedures.map((sub, idx) => (
              <li
                key={idx}
                className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <span className="text-sm text-foreground/90">{sub.name[locale]}</span>
                <span className="text-sm font-medium text-foreground">
                  {t("priceRange", {
                    from: `$${sub.priceFrom}`,
                    to: `$${sub.priceTo}`,
                  })}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">{t("pricingDisclaimer")}</p>
        </div>

        {service.faq.length > 0 ? (
          <div>
            <h3 className="text-lg font-semibold tracking-tight">{t("faqHeading")}</h3>
            <Accordion className="mt-5 divide-y divide-border">
              {service.faq.map((item, idx) => (
                <AccordionItem key={idx} value={String(idx)}>
                  <AccordionTrigger>{item.q[locale]}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.a[locale]}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ) : null}

        <div>
          <Link
            href={`/booking?service=${service.slug}`}
            className={cn(buttonVariants({ size: "lg" }), "h-12 w-full px-7 text-base")}
          >
            {t("cta")}
            <ArrowRight aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
