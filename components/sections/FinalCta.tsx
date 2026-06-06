import { Link } from "@/i18n/navigation";

type Props = {
  heading: string;
  subtitle?: string;
  cta: string;
  href?: string;
};

export function FinalCta({ heading, subtitle, cta, href = "/booking" }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1f54e0] to-primary py-20 text-center md:py-24">
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="mx-auto max-w-xl text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          {heading}
        </h2>
        {subtitle ? (
          <p className="mx-auto mt-4 max-w-md text-white/85">{subtitle}</p>
        ) : null}
        <div className="mt-8 flex justify-center">
          <Link
            href={href}
            className="inline-flex h-12 items-center justify-center rounded-sm bg-white px-7 text-base font-semibold text-primary transition-colors hover:bg-[#eef3ff]"
          >
            {cta}
          </Link>
        </div>
      </div>
      {/* Decorative tooth, same motif as the hero visual */}
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="currentColor"
        className="pointer-events-none absolute -right-10 -bottom-14 w-72 text-white/10"
      >
        <path d="M12 2c-2 0-3 1.5-5 1.5S4 2.5 3 4c-1.2 1.8-.6 5 .4 8.5C4.5 16.5 5.5 22 7.3 22c1.5 0 1.4-3 2.7-3s1.2 3 2.7 3c1.8 0 2.8-5.5 3.9-9.5 1-3.5 1.6-6.7.4-8.5-1-1.5-2-.5-4-.5S14 2 12 2z" />
      </svg>
    </section>
  );
}
