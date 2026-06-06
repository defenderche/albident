import { getLocale, getTranslations } from "next-intl/server";
import { ReviewCard } from "@/components/sections/ReviewCard";
import { reviews } from "@/content/reviews";
import type { Locale } from "@/types/site";

export async function HomeReviews() {
  const t = await getTranslations("Home.reviews");
  const locale = (await getLocale()) as Locale;
  const featured = reviews.slice(0, 3);

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.04em] text-primary">
          {t("kicker")}
        </p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
          {t("heading")}
        </h2>
        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featured.map((review, idx) => (
            <li key={idx}>
              <ReviewCard review={review} locale={locale} roleLabel={t("role")} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
