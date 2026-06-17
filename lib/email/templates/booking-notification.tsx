import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Section,
  Text,
} from "@react-email/components";
import type { Locale } from "@/types/site";

export type BookingEmailData = {
  name: string;
  phone: string;
  city: string | null;
  service: string | null;
  preferredTime: string | null;
  comment: string | null;
  locale: Locale;
  submittedAt: Date;
};

export function BookingNotificationEmail(props: BookingEmailData) {
  const rows: Array<[string, string]> = [
    ["Имя", props.name],
    ["Телефон / WhatsApp", props.phone],
    ["Город / страна", props.city ?? "—"],
    ["Услуга", props.service ?? "—"],
    ["Удобное время", props.preferredTime ?? "—"],
    ["Комментарий", props.comment ?? "—"],
    ["Язык сайта", props.locale.toUpperCase()],
    ["Время заявки", formatSubmittedAt(props.submittedAt)],
  ];

  return (
    <Html lang="ru">
      <Head />
      <Body
        style={{
          fontFamily: "Helvetica, Arial, sans-serif",
          backgroundColor: "#f6f6f6",
          margin: 0,
          padding: "24px 0",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "24px",
            maxWidth: "560px",
            margin: "0 auto",
            borderRadius: "8px",
          }}
        >
          <Heading
            as="h1"
            style={{ fontSize: "18px", margin: "0 0 16px", color: "#111" }}
          >
            Новая заявка с сайта
          </Heading>
          <Hr style={{ borderColor: "#eaeaea", margin: "0 0 16px" }} />
          <Section>
            {rows.map(([label, value]) => (
              <Text
                key={label}
                style={{
                  margin: "0 0 8px",
                  fontSize: "14px",
                  lineHeight: "1.5",
                  color: "#333",
                }}
              >
                <strong>{label}:</strong> {value}
              </Text>
            ))}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function formatSubmittedAt(date: Date): string {
  return date.toLocaleString("ru-RU", {
    timeZone: "Europe/Istanbul",
    dateStyle: "medium",
    timeStyle: "short",
  });
}
