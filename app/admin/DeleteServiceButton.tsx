"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { deleteService } from "@/lib/actions/admin-services";

export function DeleteServiceButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();

  function onDelete() {
    if (!window.confirm(`Удалить услугу «${name}»? Действие необратимо.`)) return;
    start(async () => {
      const res = await deleteService(id);
      if (res.ok) router.refresh();
      else window.alert("Не удалось удалить услугу.");
    });
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={onDelete}
      disabled={pending}
    >
      {pending ? "…" : "Удалить"}
    </Button>
  );
}
