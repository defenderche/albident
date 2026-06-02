"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { isActivePath } from "@/lib/utils/isActivePath";

type NavItem = { href: "/" | "/services" | "/about" | "/contacts"; label: string };

export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="mx-auto hidden items-center gap-7 text-[15px] font-semibold md:flex">
      {items.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "transition-colors hover:text-primary",
              active ? "text-primary" : "text-foreground/70",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
