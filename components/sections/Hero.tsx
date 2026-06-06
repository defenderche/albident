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
    <section className="overflow-hidden bg-card">
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-14 md:px-6 md:pt-16 md:pb-16">
        {/* Mobile order via `order-*`: heading → description → image → button.
            Desktop: text column (heading/description/button) left, image right. */}
        <div className="grid gap-6 md:grid-cols-2 md:items-center md:gap-x-10">
          <h1 className="order-1 text-4xl font-extrabold leading-[1.03] tracking-tight text-foreground sm:text-5xl md:col-start-1 md:row-start-1 md:text-6xl lg:text-[64px]">
            {t.rich("heading", {
              accent: (chunks) => <span className="text-primary">{chunks}</span>,
            })}
          </h1>
          <p className="order-2 max-w-md text-base text-muted-foreground md:col-start-1 md:row-start-2 md:text-lg">
            {t("description")}
          </p>
          <div className="relative order-3 flex justify-center md:col-start-2 md:row-start-1 md:row-span-3 md:self-center">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 scale-125"
              style={{
                background:
                  "radial-gradient(55% 55% at 60% 42%, var(--accent), transparent 72%)",
              }}
            />
            <Image
              src="/hero-tooth.webp"
              alt=""
              width={518}
              height={814}
              priority
              sizes="260px"
              className="animate-float h-auto w-full max-w-[260px] drop-shadow-[0_24px_40px_rgba(47,107,255,0.18)] md:ml-auto"
            />
          </div>
          <div className="order-4 md:col-start-1 md:row-start-3">
            <Link href="/booking" className={cn(buttonVariants({ size: "lg" }))}>
              {t("cta")}
            </Link>
          </div>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
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
    </section>
  );
}
