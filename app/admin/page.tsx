import Link from "next/link";
import { DeleteServiceButton } from "@/app/admin/DeleteServiceButton";
import { AdminLogoutButton } from "@/app/admin/LogoutButton";
import { buttonVariants } from "@/components/ui/button";
import { requireAdminUser } from "@/lib/admin/auth";
import { getServices } from "@/lib/services";
import { cn } from "@/lib/utils";

type Props = { searchParams: Promise<{ saved?: string }> };

export default async function AdminPage({ searchParams }: Props) {
  const user = await requireAdminUser();
  const services = await getServices();
  const { saved } = await searchParams;
  const homeCount = services.filter((s) => s.showOnHome).length;

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 md:px-6">
      {saved && (
        <p className="mb-6 rounded-md border border-primary/30 bg-accent/60 p-3 text-sm font-medium text-primary">
          Сохранено ✓
        </p>
      )}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Услуги
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Вошли как {user.email} · на главной: {Math.min(homeCount, 5)} из 5
            {homeCount > 5 && " (показываются первые 5 по порядку)"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/services/new"
            className={cn(buttonVariants({ size: "sm" }))}
          >
            Добавить услугу
          </Link>
          <AdminLogoutButton />
        </div>
      </header>

      <ul className="mt-8 divide-y divide-border rounded-lg border border-border bg-card">
        {services.map((s) => (
          <li
            key={s.id}
            className="flex flex-wrap items-center justify-between gap-3 p-4"
          >
            <div className="min-w-0">
              <p className="font-semibold text-foreground">
                {s.name.ru}
                {s.showOnHome && (
                  <span className="ml-2 rounded-sm bg-accent px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.04em] text-primary">
                    на главной
                  </span>
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                /{s.slug} · ${s.priceFrom}–${s.priceTo}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/services/${s.id}/edit`}
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              >
                Редактировать
              </Link>
              <DeleteServiceButton id={s.id} name={s.name.ru} />
            </div>
          </li>
        ))}
        {services.length === 0 && (
          <li className="p-4 text-sm text-muted-foreground">Услуг пока нет.</li>
        )}
      </ul>
    </main>
  );
}
