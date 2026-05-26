import type { Privacy } from "@/types/privacy";

export const privacy: Privacy = {
  updatedAt: "2026-05-26",
  intro: {
    ru: "На сайте есть два места, где остаются ваши данные: форма записи и чат-ассистент. Ниже — какие именно данные мы получаем в каждом случае и как их удалить, если они больше не нужны.",
    en: "There are two places on the site where you leave data: the booking form and the chat assistant. Below is what exactly we receive in each case and how to delete it if you no longer want it stored.",
    tr: "Sitede verilerinizi bıraktığınız iki yer var: randevu formu ve sohbet asistanı. Aşağıda her birinde tam olarak hangi verileri aldığımızı ve artık tutulmasını istemiyorsanız bunları nasıl sileceğinizi anlatıyoruz.",
  },
  sections: {
    bookings: {
      ru: "Когда вы оставляете заявку, мы сохраняем имя, телефон, email, выбранную услугу и ваш комментарий. Эти данные видит только менеджер клиники — он связывается с вами, чтобы подтвердить визит и ответить на вопросы.",
      en: "When you submit a booking, we save your name, phone, email, the service you picked, and your comment. Only the clinic manager sees this — they reach out to confirm your visit and answer questions.",
      tr: "Randevu bıraktığınızda adınızı, telefonunuzu, e-postanızı, seçtiğiniz hizmeti ve notunuzu kaydediyoruz. Bu bilgileri yalnızca klinik yöneticisi görüyor — randevunuzu onaylamak ve sorularınızı yanıtlamak için sizinle iletişime geçiyor.",
    },
    chat: {
      ru: "Чат-ассистент работает на модели OpenAI — ваши сообщения уходят туда, чтобы получить ответ. В чате мы не просим контактные данные: если нужно записаться, ассистент перенаправит вас на форму.",
      en: "The chat assistant runs on an OpenAI model — your messages go there to generate a reply. We don't ask for contact details in chat: if you want to book, the assistant sends you to the form.",
      tr: "Sohbet asistanı bir OpenAI modeli üzerinde çalışıyor — yanıt almak için mesajlarınız oraya iletiliyor. Sohbette iletişim bilgilerinizi istemiyoruz: randevu almak isterseniz asistan sizi forma yönlendiriyor.",
    },
    dataDeletion: {
      ru: "Чтобы убрать ваши данные из базы — напишите нам на email ниже. Удаляем вручную, обычно в течение пары рабочих дней.",
      en: "To remove your data from the database, drop us a line at the email below. We delete it manually, usually within a couple of business days.",
      tr: "Verilerinizi veritabanından kaldırmak için aşağıdaki e-posta adresine yazın. Manuel olarak siliyoruz, genellikle birkaç iş günü içinde.",
    },
  },
};
