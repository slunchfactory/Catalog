import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { getTranslations } from "next-intl/server";
import { getLocalizedText, type LocaleText } from "@/lib/products";

const OEM_IMAGE_MAP: Record<string, string> = {
  "비건 페퍼로니": "/images/oem/vegan-pepperoni.png",
  "비건 잠봉": "/images/oem/vegan-jambon.png",
  "비건 모짜렐라": "/images/oem/vegan-mozzarella.png",
  "비건 체다": "/images/oem/vegan-cheddar.png",
  "감자 뇨끼 Bulk 5kg": "/images/oem/potato-gnocchi-bulk-new.png",
  "시금치 뇨끼 Bulk 5kg": "/images/oem/spinach-gnocchi-bulk-new.png",
  "스위트 펌킨 수프": "/images/oem/sweet-pumpkin-soup.png",
  "토마토 당근 수프": "/images/oem/tomato-carrot-soup.png",
  "아스파라거스 브로콜리 수프": "/images/oem/asparagus-broccoli-soup.png",
  "마라 소스": "/images/oem/mala-sauce.png",
  "쏸차이 소스": "/images/oem/sunchae-sauce.png",
  "차콜 그릴 소스": "/images/oem/charcoal-grill-sauce.png",
  "비건 시저 드레싱": "/images/oem/vegan-caesar-dressing.png",
  "블랙페퍼 소스": "/images/oem/black-pepper-sauce.png",
  "바질·루꼴라 페스토": "/images/oem/basil-rucola-pesto.png",
  "비건 복숭아 타르트 800g": "/images/oem/vegan-peach-tart-160g-2.png",
  "비건 블루베리 타르트 800g": "/images/oem/vegan-blueberry-tart-160g-2.png",
  "비건 말차 케이크 850g": "/images/oem/vegan-matcha-cake-850g.png",
  "비건 단호박 가토 쇼콜라 800g": "/images/oem/vegan-pumpkin-chocolate-cake-800g.png",
};

type BreakthroughBlock = {
  title: LocaleText;
  description: LocaleText;
  icon: React.ReactNode;
};

const BREAKTHROUGH_BLOCKS: BreakthroughBlock[] = [
  {
    title: {
      ko: "두부 기반 자체 기술",
      en: "In-house tofu-based technology",
      ru: "Собственная технология на основе тофу",
    },
    description: {
      ko: "콩을 분쇄·압착·성형·진공포장하는 자체 공정으로 단백질이 풍부한 완전식품 두부를 만들고, 이를 모든 비건 제품 개발의 기술적 토대로 삼습니다.",
      en: "Our in-house process—grinding, pressing, shaping, vacuum packing—produces protein-rich whole-food tofu, the technical foundation for all our vegan product development.",
      ru: "Собственный процесс — измельчение, прессование, формовка, вакуумная упаковка — создаёт богатый белком тофу из цельных бобов, техническую основу для всех веганских разработок.",
    },
    icon: (
      <svg className="h-8 w-8 text-[#C8202A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: {
      ko: "부산물 활용 기술",
      en: "By-product utilization technology",
      ru: "Технология использования побочных продуктов",
    },
    description: {
      ko: "두부 제조 과정에서 발생하는 부산물을 독자 기술로 가공해 비건 햄·치즈·잠봉·소스로 재탄생시킵니다. 달걀·우유·버터 없이 만드는 자원순환 식품 기술입니다.",
      en: "By-products from tofu production are processed with our proprietary technology into vegan ham, cheese, jambon, and sauces. Resource-circular food tech without eggs, milk, or butter.",
      ru: "Побочные продукты производства тофу перерабатываются по собственной технологии в веганскую ветчину, сыр, жамбон и соусы. Ресурсооборотная технология без яиц, молока и масла.",
    },
    icon: (
      <svg className="h-8 w-8 text-[#C8202A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: {
      ko: "비건 생태계 확장",
      en: "Expanding the vegan ecosystem",
      ru: "Расширение веганской экосистемы",
    },
    description: {
      ko: "피자·잠봉뵈르·타르트 등 다양한 밀키트로 확장된 자체 기술. 기후 변화와 식량 문제에 대응하는 지속가능한 식품 기술입니다.",
      en: "Our technology extended to pizza, jambon-beurre, tarts, and more. Sustainable food technology for climate and food security.",
      ru: "Наша технология расширена на пиццу, жамбон-бурре, тарты и др. Устойчивые пищевые технологии для климата и продбезопасности.",
    },
    icon: (
      <svg className="h-8 w-8 text-[#C8202A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0h.5a2.5 2.5 0 002.5-2.5V3.935M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const B2B_CARDS: Array<{
  imageKey: string;
  name: LocaleText;
  shortDesc: LocaleText;
  bulk: string;
  storage: LocaleText;
  shelf: LocaleText;
}> = [
  {
    imageKey: "비건 페퍼로니",
    name: { ko: "비건 페퍼로니", en: "Vegan Pepperoni", ru: "Веганский пепперони" },
    shortDesc: {
      ko: "두부 32% 함유, 피자·핫도그에 최적화된 식물성 페퍼로니",
      en: "32% tofu, plant-based pepperoni for pizza and hot dogs",
      ru: "32% тофу, растительный пепперони для пиццы и хот-догов",
    },
    bulk: "Bulk 600g",
    storage: { ko: "냉동", en: "Frozen", ru: "Заморозка" },
    shelf: { ko: "9개월", en: "9 months", ru: "9 месяцев" },
  },
  {
    imageKey: "비건 잠봉",
    name: { ko: "비건 잠봉", en: "Vegan Jambon", ru: "Веганский жамбон" },
    shortDesc: {
      ko: "두부 34% 함유, 샌드위치용 식물성 햄",
      en: "34% tofu, plant-based ham for sandwiches",
      ru: "34% тофу, растительная ветчина для сэндвичей",
    },
    bulk: "Bulk 600g",
    storage: { ko: "냉동", en: "Frozen", ru: "Заморозка" },
    shelf: { ko: "9개월", en: "9 months", ru: "9 месяцев" },
  },
  {
    imageKey: "비건 모짜렐라",
    name: { ko: "비건 모짜렐라", en: "Vegan Mozzarella", ru: "Веганская моцарелла" },
    shortDesc: {
      ko: "두부 34% 함유, 피자·샌드위치에 잘 녹는 식물성 치즈",
      en: "34% tofu, plant-based cheese that melts for pizza and sandwiches",
      ru: "34% тофу, растительный сыр с хорошей плавкостью для пиццы и сэндвичей",
    },
    bulk: "Bulk 600g",
    storage: { ko: "냉동", en: "Frozen", ru: "Заморозка" },
    shelf: { ko: "9개월", en: "9 months", ru: "9 месяцев" },
  },
  {
    imageKey: "비건 체다",
    name: { ko: "비건 체다", en: "Vegan Cheddar", ru: "Веганский чеддер" },
    shortDesc: {
      ko: "두부 34% 함유, 나초·맥앤치즈용 식물성 체다 치즈",
      en: "34% tofu, plant-based cheddar for nachos and mac & cheese",
      ru: "34% тофу, растительный чеддер для начос и мак-н-чиз",
    },
    bulk: "Bulk 600g",
    storage: { ko: "냉동", en: "Frozen", ru: "Заморозка" },
    shelf: { ko: "9개월", en: "9 months", ru: "9 месяцев" },
  },
];

const SOUPS: Array<{
  imageKey: string;
  name: LocaleText;
  description: LocaleText;
  capacity: string;
}> = [
  {
    imageKey: "스위트 펌킨 수프",
    name: { ko: "스위트 펌킨 수프", en: "Sweet Pumpkin Soup", ru: "Суп из сладкой тыквы" },
    description: {
      ko: "달콤하고 부드러운 단호박 크림 수프",
      en: "Sweet and smooth pumpkin cream soup",
      ru: "Сладкий нежный крем-суп из тыквы",
    },
    capacity: "200ml",
  },
  {
    imageKey: "토마토 당근 수프",
    name: { ko: "토마토 당근 수프", en: "Tomato Carrot Soup", ru: "Томатно-морковный суп" },
    description: {
      ko: "새콤달콤한 토마토와 당근의 건강 수프",
      en: "Tangy-sweet tomato and carrot health soup",
      ru: "Кисло-сладкий полезный суп из томатов и моркови",
    },
    capacity: "200ml",
  },
  {
    imageKey: "아스파라거스 브로콜리 수프",
    name: { ko: "아스파라거스 브로콜리 수프", en: "Asparagus Broccoli Soup", ru: "Суп из спаржи и брокколи" },
    description: {
      ko: "깔끔하고 고소한 그린 채소 수프",
      en: "Clean, savory green vegetable soup",
      ru: "Лёгкий пикантный суп из зелёных овощей",
    },
    capacity: "200ml",
  },
];

const SAUCES: Array<{
  imageKey: string;
  name: LocaleText;
  description: LocaleText;
  capacity: string;
}> = [
  {
    imageKey: "마라 소스",
    name: { ko: "마라 소스", en: "Mala Sauce", ru: "Соус мала" },
    description: {
      ko: "얼얼하고 깊은 중화풍 마라 소스",
      en: "Numbing, deep Chinese-style mala sauce",
      ru: "Острый глубокий китайский соус мала",
    },
    capacity: "1kg",
  },
  {
    imageKey: "쏸차이 소스",
    name: { ko: "쏸차이 소스", en: "Sunchae Sauce", ru: "Соус сунчхэ" },
    description: {
      ko: "새콤하고 시원한 발효 채소 딥핑 소스",
      en: "Tangy, refreshing fermented vegetable dipping sauce",
      ru: "Кисло-освежающий соус из ферментированных овощей",
    },
    capacity: "1kg",
  },
  {
    imageKey: "차콜 그릴 소스",
    name: { ko: "차콜 그릴 소스", en: "Charcoal Grill Sauce", ru: "Соус для гриля на углях" },
    description: {
      ko: "숯불향 나는 스모키한 바비큐 소스",
      en: "Smoky barbecue sauce with charcoal notes",
      ru: "Копчёный соус для барбекю с угольным ароматом",
    },
    capacity: "1kg",
  },
  {
    imageKey: "비건 시저 드레싱",
    name: { ko: "비건 시저 드레싱", en: "Vegan Caesar Dressing", ru: "Веганский соус цезарь" },
    description: {
      ko: "고소하고 크리미한 비건 시저 드레싱",
      en: "Savory, creamy vegan Caesar dressing",
      ru: "Пикантный кремовый веганский дрессинг цезарь",
    },
    capacity: "1kg",
  },
  {
    imageKey: "블랙페퍼 소스",
    name: { ko: "블랙페퍼 소스", en: "Black Pepper Sauce", ru: "Соус чёрный перец" },
    description: {
      ko: "굵은 통후추의 묵직하고 알싸한 소스",
      en: "Hearty, pungent sauce with coarse black pepper",
      ru: "Насыщенный острый соус с крупным чёрным перцем",
    },
    capacity: "1kg",
  },
  {
    imageKey: "바질·루꼴라 페스토",
    name: { ko: "바질·루꼴라 페스토", en: "Basil·Rucola Pesto", ru: "Песто базилик·руккола" },
    description: {
      ko: "신선한 바질과 루꼴라의 허브 페스토",
      en: "Fresh basil and rucola herb pesto",
      ru: "Свежий травяной песто из базилика и рукколы",
    },
    capacity: "1kg",
  },
];

const GNOCCHI_BULK_ITEMS: Array<{
  imageKey: string;
  name: LocaleText;
  shortDesc: LocaleText;
  detail: LocaleText;
}> = [
  {
    imageKey: "감자 뇨끼 Bulk 5kg",
    name: { ko: "감자 뇨끼 Bulk 5kg", en: "Potato Gnocchi Bulk 5kg", ru: "Картофельные ньокки Bulk 5кг" },
    shortDesc: {
      ko: "쫄깃한 감자 뇨끼, 5kg 대용량 냉동 공급",
      en: "Chewy potato gnocchi, 5kg bulk frozen supply",
      ru: "Жевательные картофельные ньокки, 5кг оптом заморозка",
    },
    detail: { ko: "냉동 / 12개월", en: "Frozen / 12 months", ru: "Заморозка / 12 месяцев" },
  },
  {
    imageKey: "시금치 뇨끼 Bulk 5kg",
    name: { ko: "시금치 뇨끼 Bulk 5kg", en: "Spinach Gnocchi Bulk 5kg", ru: "Ньокки со шпинатом Bulk 5кг" },
    shortDesc: {
      ko: "시금치가 들어간 그린 뇨끼, 5kg 대용량 냉동 공급",
      en: "Green gnocchi with spinach, 5kg bulk frozen supply",
      ru: "Зелёные ньокки со шпинатом, 5кг оптом заморозка",
    },
    detail: { ko: "냉동 / 12개월", en: "Frozen / 12 months", ru: "Заморозка / 12 месяцев" },
  },
];

const BAKERY_ITEMS: Array<{
  imageKey: string;
  name: LocaleText;
  shortDesc: LocaleText;
  detail: LocaleText;
}> = [
  {
    imageKey: "비건 복숭아 타르트 800g",
    name: { ko: "비건 복숭아 타르트 800g", en: "Vegan Peach Tart 800g", ru: "Веганский тарт с персиком 800г" },
    shortDesc: {
      ko: "황도 복숭아 30% 함유, 비건 타르트 800g",
      en: "Yellow peach 30% vegan tart 800g",
      ru: "Веганский тарт с жёлтым персиком 30%, 800г",
    },
    detail: { ko: "냉동 / 12개월", en: "Frozen / 12 months", ru: "Заморозка / 12 месяцев" },
  },
  {
    imageKey: "비건 블루베리 타르트 800g",
    name: { ko: "비건 블루베리 타르트 800g", en: "Vegan Blueberry Tart 800g", ru: "Веганский тарт с черникой 800г" },
    shortDesc: {
      ko: "블루베리·라즈베리·크랜베리 32% 함유 타르트 800g",
      en: "Blueberry·raspberry·cranberry 32% tart 800g",
      ru: "Тарт с черникой·малиной·клюквой 32%, 800г",
    },
    detail: { ko: "냉동 / 12개월", en: "Frozen / 12 months", ru: "Заморозка / 12 месяцев" },
  },
  {
    imageKey: "비건 말차 케이크 850g",
    name: { ko: "비건 말차 케이크 850g", en: "Vegan Matcha Cake 850g", ru: "Веганский торт матча 850г" },
    shortDesc: {
      ko: "말차 15% 함유, 대용량 850g 냉동 케이크",
      en: "15% matcha, 850g bulk frozen cake",
      ru: "15% матча, замороженный торт 850г",
    },
    detail: { ko: "냉동 / 12개월", en: "Frozen / 12 months", ru: "Заморозка / 12 месяцев" },
  },
  {
    imageKey: "비건 단호박 가토 쇼콜라 800g",
    name: { ko: "비건 단호박 가토 쇼콜라 800g", en: "Vegan Pumpkin Gâteau Chocolat 800g", ru: "Веганский тыквенный шоколадный торт 800г" },
    shortDesc: {
      ko: "단호박 30% 함유, 묵직한 초콜릿 케이크 800g",
      en: "30% pumpkin, rich chocolate cake 800g",
      ru: "30% тыква, плотный шоколадный торт 800г",
    },
    detail: { ko: "냉동 / 12개월", en: "Frozen / 12 months", ru: "Заморозка / 12 месяцев" },
  },
];

/** 수프·소스용 원형 아이템 (카드 박스 없음) */
function SoupSauceItem({
  name,
  description,
  capacity,
  thumbSize = "sm",
  imageSrc,
  lang,
}: {
  name: string | LocaleText;
  description: string | LocaleText;
  capacity: string;
  thumbSize?: "sm" | "lg";
  imageSrc?: string | null;
  lang: string;
}) {
  const nameStr = typeof name === "string" ? name : getLocalizedText(name, lang);
  const descStr = typeof description === "string" ? description : getLocalizedText(description, lang);
  const sizeClass = thumbSize === "lg" ? "h-24 w-24 sm:h-40 sm:w-40" : "h-20 w-20";
  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative mx-auto shrink-0 overflow-hidden rounded-full bg-gray-100 ${sizeClass}`}
      >
        {imageSrc ? (
          <Image src={imageSrc} alt={nameStr} fill className="object-cover" />
        ) : null}
      </div>
      <h3 className="mt-2 text-center text-sm font-semibold text-gray-900">{nameStr}</h3>
      <p className="mt-1 text-center text-xs text-gray-500">{descStr}</p>
      <p className="mt-1 text-center text-xs text-gray-400">{capacity}</p>
    </div>
  );
}

/** 벌크 제품용 썸네일+텍스트 카드 (프로덕트 스타일) */
function BulkProductCard({
  name,
  description,
  detail,
  imageClassName = "",
  imageSrc,
  lang,
}: {
  name: string | LocaleText;
  description?: string | LocaleText;
  detail: string | LocaleText;
  imageClassName?: string;
  imageSrc?: string | null;
  lang: string;
}) {
  const nameStr = typeof name === "string" ? name : getLocalizedText(name, lang);
  const descStr =
    description == null
      ? undefined
      : typeof description === "string"
        ? description
        : getLocalizedText(description, lang);
  const detailStr = typeof detail === "string" ? detail : getLocalizedText(detail, lang);
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div
        className={`relative flex aspect-square items-center justify-center overflow-hidden bg-[#f5f5f5] ${imageClassName}`}
      >
        {imageSrc ? (
          <Image src={imageSrc} alt={nameStr} fill className="object-contain p-4" />
        ) : (
          <span className="text-sm text-gray-500">제품 이미지</span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900">{nameStr}</h3>
        {descStr && (
          <p className="mt-1 text-sm text-gray-500">{descStr}</p>
        )}
        <p className="mt-3 text-xs text-gray-400">{detailStr}</p>
      </div>
    </div>
  );
}

type PageProps = {
  params: Promise<{ lang: string }>;
};

export default async function OemPage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "oem" });

  return (
    <div className="bg-white">
      {/* Section 1. Header */}
      <section className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-gray-600 sm:text-lg">
          {t("subtitle")}
        </p>
      </section>

      {/* Section 2. 기술 & 공장 */}
      <section className="border-t border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
            Slunch&apos;s Own Breakthrough
          </h2>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {BREAKTHROUGH_BLOCKS.map(({ title, description, icon }, idx) => (
              <div
                key={title.ko}
                className="group relative flex min-h-[560px] flex-col rounded-2xl bg-stone-400 px-8 py-12 text-center transition-colors duration-300 hover:bg-white hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] sm:px-10 sm:py-14"
              >
                <p className="font-mono text-base text-white/60 transition-colors duration-300 group-hover:text-gray-300 sm:text-lg">
                  0{idx + 1}
                </p>
                <div className="flex flex-1 items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 transition-colors duration-300 group-hover:bg-[#C8202A]/10">
                    <div className="text-white transition-colors duration-300 group-hover:text-[#C8202A]">
                      {icon}
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm leading-relaxed text-white/70 transition-colors duration-300 group-hover:text-gray-500">
                    {getLocalizedText(description, lang)}
                  </p>
                  <h3 className="mt-4 text-lg font-bold text-white transition-colors duration-300 group-hover:text-gray-900">
                    {getLocalizedText(title, lang)}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              {t("factory_location")}
            </span>
            <span className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              298m²
            </span>
            <span className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              FSSC 22000
            </span>
            <span className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              HACCP
            </span>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            {t("patent_notice")}
          </p>
        </div>
      </section>

      {/* Section 3. B2B 원재료 공급 */}
      <section className="border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
            Innovative Tofu, Powered by Us
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-base text-gray-600">
            {t("tofu_subtitle")}
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {B2B_CARDS.map((card) => (
              <BulkProductCard
                key={card.imageKey}
                name={card.name}
                description={card.shortDesc}
                detail={`${card.bulk} / ${getLocalizedText(card.storage, lang)} / ${getLocalizedText(card.shelf, lang)}`}
                imageSrc={OEM_IMAGE_MAP[card.imageKey] ?? null}
                lang={lang}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 4. 뇨끼 Bulk */}
      <section className="border-t border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {t("section_gnocchi")}
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {GNOCCHI_BULK_ITEMS.map((item) => (
              <BulkProductCard
                key={item.imageKey}
                name={item.name}
                description={item.shortDesc}
                detail={item.detail}
                imageSrc={OEM_IMAGE_MAP[item.imageKey] ?? null}
                lang={lang}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 5. 수프 & 소스 Bulk */}
      <section className="border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {t("section_soup_sauce")}
          </h2>

          <h3 className="mt-8 text-lg font-semibold text-gray-900">{t("section_soup_label")}</h3>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {SOUPS.map((item) => (
              <SoupSauceItem
                key={item.imageKey}
                name={item.name}
                description={item.description}
                capacity={item.capacity}
                thumbSize="lg"
                imageSrc={OEM_IMAGE_MAP[item.imageKey] ?? null}
                lang={lang}
              />
            ))}
          </div>

          <h3 className="mt-14 text-lg font-semibold text-gray-900">{t("section_sauce_label")}</h3>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {SAUCES.map((item) => (
              <SoupSauceItem
                key={item.imageKey}
                name={item.name}
                description={item.description}
                capacity={item.capacity}
                imageSrc={OEM_IMAGE_MAP[item.imageKey] ?? null}
                lang={lang}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 6. 베이커리 Bulk */}
      <section className="border-t border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {t("section_bakery")}
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BAKERY_ITEMS.map((item) => (
              <BulkProductCard
                key={item.imageKey}
                name={item.name}
                description={item.shortDesc}
                detail={item.detail}
                imageSrc={OEM_IMAGE_MAP[item.imageKey] ?? null}
                lang={lang}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 7. CTA */}
      <section className="border-t border-gray-100 bg-[#C8202A] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {t("inquiry_title")}
          </h2>
          <p className="mt-4 text-base text-white/95 sm:text-lg">
            {t("cta_subtitle")}
          </p>
          <div className="mt-8">
            <Link
              href={`/${lang}/quote/oem`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-[#C8202A] transition-opacity hover:opacity-90"
            >
              {t("inquiry_cta")}
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
