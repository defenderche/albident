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
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{t("heading")}</h2>
        <Accordion className="mt-10 rounded-2xl border border-border bg-card">
          {homeFaq.map((item, idx) => (
            <AccordionItem key={idx} value={String(idx)}>
              <AccordionTrigger className="px-5">{item.q[locale]}</AccordionTrigger>
              <AccordionContent className="px-5 text-muted-foreground">
                {item.a[locale]}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
