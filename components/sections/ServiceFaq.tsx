import { getTranslations } from "next-intl/server";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Service } from "@/types/service";
import type { Locale } from "@/types/site";

type Props = {
  service: Service;
  locale: Locale;
};

export async function ServiceFaq({ service, locale }: Props) {
  const t = await getTranslations("ServicePage");
  if (service.faq.length === 0) return null;

  return (
    <section className="border-t border-border py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{t("faqHeading")}</h2>
        <Accordion className="mt-8 divide-y divide-border">
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
    </section>
  );
}
