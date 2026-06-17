"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/db/supabase-browser";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(false);

    const supabase = createSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(true);
      setSubmitting(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-soft"
      >
        <h1 className="text-xl font-bold text-foreground">Albident — вход</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Панель управления услугами
        </p>

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive"
          >
            Неправильный email или пароль
          </p>
        )}

        <div className="mt-6 grid gap-4">
          <label className="grid gap-1.5 text-sm font-medium text-foreground">
            Email
            <Input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="grid gap-1.5 text-sm font-medium text-foreground">
            Пароль
            <Input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <Button type="submit" size="lg" disabled={submitting}>
            {submitting ? "Вход…" : "Войти"}
          </Button>
        </div>
      </form>
    </main>
  );
}
