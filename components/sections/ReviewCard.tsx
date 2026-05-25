import type { Review } from "@/types/review";
import type { Locale } from "@/types/site";

type Props = {
  review: Review;
  locale: Locale;
};

export function ReviewCard({ review, locale }: Props) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-xl border border-border bg-background p-6">
      <p className="text-sm leading-relaxed text-foreground/90">«{review.quote[locale]}»</p>
      <p className="mt-auto text-sm font-medium text-muted-foreground">
        — {review.author[locale]}
      </p>
    </article>
  );
}
