import type { Review } from "@/types/review";
import type { Locale } from "@/types/site";

function getInitials(fullName: string): string {
  const words = fullName.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  if (words.length === 1) return (words[0][0] ?? "").toUpperCase();
  return ((words[0][0] ?? "") + (words[words.length - 1][0] ?? "")).toUpperCase();
}

type Props = {
  review: Review;
  locale: Locale;
};

export function ReviewCard({ review, locale }: Props) {
  const initials = getInitials(review.author[locale]);
  return (
    <article className="flex h-full flex-col gap-4 rounded-2xl border border-[#efe6d6] bg-cream p-6">
      <span aria-hidden className="text-5xl font-extrabold leading-[0.5] text-primary">
        &ldquo;
      </span>
      <p className="text-sm leading-relaxed text-foreground/80">{review.quote[locale]}</p>
      <div className="mt-auto flex items-center gap-3">
        <span
          aria-hidden
          className="flex size-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
        >
          {initials}
        </span>
        <span className="text-sm font-bold text-foreground">{review.author[locale]}</span>
      </div>
    </article>
  );
}
