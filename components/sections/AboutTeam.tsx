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
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{t("heading")}</h2>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.slug} doctor={doctor} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
