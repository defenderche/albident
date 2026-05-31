import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
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
    <header className="sticky top-0 z-50 w-full px-4 pt-4 md:px-6">
      <div className="mx-auto flex max-w-6xl items-center gap-6 rounded-full border border-border bg-card py-2.5 pr-2.5 pl-6 shadow-soft">
        <Link href="/" className="text-lg font-extrabold tracking-tight">
          {site.brand}
        </Link>

        <nav className="mx-auto hidden items-center gap-7 text-[15px] font-semibold md:flex">
          {localizedNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground/70 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LocaleSwitcher />
          <Link href="/booking" className={cn(buttonVariants())}>
            {t("bookingCta")}
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2 md:hidden">
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
