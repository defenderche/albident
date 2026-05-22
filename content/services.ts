import type { Service } from "@/types/service";

export const services: Service[] = [
  {
    slug: "therapy",
    name: {
      ru: "Терапия",
      en: "Therapy",
      tr: "Tedavi",
    },
    shortDescription: {
      ru: "Лечение кариеса, реставрация зубов и эстетические пломбы.",
      en: "Caries treatment, tooth restoration, and aesthetic fillings.",
      tr: "Çürük tedavisi, diş restorasyonu ve estetik dolgular.",
    },
    fullDescription: {
      ru: "Терапевтическая стоматология — основа здоровья полости рта. Лечим кариес на ранних и глубоких стадиях, восстанавливаем разрушенные зубы пломбами из современных композитов, проводим лечение корневых каналов под микроскопом. Главная цель — сохранить собственный зуб пациента максимально долго.",
      en: "Therapeutic dentistry is the foundation of oral health. We treat caries at early and deep stages, restore damaged teeth with modern composite fillings, and perform microscope-assisted root canal treatment. The main goal is to preserve the patient's own tooth for as long as possible.",
      tr: "Tedavi diş hekimliği, ağız sağlığının temelidir. Erken ve derin aşamalarda çürükleri tedavi eder, hasarlı dişleri modern kompozit dolgularla yeniler ve mikroskop yardımıyla kanal tedavisi yaparız. Ana amaç, hastanın kendi dişini mümkün olduğunca uzun süre korumaktır.",
    },
    priceFrom: 50,
    priceTo: 200,
    stages: [
      {
        title: { ru: "Осмотр и диагностика", en: "Examination and diagnostics", tr: "Muayene ve teşhis" },
        description: {
          ru: "Врач осматривает зубы, при необходимости делает прицельный снимок, определяет глубину поражения.",
          en: "The doctor examines the teeth, takes a targeted X-ray if needed, and determines the depth of damage.",
          tr: "Hekim dişleri muayene eder, gerekirse hedefli röntgen çeker ve hasarın derinliğini belirler.",
        },
      },
      {
        title: { ru: "Лечение под анестезией", en: "Treatment under anesthesia", tr: "Anestezi altında tedavi" },
        description: {
          ru: "Удаление поражённых тканей, обработка полости. При глубоком кариесе — лечение каналов под микроскопом.",
          en: "Removal of affected tissue and cavity preparation. For deep caries — microscope-assisted root canal treatment.",
          tr: "Etkilenen dokunun çıkarılması ve kavitenin hazırlanması. Derin çürükte mikroskop yardımıyla kanal tedavisi.",
        },
      },
      {
        title: { ru: "Реставрация и проверка прикуса", en: "Restoration and bite check", tr: "Restorasyon ve ısırma kontrolü" },
        description: {
          ru: "Установка композитной пломбы с подбором оттенка, моделирование анатомии зуба, проверка смыкания.",
          en: "Composite filling placement with shade matching, tooth anatomy modeling, occlusion check.",
          tr: "Renk uyumuyla kompozit dolgu yerleştirme, diş anatomisi modelleme, kapanış kontrolü.",
        },
      },
    ],
    subProcedures: [
      {
        name: { ru: "Пломба композитная", en: "Composite filling", tr: "Kompozit dolgu" },
        priceFrom: 50,
        priceTo: 120,
      },
      {
        name: { ru: "Лечение каналов (1 канал)", en: "Root canal (1 canal)", tr: "Kanal tedavisi (1 kanal)" },
        priceFrom: 80,
        priceTo: 150,
      },
      {
        name: { ru: "Лечение под микроскопом", en: "Microscope treatment", tr: "Mikroskop tedavisi" },
        priceFrom: 120,
        priceTo: 200,
      },
    ],
    faq: [
      {
        q: { ru: "Болезненно ли лечение кариеса?", en: "Is caries treatment painful?", tr: "Çürük tedavisi ağrılı mı?" },
        a: {
          ru: "Современная анестезия делает процедуру безболезненной. Лёгкий дискомфорт может быть только в первые часы после лечения.",
          en: "Modern anesthesia makes the procedure painless. Slight discomfort may occur only in the first hours after treatment.",
          tr: "Modern anestezi prosedürü ağrısız hale getirir. Tedaviden sonraki ilk saatlerde sadece hafif rahatsızlık olabilir.",
        },
      },
      {
        q: { ru: "Сколько прослужит пломба?", en: "How long will the filling last?", tr: "Dolgu ne kadar dayanır?" },
        a: {
          ru: "При правильной гигиене композитная пломба служит 5–10 лет. Мы даём гарантию 2 года на свою работу.",
          en: "With proper hygiene, a composite filling lasts 5–10 years. We provide a 2-year warranty on our work.",
          tr: "Doğru hijyenle kompozit dolgu 5–10 yıl dayanır. İşimize 2 yıl garanti veriyoruz.",
        },
      },
    ],
    relatedDoctors: ["emre-demir"],
  },
  {
    slug: "surgery",
    name: {
      ru: "Хирургия",
      en: "Surgery",
      tr: "Cerrahi",
    },
    shortDescription: {
      ru: "Удаление зубов мудрости, простые и сложные экстракции.",
      en: "Wisdom tooth removal, simple and complex extractions.",
      tr: "Yirmilik diş çekimi, basit ve karmaşık ekstraksiyonlar.",
    },
    fullDescription: {
      ru: "Хирургическая стоматология решает задачи, которые невозможно закрыть терапией: удаление безнадёжных зубов, извлечение восьмёрок, костная пластика перед имплантацией. Работаем щадящими протоколами, чтобы минимизировать дискомфорт и срок восстановления.",
      en: "Surgical dentistry handles tasks that therapy cannot: removal of hopeless teeth, wisdom tooth extraction, bone grafting before implants. We use gentle protocols to minimize discomfort and recovery time.",
      tr: "Cerrahi diş hekimliği, tedavinin çözemediği görevleri ele alır: umutsuz dişlerin çıkarılması, yirmilik diş çekimi, implant öncesi kemik greftleme. Rahatsızlığı ve iyileşme süresini en aza indirmek için nazik protokoller kullanırız.",
    },
    priceFrom: 80,
    priceTo: 300,
    stages: [
      {
        title: { ru: "Консультация и КТ", en: "Consultation and CT scan", tr: "Danışma ve BT taraması" },
        description: {
          ru: "Делаем 3D-снимок для точной оценки положения зуба, корней и нервов.",
          en: "We take a 3D scan for accurate assessment of tooth position, roots, and nerves.",
          tr: "Diş konumunun, köklerinin ve sinirlerin doğru değerlendirilmesi için 3D tarama yaparız.",
        },
      },
      {
        title: { ru: "Экстракция под анестезией", en: "Extraction under anesthesia", tr: "Anestezi altında çekim" },
        description: {
          ru: "Удаление зуба щадящим протоколом, при необходимости — с надрезом десны и наложением швов.",
          en: "Gentle tooth extraction, with gum incision and suturing if needed.",
          tr: "Gerekirse diş eti kesisi ve sütür ile nazik diş çekimi.",
        },
      },
      {
        title: { ru: "Восстановление", en: "Recovery", tr: "İyileşme" },
        description: {
          ru: "Подробные инструкции по уходу, контрольный визит через 3–7 дней.",
          en: "Detailed care instructions, follow-up visit in 3–7 days.",
          tr: "Ayrıntılı bakım talimatları, 3–7 gün içinde kontrol ziyareti.",
        },
      },
    ],
    subProcedures: [
      {
        name: { ru: "Удаление однокорневого зуба", en: "Single-rooted tooth extraction", tr: "Tek köklü diş çekimi" },
        priceFrom: 80,
        priceTo: 130,
      },
      {
        name: { ru: "Удаление зуба мудрости", en: "Wisdom tooth removal", tr: "Yirmilik diş çekimi" },
        priceFrom: 150,
        priceTo: 250,
      },
      {
        name: { ru: "Костная пластика (синус-лифтинг)", en: "Bone grafting (sinus lift)", tr: "Kemik greftleme (sinüs lifti)" },
        priceFrom: 250,
        priceTo: 300,
      },
    ],
    faq: [
      {
        q: { ru: "Как долго заживает после удаления?", en: "How long does it take to heal after extraction?", tr: "Çekim sonrası iyileşme ne kadar sürer?" },
        a: {
          ru: "Лунка заживает 7–10 дней, полное восстановление кости — несколько месяцев. Все рекомендации даём в письменном виде.",
          en: "The socket heals in 7–10 days, full bone recovery takes several months. We provide all recommendations in writing.",
          tr: "Soket 7–10 günde iyileşir, tam kemik iyileşmesi birkaç ay sürer. Tüm önerileri yazılı olarak veririz.",
        },
      },
      {
        q: { ru: "Можно ли есть после удаления?", en: "Can I eat after extraction?", tr: "Çekim sonrası yemek yiyebilir miyim?" },
        a: {
          ru: "Первые 2 часа — нет. Затем мягкая прохладная пища. На сторону удаления не жуём 2–3 дня.",
          en: "Not for the first 2 hours. After that, soft cool food. Avoid chewing on the extraction side for 2–3 days.",
          tr: "İlk 2 saat içinde hayır. Sonra yumuşak serin yiyecekler. 2–3 gün boyunca çekim tarafında çiğnemeyin.",
        },
      },
    ],
    relatedDoctors: ["mehmet-yilmaz"],
  },
  {
    slug: "implants",
    name: {
      ru: "Имплантация",
      en: "Implants",
      tr: "İmplant",
    },
    shortDescription: {
      ru: "Восстановление утраченных зубов имплантатами премиум-брендов.",
      en: "Restoration of missing teeth with premium-brand implants.",
      tr: "Premium markalı implantlarla eksik dişlerin yenilenmesi.",
    },
    fullDescription: {
      ru: "Дентальная имплантация — золотой стандарт восстановления утраченных зубов. Титановый имплант вживляется в кость и со временем срастается с ней, после чего на него устанавливается коронка. Подходит при потере одного зуба, нескольких или всей челюсти (протоколы All-on-4, All-on-6). Используем импланты Straumann, Nobel Biocare и другие проверенные бренды.",
      en: "Dental implantation is the gold standard for restoring missing teeth. A titanium implant is integrated into the bone and over time fuses with it, after which a crown is placed on top. Suitable for single, multiple, or full-arch tooth loss (All-on-4, All-on-6 protocols). We use Straumann, Nobel Biocare, and other trusted implant brands.",
      tr: "Dental implantasyon, eksik dişlerin yenilenmesinde altın standarttır. Titanyum implant kemiğe yerleştirilir ve zamanla onunla kaynaşır, ardından üzerine kron takılır. Tek, çoklu veya tam çene diş kaybı için uygundur (All-on-4, All-on-6 protokolleri). Straumann, Nobel Biocare ve diğer güvenilir implant markalarını kullanırız.",
    },
    priceFrom: 500,
    priceTo: 1500,
    stages: [
      {
        title: { ru: "Диагностика и планирование", en: "Diagnostics and planning", tr: "Teşhis ve planlama" },
        description: {
          ru: "3D-снимок челюсти, оценка плотности кости, цифровое планирование позиции импланта.",
          en: "3D jaw scan, bone density assessment, digital planning of implant position.",
          tr: "3D çene taraması, kemik yoğunluğu değerlendirmesi, implant konumunun dijital planlaması.",
        },
      },
      {
        title: { ru: "Установка импланта", en: "Implant placement", tr: "İmplant yerleştirme" },
        description: {
          ru: "Хирургическая установка титанового импланта под местной анестезией, 30–60 минут на 1 единицу.",
          en: "Surgical placement of the titanium implant under local anesthesia, 30–60 minutes per unit.",
          tr: "Lokal anestezi altında titanyum implantın cerrahi yerleştirilmesi, birim başına 30–60 dakika.",
        },
      },
      {
        title: { ru: "Остеоинтеграция", en: "Osseointegration", tr: "Osseointegrasyon" },
        description: {
          ru: "Период срастания импланта с костью — 3–6 месяцев. В это время вы носите временную коронку.",
          en: "Implant-to-bone fusion period — 3–6 months. During this time you wear a temporary crown.",
          tr: "İmplantın kemikle kaynaşma süresi — 3–6 ay. Bu süre boyunca geçici kron takarsınız.",
        },
      },
      {
        title: { ru: "Установка постоянной коронки", en: "Permanent crown placement", tr: "Kalıcı kron yerleştirme" },
        description: {
          ru: "Снятие слепка, изготовление коронки в лаборатории, фиксация на абатмент.",
          en: "Impression taking, crown fabrication in the lab, fixation on abutment.",
          tr: "Ölçü alma, laboratuvarda kron yapımı, abutment üzerine sabitleme.",
        },
      },
    ],
    subProcedures: [
      {
        name: { ru: "Одиночный имплант с коронкой", en: "Single implant with crown", tr: "Kron ile tek implant" },
        priceFrom: 500,
        priceTo: 1200,
      },
      {
        name: { ru: "All-on-4 (полная челюсть)", en: "All-on-4 (full jaw)", tr: "All-on-4 (tam çene)" },
        priceFrom: 5000,
        priceTo: 8000,
      },
      {
        name: { ru: "All-on-6 (полная челюсть)", en: "All-on-6 (full jaw)", tr: "All-on-6 (tam çene)" },
        priceFrom: 7000,
        priceTo: 10000,
      },
    ],
    faq: [
      {
        q: { ru: "Сколько служит имплант?", en: "How long does an implant last?", tr: "İmplant ne kadar süre dayanır?" },
        a: {
          ru: "При правильном уходе — десятилетия. Даём 10 лет гарантии на работу врача и пожизненную гарантию производителя на сам имплант.",
          en: "With proper care — decades. We give a 10-year warranty on the doctor's work and a lifetime manufacturer's warranty on the implant itself.",
          tr: "Doğru bakımla onlarca yıl. Doktorun çalışmasına 10 yıl garanti ve implantın kendisine ömür boyu üretici garantisi veriyoruz.",
        },
      },
      {
        q: { ru: "Больно ли ставить имплант?", en: "Is implant placement painful?", tr: "İmplant yerleştirmek ağrılı mı?" },
        a: {
          ru: "Установка проходит под местной анестезией — боли нет. Лёгкий дискомфорт в первые 1–2 дня снимается обычными обезболивающими.",
          en: "Placement is done under local anesthesia — no pain. Mild discomfort in the first 1–2 days is relieved with regular painkillers.",
          tr: "Yerleştirme lokal anestezi altında yapılır — ağrı yoktur. İlk 1–2 gündeki hafif rahatsızlık normal ağrı kesicilerle giderilir.",
        },
      },
      {
        q: { ru: "Что такое All-on-4?", en: "What is All-on-4?", tr: "All-on-4 nedir?" },
        a: {
          ru: "Протокол восстановления полной челюсти на 4 имплантах с несъёмным протезом. Подходит при значительной потере зубов и атрофии кости.",
          en: "Full-jaw restoration protocol on 4 implants with a fixed prosthesis. Suitable for significant tooth loss and bone atrophy.",
          tr: "Sabit protezli 4 implant üzerine tam çene restorasyon protokolü. Önemli diş kaybı ve kemik atrofisi için uygundur.",
        },
      },
    ],
    relatedDoctors: ["aylin-celik", "mehmet-yilmaz"],
  },
  {
    slug: "prosthetics",
    name: {
      ru: "Протезирование",
      en: "Prosthetics",
      tr: "Protez",
    },
    shortDescription: {
      ru: "Коронки, мосты и съёмные протезы для восстановления улыбки.",
      en: "Crowns, bridges, and removable prosthetics to restore your smile.",
      tr: "Gülüşünüzü yenilemek için kron, köprü ve hareketli protezler.",
    },
    fullDescription: {
      ru: "Ортопедическая стоматология восстанавливает форму, функцию и эстетику зубов: коронки на сильно разрушенные зубы, мосты для замены отсутствующих, съёмные протезы при значительной потере. Работаем с металлокерамикой, безметалловой керамикой E.max и циркониевыми коронками премиум-класса.",
      en: "Prosthetic dentistry restores the shape, function, and aesthetics of teeth: crowns for severely damaged teeth, bridges to replace missing ones, removable prosthetics for significant tooth loss. We work with metal-ceramic, all-ceramic E.max, and premium zirconia crowns.",
      tr: "Protetik diş hekimliği, dişlerin şeklini, işlevini ve estetiğini yeniler: ciddi hasarlı dişler için kronlar, eksik dişleri değiştirmek için köprüler, önemli diş kaybı için hareketli protezler. Metal-seramik, tam seramik E.max ve premium zirkonyum kronlarla çalışırız.",
    },
    priceFrom: 200,
    priceTo: 700,
    stages: [
      {
        title: { ru: "Подготовка зуба", en: "Tooth preparation", tr: "Diş hazırlığı" },
        description: {
          ru: "Препарирование под коронку, при необходимости — лечение каналов и установка штифта.",
          en: "Preparation for crown, with root canal treatment and post placement if needed.",
          tr: "Kron için hazırlık, gerekirse kanal tedavisi ve post yerleştirme.",
        },
      },
      {
        title: { ru: "Слепок и временная коронка", en: "Impression and temporary crown", tr: "Ölçü ve geçici kron" },
        description: {
          ru: "Цифровой или классический слепок, установка временной коронки на период изготовления.",
          en: "Digital or classic impression, temporary crown for the fabrication period.",
          tr: "Dijital veya klasik ölçü, yapım süresi için geçici kron.",
        },
      },
      {
        title: { ru: "Примерка и фиксация", en: "Fitting and cementation", tr: "Prova ve sabitleme" },
        description: {
          ru: "Примерка готовой коронки, проверка прикуса и оттенка, фиксация на постоянный цемент.",
          en: "Fitting of the finished crown, occlusion and shade check, fixation with permanent cement.",
          tr: "Bitmiş kronun denemesi, kapanış ve renk kontrolü, kalıcı simanla sabitleme.",
        },
      },
    ],
    subProcedures: [
      {
        name: { ru: "Металлокерамическая коронка", en: "Metal-ceramic crown", tr: "Metal-seramik kron" },
        priceFrom: 200,
        priceTo: 350,
      },
      {
        name: { ru: "Циркониевая коронка", en: "Zirconia crown", tr: "Zirkonyum kron" },
        priceFrom: 350,
        priceTo: 600,
      },
      {
        name: { ru: "Съёмный протез (одна челюсть)", en: "Removable denture (one jaw)", tr: "Hareketli protez (tek çene)" },
        priceFrom: 500,
        priceTo: 700,
      },
    ],
    faq: [
      {
        q: { ru: "Чем отличается металлокерамика от циркония?", en: "What's the difference between metal-ceramic and zirconia?", tr: "Metal-seramik ile zirkonyum arasındaki fark nedir?" },
        a: {
          ru: "Цирконий полностью безметалловый, более эстетичный и подходит для передних зубов. Металлокерамика крепче, но при отступлении десны может проявляться металлическая основа.",
          en: "Zirconia is completely metal-free, more aesthetic, and suitable for front teeth. Metal-ceramic is stronger but the metal base may show if the gum recedes.",
          tr: "Zirkonyum tamamen metalsizdir, daha estetiktir ve ön dişler için uygundur. Metal-seramik daha güçlüdür ancak diş eti çekilirse metal taban görünebilir.",
        },
      },
      {
        q: { ru: "Сколько времени занимает изготовление коронки?", en: "How long does crown fabrication take?", tr: "Kron yapımı ne kadar sürer?" },
        a: {
          ru: "Обычно 7–10 рабочих дней. На время изготовления вы носите временную коронку — есть и улыбаться можно как обычно.",
          en: "Usually 7–10 business days. During this time you wear a temporary crown — you can eat and smile as usual.",
          tr: "Genellikle 7–10 iş günü. Bu süre boyunca geçici kron takarsınız — her zamanki gibi yemek yiyebilir ve gülümseyebilirsiniz.",
        },
      },
    ],
    relatedDoctors: ["zeynep-kaya"],
  },
  {
    slug: "orthodontics",
    name: {
      ru: "Ортодонтия",
      en: "Orthodontics",
      tr: "Ortodonti",
    },
    shortDescription: {
      ru: "Брекеты и элайнеры для коррекции прикуса в любом возрасте.",
      en: "Braces and aligners to correct bite at any age.",
      tr: "Her yaşta ısırma düzeltmesi için braketler ve şeffaf plaklar.",
    },
    fullDescription: {
      ru: "Ортодонтия исправляет неровные зубы, неправильный прикус и эстетические дефекты улыбки. Работаем с металлическими и керамическими брекетами, а также с элайнерами Invisalign — прозрачными съёмными каппами. Лечение занимает от нескольких месяцев до 2 лет в зависимости от сложности.",
      en: "Orthodontics corrects crooked teeth, malocclusion, and aesthetic smile defects. We work with metal and ceramic braces, as well as Invisalign aligners — clear removable trays. Treatment takes from several months to 2 years depending on complexity.",
      tr: "Ortodonti, eğri dişleri, yanlış ısırığı ve estetik gülüş kusurlarını düzeltir. Metal ve seramik braketlerin yanı sıra Invisalign şeffaf plaklarıyla çalışırız. Tedavi, karmaşıklığa bağlı olarak birkaç aydan 2 yıla kadar sürer.",
    },
    priceFrom: 1500,
    priceTo: 4000,
    stages: [
      {
        title: { ru: "Диагностика и план", en: "Diagnostics and plan", tr: "Teşhis ve plan" },
        description: {
          ru: "Слепки, фото улыбки, КТ челюсти. Составляем 3D-план лечения с ожидаемым результатом.",
          en: "Impressions, smile photos, jaw CT scan. We create a 3D treatment plan with the expected outcome.",
          tr: "Ölçü, gülüş fotoğrafları, çene BT taraması. Beklenen sonuçla 3D tedavi planı hazırlarız.",
        },
      },
      {
        title: { ru: "Установка системы", en: "System installation", tr: "Sistem kurulumu" },
        description: {
          ru: "Установка брекетов на эмаль или выдача комплекта элайнеров. Обучаем уходу и гигиене.",
          en: "Bracket placement on enamel or aligner kit delivery. We teach care and hygiene.",
          tr: "Mineye braket yerleştirme veya şeffaf plak setinin verilmesi. Bakım ve hijyen eğitimi veririz.",
        },
      },
      {
        title: { ru: "Контрольные визиты", en: "Follow-up visits", tr: "Kontrol ziyaretleri" },
        description: {
          ru: "Раз в 4–6 недель — коррекция дуги или смена набора элайнеров. Промежуточные фотографии прогресса.",
          en: "Every 4–6 weeks — arch wire adjustment or aligner set change. Interim progress photos.",
          tr: "Her 4–6 haftada bir — ark teli ayarı veya şeffaf plak setinin değiştirilmesi. Ara süreç fotoğrafları.",
        },
      },
      {
        title: { ru: "Снятие и ретенция", en: "Removal and retention", tr: "Çıkarma ve retansiyon" },
        description: {
          ru: "После достижения результата — снятие системы, установка ретейнера для закрепления.",
          en: "After achieving the result — system removal, retainer placement for fixation.",
          tr: "Sonuca ulaştıktan sonra — sistemin çıkarılması, sabitleme için retainer yerleştirme.",
        },
      },
    ],
    subProcedures: [
      {
        name: { ru: "Металлические брекеты (обе челюсти)", en: "Metal braces (both jaws)", tr: "Metal braketler (her iki çene)" },
        priceFrom: 1500,
        priceTo: 2500,
      },
      {
        name: { ru: "Керамические брекеты (обе челюсти)", en: "Ceramic braces (both jaws)", tr: "Seramik braketler (her iki çene)" },
        priceFrom: 2500,
        priceTo: 3500,
      },
      {
        name: { ru: "Элайнеры Invisalign", en: "Invisalign aligners", tr: "Invisalign şeffaf plaklar" },
        priceFrom: 3000,
        priceTo: 4000,
      },
    ],
    faq: [
      {
        q: { ru: "Сколько длится лечение брекетами?", en: "How long does brace treatment take?", tr: "Braket tedavisi ne kadar sürer?" },
        a: {
          ru: "Чаще всего 12–24 месяца. Точный срок становится понятен после диагностики и зависит от исходной ситуации.",
          en: "Most often 12–24 months. The exact period becomes clear after diagnostics and depends on the initial situation.",
          tr: "Çoğunlukla 12–24 ay. Kesin süre teşhisten sonra netleşir ve başlangıç durumuna bağlıdır.",
        },
      },
      {
        q: { ru: "Можно ли брекеты во взрослом возрасте?", en: "Can adults get braces?", tr: "Yetişkinler braket taktırabilir mi?" },
        a: {
          ru: "Да, около половины наших ортодонтических пациентов — взрослые. Возрастных ограничений нет.",
          en: "Yes, about half of our orthodontic patients are adults. There are no age restrictions.",
          tr: "Evet, ortodonti hastalarımızın yaklaşık yarısı yetişkindir. Yaş kısıtlaması yoktur.",
        },
      },
    ],
    relatedDoctors: ["dmitri-orlov"],
  },
  {
    slug: "aesthetics",
    name: {
      ru: "Эстетика",
      en: "Aesthetics",
      tr: "Estetik",
    },
    shortDescription: {
      ru: "Виниры, отбеливание и художественная реставрация передних зубов.",
      en: "Veneers, whitening, and artistic restoration of front teeth.",
      tr: "Lamine, beyazlatma ve ön dişlerin sanatsal restorasyonu.",
    },
    fullDescription: {
      ru: "Эстетическая стоматология меняет улыбку: виниры из керамики и циркония маскируют сколы, щели и тёмный оттенок, отбеливание Zoom осветляет зубы на несколько тонов за один визит, художественная реставрация исправляет форму передних зубов композитом. Работаем по протоколу Digital Smile Design — сначала показываем будущий результат на экране.",
      en: "Aesthetic dentistry transforms your smile: ceramic and zirconia veneers mask chips, gaps, and dark shades; Zoom whitening lightens teeth by several shades in one visit; artistic restoration corrects front tooth shape with composite. We work with the Digital Smile Design protocol — first showing your future result on screen.",
      tr: "Estetik diş hekimliği gülüşünüzü dönüştürür: seramik ve zirkonyum lamineler çatlakları, boşlukları ve koyu tonları gizler; Zoom beyazlatma tek seansta dişleri birkaç ton açar; sanatsal restorasyon kompozitle ön diş şeklini düzeltir. Digital Smile Design protokolüyle çalışırız — önce gelecekteki sonucunuzu ekranda gösteririz.",
    },
    priceFrom: 300,
    priceTo: 900,
    stages: [
      {
        title: { ru: "Smile Design", en: "Smile Design", tr: "Smile Design" },
        description: {
          ru: "Цифровое моделирование будущей улыбки. Согласуем форму, оттенок и пропорции до начала работы.",
          en: "Digital modeling of your future smile. We agree on shape, shade, and proportions before starting.",
          tr: "Gelecekteki gülüşünüzün dijital modellemesi. Çalışmaya başlamadan önce şekil, renk ve oranlarda anlaşırız.",
        },
      },
      {
        title: { ru: "Подготовка зубов", en: "Tooth preparation", tr: "Diş hazırlığı" },
        description: {
          ru: "Минимальное препарирование эмали под виниры или подготовка перед отбеливанием.",
          en: "Minimal enamel preparation for veneers or pre-whitening preparation.",
          tr: "Lamine için minimum mine hazırlığı veya beyazlatma öncesi hazırlık.",
        },
      },
      {
        title: { ru: "Установка / процедура", en: "Placement / procedure", tr: "Yerleştirme / prosedür" },
        description: {
          ru: "Фиксация виниров на специальный цемент или проведение отбеливания под защитой дёсен.",
          en: "Veneer fixation with special cement or whitening with gum protection.",
          tr: "Özel simanla lamine sabitleme veya diş eti koruması altında beyazlatma.",
        },
      },
    ],
    subProcedures: [
      {
        name: { ru: "Винир керамический (1 зуб)", en: "Ceramic veneer (1 tooth)", tr: "Seramik lamine (1 diş)" },
        priceFrom: 350,
        priceTo: 600,
      },
      {
        name: { ru: "Отбеливание Zoom (обе челюсти)", en: "Zoom whitening (both jaws)", tr: "Zoom beyazlatma (her iki çene)" },
        priceFrom: 300,
        priceTo: 450,
      },
      {
        name: { ru: "Художественная реставрация (1 зуб)", en: "Artistic restoration (1 tooth)", tr: "Sanatsal restorasyon (1 diş)" },
        priceFrom: 200,
        priceTo: 350,
      },
    ],
    faq: [
      {
        q: { ru: "Сколько служат виниры?", en: "How long do veneers last?", tr: "Lamineler ne kadar süre dayanır?" },
        a: {
          ru: "Керамические виниры служат 10–15 лет при правильном уходе. Даём 5 лет гарантии на работу.",
          en: "Ceramic veneers last 10–15 years with proper care. We give a 5-year warranty on our work.",
          tr: "Seramik lamineler doğru bakımla 10–15 yıl dayanır. İşimize 5 yıl garanti veriyoruz.",
        },
      },
      {
        q: { ru: "Можно ли отбелить зубы один раз и навсегда?", en: "Can teeth be whitened once and forever?", tr: "Dişler bir kez ve sonsuza kadar beyazlatılabilir mi?" },
        a: {
          ru: "Эффект отбеливания держится 1–3 года в зависимости от рациона (кофе, чай, вино темнят зубы). Поддержку можно делать домашними каппами.",
          en: "Whitening effect lasts 1–3 years depending on diet (coffee, tea, wine darken teeth). Maintenance can be done with home trays.",
          tr: "Beyazlatma etkisi diyete bağlı olarak 1–3 yıl sürer (kahve, çay, şarap dişleri koyulaştırır). Bakım, evde tepsilerle yapılabilir.",
        },
      },
    ],
    relatedDoctors: ["zeynep-kaya"],
  },
  {
    slug: "hygiene",
    name: {
      ru: "Гигиена",
      en: "Hygiene",
      tr: "Hijyen",
    },
    shortDescription: {
      ru: "Профессиональная чистка, удаление налёта и профилактический осмотр.",
      en: "Professional cleaning, plaque removal, and preventive check-up.",
      tr: "Profesyonel temizlik, plak temizleme ve önleyici muayene.",
    },
    fullDescription: {
      ru: "Профессиональная гигиена — основа здоровья зубов и дёсен. Удаляем зубной камень ультразвуком, мягкий налёт — методом Air Flow, полируем эмаль и наносим фтор для укрепления. Рекомендуем посещать гигиениста каждые 6 месяцев — это дешевле и проще, чем лечить запущенный кариес.",
      en: "Professional hygiene is the foundation of healthy teeth and gums. We remove tartar with ultrasound, soft plaque with Air Flow, polish the enamel, and apply fluoride to strengthen it. We recommend visiting a hygienist every 6 months — it's cheaper and easier than treating advanced caries.",
      tr: "Profesyonel hijyen, sağlıklı diş ve diş etlerinin temelidir. Tartarı ultrasonla, yumuşak plakı Air Flow yöntemiyle temizler, mineyi cilalar ve güçlendirmek için florür uygularız. Her 6 ayda bir hijyeniste gitmenizi öneririz — ilerlemiş çürüğü tedavi etmekten daha ucuz ve kolaydır.",
    },
    priceFrom: 50,
    priceTo: 150,
    stages: [
      {
        title: { ru: "Осмотр", en: "Examination", tr: "Muayene" },
        description: {
          ru: "Оценка состояния зубов и дёсен, выявление кариеса на ранних стадиях.",
          en: "Assessment of teeth and gums, early caries detection.",
          tr: "Diş ve diş etlerinin değerlendirilmesi, erken çürük tespiti.",
        },
      },
      {
        title: { ru: "Ультразвуковая чистка", en: "Ultrasonic cleaning", tr: "Ultrasonik temizlik" },
        description: {
          ru: "Снятие зубного камня с поверхности зубов и из-под десны.",
          en: "Removal of tartar from tooth surfaces and from under the gum line.",
          tr: "Diş yüzeyinden ve diş eti hattının altından tartarın çıkarılması.",
        },
      },
      {
        title: { ru: "Air Flow и полировка", en: "Air Flow and polishing", tr: "Air Flow ve cilalama" },
        description: {
          ru: "Удаление мягкого налёта смесью воздуха, воды и порошка. Полировка эмали.",
          en: "Soft plaque removal with air, water, and powder mix. Enamel polishing.",
          tr: "Hava, su ve toz karışımıyla yumuşak plak temizleme. Mine cilalama.",
        },
      },
      {
        title: { ru: "Фторирование", en: "Fluoridation", tr: "Florlama" },
        description: {
          ru: "Нанесение защитного фторсодержащего покрытия для укрепления эмали.",
          en: "Application of a protective fluoride coating to strengthen enamel.",
          tr: "Mineyi güçlendirmek için koruyucu florür kaplaması.",
        },
      },
    ],
    subProcedures: [
      {
        name: { ru: "Полная гигиена (ультразвук + Air Flow + полировка)", en: "Full hygiene (ultrasound + Air Flow + polishing)", tr: "Tam hijyen (ultrason + Air Flow + cilalama)" },
        priceFrom: 80,
        priceTo: 120,
      },
      {
        name: { ru: "Чистка с фторированием", en: "Cleaning with fluoridation", tr: "Florlama ile temizlik" },
        priceFrom: 100,
        priceTo: 150,
      },
      {
        name: { ru: "Профилактический осмотр", en: "Preventive check-up", tr: "Önleyici muayene" },
        priceFrom: 50,
        priceTo: 70,
      },
    ],
    faq: [
      {
        q: { ru: "Как часто делать профессиональную чистку?", en: "How often should I get professional cleaning?", tr: "Profesyonel temizlik ne sıklıkla yaptırılmalı?" },
        a: {
          ru: "Каждые 6 месяцев — стандартная рекомендация. Курящим или склонным к камнеобразованию — каждые 3–4 месяца.",
          en: "Every 6 months is the standard recommendation. For smokers or those prone to tartar — every 3–4 months.",
          tr: "Her 6 ayda bir standart öneridir. Sigara içenler veya tartar oluşumuna yatkın olanlar için — her 3–4 ayda bir.",
        },
      },
      {
        q: { ru: "Это больно?", en: "Is it painful?", tr: "Ağrılı mı?" },
        a: {
          ru: "При здоровых дёснах — нет. Если есть воспаление, может быть лёгкий дискомфорт; при необходимости делаем местную анестезию.",
          en: "With healthy gums — no. If there's inflammation, there may be mild discomfort; we apply local anesthesia if needed.",
          tr: "Sağlıklı diş etleriyle — hayır. İltihap varsa hafif rahatsızlık olabilir; gerekirse lokal anestezi uygularız.",
        },
      },
    ],
    relatedDoctors: ["emre-demir"],
  },
  {
    slug: "periodontology",
    name: {
      ru: "Пародонтология",
      en: "Periodontology",
      tr: "Periodontoloji",
    },
    shortDescription: {
      ru: "Лечение дёсен, кровоточивости и пародонтита на любой стадии.",
      en: "Treatment of gums, bleeding, and periodontitis at any stage.",
      tr: "Diş etlerinin, kanamaların ve periodontitisin her aşamada tedavisi.",
    },
    fullDescription: {
      ru: "Пародонтология занимается тканями, окружающими зуб: дёснами, связками, костью. Лечим гингивит и пародонтит — заболевания, из-за которых дёсны кровоточат, образуются карманы и в перспективе теряются зубы. Используем закрытый и открытый кюретаж, лазерную обработку карманов, шинирование подвижных зубов.",
      en: "Periodontology deals with tissues surrounding the tooth: gums, ligaments, bone. We treat gingivitis and periodontitis — conditions that cause gum bleeding, pocket formation, and eventually tooth loss. We use closed and open curettage, laser pocket treatment, and splinting of mobile teeth.",
      tr: "Periodontoloji, dişi çevreleyen dokularla ilgilenir: diş etleri, bağlar, kemik. Diş eti kanamasına, cep oluşumuna ve sonunda diş kaybına neden olan gingivit ve periodontitisi tedavi ederiz. Kapalı ve açık küretaj, lazerli cep tedavisi ve hareketli dişlerin splintlenmesini kullanırız.",
    },
    priceFrom: 100,
    priceTo: 500,
    stages: [
      {
        title: { ru: "Диагностика глубины карманов", en: "Pocket depth diagnostics", tr: "Cep derinliği teşhisi" },
        description: {
          ru: "Измерение глубины пародонтальных карманов, оценка кровоточивости и подвижности зубов.",
          en: "Measurement of periodontal pocket depth, assessment of bleeding and tooth mobility.",
          tr: "Periodontal cep derinliği ölçümü, kanama ve diş hareketliliği değerlendirmesi.",
        },
      },
      {
        title: { ru: "Профессиональная гигиена", en: "Professional hygiene", tr: "Profesyonel hijyen" },
        description: {
          ru: "Снятие всех отложений, в том числе поддесневых. Это базовый этап для любого лечения дёсен.",
          en: "Removal of all deposits, including sub-gingival ones. This is the basic step for any gum treatment.",
          tr: "Diş eti altı dahil tüm birikintilerin çıkarılması. Bu, herhangi bir diş eti tedavisi için temel adımdır.",
        },
      },
      {
        title: { ru: "Кюретаж и медикаментозное лечение", en: "Curettage and medication", tr: "Küretaj ve ilaç tedavisi" },
        description: {
          ru: "Очистка пародонтальных карманов, при необходимости — лазерная обработка и антибактериальные аппликации.",
          en: "Cleaning of periodontal pockets, with laser treatment and antibacterial applications if needed.",
          tr: "Periodontal ceplerin temizlenmesi, gerekirse lazer tedavisi ve antibakteriyel uygulamalar.",
        },
      },
      {
        title: { ru: "Поддерживающая терапия", en: "Maintenance therapy", tr: "Bakım tedavisi" },
        description: {
          ru: "Контрольные визиты каждые 3–4 месяца. Без поддержки пародонтит возвращается.",
          en: "Follow-up visits every 3–4 months. Without maintenance, periodontitis returns.",
          tr: "Her 3–4 ayda bir kontrol ziyareti. Bakım olmadan periodontitis geri döner.",
        },
      },
    ],
    subProcedures: [
      {
        name: { ru: "Лечение гингивита (лёгкая форма)", en: "Gingivitis treatment (mild form)", tr: "Gingivit tedavisi (hafif form)" },
        priceFrom: 100,
        priceTo: 200,
      },
      {
        name: { ru: "Закрытый кюретаж (одна челюсть)", en: "Closed curettage (one jaw)", tr: "Kapalı küretaj (tek çene)" },
        priceFrom: 200,
        priceTo: 350,
      },
      {
        name: { ru: "Открытый кюретаж + шинирование", en: "Open curettage + splinting", tr: "Açık küretaj + splintleme" },
        priceFrom: 350,
        priceTo: 500,
      },
    ],
    faq: [
      {
        q: { ru: "Дёсны кровоточат при чистке — это серьёзно?", en: "My gums bleed when brushing — is it serious?", tr: "Fırçalarken diş etlerim kanıyor — bu ciddi mi?" },
        a: {
          ru: "Это симптом гингивита — начальной стадии заболевания дёсен. На этом этапе всё ещё обратимо. Если не лечить — переходит в пародонтит, который уже разрушает кость.",
          en: "This is a symptom of gingivitis — the initial stage of gum disease. At this stage everything is still reversible. If untreated, it progresses to periodontitis, which destroys bone.",
          tr: "Bu, diş eti hastalığının başlangıç aşaması olan gingivitin belirtisidir. Bu aşamada her şey hala geri dönüşlüdür. Tedavi edilmezse, kemiği yok eden periodontitise dönüşür.",
        },
      },
      {
        q: { ru: "Можно ли вылечить пародонтит полностью?", en: "Can periodontitis be cured completely?", tr: "Periodontitis tamamen tedavi edilebilir mi?" },
        a: {
          ru: "Пародонтит можно остановить и удерживать в ремиссии многие годы. Полное обращение разрушения кости невозможно, но дальнейшее можно предотвратить.",
          en: "Periodontitis can be stopped and kept in remission for many years. Full reversal of bone destruction is impossible, but further progression can be prevented.",
          tr: "Periodontitis durdurulabilir ve uzun yıllar remisyonda tutulabilir. Kemik tahribatının tamamen tersine çevrilmesi mümkün değildir, ancak ilerlemesi önlenebilir.",
        },
      },
    ],
    relatedDoctors: ["emre-demir"],
  },
];
