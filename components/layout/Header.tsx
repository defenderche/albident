import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { HeaderMobile } from "./HeaderMobile";
import { LocaleSwitcher } from "./LocaleSwitcher";

const navItems = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/about", key: "about" },
  { href: "/contacts", key: "contacts" },
] as const;

export async function Header() {
  const t = await getTranslations("Nav");

  const localizedNav = navItems.map((item) => ({
    href: item.href,
    label: t(item.key),
  }));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {site.brand}
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {localizedNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LocaleSwitcher />
          <Button render={<Link href="/booking">{t("bookingCta")}</Link>} />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LocaleSwitcher />
          <HeaderMobile
            navItems={localizedNav}
            brand={site.brand}
            bookingCta={t("bookingCta")}
            openMenuLabel={t("openMenu")}
          />
        </div>
      </div>
    </header>
  );
}
