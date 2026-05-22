import { getTranslations } from "next-intl/server";

const items = [
  { titleKey: "qualityTitle", bodyKey: "qualityBody" },
  { titleKey: "trustTitle", bodyKey: "trustBody" },
  { titleKey: "teamTitle", bodyKey: "teamBody" },
] as const;

export async function WhyUs() {
  const t = await getTranslations("Home.whyUs");

  return (
    <section className="border-t border-border bg-muted/30 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{t("heading")}</h2>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.titleKey}>
              <h3 className="text-base font-medium">{t(item.titleKey)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t(item.bodyKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
