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
    <section className="bg-card py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.04em] text-primary">
          {t("kicker")}
        </p>
        <h2 className="mt-2 max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">
          {t("heading")}
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {items.map(({ titleKey, bodyKey, Icon }) => (
            <div key={titleKey}>
              <span className="flex size-13 items-center justify-center rounded-md bg-accent text-primary">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold">{t(titleKey)}</h3>
              <p className="mt-2.5 max-w-xs text-muted-foreground">{t(bodyKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
