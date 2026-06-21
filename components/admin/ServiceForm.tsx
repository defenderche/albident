"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { doctors } from "@/content/doctors";
import { createService, updateService } from "@/lib/actions/admin-services";
import {
  serviceFormSchema,
  type ServiceFormValues,
} from "@/lib/validation/service";

type Props =
  | { mode: "create" }
  | { mode: "edit"; serviceId: string; defaultValues: ServiceFormValues };

const EMPTY: ServiceFormValues = {
  name: "",
  shortDescription: "",
  fullDescription: "",
  priceFrom: 0,
  priceTo: 0,
  showOnHome: false,
  trip: {
    visits: { value: "", caption: "" },
    days: { value: "", caption: "" },
  },
  stages: [],
  subProcedures: [],
  faq: [],
  relatedDoctors: [],
};

const ERROR_TEXT: Record<string, string> = {
  required: "Обязательное поле",
  priceInvalid: "Неверная цена",
  priceRange: "«от» не может быть больше «до»",
};

function Hint({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-destructive">{ERROR_TEXT[msg] ?? msg}</p>;
}

function Help({ text }: { text: string }) {
  return <p className="mt-1 text-xs text-muted-foreground">{text}</p>;
}

export function ServiceForm(props: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: props.mode === "edit" ? props.defaultValues : EMPTY,
  });
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const stages = useFieldArray({ control, name: "stages" });
  const subs = useFieldArray({ control, name: "subProcedures" });
  const faq = useFieldArray({ control, name: "faq" });

  const selected = useWatch({ control, name: "relatedDoctors" });
  const showOnHome = useWatch({ control, name: "showOnHome" });

  function toggleDoctor(slug: string, checked: boolean) {
    const cur = form.getValues("relatedDoctors");
    setValue(
      "relatedDoctors",
      checked ? [...cur, slug] : cur.filter((s) => s !== slug),
      { shouldDirty: true },
    );
  }

  async function onSubmit(values: ServiceFormValues) {
    setSubmitting(true);
    setServerError(null);
    const res =
      props.mode === "create"
        ? await createService(values)
        : await updateService(props.serviceId, values);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setServerError(res.error);
      setSubmitting(false);
    }
  }

  const card = "rounded-lg border border-border bg-card p-5 shadow-soft";
  const sectionTitle = "text-sm font-bold uppercase tracking-[0.04em] text-muted-foreground";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      <div className="rounded-md border border-accent-foreground/20 bg-accent/60 p-3 text-sm text-foreground">
        Заполняйте всё <strong>по-русски</strong>. Английскую и турецкую версии
        система переведёт сама при сохранении — на это уйдёт пара секунд.
      </div>

      {serverError && (
        <p
          role="alert"
          className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive"
        >
          Не удалось сохранить ({serverError}). Попробуйте ещё раз.
        </p>
      )}

      {/* Основное */}
      <div className={card}>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="name">Название</Label>
            <Input id="name" placeholder="Например: Имплантация" {...register("name")} />
            <Hint msg={errors.name?.message} />
          </div>
          <div>
            <Label htmlFor="shortDescription">Короткое описание</Label>
            <Textarea
              id="shortDescription"
              rows={2}
              placeholder="Одна-две фразы для карточки"
              {...register("shortDescription")}
            />
            <Help text="Показывается на карточке услуги в списке и на главной." />
            <Hint msg={errors.shortDescription?.message} />
          </div>
          <div>
            <Label htmlFor="fullDescription">Полное описание</Label>
            <Textarea id="fullDescription" rows={5} {...register("fullDescription")} />
            <Help text="Основной текст на странице услуги." />
            <Hint msg={errors.fullDescription?.message} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="priceFrom">Цена от ($)</Label>
              <Input id="priceFrom" type="number" placeholder="500" {...register("priceFrom", { valueAsNumber: true })} />
              <Hint msg={errors.priceFrom?.message} />
            </div>
            <div>
              <Label htmlFor="priceTo">Цена до ($)</Label>
              <Input id="priceTo" type="number" placeholder="1500" {...register("priceTo", { valueAsNumber: true })} />
              <Hint msg={errors.priceTo?.message} />
            </div>
          </div>
          <Help text="Цены в долларах. Показываются как диапазон «от — до»." />
          <div>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={showOnHome}
                onCheckedChange={(v) => setValue("showOnHome", v === true)}
              />
              Показывать на главной
            </label>
            <Help text="Витрина на главной показывает до 5 отмеченных услуг." />
          </div>
        </div>
      </div>

      {/* Логистика поездки */}
      <div className={card}>
        <p className={sectionTitle}>Логистика поездки</p>
        <Help text="Сколько визитов и дней в Стамбуле займёт лечение — важно для дентал-туристов. Показывается на странице услуги." />
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <Label>Визиты — число</Label>
            <Input placeholder="1–2" {...register("trip.visits.value")} />
            <Hint msg={errors.trip?.visits?.value?.message} />
          </div>
          <div>
            <Label>Визиты — подпись</Label>
            <Input placeholder="визита в клинику" {...register("trip.visits.caption")} />
            <Hint msg={errors.trip?.visits?.caption?.message} />
          </div>
          <div>
            <Label>Дни — число</Label>
            <Input placeholder="3–5" {...register("trip.days.value")} />
            <Hint msg={errors.trip?.days?.value?.message} />
          </div>
          <div>
            <Label>Дни — подпись</Label>
            <Input placeholder="дней в Стамбуле" {...register("trip.days.caption")} />
            <Hint msg={errors.trip?.days?.caption?.message} />
          </div>
        </div>
      </div>

      {/* Этапы */}
      <div className={card}>
        <div className="flex items-center justify-between">
          <p className={sectionTitle}>Этапы лечения</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => stages.append({ title: "", description: "" })}
          >
            + Этап
          </Button>
        </div>
        <Help text="Шаги лечения по порядку, как они показаны на странице услуги. Можно не заполнять." />
        <div className="mt-4 grid gap-4">
          {stages.fields.map((f, i) => (
            <div key={f.id} className="grid gap-2 rounded-md border border-border p-3">
              <Input placeholder="Например: Осмотр и диагностика" {...register(`stages.${i}.title`)} />
              <Textarea placeholder="Что происходит на этом этапе" rows={2} {...register(`stages.${i}.description`)} />
              <Button type="button" variant="ghost" size="sm" onClick={() => stages.remove(i)}>
                Удалить этап
              </Button>
            </div>
          ))}
          {stages.fields.length === 0 && (
            <p className="text-sm text-muted-foreground">Этапов нет.</p>
          )}
        </div>
      </div>

      {/* Под-процедуры */}
      <div className={card}>
        <div className="flex items-center justify-between">
          <p className={sectionTitle}>Под-процедуры</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => subs.append({ name: "", priceFrom: 0, priceTo: 0 })}
          >
            + Под-процедура
          </Button>
        </div>
        <Help text="Отдельные процедуры внутри услуги со своими ценами. Можно не заполнять." />
        <div className="mt-4 grid gap-4">
          {subs.fields.map((f, i) => (
            <div key={f.id} className="grid gap-2 rounded-md border border-border p-3">
              <Input placeholder="Например: Пломба световая" {...register(`subProcedures.${i}.name`)} />
              <div className="grid grid-cols-2 gap-2">
                <Input type="number" placeholder="от $" {...register(`subProcedures.${i}.priceFrom`, { valueAsNumber: true })} />
                <Input type="number" placeholder="до $" {...register(`subProcedures.${i}.priceTo`, { valueAsNumber: true })} />
              </div>
              <Button type="button" variant="ghost" size="sm" onClick={() => subs.remove(i)}>
                Удалить
              </Button>
            </div>
          ))}
          {subs.fields.length === 0 && (
            <p className="text-sm text-muted-foreground">Под-процедур нет.</p>
          )}
        </div>
      </div>

      {/* FAQ */}
      <div className={card}>
        <div className="flex items-center justify-between">
          <p className={sectionTitle}>FAQ услуги</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => faq.append({ q: "", a: "" })}
          >
            + Вопрос
          </Button>
        </div>
        <Help text="Частые вопросы именно по этой услуге. Видны на странице услуги и доступны чат-ассистенту. Можно не заполнять." />
        <div className="mt-4 grid gap-4">
          {faq.fields.map((f, i) => (
            <div key={f.id} className="grid gap-2 rounded-md border border-border p-3">
              <Input placeholder="Вопрос пациента" {...register(`faq.${i}.q`)} />
              <Textarea placeholder="Ответ" rows={2} {...register(`faq.${i}.a`)} />
              <Button type="button" variant="ghost" size="sm" onClick={() => faq.remove(i)}>
                Удалить
              </Button>
            </div>
          ))}
          {faq.fields.length === 0 && (
            <p className="text-sm text-muted-foreground">Вопросов нет.</p>
          )}
        </div>
      </div>

      {/* Связанные врачи */}
      <div className={card}>
        <p className={sectionTitle}>Связанные врачи</p>
        <Help text="Врачи, которые ведут эту услугу. Их карточки покажутся на странице услуги." />
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {doctors.map((d) => (
            <label key={d.slug} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={selected.includes(d.slug)}
                onCheckedChange={(v) => toggleDoctor(d.slug, v === true)}
              />
              {d.name.ru}
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? "Сохранение…" : "Сохранить"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => router.push("/admin")}
        >
          Отмена
        </Button>
      </div>
    </form>
  );
}
