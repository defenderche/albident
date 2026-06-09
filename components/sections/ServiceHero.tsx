import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { doctors } from "@/content/doctors";
import { Link } from "@/i18n/navigation";
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

  const doctorsNames = related
    .map((d) => `${d.name[locale]} — ${d.role[locale]}`)
    .join(", ");

  return (
    <section className="bg-card pt-12 md:pt-16">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted shadow-soft">
          <Image
            src={service.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
        <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          {service.name[locale]}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {service.shortDescription[locale]}
        </p>
        {related.length > 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            {t("ledBy", { count: related.length })}{" "}
            <Link href="/about#team" className="text-primary hover:underline">
              {doctorsNames}
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
