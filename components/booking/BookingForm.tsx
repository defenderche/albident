"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  useFormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { services } from "@/content/services";
import { Link } from "@/i18n/navigation";
import { submitBooking } from "@/lib/actions/booking";
import { cn } from "@/lib/utils/index";
import {
  bookingSchema,
  type BookingInput,
  type BookingService,
} from "@/lib/validation/booking";
import type { Locale } from "@/types/site";

type Props = {
  defaultService?: BookingService;
  locale: string;
};

type Status = "idle" | "submitting" | "error";

const KNOWN_ERROR_KEYS = [
  "nameTooShort",
  "phoneRequired",
  "phoneInvalid",
  "phoneTooShort",
  "consentRequired",
] as const;

type KnownErrorKey = (typeof KNOWN_ERROR_KEYS)[number];

function isKnownErrorKey(key: string): key is KnownErrorKey {
  return (KNOWN_ERROR_KEYS as readonly string[]).includes(key);
}

function LocalizedMessage() {
  const { error, formMessageId } = useFormField();
  const t = useTranslations("Booking.errors");
  if (!error?.message) return null;
  const key = String(error.message);
  const body = isKnownErrorKey(key) ? t(key) : t("unknown");
  return (
    <p id={formMessageId} className="text-sm text-destructive">
      {body}
    </p>
  );
}

export function BookingForm({ defaultService, locale }: Props) {
  const t = useTranslations("Booking");
  const [status, setStatus] = useState<Status>("idle");
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      city: "",
      service: defaultService ?? "",
      preferredTime: "",
      comment: "",
      consent: false,
      locale: locale as Locale,
    },
  });

  async function onSubmit(values: BookingInput) {
    setStatus("submitting");
    const result = await submitBooking(values);
    if ("error" in result) {
      setStatus("error");
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-lg border border-border bg-muted/40 p-6 text-base leading-relaxed"
      >
        {t("states.success")}
      </div>
    );
  }

  const localizedServices = services.map((s) => ({
    slug: s.slug,
    label: s.name[locale as Locale],
  }));

  return (
    <Form {...form}>
      {status === "error" && (
        <div
          role="alert"
          className="mb-6 rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive"
        >
          {t("states.error")}
        </div>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6" noValidate>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("fields.name")} <span aria-hidden>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  autoComplete="name"
                  aria-required
                  placeholder={t("placeholders.name")}
                  {...field}
                />
              </FormControl>
              <LocalizedMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("fields.phone")} <span aria-hidden>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  aria-required
                  placeholder={t("placeholders.phone")}
                  {...field}
                />
              </FormControl>
              <LocalizedMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fields.city")}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  autoComplete="address-level2"
                  placeholder={t("placeholders.city")}
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <LocalizedMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fields.service")}</FormLabel>
              <Select
                value={field.value || ""}
                onValueChange={(v) => field.onChange(v)}
              >
                <SelectTrigger className="w-full justify-between">
                  <SelectValue>
                    {(value) => {
                      if (!value) {
                        return (
                          <span className="text-muted-foreground">
                            {t("placeholders.service")}
                          </span>
                        );
                      }
                      if (value === "other") return t("services.other");
                      return (
                        localizedServices.find((s) => s.slug === value)?.label ?? null
                      );
                    }}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {localizedServices.map((s) => (
                    <SelectItem key={s.slug} value={s.slug}>
                      {s.label}
                    </SelectItem>
                  ))}
                  <SelectItem value="other">{t("services.other")}</SelectItem>
                </SelectContent>
              </Select>
              <LocalizedMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preferredTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fields.preferredTime")}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={t("placeholders.preferredTime")}
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <LocalizedMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fields.comment")}</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder={t("placeholders.comment")}
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <LocalizedMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent"
          render={({ field, fieldState }) => {
            const consentId = "booking-consent";
            return (
              <FormItem>
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={consentId}
                    checked={field.value === true}
                    onCheckedChange={(checked) => field.onChange(checked === true)}
                    aria-required
                    aria-invalid={!!fieldState.error}
                  />
                  <Label htmlFor={consentId} className={cn("text-sm leading-snug")}>
                    {t.rich("consent", {
                      link: (chunks) => (
                        <Link href="/privacy" className="underline">
                          {chunks}
                        </Link>
                      ),
                    })}
                  </Label>
                </div>
                <LocalizedMessage />
              </FormItem>
            );
          }}
        />

        <Button
          type="submit"
          disabled={status === "submitting"}
          className="w-full sm:w-auto"
        >
          {status === "submitting" ? t("submitting") : t("submit")}
        </Button>
      </form>
    </Form>
  );
}
