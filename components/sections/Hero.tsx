import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export async function Hero() {
  const t = await getTranslations("Home.hero");
  return (
    <section className="border-b border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {t("heading")}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
          {t("description")}
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/booking" className={cn(buttonVariants({ size: "lg" }))}>
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
