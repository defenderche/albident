import { Link } from "@/i18n/navigation";

type Props = {
  heading: string;
  cta: string;
  href?: string;
};

export function FinalCta({ heading, cta, href = "/booking" }: Props) {
  return (
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1f54e0] to-primary px-8 py-14 text-center md:px-12">
          <h2 className="mx-auto max-w-xl text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            {heading}
          </h2>
          <div className="mt-8 flex justify-center">
            <Link
              href={href}
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-base font-semibold text-primary transition-colors hover:bg-[#eef3ff]"
            >
              {cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
