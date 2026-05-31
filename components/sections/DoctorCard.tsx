import { User } from "lucide-react";
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
        <User className="size-16" strokeWidth={1.5} />
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
