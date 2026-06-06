import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { HeaderMobile } from "./HeaderMobile";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { NavLinks } from "./NavLinks";

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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3.5 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-extrabold tracking-tight"
        >
          <span
            aria-hidden
            className="size-6 rounded-sm bg-gradient-to-br from-primary to-[#5286ff]"
          />
          {site.brand}
        </Link>

        <NavLinks items={localizedNav} />

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
