import { createBrowserClient } from "@supabase/ssr";

// Браузерный клиент Supabase Auth — только для потока входа в админку.
// Использует publishable (anon) ключ; к данным сайта не обращается.
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
