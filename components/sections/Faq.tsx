import { getLocale, getTranslations } from "next-intl/server";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { homeFaq } from "@/content/faq";
import type { Locale } from "@/types/site";

export async function Faq() {
  const t = await getTranslations("Home.faq");
  const locale = (await getLocale()) as Locale;

  return (
    <section className="border-t border-border py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{t("heading")}</h2>
        <Accordion className="mt-8 divide-y divide-border">
          {homeFaq.map((item, idx) => (
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
