import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const stats = [
  { value: "12+", key: "stats.experienceLabel" },
  { value: "5", key: "stats.doctorsLabel" },
  { value: "8", key: "stats.areasLabel" },
  { value: "3", key: "stats.languagesLabel" },
] as const;

export async function Hero() {
  const t = await getTranslations("Home.hero");
  return (
    <section className="px-4 pt-8 md:px-6 md:pt-12">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-card md:p-12">
          {/* Mobile order via `order-*`: heading → description → image → button.
              Desktop: text column (heading/description/button) left, image right. */}
          <div className="grid gap-6 md:grid-cols-2 md:items-center md:gap-x-10">
            <h1 className="order-1 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:col-start-1 md:row-start-1 md:text-6xl">
              {t.rich("heading", {
                accent: (chunks) => <span className="text-primary">{chunks}</span>,
              })}
            </h1>
            <p className="order-2 max-w-md text-base text-muted-foreground md:col-start-1 md:row-start-2 md:text-lg">
              {t("description")}
            </p>
            <div className="order-3 md:col-start-2 md:row-start-1 md:row-span-3 md:self-center">
              <Image
                src="/hero-teeth.webp"
                alt=""
                width={1200}
                height={800}
                priority
                sizes="(max-width: 768px) 90vw, 600px"
                className="animate-float mx-auto h-auto w-full max-w-[520px] md:ml-auto"
              />
            </div>
            <div className="order-4 md:col-start-1 md:row-start-3">
              <Link href="/booking" className={cn(buttonVariants({ size: "lg" }))}>
                {t("cta")}
              </Link>
            </div>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.key}>
                <dt className="text-3xl font-extrabold text-foreground md:text-4xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">{t(s.key)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
