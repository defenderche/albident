import type { Doctor } from "@/types/doctor";
import type { Locale } from "@/types/site";

function getInitials(fullName: string): string {
  const words = fullName.trim().split(/\s+/);
  if (words.length === 0 || !words[0]) return "";
  if (words.length === 1) return (words[0][0] ?? "").toUpperCase();
  const first = words[0][0] ?? "";
  const last = words[words.length - 1]?.[0] ?? "";
  return (first + last).toUpperCase();
}

type Props = {
  doctor: Doctor;
  locale: Locale;
};

export function DoctorCard({ doctor, locale }: Props) {
  const initials = getInitials(doctor.name[locale]);
  return (
    <article className="flex flex-col items-center gap-3 rounded-xl border border-border bg-background p-6 text-center">
      <div
        aria-hidden
        className="flex size-24 items-center justify-center rounded-full bg-muted text-2xl font-semibold text-muted-foreground"
      >
        {initials}
      </div>
      <h3 className="text-base font-medium">{doctor.name[locale]}</h3>
      <p className="text-sm text-muted-foreground">{doctor.role[locale]}</p>
      <ul className="mt-2 w-full space-y-1.5 text-left text-xs leading-relaxed text-muted-foreground">
        {doctor.achievements.map((a, idx) => (
          <li key={idx}>· {a[locale]}</li>
        ))}
      </ul>
    </article>
  );
}
