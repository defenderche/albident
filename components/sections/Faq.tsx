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
    <section className="bg-card py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.04em] text-primary">
          {t("kicker")}
        </p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
          {t("heading")}
        </h2>
        <Accordion className="mt-10 border-t border-border">
          {homeFaq.map((item, idx) => (
            <AccordionItem key={idx} value={String(idx)} className="border-b border-border">
              <AccordionTrigger className="text-base md:text-lg">
                {item.q[locale]}
              </AccordionTrigger>
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
