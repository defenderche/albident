import { getLocale, getTranslations } from "next-intl/server";
import { DoctorCard } from "@/components/sections/DoctorCard";
import { doctors } from "@/content/doctors";
import type { Locale } from "@/types/site";

export async function AboutTeam() {
  const t = await getTranslations("About.team");
  const locale = (await getLocale()) as Locale;

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{t("heading")}</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.slug} doctor={doctor} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
