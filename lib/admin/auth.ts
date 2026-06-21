import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/db/supabase-server";

// Требует активную сессию админа в серверном компоненте; иначе — на логин.
// Дублирует защиту middleware (proxy.ts), плюс отдаёт user для UI.
export async function requireAdminUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return user;
}
