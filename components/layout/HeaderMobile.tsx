"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation";

type NavItem = { href: "/" | "/services" | "/about" | "/contacts"; label: string };

type Props = {
  navItems: NavItem[];
  brand: string;
  bookingCta: string;
  openMenuLabel: string;
};

export function HeaderMobile({ navItems, brand, bookingCta, openMenuLabel }: Props) {
  const [open, setOpen] = useState(false);

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

        <Button
          size="lg"
          className="w-full justify-center text-base"
          render={
            <Link href="/booking" onClick={() => setOpen(false)}>
              {bookingCta}
            </Link>
          }
        />

        <nav className="flex flex-col gap-1 text-base">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-foreground transition-colors hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
