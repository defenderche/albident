import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { WhatsAppIcon } from "@/components/layout/SocialIcons";
import { site } from "@/content/site";
import type { Locale } from "@/types/site";

export async function ContactDetails() {
  const t = await getTranslations("Contacts");
  const locale = (await getLocale()) as Locale;

  const phoneHref = `tel:${site.phone.replace(/\s+/g, "")}`;
  const emailHref = `mailto:${site.email}`;

  const tileClass =
    "flex size-11 shrink-0 items-center justify-center rounded-md bg-accent text-primary";
  const labelClass =
    "text-xs font-bold uppercase tracking-[0.04em] text-muted-foreground";

  return (
    <section className="bg-card pt-10 pb-20 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          {t("details.heading")}
        </h2>
        <dl className="mt-10 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="flex gap-4">
            <span aria-hidden className={tileClass}>
              <MapPin className="size-5" />
            </span>
            <div>
              <dt className={labelClass}>{t("details.addressLabel")}</dt>
              <dd className="mt-1">
                <address className="text-base font-medium not-italic text-foreground">
                  {site.address[locale]}
                </address>
              </dd>
            </div>
          </div>

          <div className="flex gap-4">
            <span aria-hidden className={tileClass}>
              <Phone className="size-5" />
            </span>
            <div>
              <dt className={labelClass}>{t("details.phoneLabel")}</dt>
              <dd className="mt-1">
                <a
                  href={phoneHref}
                  className="text-base font-medium text-foreground hover:text-primary"
                >
                  {site.phone}
                </a>
                <div className="mt-3 flex items-center gap-2">
                  <a
                    href={phoneHref}
                    aria-label={t("details.callAria")}
                    className="inline-flex size-9 items-center justify-center rounded-sm border border-border text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Phone className="size-4" aria-hidden />
                  </a>
                  <a
                    href={site.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("details.whatsappAria")}
                    className="inline-flex size-9 items-center justify-center rounded-sm border border-border text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <WhatsAppIcon className="size-4" />
                  </a>
                </div>
              </dd>
            </div>
          </div>

          <div className="flex gap-4">
            <span aria-hidden className={tileClass}>
              <Mail className="size-5" />
            </span>
            <div>
              <dt className={labelClass}>{t("details.emailLabel")}</dt>
              <dd className="mt-1">
                <a
                  href={emailHref}
                  className="text-base font-medium text-foreground hover:text-primary"
                >
                  {site.email}
                </a>
              </dd>
            </div>
          </div>

          <div className="flex gap-4">
            <span aria-hidden className={tileClass}>
              <Clock className="size-5" />
            </span>
            <div>
              <dt className={labelClass}>{t("hours.heading")}</dt>
              <dd className="mt-1 text-base font-medium text-foreground">
                {site.hours[locale]}
              </dd>
            </div>
          </div>
        </dl>
      </div>
    </section>
  );
}
