import type { Doctor } from "@/types/doctor";
import type { Locale } from "@/types/site";

type Props = {
  doctor: Doctor;
  locale: Locale;
};

export function DoctorCard({ doctor, locale }: Props) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div
        aria-hidden
        className="flex aspect-[4/5] items-center justify-center bg-gradient-to-b from-accent to-[#e3ecff] text-[#b9caf0]"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-2/5">
          <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-5 0-9 2.5-9 6v2h18v-2c0-3.5-4-6-9-6Z" />
        </svg>
      </div>
      <div className="flex flex-col gap-2 p-5">
        <h3 className="text-lg font-bold">{doctor.name[locale]}</h3>
        <p className="text-sm font-semibold text-primary">{doctor.role[locale]}</p>
        <ul className="mt-1 space-y-1 text-xs leading-relaxed text-muted-foreground">
          {doctor.achievements.map((a, idx) => (
            <li key={idx}>· {a[locale]}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
