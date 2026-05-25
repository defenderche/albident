import { getLocale, getTranslations } from "next-intl/server";
import { ReviewCard } from "@/components/sections/ReviewCard";
import { reviews } from "@/content/reviews";
import type { Locale } from "@/types/site";

export async function AboutReviews() {
  const t = await getTranslations("About.reviews");
  const locale = (await getLocale()) as Locale;

  return (
    <section className="border-t border-border bg-muted/20 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{t("heading")}</h2>
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, idx) => (
            <li key={idx}>
              <ReviewCard review={review} locale={locale} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
