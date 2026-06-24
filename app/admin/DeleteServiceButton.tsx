"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { deleteService } from "@/lib/actions/admin-services";

export function DeleteServiceButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [pending, start] = useTransition();

  function doDelete() {
    start(async () => {
      const res = await deleteService(id);
      if (res.ok) {
        router.refresh();
      } else {
        window.alert("Не удалось удалить услугу.");
        setConfirming(false);
      }
    });
  }

  if (confirming) {
    return (
      <span className="flex items-center gap-2 text-sm text-muted-foreground">
        Удалить «{name}»?
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={doDelete}
          disabled={pending}
        >
          {pending ? "Удаление…" : "Да"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setConfirming(false)}
          disabled={pending}
        >
          Отмена
        </Button>
      </span>
    );
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => setConfirming(true)}
    >
      Удалить
    </Button>
  );
}
