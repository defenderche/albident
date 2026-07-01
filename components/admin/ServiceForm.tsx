"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type ComponentProps, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { doctors } from "@/content/doctors";
import { createService, updateService } from "@/lib/actions/admin-services";
import { cn } from "@/lib/utils";
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

// Поля админ-формы — серый фон (цвет публичного фона) на белом фоне формы.
function FieldInput(props: ComponentProps<typeof Input>) {
  return <Input {...props} className={cn("bg-background", props.className)} />;
}
function FieldTextarea(props: ComponentProps<typeof Textarea>) {
  return <Textarea {...props} className={cn("bg-background", props.className)} />;
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

  // Необязательные списки свёрнуты по умолчанию; на edit — раскрыты, если есть контент.
  const [open, setOpen] = useState({
    stages: props.mode === "edit" && props.defaultValues.stages.length > 0,
    subs: props.mode === "edit" && props.defaultValues.subProcedures.length > 0,
    faq: props.mode === "edit" && props.defaultValues.faq.length > 0,
  });

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
      router.push("/admin?saved=1");
      router.refresh();
    } else {
      setServerError(res.error);
      setSubmitting(false);
    }
  }

  // Плоские секции: разделитель сверху + отступ, без карточки-коробки.
  const card = "border-t border-border pt-6";
  const sectionTitle = "text-sm font-bold uppercase tracking-[0.04em] text-muted-foreground";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
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
        <p className={sectionTitle}>Основное</p>
        <div className="mt-4 grid gap-4">
          <div>
            <Label htmlFor="name">Название</Label>
            <FieldInput id="name" placeholder="Например: Имплантация" {...register("name")} />
            <Hint msg={errors.name?.message} />
          </div>
          <div>
            <Label htmlFor="shortDescription">Короткое описание</Label>
            <FieldTextarea
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
            <FieldTextarea id="fullDescription" rows={5} {...register("fullDescription")} />
            <Help text="Основной текст на странице услуги." />
            <Hint msg={errors.fullDescription?.message} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="priceFrom">Цена от ($)</Label>
              <FieldInput id="priceFrom" type="number" placeholder="500" {...register("priceFrom", { valueAsNumber: true })} />
              <Hint msg={errors.priceFrom?.message} />
            </div>
            <div>
              <Label htmlFor="priceTo">Цена до ($)</Label>
              <FieldInput id="priceTo" type="number" placeholder="1500" {...register("priceTo", { valueAsNumber: true })} />
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
            <FieldInput placeholder="1–2" {...register("trip.visits.value")} />
            <Hint msg={errors.trip?.visits?.value?.message} />
          </div>
          <div>
            <Label>Визиты — подпись</Label>
            <FieldInput placeholder="визита в клинику" {...register("trip.visits.caption")} />
            <Hint msg={errors.trip?.visits?.caption?.message} />
          </div>
          <div>
            <Label>Дни — число</Label>
            <FieldInput placeholder="3–5" {...register("trip.days.value")} />
            <Hint msg={errors.trip?.days?.value?.message} />
          </div>
          <div>
            <Label>Дни — подпись</Label>
            <FieldInput placeholder="дней в Стамбуле" {...register("trip.days.caption")} />
            <Hint msg={errors.trip?.days?.caption?.message} />
          </div>
        </div>
      </div>

      {/* Этапы */}
      <div className={card}>
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setOpen((o) => ({ ...o, stages: !o.stages }))}
            className="flex flex-1 items-center gap-2 text-left"
          >
            <span className={sectionTitle}>Этапы лечения ({stages.fields.length})</span>
            <span className="text-base leading-none text-muted-foreground">
              {open.stages ? "−" : "+"}
            </span>
          </button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              stages.append({ title: "", description: "" });
              setOpen((o) => ({ ...o, stages: true }));
            }}
          >
            + Этап
          </Button>
        </div>
        {open.stages && (
          <>
            <Help text="Шаги лечения по порядку, как они показаны на странице услуги. Можно не заполнять." />
            <div className="mt-2 divide-y divide-border">
              {stages.fields.map((f, i) => (
                <div key={f.id} className="grid gap-2 py-4 first:pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">Этап {i + 1}</span>
                    <button
                      type="button"
                      onClick={() => stages.remove(i)}
                      className="text-xs font-medium text-muted-foreground transition-colors hover:text-destructive"
                    >
                      Удалить
                    </button>
                  </div>
                  <FieldInput placeholder="Например: Осмотр и диагностика" {...register(`stages.${i}.title`)} />
                  <FieldTextarea placeholder="Что происходит на этом этапе" rows={2} {...register(`stages.${i}.description`)} />
                </div>
              ))}
              {stages.fields.length === 0 && (
                <p className="text-sm text-muted-foreground">Этапов нет.</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Под-процедуры */}
      <div className={card}>
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setOpen((o) => ({ ...o, subs: !o.subs }))}
            className="flex flex-1 items-center gap-2 text-left"
          >
            <span className={sectionTitle}>Под-процедуры ({subs.fields.length})</span>
            <span className="text-base leading-none text-muted-foreground">
              {open.subs ? "−" : "+"}
            </span>
          </button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              subs.append({ name: "", priceFrom: 0, priceTo: 0 });
              setOpen((o) => ({ ...o, subs: true }));
            }}
          >
            + Под-процедура
          </Button>
        </div>
        {open.subs && (
          <>
            <Help text="Отдельные процедуры внутри услуги со своими ценами. Можно не заполнять." />
            <div className="mt-2 divide-y divide-border">
              {subs.fields.map((f, i) => (
                <div key={f.id} className="grid gap-2 py-4 first:pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">Под-процедура {i + 1}</span>
                    <button
                      type="button"
                      onClick={() => subs.remove(i)}
                      className="text-xs font-medium text-muted-foreground transition-colors hover:text-destructive"
                    >
                      Удалить
                    </button>
                  </div>
                  <FieldInput placeholder="Например: Пломба световая" {...register(`subProcedures.${i}.name`)} />
                  <div className="grid grid-cols-2 gap-2">
                    <FieldInput type="number" placeholder="от $" {...register(`subProcedures.${i}.priceFrom`, { valueAsNumber: true })} />
                    <FieldInput type="number" placeholder="до $" {...register(`subProcedures.${i}.priceTo`, { valueAsNumber: true })} />
                  </div>
                </div>
              ))}
              {subs.fields.length === 0 && (
                <p className="text-sm text-muted-foreground">Под-процедур нет.</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* FAQ */}
      <div className={card}>
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setOpen((o) => ({ ...o, faq: !o.faq }))}
            className="flex flex-1 items-center gap-2 text-left"
          >
            <span className={sectionTitle}>FAQ услуги ({faq.fields.length})</span>
            <span className="text-base leading-none text-muted-foreground">
              {open.faq ? "−" : "+"}
            </span>
          </button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              faq.append({ q: "", a: "" });
              setOpen((o) => ({ ...o, faq: true }));
            }}
          >
            + Вопрос
          </Button>
        </div>
        {open.faq && (
          <>
            <Help text="Частые вопросы именно по этой услуге. Видны на странице услуги и доступны чат-ассистенту. Можно не заполнять." />
            <div className="mt-2 divide-y divide-border">
              {faq.fields.map((f, i) => (
                <div key={f.id} className="grid gap-2 py-4 first:pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">Вопрос {i + 1}</span>
                    <button
                      type="button"
                      onClick={() => faq.remove(i)}
                      className="text-xs font-medium text-muted-foreground transition-colors hover:text-destructive"
                    >
                      Удалить
                    </button>
                  </div>
                  <FieldInput placeholder="Вопрос пациента" {...register(`faq.${i}.q`)} />
                  <FieldTextarea placeholder="Ответ" rows={2} {...register(`faq.${i}.a`)} />
                </div>
              ))}
              {faq.fields.length === 0 && (
                <p className="text-sm text-muted-foreground">Вопросов нет.</p>
              )}
            </div>
          </>
        )}
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

      <div className="flex gap-3 border-t border-border pt-6">
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
