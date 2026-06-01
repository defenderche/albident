import { Link } from "@/i18n/navigation";

type Props = {
  heading: string;
  subtitle?: string;
  cta: string;
  href?: string;
};

export function FinalCta({ heading, subtitle, cta, href = "/booking" }: Props) {
  return (
    <section className="px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1f54e0] to-primary px-8 py-12 text-center md:px-12 md:py-14">
          <h2 className="relative mx-auto max-w-xl text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            {heading}
          </h2>
          {subtitle ? (
            <p className="relative mx-auto mt-4 max-w-md text-white/85">{subtitle}</p>
          ) : null}
          <div className="relative mt-8 flex justify-center">
            <Link
              href={href}
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-base font-semibold text-primary transition-colors hover:bg-[#eef3ff]"
            >
              {cta}
            </Link>
          </div>
          {/* Decorative tooth, same motif as the hero visual */}
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="currentColor"
            className="pointer-events-none absolute -right-6 -bottom-8 w-44 text-white/10"
          >
            <path d="M12 2c-2 0-3 1.5-5 1.5S4 2.5 3 4c-1.2 1.8-.6 5 .4 8.5C4.5 16.5 5.5 22 7.3 22c1.5 0 1.4-3 2.7-3s1.2 3 2.7 3c1.8 0 2.8-5.5 3.9-9.5 1-3.5 1.6-6.7.4-8.5-1-1.5-2-.5-4-.5S14 2 12 2z" />
          </svg>
        </div>
      </div>
    </section>
  );
}
