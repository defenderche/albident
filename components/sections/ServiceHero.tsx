import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { doctors } from "@/content/doctors";
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

  const related = service.relatedDoctors
    .map((slug) => doctors.find((d) => d.slug === slug))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  const doctorsLine =
    related.length > 0
      ? `${t("ledBy", { count: related.length })} ${related
          .map((d) => `${d.name[locale]} — ${d.role[locale]}`)
          .join(", ")}`
      : null;

  return (
    <section className="border-b border-border bg-background pb-16 pt-8 md:pb-20 md:pt-12">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted">
          <Image
            src={service.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover"
          />
        </div>
        <div className="mt-10 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {service.name[locale]}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            {service.shortDescription[locale]}
          </p>
          {doctorsLine ? (
            <p className="mt-3 text-sm text-muted-foreground">{doctorsLine}</p>
          ) : null}
          <div className="mt-8 flex justify-center">
            <Link
              href={`/booking?service=${service.slug}`}
              className={cn(buttonVariants({ size: "lg" }))}
            >
              {t("cta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
