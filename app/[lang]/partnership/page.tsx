"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { getLocalizedText, type LocaleText } from "@/lib/products";

function useScrollParallax(speed = 0.15) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = (windowH - rect.top) / (windowH + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      setOffset((clamped - 0.5) * speed * 1000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return { ref, offset };
}

function ParallaxRow({
  items,
  lang,
  reverse = false,
  speed = 0.12,
  bgClass = "bg-stone-200",
}: {
  items: readonly { label: LocaleText; image: string }[];
  lang: string;
  reverse?: boolean;
  speed?: number;
  bgClass?: string;
}) {
  const { ref, offset } = useScrollParallax(speed);
  const translateX = reverse ? offset : -offset;

  return (
    <div ref={ref} className="w-full overflow-hidden">
      <div
        className="flex gap-2 will-change-transform"
        style={{ transform: `translateX(${translateX}px)` }}
      >
        {items.map((item, i) => (
          <div key={i} className="flex flex-shrink-0">
            <div
              className={`h-44 w-64 flex-shrink-0 overflow-hidden rounded-xl sm:h-52 sm:w-80 ${bgClass}`}
            >
              <img
                src={item.image}
                alt={getLocalizedText(item.label, lang)}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type CollabCategory = {
  title: string;
  heroBg: string;
  bgClass: string;
  tagline: LocaleText;
  description: LocaleText;
  items: LocaleText[];
  marqueeItems: { label: LocaleText; image: string }[];
  cells: string[];
  gridClass: string;
};

const COLLAB_CATEGORIES: CollabCategory[] = [
  {
    title: "Korean Kits",
    heroBg: "bg-stone-200",
    bgClass: "bg-stone-200",
    tagline: {
      ko: "진정한 한국의 맛을 세계로",
      en: "Authentic Korean Flavors, Delivered Globally",
      ru: "Настоящий вкус Кореи — для всего мира",
    },
    description: {
      ko: "한국의 전통 식재료를 현대적인 밀키트로 재해석했습니다. 해외 편의점·호텔 바이어부터 리테일 파트너까지, 슬런치 팩토리의 레시피로 함께 만들어보세요.",
      en: "We reinterpret traditional Korean ingredients as modern meal kits. From overseas convenience stores and hotel buyers to retail partners — let's create together with Slunch Factory recipes.",
      ru: "Традиционные корейские ингредиенты в формате современных наборов для готовки. Для зарубежных байеров convenience-сетей, отелей и ритейла.",
    },
    items: [
      { ko: "비건 칼비면 밀키트 (도삭면 + 고추장 소스 + 간장 볶은 표고버섯 + 비건 파마산)", en: "Vegan Kalguksu Noodle Kit", ru: "Веганский набор Кальгуксу" },
      { ko: "비건 순두부찌개 키트 (냉동 두부 + 버섯 + 채소 + 비건 고추장 베이스)", en: "Vegan Soft Tofu Stew Kit", ru: "Веганский набор Сундубу-тиге" },
      { ko: "비건 잡채 키트 (냉동 당면 + 모둠 채소 + 간장 양념)", en: "Vegan Japchae Kit", ru: "Веганский набор Чапче" },
      { ko: "비건 된장찌개 키트 (된장 베이스 + 두부 + 버섯 + 채소)", en: "Vegan Doenjang Stew Kit", ru: "Веганский набор Твенджан-тиге" },
      { ko: "비건 떡볶이 키트 (가래떡 + 비건 고추장 소스 + 두부 피시케이크)", en: "Vegan Tteokbokki Kit", ru: "Веганский набор Ттокпокки" },
      { ko: "비건 삼각김밥 기획전 (해외 편의점·호텔 납품용, 다양한 필링 구성)", en: "Vegan Onigiri Collection", ru: "Коллекция веганских онигири" },
    ],
    marqueeItems: [
      { label: { ko: "비건 칼비면 밀키트", en: "Vegan Kalguksu Noodle Kit", ru: "Веганский набор Кальгуксу" }, image: "https://images.unsplash.com/photo-1583224994861-6b1f2e54b3a5?w=400" },
      { label: { ko: "비건 순두부찌개 키트", en: "Vegan Soft Tofu Stew Kit", ru: "Веганский набор Сундубу-тиге" }, image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400" },
      { label: { ko: "비건 잡채 키트", en: "Vegan Japchae Kit", ru: "Веганский набор Чапче" }, image: "https://images.unsplash.com/photo-1562802378-063ec186a863?w=400" },
      { label: { ko: "비건 된장찌개 키트", en: "Vegan Doenjang Stew Kit", ru: "Веганский набор Твенджан-тиге" }, image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400" },
      { label: { ko: "비건 떡볶이 키트", en: "Vegan Tteokbokki Kit", ru: "Веганский набор Ттокпокки" }, image: "https://images.unsplash.com/photo-1635363638580-c2809d049eee?w=400" },
      { label: { ko: "비건 삼각김밥 기획전", en: "Vegan Onigiri Collection", ru: "Коллекция веганских онигири" }, image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400" },
    ],
    cells: ["col-span-2 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-2 row-span-1", "col-span-1 row-span-1"],
    gridClass: "grid-cols-4 grid-rows-2 h-[280px]",
  },
  {
    title: "Fusion & European Kits",
    heroBg: "bg-amber-100",
    bgClass: "bg-amber-100",
    tagline: {
      ko: "K-푸드와 유럽식의 경계를 허물다",
      en: "Where K-Food Meets European Cuisine",
      ru: "Там, где K-фуд встречает Европу",
    },
    description: {
      ko: "K-푸드의 감성과 유럽식 조리법이 만나는 교차점. 글로벌 시장을 겨냥한 퓨전 밀키트를 공동 개발합니다.",
      en: "The intersection of K-food sensibility and European cooking. We co-develop fusion meal kits targeting global markets.",
      ru: "Точка пересечения K-фуда и европейской кухни. Совместная разработка фьюжн-наборов для глобального рынка.",
    },
    items: [
      { ko: "비건 불고기 파스타 (대두 단백 불고기 + 파스타 채소 믹스)", en: "Vegan Bulgogi Pasta", ru: "Веганская паста Пульгоги" },
      { ko: "머쉬룸 리조또 키트 (냉동 버섯 믹스 + 비건 파마산 + 리조또 쌀)", en: "Mushroom Risotto Kit", ru: "Набор с грибным ризотто" },
      { ko: "라따뚜이 라이스 키트 (클래식 프렌치 라따뚜이 + 밥, K-비빔 옵션 포함)", en: "Ratatouille Rice Kit", ru: "Набор Рататуй с рисом" },
    ],
    marqueeItems: [
      { label: { ko: "시금치 뇨끼 밀키트", en: "Spinach Gnocchi Meal Kit", ru: "Набор ньокки со шпинатом" }, image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400" },
      { label: { ko: "매생이 크림 펜네", en: "Maesaengi Cream Penne", ru: "Пенне с кремом из мэсэнги" }, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400" },
      { label: { ko: "매생이 트러플 리조또", en: "Maesaengi Truffle Risotto", ru: "Ризотто с мэсэнги и трюфелем" }, image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400" },
      { label: { ko: "비건 페퍼로니 피자", en: "Vegan Pepperoni Pizza", ru: "Веганская пицца пепперони" }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400" },
      { label: { ko: "비건 잠봉 키트", en: "Vegan Jambon Kit", ru: "Набор веганский жамбон" }, image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400" },
      { label: { ko: "감태 버터 파스타", en: "Gamtae Butter Pasta", ru: "Паста с маслом камтэ" }, image: "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=400" },
    ],
    cells: ["col-span-2 row-span-2", "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-2 row-span-1"],
    gridClass: "grid-cols-4 grid-rows-2 h-[280px]",
  },
  {
    title: "Snacks & Sides",
    heroBg: "bg-orange-100",
    bgClass: "bg-green-100",
    tagline: {
      ko: "간편하게 즐기는 비건 스낵",
      en: "Vegan Snacks, Anytime",
      ru: "Веганские снеки — в любое время",
    },
    description: {
      ko: "간편하게 즐길 수 있는 비건 스낵과 사이드. 편의점·케이터링·호텔 어메니티까지 다양한 채널에 납품 가능합니다.",
      en: "Vegan snacks and sides for on-the-go. Available for convenience stores, catering, and hotel amenities.",
      ru: "Веганские закуски и гарниры для удобных каналов сбыта — магазины, кейтеринг, отели.",
    },
    items: [
      { ko: "비건 만두 (교자 스타일, 채소·버섯 필링)", en: "Vegan Dumplings", ru: "Веганские пельмени" },
      { ko: "비건 전 세트 (녹두전·김치전·버섯전, 냉동 즉석 조리)", en: "Vegan Jeon Set", ru: "Набор веганских Чон" },
      { ko: "채소 튀김 세트 (모둠 채소 라이트 배터, 냉동)", en: "Vegetable Fritter Set", ru: "Набор овощных фриттеров" },
    ],
    marqueeItems: [
      { label: { ko: "비건 만두", en: "Vegan Dumplings", ru: "Веганские пельмени" }, image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400" },
      { label: { ko: "비건 전 세트", en: "Vegan Jeon Set", ru: "Набор веганских Чон" }, image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400" },
      { label: { ko: "채소 튀김 세트", en: "Vegetable Fritter Set", ru: "Набор овощных фриттеров" }, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400" },
      { label: { ko: "비건 블루베리 타르트", en: "Vegan Blueberry Tart", ru: "Веганский тарт с черникой" }, image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=400" },
      { label: { ko: "비건 피넛버터 초코바", en: "Vegan Peanut Butter Chocolate Bar", ru: "Веганский батончик арахис-шоколад" }, image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400" },
      { label: { ko: "비건 복숭아 타르트", en: "Vegan Peach Tart", ru: "Веганский тарт с персиком" }, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400" },
    ],
    cells: ["col-span-2 row-span-1", "col-span-2 row-span-1", "col-span-4 row-span-1"],
    gridClass: "grid-cols-4 grid-rows-2 h-[280px]",
  },
  {
    title: "Beverage",
    heroBg: "bg-teal-100",
    bgClass: "bg-sky-100",
    tagline: {
      ko: "희귀 재료로 만드는 프리미엄 스무디",
      en: "Premium Smoothies from Rare Ingredients",
      ru: "Премиальные смузи из редких ингредиентов",
    },
    description: {
      ko: "희귀 슈퍼푸드와 해조류를 활용한 프리미엄 스무디 라인업. 카페·웰니스 브랜드와의 협업을 환영합니다.",
      en: "A premium smoothie lineup using rare superfoods and sea vegetables. Open to collaboration with cafés and wellness brands.",
      ru: "Премиальная линейка смузи из редких суперфудов и морских водорослей. Открыты к сотрудничеству с кафе и wellness-брендами.",
    },
    items: [
      { ko: "바나나·망고·데이츠·코코넛칩", en: "Banana·Mango·Dates·Coconut Chips", ru: "Банан·манго·финики·кокосовая стружка" },
      { ko: "케일·파인애플·사과·해조류", en: "Kale·Pineapple·Apple·Seaweed", ru: "Кейл·ананас·яблоко·водоросли" },
      { ko: "파파야·오렌지·파인애플·대추·바질씨", en: "Papaya·Orange·Pineapple·Jujube·Basil Seeds", ru: "Папайя·апельсин·ананас·финик·семена базилика" },
      { ko: "비트·블루베리·배·해조류젤리·히비스커스", en: "Beet·Blueberry·Pear·Seaweed Jelly·Hibiscus", ru: "Свёкла·черника·груша·желе из водорослей·гибискус" },
      { ko: "블랙베리·체리·무화과·데이츠·라벤더", en: "Blackberry·Cherry·Fig·Dates·Lavender", ru: "Ежевика·вишня·инжир·финики·лаванда" },
    ],
    marqueeItems: [
      { label: { ko: "비건 아몬드 라떼", en: "Vegan Almond Latte", ru: "Веганский миндальный латте" }, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400" },
      { label: { ko: "콤부차", en: "Kombucha", ru: "Комбуча" }, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400" },
      { label: { ko: "비건 스무디", en: "Vegan Smoothie", ru: "Веганский смузи" }, image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400" },
      { label: { ko: "냉압착 주스", en: "Cold-Pressed Juice", ru: "Сок холодного отжима" }, image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400" },
      { label: { ko: "허브티", en: "Herb Tea", ru: "Травяной чай" }, image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400" },
      { label: { ko: "비건 핫초코", en: "Vegan Hot Chocolate", ru: "Веганский горячий шоколад" }, image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400" },
    ],
    cells: ["col-span-2 row-span-2", "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1"],
    gridClass: "grid-cols-4 grid-rows-2 h-[280px]",
  },
];

const OTHERS_ITEMS: { title: LocaleText; description: LocaleText; image: string }[] = [
  {
    title: { ko: "고단백 밀가루 피자", en: "High-Protein Flour Pizza", ru: "Пицца из высокобелковой муки" },
    description: { ko: "고단백 밀가루 도우 기반, 비건 치즈 토핑", en: "High-protein flour dough base, vegan cheese topping", ru: "Основа из высокобелкового теста, веганский сыр и топпинги" },
    image: "/images/partnership/제안2.png",
  },
  {
    title: { ko: "저당·대체감미료 디저트", en: "Low-Sugar Desserts", ru: "Десерты с низким содержанием сахара" },
    description: { ko: "혈당 걱정 없이 즐기는 비건 디저트 라인", en: "Vegan dessert line you can enjoy without worrying about blood sugar", ru: "Линейка веганских десертов без забот о уровне сахара" },
    image: "/images/partnership/제안1.png",
  },
  {
    title: { ko: "식물성 육류·소스 밀키트", en: "Plant-Based Meat & Sauce Kit", ru: "Набор с растительным мясом и соусом" },
    description: { ko: "대두 단백 기반 식물성 육류·소스 밀키트", en: "Plant-based meat and sauce meal kit with soy protein base", ru: "Набор с растительным мясом и соусом на соевом белке" },
    image: "/images/partnership/제안3.png",
  },
];

type PageProps = {
  params: Promise<{ lang: string }>;
};

export default function PartnershipPage({ params }: PageProps) {
  const { lang } = use(params);
  const t = useTranslations("partnership");

  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
          {t("hero_title")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-gray-600 sm:text-lg">
          {t("hero_subtitle")}
        </p>
        <p className="mt-3 text-sm text-gray-400">
          {t("hero_note")}
        </p>
      </section>

      {/* ── 카테고리 반복 섹션 ── */}
      {COLLAB_CATEGORIES.map((cat, idx) => (
        <section
          key={cat.title}
          className={`border-t border-gray-100 pb-14 pt-10 sm:pb-16 sm:pt-12 lg:pb-20 lg:pt-16 ${
            idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
          }`}
        >

          {/* 히어로 이미지 플레이스홀더 */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className={`${cat.heroBg} h-64 w-full rounded-2xl sm:h-80 lg:h-96`} />
          </div>

          {/* 넘버 · 제목 · 태그라인 · 설명 */}
          <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 lg:pt-10">
            <p className="font-mono text-[11px] tracking-widest text-gray-400">
              0{idx + 1}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              {cat.title}
            </h2>
            <p className="mt-1 text-base font-semibold text-[#C8202A]">
              {getLocalizedText(cat.tagline, lang)}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600">
              {getLocalizedText(cat.description, lang)}
            </p>
          </div>

          {/* 제품 이미지 패럴랙스 (2행 교차) — 풀스크린 너비 */}
          <div className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden space-y-3 my-8">
            <ParallaxRow
              items={[...cat.marqueeItems]}
              lang={lang}
              reverse={idx % 2 === 1}
              speed={0.1}
              bgClass={cat.bgClass}
            />
            <ParallaxRow
              items={[...cat.marqueeItems]}
              lang={lang}
              reverse={idx % 2 === 0}
              speed={0.1}
              bgClass={cat.bgClass}
            />
          </div>

          {/* 하단 제품명 리스트 — 기존 max-width 컨테이너 유지 */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2">
              {cat.marqueeItems.map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700"
                >
                  {getLocalizedText(item.label, lang)}
                </span>
              ))}
            </div>
          </div>

        </section>
      ))}

      {/* ── Others ── */}
      <section className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {t("others_title")}
          </h2>
          <p className="mt-3 max-w-xl text-base text-gray-600">
            {t("others_desc")}
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {OTHERS_ITEMS.map((item, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
              >
                <div className="relative aspect-[4/3] w-full bg-gray-100">
                  <Image
                    src={item.image}
                    alt={getLocalizedText(item.title, lang)}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-base font-bold text-gray-900">{getLocalizedText(item.title, lang)}</h3>
                  <p className="mt-2 text-sm text-gray-500">{getLocalizedText(item.description, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#111111] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {t("cta_title")}
          </h2>
          <p className="mt-4 text-base text-white/70">
            {t("cta_subtitle")}
          </p>
          <div className="mt-8">
            <Link
              href={`/${lang}/quote/oem`}
              className="inline-flex items-center rounded-lg bg-[#C8202A] px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {t("cta_button")}
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
