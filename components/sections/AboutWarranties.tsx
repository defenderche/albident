import { getLocale, getTranslations } from "next-intl/server";
import { warranties } from "@/content/warranties";
import type { Locale } from "@/types/site";

export async function AboutWarranties() {
  const t = await getTranslations("About.warranties");
  const locale = (await getLocale()) as Locale;

  return (
    <section className="border-t border-border bg-muted/20 py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{t("heading")}</h2>
        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-background">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 font-medium text-foreground/80">{t("columnService")}</th>
                <th className="px-4 py-3 font-medium text-foreground/80">{t("columnTerm")}</th>
              </tr>
            </thead>
            <tbody>
              {warranties.map((w, idx) => (
                <tr
                  key={idx}
                  className="border-b border-border last:border-b-0 align-top"
                >
                  <td className="px-4 py-3 font-medium text-foreground">{w.service[locale]}</td>
                  <td className="px-4 py-3 text-muted-foreground">{w.term[locale]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
