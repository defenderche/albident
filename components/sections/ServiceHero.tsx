import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { doctors } from "@/content/doctors";
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
    <section className="bg-background pt-8 md:pt-12">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted shadow-soft">
          <Image
            src={service.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
        <div className="mt-8 md:mt-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {service.name[locale]}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            {service.shortDescription[locale]}
          </p>
          {doctorsLine ? (
            <p className="mt-3 text-sm text-muted-foreground">{doctorsLine}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
