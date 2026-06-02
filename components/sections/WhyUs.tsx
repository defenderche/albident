import { BadgeCheck, ShieldCheck, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

const items = [
  { titleKey: "qualityTitle", bodyKey: "qualityBody", Icon: BadgeCheck },
  { titleKey: "trustTitle", bodyKey: "trustBody", Icon: ShieldCheck },
  { titleKey: "teamTitle", bodyKey: "teamBody", Icon: Users },
] as const;

export async function WhyUs() {
  const t = await getTranslations("Home.whyUs");

  return (
    <section className="border-t border-border bg-secondary/50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">
          {t("heading")}
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map(({ titleKey, bodyKey, Icon }) => (
            <div
              key={titleKey}
              className="rounded-2xl border border-border bg-card p-7 shadow-soft"
            >
              <span className="flex size-12 items-center justify-center rounded-md bg-accent text-primary">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{t(titleKey)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t(bodyKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
