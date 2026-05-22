import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { Service } from "@/types/service";
import type { Locale } from "@/types/site";

type Props = {
  service: Service;
  locale: Locale;
};

export async function ServiceHero({ service, locale }: Props) {
  const t = await getTranslations("ServicePage");
  return (
    <section className="border-b border-border bg-background py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {service.name[locale]}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          {service.shortDescription[locale]}
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href={`/booking?service=${service.slug}`}
            className={cn(buttonVariants({ size: "lg" }))}
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
