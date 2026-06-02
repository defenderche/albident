import { Phone } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { WhatsAppIcon } from "@/components/layout/SocialIcons";
import { site } from "@/content/site";
import type { Locale } from "@/types/site";

export async function ContactDetails() {
  const t = await getTranslations("Contacts.details");
  const locale = (await getLocale()) as Locale;

  const phoneHref = `tel:${site.phone.replace(/\s+/g, "")}`;
  const emailHref = `mailto:${site.email}`;

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{t("heading")}</h2>
        <div className="max-w-3xl">
          <dl className="mt-10 divide-y divide-border/60">
            <div className="grid grid-cols-1 py-6 first:pt-0 sm:grid-cols-[1fr_2fr] sm:gap-x-6">
              <dt className="text-base font-semibold text-foreground sm:text-lg">
                {t("addressLabel")}
              </dt>
              <dd className="mt-2 sm:col-start-2 sm:mt-0">
                <address className="not-italic text-sm leading-relaxed text-foreground/90">
                  {site.address[locale]}
                </address>
              </dd>
            </div>
            <div className="grid grid-cols-1 py-6 sm:grid-cols-[1fr_2fr] sm:gap-x-6">
              <dt className="text-base font-semibold text-foreground sm:text-lg">
                {t("phoneLabel")}
              </dt>
              <dd className="mt-2 flex flex-wrap items-center gap-3 sm:col-start-2 sm:mt-0">
                <a
                  href={phoneHref}
                  className="text-sm font-medium text-foreground hover:text-foreground/70"
                >
                  {site.phone}
                </a>
                <span className="flex items-center gap-2">
                  <a
                    href={phoneHref}
                    aria-label={t("callAria")}
                    className="inline-flex size-8 items-center justify-center rounded-sm border border-border text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Phone className="size-4" aria-hidden />
                  </a>
                  <a
                    href={site.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("whatsappAria")}
                    className="inline-flex size-8 items-center justify-center rounded-sm border border-border text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <WhatsAppIcon className="size-4" />
                  </a>
                </span>
              </dd>
            </div>
            <div className="grid grid-cols-1 py-6 sm:grid-cols-[1fr_2fr] sm:gap-x-6">
              <dt className="text-base font-semibold text-foreground sm:text-lg">
                {t("emailLabel")}
              </dt>
              <dd className="mt-2 sm:col-start-2 sm:mt-0">
                <a
                  href={emailHref}
                  className="text-sm font-medium text-foreground hover:text-foreground/70"
                >
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
