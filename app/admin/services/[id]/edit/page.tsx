import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { requireAdminUser } from "@/lib/admin/auth";
import { getServiceById } from "@/lib/services";
import { serviceToFormValues } from "@/lib/services/admin-fields";

type Props = { params: Promise<{ id: string }> };

export default async function EditServicePage({ params }: Props) {
  await requireAdminUser();

  const { id } = await params;
  const service = await getServiceById(id);
  if (!service) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <Link href="/admin" className="text-sm text-primary hover:underline">
        ← К списку услуг
      </Link>
      <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground">
        Редактирование: {service.name.ru}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Адрес: /services/{service.slug} (slug не меняется)
      </p>
      <div className="mt-8">
        <ServiceForm
          mode="edit"
          serviceId={service.id}
          defaultValues={serviceToFormValues(service)}
        />
      </div>
    </main>
  );
}
