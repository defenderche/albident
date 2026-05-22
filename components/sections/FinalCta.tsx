import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export async function FinalCta() {
  const t = await getTranslations("Home.finalCta");
  return (
    <section className="border-t border-border bg-foreground py-16 text-background md:py-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center md:px-6">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{t("heading")}</h2>
        <Link
          href="/booking"
          className={cn(
            "inline-flex h-10 items-center justify-center rounded-lg px-5 text-sm font-medium transition-colors",
            "bg-background text-foreground hover:bg-background/90",
          )}
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
