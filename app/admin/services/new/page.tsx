import Link from "next/link";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { requireAdminUser } from "@/lib/admin/auth";

export default async function NewServicePage() {
  await requireAdminUser();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <Link href="/admin" className="text-sm text-primary hover:underline">
        ← К списку услуг
      </Link>
      <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground">
        Новая услуга
      </h1>
      <div className="mt-8">
        <ServiceForm mode="create" />
      </div>
    </main>
  );
}
