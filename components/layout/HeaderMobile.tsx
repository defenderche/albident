"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { isActivePath } from "@/lib/utils/isActivePath";

type NavItem = { href: "/" | "/services" | "/about" | "/contacts"; label: string };

type Props = {
  navItems: NavItem[];
  brand: string;
  bookingCta: string;
  openMenuLabel: string;
};

export function HeaderMobile({ navItems, brand, bookingCta, openMenuLabel }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label={openMenuLabel}>
            <Menu className="size-5" aria-hidden />
          </Button>
        }
      />
      <SheetContent side="right" className="flex flex-col gap-6 p-6">
        <SheetTitle className="sr-only">{brand}</SheetTitle>
        <SheetDescription className="sr-only">{openMenuLabel}</SheetDescription>

        <Link
          href="/booking"
          onClick={() => setOpen(false)}
          className={cn(buttonVariants({ size: "lg" }), "w-full justify-center text-base")}
        >
          {bookingCta}
        </Link>

        <nav className="flex flex-col gap-1 text-base">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-2 py-2 transition-colors hover:bg-muted",
                  active ? "bg-muted font-semibold text-primary" : "text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
