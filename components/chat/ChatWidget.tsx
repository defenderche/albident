"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChatButton } from "@/components/chat/ChatButton";
import { ChatPanel } from "@/components/chat/ChatPanel";
import type { ServiceMenuItem } from "@/lib/services";
import { cn } from "@/lib/utils/index";

const BOOKING_PATH_PATTERN = /^\/[a-z]{2}\/booking\/?$/;

type Props = {
  services: ServiceMenuItem[];
};

export function ChatWidget({ services }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isBookingPage = BOOKING_PATH_PATTERN.test(pathname ?? "");
  // On mobile booking page the widget is hidden so it doesn't cover the form.
  const hiddenClass = isBookingPage ? "hidden md:block" : undefined;

  return (
    <div className={cn(hiddenClass)}>
      {open ? (
        <ChatPanel onClose={() => setOpen(false)} services={services} />
      ) : (
        <ChatButton onClick={() => setOpen(true)} />
      )}
    </div>
  );
}
