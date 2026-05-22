import { getTranslations } from "next-intl/server";
import { DoctorCard } from "@/components/sections/DoctorCard";
import { doctors } from "@/content/doctors";
import type { Service } from "@/types/service";
import type { Locale } from "@/types/site";

type Props = {
  service: Service;
  locale: Locale;
};

export async function ServiceDoctors({ service, locale }: Props) {
  const t = await getTranslations("ServicePage");
  const related = service.relatedDoctors
    .map((slug) => doctors.find((d) => d.slug === slug))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  if (related.length === 0) return null;

  return (
    <section className="border-t border-border bg-muted/30 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {t("doctorsHeading")}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((doctor) => (
            <DoctorCard key={doctor.slug} doctor={doctor} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
