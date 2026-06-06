import { getLocale, getTranslations } from "next-intl/server";
import { ReviewCard } from "@/components/sections/ReviewCard";
import { reviews } from "@/content/reviews";
import type { Locale } from "@/types/site";

export async function AboutReviews() {
  const t = await getTranslations("About.reviews");
  const locale = (await getLocale()) as Locale;

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{t("heading")}</h2>
        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, idx) => (
            <li key={idx}>
              <ReviewCard review={review} locale={locale} roleLabel={t("role")} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
