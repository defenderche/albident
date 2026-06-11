import { ArrowRight, CalendarDays, ClipboardCheck } from "lucide-react";
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
    <section className="bg-card pt-10 pb-20 md:pt-12 md:pb-24">
      <div className="mx-auto max-w-3xl space-y-12 px-4 md:px-6">
        <p className="whitespace-pre-line text-base leading-relaxed text-foreground/90">
          {service.fullDescription[locale]}
        </p>

        <div>
          <h3 className="text-xl font-bold tracking-tight">{t("stagesHeading")}</h3>
          <div className="mt-5 flex flex-wrap gap-x-10 gap-y-4">
            <div className="flex items-center gap-3">
              <ClipboardCheck aria-hidden className="size-5 shrink-0 text-primary" />
              <p>
                <span className="text-xl font-extrabold text-foreground">
                  {service.trip.visits.value[locale]}
                </span>{" "}
                <span className="text-sm text-muted-foreground">
                  {service.trip.visits.caption[locale]}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <CalendarDays aria-hidden className="size-5 shrink-0 text-primary" />
              <p>
                <span className="text-xl font-extrabold text-foreground">
                  {service.trip.days.value[locale]}
                </span>{" "}
                <span className="text-sm text-muted-foreground">
                  {service.trip.days.caption[locale]}
                </span>
              </p>
            </div>
          </div>
          <ol className="mt-6">
            {service.stages.map((stage, idx) => (
              <li key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span
                    aria-hidden
                    className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
                  >
                    {idx + 1}
                  </span>
                  {idx < service.stages.length - 1 ? (
                    <span aria-hidden className="mt-1.5 w-px flex-1 bg-border" />
                  ) : null}
                </div>
                <div className="pb-7">
                  <h4 className="text-sm font-semibold text-foreground">
                    {stage.title[locale]}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {stage.description[locale]}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="text-xl font-bold tracking-tight">{t("pricingHeading")}</h3>
          <ul className="mt-6 border-t border-border">
            {service.subProcedures.map((sub, idx) => (
              <li
                key={idx}
                className="flex flex-col gap-1 border-b border-border py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <span className="text-sm text-foreground/90">{sub.name[locale]}</span>
                <span className="text-sm font-semibold whitespace-nowrap text-foreground">
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
            <h3 className="text-xl font-bold tracking-tight">{t("faqHeading")}</h3>
            <Accordion className="mt-6 border-t border-border">
              {service.faq.map((item, idx) => (
                <AccordionItem key={idx} value={String(idx)} className="border-b border-border">
                  <AccordionTrigger className="text-base">{item.q[locale]}</AccordionTrigger>
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
