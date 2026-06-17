import { redirect } from "next/navigation";
import { AdminLogoutButton } from "@/app/admin/LogoutButton";
import { createSupabaseServerClient } from "@/lib/db/supabase-server";

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Защита уже в middleware; здесь — на всякий случай и чтобы взять email.
  if (!user) redirect("/admin/login");

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Админ-панель
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Вошли как {user.email}
          </p>
        </div>
        <AdminLogoutButton />
      </div>

      <p className="mt-12 text-muted-foreground">
        Управление услугами появится здесь на следующем этапе.
      </p>
    </main>
  );
}
