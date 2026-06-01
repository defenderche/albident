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
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {t.rich("heading", {
                  accent: (chunks) => <span className="text-primary">{chunks}</span>,
                })}
              </h1>
              <p className="mt-5 max-w-md text-base text-muted-foreground md:text-lg">
                {t("description")}
              </p>
              <div className="mt-8">
                <Link href="/booking" className={cn(buttonVariants({ size: "lg" }))}>
                  {t("cta")}
                </Link>
              </div>
            </div>
            <div className="relative order-first md:order-last">
              <Image
                src="/hero-teeth.png"
                alt=""
                width={1536}
                height={1024}
                priority
                sizes="(max-width: 768px) 90vw, 600px"
                className="mx-auto h-auto w-full max-w-[520px] md:ml-auto"
              />
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
