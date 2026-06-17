import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Серверный клиент Supabase Auth (cookie-сессии) — для проверки сессии в
// серверных компонентах админки. Только авторизация, не доступ к данным сайта.
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Вызов из Server Component — запись кук игнорируется,
            // сессию обновляет middleware (proxy.ts).
          }
        },
      },
    },
  );
}
