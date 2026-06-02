import { getLocale, getTranslations } from "next-intl/server";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/types/site";
import { InstagramIcon, TelegramIcon, WhatsAppIcon } from "./SocialIcons";

const menuItems = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/about", key: "about" },
  { href: "/contacts", key: "contacts" },
] as const;

export async function Footer() {
  const [t, tNav, locale] = await Promise.all([
    getTranslations("Footer"),
    getTranslations("Nav"),
    getLocale(),
  ]);

  const year = new Date().getFullYear();
  const currentLocale = locale as Locale;

  const socials = [
    { href: site.social.instagram, label: t("socialAlt.instagram"), Icon: InstagramIcon },
    { href: site.social.whatsapp, label: t("socialAlt.whatsapp"), Icon: WhatsAppIcon },
    { href: site.social.telegram, label: t("socialAlt.telegram"), Icon: TelegramIcon },
  ];

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <section className="space-y-2 text-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("contacts")}
            </h3>
            <address className="not-italic text-foreground/90">
              {site.address[currentLocale]}
            </address>
            <p>
              <a
                href={`tel:${site.phone.replace(/\s+/g, "")}`}
                className="text-foreground/90 hover:text-foreground"
              >
                {site.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${site.email}`}
                className="text-foreground/90 hover:text-foreground"
              >
                {site.email}
              </a>
            </p>
          </section>

          <section className="space-y-2 text-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("hours")}
            </h3>
            <p className="text-foreground/90">{site.hours[currentLocale]}</p>
          </section>

          <section className="space-y-2 text-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("menu")}
            </h3>
            <ul className="space-y-1.5">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-foreground/90 hover:text-foreground"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/booking"
                  className="text-foreground/90 hover:text-foreground"
                >
                  {t("bookingMenuItem")}
                </Link>
              </li>
            </ul>
          </section>

          <section className="space-y-2 text-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("social")}
            </h3>
            <ul className="flex items-center gap-3">
              {socials.map(({ href, label, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex size-9 items-center justify-center rounded-sm border border-border text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <Link href="/privacy" className="hover:text-foreground">
            {t("privacy")}
          </Link>
          <p>{t("copyright", { year })}</p>
        </div>
      </div>
    </footer>
  );
}
