"use client";

import { type SimulatorStats } from "@/components/PalletSimulator";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";

function localizeShelfLife(
  val: string | undefined,
  t: ReturnType<typeof useTranslations<"fob">>
): string {
  if (!val) return "—";
  return val
    .replace("제조일로부터 ", t("shelf_from_mfg") + " ")
    .replace(/(\d+)개월/g, (_, n) => `${n} ${t("shelf_months")}`);
}

function localizeStorage(
  val: string | undefined,
  t: ReturnType<typeof useTranslations<"fob">>
): string {
  if (!val) return "—";
  return val
    .replace("상온 보관 / 개봉 후 냉장", t("storage_room_open_cold"))
    .replace("냉장 보관 (0–10°C)", t("storage_cold"))
    .replace("냉동 보관 (-18°C 이하)", t("storage_frozen"))
    .replace("냉동 보관 (-18°C)", t("storage_frozen"));
}

function localizeCartonsPallet(
  val: string | undefined,
  t: ReturnType<typeof useTranslations<"fob">>
): string {
  if (!val) return "—";
  return val.replace("박스", t("unit_box"));
}

function PalletSimulatorLoading() {
  const t = useTranslations("fob");
  return (
    <div className="flex h-[400px] items-center justify-center text-sm text-stone-400">
      {t("sim_loading")}
    </div>
  );
}

const PalletSimulator = dynamic(() => import("@/components/PalletSimulator"), {
  ssr: false,
  loading: () => <PalletSimulatorLoading />,
});

type FobProduct = {
  kor: string;
  eng: string;
  tbd?: boolean;
  hsCode?: string;
  features?: string;
  description?: string;
  manufacturer?: string;
  priceMoq1?: number;
  priceMoq4?: number;
  weight?: number;
  productSize?: string;
  srp?: string;
  unitsPerCarton?: number;
  cartonNet?: number;
  cartonGross?: number;
  cbm?: number;
  cartonSize?: string;
  cartonsPerPallet?: string;
  stacking?: string;
  shelfLife?: string;
  ingredients?: string;
  origin?: string;
  nutritionFacts?: boolean;
  fdaRegistered?: boolean;
  fsvp?: boolean;
  certifications?: string[];
  moq?: string;
  storage?: string;
};

const roomTempProducts: FobProduct[] = [
  {
    kor: "비건 김치볶음밥 밀키트",
    eng: "Vegan Kimchi Fried Rice Meal Kit",
    hsCode: "1904.90.9000",
    features: "Cooked grains or grain mixtures (including ready-to-eat meals)",
    description: "100% plant-based ingredients, quick 3-minute cooking, made with over 70% locally sourced kimchi and rice.",
    manufacturer: "SLUNCH Factory",
    priceMoq1: 6.19,
    priceMoq4: 5.97,
    weight: 760,
    productSize: "210×150×78",
    srp: "₩12,000 / $9.9",
    unitsPerCarton: 16,
    cartonNet: 12.1,
    cartonGross: 13.1,
    cbm: 0.0387,
    cartonSize: "410×306×306",
    cartonsPerPallet: "56박스",
    stacking: "7단 · 1단 8개",
    shelfLife: "제조일로부터 9개월",
    ingredients: "양배추, 고춧가루, 파기름",
    origin: "양배추 (한국), 고춧가루 (중국), 파기름 (한국)",
    certifications: ["ISO22000", "FSSC22000", "HACCP"],
    moq: "56박스",
    storage: "상온 보관 / 개봉 후 냉장",
  },
  {
    kor: "비건 김치캔",
    eng: "Vegan Kimchi Can",
    hsCode: "2005.99.1090",
    features: "Other pickled vegetables (including vinegar/salt-preserved), kimchi",
    description: "Clean taste without fish sauce, shelf-stable vegan kimchi can for export, Vegan certified.",
    manufacturer: "보성일조일록",
    priceMoq1: 1.29,
    priceMoq4: 1.15,
    weight: 160,
    productSize: "75×75×50",
    srp: "₩3,000 / $2.9",
    unitsPerCarton: 48,
    cartonNet: 7.68,
    cartonGross: 8.68,
    cbm: 0.0152,
    cartonSize: "442×300×115",
    cartonsPerPallet: "108박스",
    stacking: "18단 · 1단 6개",
    shelfLife: "제조일로부터 36개월",
    ingredients: "양배추, 고춧가루, 파기름",
    origin: "양배추 (한국), 고춧가루 (중국), 파기름 (한국)",
    certifications: ["ISO22000", "FSSC22000", "HACCP", "Vegan"],
    moq: "108박스",
    storage: "상온 보관 / 개봉 후 냉장",
  },
  {
    kor: "비건 김치전 밀키트",
    eng: "Vegan Kimchi Pancake",
    hsCode: "1905.90.1099",
    features: "Prepared breads and cakes (including ready-to-cook types)",
    description: "Easy-to-make vegan kimchi pancake, made only with plant-based ingredients.",
    manufacturer: "SLUNCH Factory",
    priceMoq1: 2.6,
    priceMoq4: 2.38,
    weight: 240,
    productSize: "100×100×95",
    srp: "₩7,000 / $4.9",
    unitsPerCarton: 36,
    cartonNet: 12.4,
    cartonGross: 13.4,
    cbm: 0.0387,
    cartonSize: "410×306×306",
    cartonsPerPallet: "56박스",
    stacking: "7단 · 1단 8개",
    shelfLife: "제조일로부터 12개월",
    ingredients: "양배추, 밀가루, 옥수수가루",
    origin: "양배추 (한국), 밀가루 (미국/호주/캐나다), 옥수수가루 (터키)",
    certifications: ["ISO22000", "FSSC22000", "HACCP"],
    moq: "56박스",
    storage: "상온 보관 / 개봉 후 냉장",
  },
  {
    kor: "슬런치 김치칼국수 밀키트",
    eng: "Slunch Kimchi Kalguksu Meal Kit",
    hsCode: "1902.19.1090",
    features: "Noodle with Korean kimchi and vegetable broth",
    description: "Vegan noodle kit with Korean kimchi and vegetable broth. Easy to cook by boiling for 5 minutes.",
    manufacturer: "SLUNCH Factory",
    priceMoq1: 9.4,
    priceMoq4: 7.1,
    weight: 1110,
    productSize: "220×70×110",
    srp: "₩24,000 / $19.9",
    unitsPerCarton: 30,
    cartonNet: 28.8,
    cartonGross: 13.4,
    cbm: 0.0387,
    cartonSize: "440×350×330",
    cartonsPerPallet: "36박스",
    stacking: "6단 · 1단 6개",
    shelfLife: "제조일로부터 12개월",
    ingredients: "김치(양배추, 고춧가루, 마늘, 생강, 소금), 밀가루, 채수(간장, ...)",
    origin: "양배추 (한국), 밀가루 (미국/호주/캐나다)",
    certifications: ["ISO22000", "FSSC22000", "HACCP"],
    moq: "36박스",
    storage: "상온 보관 / 개봉 후 냉장",
  },
];

const refrigeratedProducts: FobProduct[] = [
  {
    kor: "비건 드레싱 테스터팩 6종",
    eng: "6 Vegan Dressing Pack",
    hsCode: "2103.90.9090",
    features: "Sauce / salad dressing",
    description: "6 types of salad dressing assorted pack.",
    manufacturer: "SLUNCH Factory Co., Ltd.",
    priceMoq1: 4.8,
    priceMoq4: 4.5,
    weight: 150,
    productSize: "120×180×20",
    srp: "₩11,000 / $8",
    unitsPerCarton: 64,
    cartonNet: 10.8,
    cartonGross: 11.8,
    cbm: 0.025,
    cartonSize: "460×340×165",
    cartonsPerPallet: "54박스",
    stacking: "6단 · 1단 10개",
    shelfLife: "12개월",
    ingredients: "6종 샐러드 드레싱 모음",
    origin: "대한민국",
    certifications: ["ISO22000", "FSSC22000", "HACCP"],
    moq: "60박스",
    storage: "냉장 보관 (0–10°C)",
  },
  {
    kor: "비건 랜치 소스",
    eng: "Vegan Ranch Sauce",
    hsCode: "2103.90.9090",
    features: "Sauce / salad dressing",
    description: "Plant-based creamy ranch sauce.",
    manufacturer: "SLUNCH Factory Co., Ltd.",
    priceMoq1: 5.5,
    priceMoq4: 5.2,
    weight: 300,
    productSize: "75×55×155",
    srp: "₩12,000 / $9.9",
    unitsPerCarton: 36,
    cartonNet: 10.8,
    cartonGross: 11.8,
    cbm: 0.025,
    cartonSize: "460×340×165",
    cartonsPerPallet: "54박스",
    stacking: "6단 · 1단 10개",
    shelfLife: "12개월",
    ingredients: "식물성 마요네즈 (42%), 식초, 허브, 마늘, 양파파우더",
    origin: "대한민국",
    certifications: ["ISO22000", "FSSC22000", "HACCP"],
    moq: "60박스",
    storage: "냉장 보관 (0–10°C)",
  },
  {
    kor: "레몬드레싱 소스",
    eng: "Lemon Dressing",
    hsCode: "2103.90.9090",
    features: "Sauce / salad dressing",
    description: "Olive oil based citrus dressing.",
    manufacturer: "SLUNCH Factory Co., Ltd.",
    priceMoq1: 5.5,
    priceMoq4: 5.2,
    weight: 300,
    productSize: "75×55×155",
    srp: "₩12,000 / $9.9",
    unitsPerCarton: 36,
    cartonNet: 10.8,
    cartonGross: 11.8,
    cbm: 0.025,
    cartonSize: "460×340×165",
    cartonsPerPallet: "54박스",
    stacking: "6단 · 1단 10개",
    shelfLife: "12개월",
    ingredients: "올리브오일 (40%), 레몬즙 (35%), 식초, 허브, 마늘",
    origin: "대한민국",
    certifications: ["ISO22000", "FSSC22000", "HACCP"],
    moq: "60박스",
    storage: "냉장 보관 (0–10°C)",
  },
  {
    kor: "분짜 소스",
    eng: "Bun Cha Sauce",
    hsCode: "2103.90.9090",
    features: "Sauce / salad dressing",
    description: "Vietnamese-style vegan dipping sauce.",
    manufacturer: "SLUNCH Factory Co., Ltd.",
    priceMoq1: 3.5,
    priceMoq4: 3.3,
    weight: 300,
    productSize: "75×55×155",
    srp: "₩9,500 / $7",
    unitsPerCarton: 36,
    cartonNet: 10.8,
    cartonGross: 11.8,
    cbm: 0.025,
    cartonSize: "460×340×165",
    cartonsPerPallet: "54박스",
    stacking: "6단 · 1단 10개",
    shelfLife: "12개월",
    ingredients: "비건 피쉬소스 (30%), 라임즙, 설탕, 마늘",
    origin: "대한민국",
    certifications: ["ISO22000", "FSSC22000", "HACCP"],
    moq: "60박스",
    storage: "냉장 보관 (0–10°C)",
  },
  {
    kor: "발사믹 드레싱 소스",
    eng: "Balsamic Sauce",
    hsCode: "2103.90.9090",
    features: "Sauce / salad dressing",
    description: "Balsamic reduction style sauce.",
    manufacturer: "SLUNCH Factory Co., Ltd.",
    priceMoq1: 3.5,
    priceMoq4: 3.3,
    weight: 300,
    productSize: "75×55×155",
    srp: "₩9,500 / $7",
    unitsPerCarton: 36,
    cartonNet: 10.8,
    cartonGross: 11.8,
    cbm: 0.025,
    cartonSize: "460×340×165",
    cartonsPerPallet: "54박스",
    stacking: "6단 · 1단 10개",
    shelfLife: "12개월",
    ingredients: "발사믹식초 (45%), 올리브오일 (30%), 포도농축액",
    origin: "대한민국",
    certifications: ["ISO22000", "FSSC22000", "HACCP"],
    moq: "60박스",
    storage: "냉장 보관 (0–10°C)",
  },
  {
    kor: "오리엔탈 드레싱 소스",
    eng: "Oriental Sauce",
    hsCode: "2103.90.9090",
    features: "Sauce / salad dressing",
    description: "Soy-based Asian dressing.",
    manufacturer: "SLUNCH Factory Co., Ltd.",
    priceMoq1: 3.5,
    priceMoq4: 3.3,
    weight: 300,
    productSize: "75×55×155",
    srp: "₩9,500 / $7",
    unitsPerCarton: 36,
    cartonNet: 10.8,
    cartonGross: 11.8,
    cbm: 0.025,
    cartonSize: "460×340×165",
    cartonsPerPallet: "54박스",
    stacking: "6단 · 1단 10개",
    shelfLife: "12개월",
    ingredients: "간장 (35%), 식초, 마늘, 생강, 참기름",
    origin: "대한민국",
    certifications: ["ISO22000", "FSSC22000", "HACCP"],
    moq: "60박스",
    storage: "냉장 보관 (0–10°C)",
  },
  {
    kor: "감태 버터",
    eng: "Gamtae Butter",
    hsCode: "2103.90.9090",
    features: "Vegan butter / seaweed spread",
    description: "Korean seaweed vegan butter spread.",
    manufacturer: "SLUNCH Factory Co., Ltd.",
    priceMoq1: 5.5,
    priceMoq4: 4.6,
    weight: 140,
    productSize: "65×65×70",
    srp: "₩12,000 / $9.9",
    unitsPerCarton: 60,
    cartonNet: 8.4,
    cartonGross: 9.0,
    cbm: 0.015,
    cartonSize: "400×335×150",
    cartonsPerPallet: "48박스",
    stacking: "8단 · 1단 10개",
    shelfLife: "6개월",
    ingredients: "비건버터 (71.9%), 감태 (25.2%), 마늘, 소금",
    origin: "대한민국",
    certifications: ["ISO22000", "FSSC22000", "HACCP", "Vegan"],
    moq: "80박스",
    storage: "냉장 보관 (0–10°C)",
  },
  {
    kor: "매생이 페스토",
    eng: "Maesaengi Pesto",
    hsCode: "2103.90.9090",
    features: "Vegan pesto / seaweed spread",
    description: "Korean seaweed pesto spread.",
    manufacturer: "SLUNCH Factory Co., Ltd.",
    priceMoq1: 4.7,
    priceMoq4: 4.4,
    weight: 140,
    productSize: "65×65×70",
    srp: "₩11,000 / $8",
    unitsPerCarton: 60,
    cartonNet: 8.4,
    cartonGross: 9.0,
    cbm: 0.015,
    cartonSize: "400×335×150",
    cartonsPerPallet: "48박스",
    stacking: "8단 · 1단 10개",
    shelfLife: "6개월",
    ingredients: "매생이 (51.9%), 아몬드 (27%), 올리브오일, 호두, 마늘",
    origin: "대한민국",
    certifications: ["ISO22000", "FSSC22000", "HACCP", "Vegan"],
    moq: "80박스",
    storage: "냉장 보관 (0–10°C)",
  },
];

const frozenProducts: FobProduct[] = [
  {
    kor: "비건 블루베리 타르트",
    eng: "Vegan Blueberry Tart",
    hsCode: "1905.90.1099",
    features: "Confectionery and tarts (excluding milk & eggs)",
    description: "Rich vegan tart made without milk or butter, made with Korean blueberries, ready to eat after thawing.",
    manufacturer: "SLUNCH Factory",
    priceMoq1: 17.75,
    priceMoq4: 17.24,
    weight: 800,
    productSize: "255×245×60",
    srp: "₩39,000 / $29",
    unitsPerCarton: 8,
    cartonNet: 4.8,
    cartonGross: 5.8,
    cbm: 0.0385,
    cartonSize: "510×260×290",
    cartonsPerPallet: "30박스",
    stacking: "5단 · 1단 6개",
    shelfLife: "제조일로부터 12개월",
    ingredients: "믹스베리, 밀가루, 비건버터",
    origin: "믹스베리 (칠레), 밀가루 (미국), 비건버터 (덴마크)",
    certifications: ["ISO22000", "FSSC22000", "HACCP"],
    moq: "30박스",
    storage: "냉동 보관 (-18°C)",
  },
  {
    kor: "비건 복숭아 타르트",
    eng: "Vegan Peach Tart",
    hsCode: "1905.90.1099",
    features: "Confectionery and tarts (excluding milk & eggs)",
    description: "Premium dessert made with local peaches and vegan pie crust, featuring a crispy texture.",
    manufacturer: "SLUNCH Factory",
    priceMoq1: 16.96,
    priceMoq4: 16.6,
    weight: 800,
    productSize: "255×245×60",
    srp: "₩39,000 / $29",
    unitsPerCarton: 8,
    cartonNet: 4.8,
    cartonGross: 5.8,
    cbm: 0.0385,
    cartonSize: "510×260×290",
    cartonsPerPallet: "30박스",
    stacking: "5단 · 1단 6개",
    shelfLife: "제조일로부터 12개월",
    ingredients: "복숭아, 밀가루, 비건버터",
    origin: "황도복숭아 (한국), 밀가루 (미국), 비건버터 (덴마크)",
    certifications: ["ISO22000", "FSSC22000", "HACCP"],
    moq: "30박스",
    storage: "냉동 보관 (-18°C)",
  },
  {
    kor: "시금치 뇨끼 밀키트",
    eng: "Spinach Gnocchi Meal Kit",
    hsCode: "1902.20.9090",
    features: "Other spaghetti/pasta products (including potato-based)",
    description: "Chewy texture with potato and spinach base, easy to cook, suitable as an export pasta substitute.",
    manufacturer: "SLUNCH Factory",
    priceMoq1: 8.63,
    priceMoq4: 8.19,
    weight: 440,
    productSize: "210×150×72",
    srp: "₩22,000 / $19",
    unitsPerCarton: 20,
    cartonNet: 8.8,
    cartonGross: 9.8,
    cbm: 0.0387,
    cartonSize: "430×310×290",
    cartonsPerPallet: "40박스",
    stacking: "5단 · 1단 8개",
    shelfLife: "제조일로부터 12개월",
    ingredients: "감자, 밀가루, 감자전분",
    origin: "감자 (한국), 밀가루 (미국), 감자전분 (폴란드/독일/덴마크)",
    certifications: ["ISO22000", "FSSC22000", "HACCP", "Vegan"],
    moq: "40박스",
    storage: "냉동 보관 (-18°C)",
  },
  {
    kor: "매생이 크림 펜네",
    eng: "Maesaengi Cream Penne",
    hsCode: "1902.20.9090",
    features: "Other spaghetti/pasta products (including potato-based)",
    description: "Cream-style vegan penne with seaweed base.",
    manufacturer: "SLUNCH Factory Co., Ltd.",
    priceMoq1: 3.2,
    priceMoq4: 3.1,
    weight: 290,
    productSize: "210×150×30",
    srp: "₩6,500 / $5.5",
    unitsPerCarton: 40,
    cartonNet: 10.4,
    cartonGross: 11.6,
    cbm: 0.0387,
    cartonSize: "430×310×290",
    cartonsPerPallet: "40박스",
    stacking: "5단 · 1단 8개",
    shelfLife: "12개월",
    ingredients: "펜네, 매생이 (10%), 두부 (40%), 아몬드, 올리브오일, 마늘",
    origin: "대한민국",
    certifications: ["ISO22000", "FSSC22000", "HACCP", "Vegan"],
    moq: "40박스",
    storage: "냉동 보관 (-18°C)",
  },
  {
    kor: "매생이 트러플 리조또",
    eng: "Maesaengi Truffle Risotto",
    hsCode: "1902.20.9090",
    features: "Other spaghetti/pasta products (including potato-based)",
    description: "Premium truffle-flavored vegan risotto.",
    manufacturer: "SLUNCH Factory Co., Ltd.",
    priceMoq1: 3.5,
    priceMoq4: 3.3,
    weight: 200,
    productSize: "210×150×30",
    srp: "₩7,500 / $6",
    unitsPerCarton: 40,
    cartonNet: 10.0,
    cartonGross: 11.2,
    cbm: 0.0387,
    cartonSize: "430×310×290",
    cartonsPerPallet: "40박스",
    stacking: "5단 · 1단 8개",
    shelfLife: "12개월",
    ingredients: "두부 (43.1%), 백미 (17%), 현미, 매생이, 트러플오일",
    origin: "대한민국",
    certifications: ["ISO22000", "FSSC22000", "HACCP", "Vegan"],
    moq: "40박스",
    storage: "냉동 보관 (-18°C)",
  },
  {
    kor: "비건 복숭아타르트 조각",
    eng: "Vegan Peach Tart (1/6 piece)",
    hsCode: "1905.90.1099",
    features: "Pastry pieces",
    description: "Individual vegan tart slice made with yellow peaches, crispy texture without milk or butter.",
    manufacturer: "SLUNCH Factory",
    priceMoq1: 2.81,
    priceMoq4: 2.59,
    weight: 110,
    productSize: "120×110×30",
    srp: "₩7,000 / $6",
    unitsPerCarton: 108,
    cartonNet: 11.8,
    cartonGross: 12.8,
    cbm: 0.0387,
    cartonSize: "440×330×290",
    cartonsPerPallet: "40박스",
    stacking: "5단 · 1단 8개",
    shelfLife: "제조일로부터 9개월",
    ingredients: "복숭아, 밀가루, 비건버터 (팜오일, 두유, 코코넛오일)",
    origin: "복숭아 (한국), 밀가루 (미국), 비건버터 (덴마크)",
    certifications: ["ISO22000", "FSSC22000", "HACCP", "Vegan"],
    moq: "40박스",
    storage: "냉동 보관 (-18°C)",
  },
  {
    kor: "비건 블루베리타르트 조각",
    eng: "Vegan Blueberry Tart (1/6 piece)",
    hsCode: "1905.90.1099",
    features: "Pastry pieces",
    description: "Vegan tart slice filled with blueberries, combining rich fruit flavor with tender vegan pie crust.",
    manufacturer: "SLUNCH Factory",
    priceMoq1: 2.81,
    priceMoq4: 2.59,
    weight: 110,
    productSize: "120×110×30",
    srp: "₩7,000 / $6",
    unitsPerCarton: 108,
    cartonNet: 11.8,
    cartonGross: 12.8,
    cbm: 0.0387,
    cartonSize: "440×330×290",
    cartonsPerPallet: "40박스",
    stacking: "5단 · 1단 8개",
    shelfLife: "제조일로부터 9개월",
    ingredients: "블루베리, 밀가루, 비건버터 (팜오일, 두유, 코코넛오일)",
    origin: "블루베리 (한국 또는 칠레), 밀가루 (미국), 비건버터 (덴마크)",
    certifications: ["ISO22000", "FSSC22000", "HACCP", "Vegan"],
    moq: "40박스",
    storage: "냉동 보관 (-18°C)",
  },
  {
    kor: "비건 피넛버터초코바 2개입",
    eng: "Vegan Peanut Butter Choco Bar (2 pieces)",
    hsCode: "1806.90.9000",
    features: "Other cocoa-containing foods (e.g., chocolate bars)",
    description: "Soft-textured vegan chocolate bar filled with rich peanut butter, plant-based snack.",
    manufacturer: "SLUNCH Factory",
    priceMoq1: 3.11,
    priceMoq4: 2.89,
    weight: 140,
    productSize: "120×110×30",
    srp: "₩7,000 / $6",
    unitsPerCarton: 108,
    cartonNet: 11.8,
    cartonGross: 12.8,
    cbm: 0.0387,
    cartonSize: "440×330×290",
    cartonsPerPallet: "40박스",
    stacking: "5단 · 1단 8개",
    shelfLife: "제조일로부터 12개월",
    ingredients: "피넛버터 (땅콩, 해바라기유, 소금), 코코아파우더, 비건초콜릿 (코코아매스, 원당, 코코넛오일)",
    origin: "피넛버터 (미국), 코코아 (가나), 비건초콜릿 (이탈리아)",
    certifications: ["ISO22000", "FSSC22000", "HACCP", "Vegan"],
    moq: "40박스",
    storage: "냉동 보관 (-18°C)",
  },
  { kor: "비건 페퍼로니 피자(조각)", eng: "Vegan Pepperoni Pizza Slice", tbd: true },
  { kor: "비건 말차케이크", eng: "Vegan Matcha Cake", tbd: true },
  { kor: "단호박 초코 케이크", eng: "Sweet Pumpkin Chocolate Cake", tbd: true },
  { kor: "슬런치 김치 주먹밥", eng: "Slunch Vegan Kimchi Rice Ball", tbd: true },
  { kor: "간장버터 삼각김밥", eng: "Soy Butter Onigiri", tbd: true },
  { kor: "슬런치 불고기맛 주먹밥", eng: "Slunch Bulgogi Flavor Rice Ball", tbd: true },
  { kor: "슬런치 버섯 주먹밥", eng: "Slunch Mushroom Rice Ball", tbd: true },
  { kor: "슬런치 참치마요맛 주먹밥", eng: "Slunch Tuna Mayo Rice Ball", tbd: true },
];

const CERT_BADGE_CLASS: Record<string, string> = {
  ISO22000: "rounded bg-blue-100 px-1.5 py-0.5 text-xs text-blue-700",
  FSSC22000: "rounded bg-indigo-100 px-1.5 py-0.5 text-xs text-indigo-700",
  HACCP: "rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-700",
  Vegan: "rounded bg-emerald-100 px-1.5 py-0.5 text-xs text-emerald-700",
};

type SubTabId = "roomtemp" | "refrigerated" | "frozen";

const SUB_TABS: { id: SubTabId; label: string; subLabel: string }[] = [
  { id: "roomtemp", label: "실온", subLabel: "Room Temp" },
  { id: "refrigerated", label: "냉장", subLabel: "Refrigerated" },
  { id: "frozen", label: "냉동", subLabel: "Frozen" },
];

function formatCbm(val: number): string {
  return val.toFixed(4);
}

const FOB_BY_CATEGORY = {
  실온: roomTempProducts,
  냉장: refrigeratedProducts,
  냉동: frozenProducts,
} as const;

const SIMULATOR_NAME_TO_FOB_KOR: Record<string, string> = {
  "김치칼국수 밀키트": "슬런치 김치칼국수 밀키트",
  "발사믹 드레싱": "발사믹 드레싱 소스",
  "오리엔탈 드레싱": "오리엔탈 드레싱 소스",
  "피넛버터초코바": "비건 피넛버터초코바 2개입",
  "복숭아타르트 조각": "비건 복숭아타르트 조각",
  "블루베리타르트 조각": "비건 블루베리타르트 조각",
};

function getFobProduct(
  category: "실온" | "냉장" | "냉동",
  simulatorName: string
): FobProduct | undefined {
  const kor = SIMULATOR_NAME_TO_FOB_KOR[simulatorName] ?? simulatorName;
  return FOB_BY_CATEGORY[category].find((p) => p.kor === kor);
}

export default function FobPage() {
  const params = useParams();
  const lang = (params?.lang as string) ?? "ko";
  const t = useTranslations("fob");
  const TAB_LABELS: Record<string, string> = {
    실온: t("tab_room"),
    냉장: t("tab_cold"),
    냉동: t("tab_frozen"),
  };
  const [subTab, setSubTab] = useState<SubTabId>("roomtemp");
  const [simulatorStats, setSimulatorStats] = useState<Record<string, SimulatorStats | null>>({
    실온: null,
    냉장: null,
    냉동: null,
  });
  const handleStatsChange = useCallback((stats: Record<string, SimulatorStats | null>) => {
    setSimulatorStats(stats);
  }, []);

  const hasAnyStats = Object.values(simulatorStats).some(
    (s) => s !== null && s.items.length > 0
  );
  const totalBoxes = hasAnyStats
    ? (["실온", "냉장", "냉동"] as const).reduce(
        (s, cat) => s + (simulatorStats[cat]?.totalBoxes ?? 0),
        0
      )
    : 0;
  const totalCBM = hasAnyStats
    ? (["실온", "냉장", "냉동"] as const).reduce(
        (s, cat) => s + (simulatorStats[cat]?.totalCBM ?? 0),
        0
      )
    : 0;
  const totalAmount = hasAnyStats
    ? (["실온", "냉장", "냉동"] as const).reduce(
        (sum, cat) => {
          const st = simulatorStats[cat];
          if (!st) return sum;
          return (
            sum +
            st.items.reduce((s, it) => {
              const fob = getFobProduct(cat, it.name);
              return s + it.qty * (fob?.unitsPerCarton ?? 0) * (fob?.priceMoq4 ?? 0);
            }, 0)
          );
        },
        0
      )
    : 0;

  const products =
    subTab === "roomtemp"
      ? roomTempProducts
      : subTab === "refrigerated"
        ? refrigeratedProducts
        : frozenProducts;

  return (
    <div className="bg-white">
      {/* 1. Hero — 중앙정렬 */}
      <section className="bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <h1 className="text-4xl font-bold tracking-tight text-[#171717] sm:text-5xl">
            {t("hero_title")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
            {t("hero_subtitle")}
          </p>
          <p className="mt-3 text-xs text-gray-400">
            {t("hero_note")}
          </p>
        </div>
      </section>

      {/* 2. 서브 네비게이션 탭 (실온 / 냉장 / 냉동) — 중앙정렬 */}
      <div className="sticky top-16 z-30 border-b border-gray-200 bg-white">
        <div className="flex justify-center">
          {SUB_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSubTab(tab.id)}
              className={`border-b-2 px-8 py-3 text-sm font-medium transition-colors ${
                subTab === tab.id
                  ? "border-[#C8202A] text-[#C8202A] font-semibold"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {TAB_LABELS[tab.label] ?? tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. 제품 테이블 (탭별 콘텐츠) */}
      <section className="w-full px-0 pb-20 pt-0">
        <div className="max-h-[600px] overflow-x-auto overflow-y-auto border-t border-stone-200">
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="sticky top-0 z-20 bg-stone-700 text-xs text-white">
                <th className="w-48 px-5 py-3 text-left align-top font-medium">{t("col_product")}</th>
                <th className="whitespace-nowrap px-5 py-3 text-left align-top">{t("col_fob_price")}</th>
                <th className="whitespace-nowrap px-5 py-3 text-left align-top">{t("col_srp")}</th>
                <th className="whitespace-nowrap px-5 py-3 text-left align-top">{t("col_weight")}</th>
                <th className="whitespace-nowrap px-5 py-3 text-left align-top">{t("col_units_carton")}</th>
                <th className="whitespace-nowrap px-5 py-3 text-left align-top">{t("col_carton_weight")}</th>
                <th className="whitespace-nowrap px-5 py-3 text-left align-top">{t("col_carton_size")}</th>
                <th className="whitespace-nowrap px-5 py-3 text-left align-top">{t("col_cbm")}</th>
                <th className="whitespace-nowrap px-5 py-3 text-left align-top">{t("col_cartons_pallet")}</th>
                <th className="whitespace-nowrap px-5 py-3 text-left align-top">{t("col_shelf_life")}</th>
                <th className="w-52 min-w-52 whitespace-normal px-5 py-3 text-left align-top">{t("col_ingredients")}</th>
                <th className="w-44 min-w-44 whitespace-normal px-5 py-3 text-left align-top">{t("col_origin")}</th>
                <th className="whitespace-nowrap px-5 py-3 text-left align-top">{t("col_certs")}</th>
                <th className="whitespace-nowrap px-5 py-3 text-left align-top">{t("col_moq")}</th>
                <th className="whitespace-nowrap px-5 py-3 text-left align-top">{t("col_hs_code")}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((row, idx) => (
                <tr
                  key={`${row.kor}-${idx}`}
                  className={row.tbd ? "bg-stone-100" : idx % 2 === 0 ? "bg-white" : "bg-stone-50"}
                >
                  <td className="w-48 min-w-48 px-5 py-3 align-top">
                    <div className="whitespace-nowrap font-semibold text-sm text-[#171717]">{lang === "ko" ? row.kor : row.eng}</div>
                    {row.tbd && (
                      <p className="mt-1 text-xs italic text-gray-400">Spec sheet pending</p>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 align-top text-sm">
                    {row.tbd ? (
                      <span className="italic text-gray-400">—</span>
                    ) : (
                      <>
                        <div>
                          <span className="font-semibold">${row.priceMoq1}</span>
                          <span className="block text-xs text-gray-400">1 Pallet MOQ</span>
                        </div>
                        <div className="mt-1">
                          <span className="text-sm font-semibold text-[#C8202A]">${row.priceMoq4}</span>
                          <span className="block text-xs text-gray-400">4 Pallet MOQ</span>
                        </div>
                      </>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 align-top text-sm">
                    {row.tbd ? <span className="italic text-gray-400">—</span> : row.srp}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 align-top text-sm">
                    {row.tbd ? (
                      <span className="italic text-gray-400">—</span>
                    ) : (
                      `${row.weight} g`
                    )}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 align-top text-sm">
                    {row.tbd ? <span className="italic text-gray-400">—</span> : row.unitsPerCarton}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 align-top text-sm">
                    {row.tbd ? (
                      <span className="italic text-gray-400">—</span>
                    ) : (
                      `Net ${row.cartonNet} kg / Gross ${row.cartonGross} kg`
                    )}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 align-top text-sm">
                    {row.tbd ? (
                      <span className="italic text-gray-400">—</span>
                    ) : (
                      `${row.cartonSize} mm`
                    )}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 align-top text-sm">
                    {row.tbd ? (
                      <span className="italic text-gray-400">—</span>
                    ) : row.cbm != null ? (
                      formatCbm(row.cbm)
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 align-top text-sm">
                    {row.tbd ? (
                      <span className="italic text-gray-400">—</span>
                    ) : (
                      <>
                        {localizeCartonsPallet(row.cartonsPerPallet, t)}
                        <br />
                        <span className="text-xs text-gray-500">{row.stacking}</span>
                      </>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 align-top text-sm">
                    {row.tbd ? <span className="italic text-gray-400">—</span> : localizeShelfLife(row.shelfLife, t)}
                  </td>
                  <td className="w-52 min-w-52 whitespace-normal px-5 py-3 align-top text-sm">
                    {row.tbd ? <span className="italic text-gray-400">—</span> : row.ingredients}
                  </td>
                  <td className="w-44 min-w-44 whitespace-normal px-5 py-3 align-top text-sm">
                    {row.tbd ? <span className="italic text-gray-400">—</span> : row.origin}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 align-top text-sm">
                    {row.tbd ? (
                      <span className="italic text-gray-400">—</span>
                    ) : (
                      <div className="flex flex-col gap-1">
                        {row.certifications?.map((c) => (
                          <span key={c} className={CERT_BADGE_CLASS[c] ?? "rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-700"}>
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 align-top text-sm">
                    {row.tbd ? <span className="italic text-gray-400">—</span> : localizeCartonsPallet(row.moq, t)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 align-top text-sm">
                    {row.tbd ? <span className="italic text-gray-400">—</span> : row.hsCode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Simulator Section — always rendered, outside tab conditional */}
      <section className="mt-16 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#C8202A]">
              {t("sim_label")}
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-[#171717]">
              {t("sim_title")}
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              {t("sim_subtitle")}
            </p>
          </div>
          <PalletSimulator onStatsChange={handleStatsChange} />

          {/* Cargo Estimate — 항상 2열: 좌=견적 테이블, 우=문의 폼 */}
          <div className="mt-8">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                {t("summary_section_label")}
              </span>
              <div className="h-px flex-1 bg-stone-200" />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* 좌: 제품별 견적 테이블 */}
              <div className="space-y-4">
                {!hasAnyStats ? (
                  <div className="overflow-hidden rounded-lg border border-stone-200">
                    <div className="bg-stone-100 px-5 py-2.5">
                      <span className="text-sm font-semibold text-stone-400">{t("summary_waiting")}</span>
                    </div>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-stone-200 text-xs text-stone-400">
                          <th className="px-5 py-2.5 text-left font-medium">{t("summary_product")}</th>
                          <th className="px-5 py-2.5 text-center font-medium">{t("summary_boxes")}</th>
                          <th className="px-5 py-2.5 text-center font-medium">{t("summary_units")}</th>
                          <th className="px-5 py-2.5 text-center font-medium">{t("summary_total_qty")}</th>
                          <th className="px-5 py-2.5 text-right font-medium">{t("summary_total_price")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan={5} className="px-5 py-8 text-center text-xs text-stone-300">
                            {t("sim_subtitle")}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <>
                    {Object.entries(simulatorStats).map(([cat, stats]) => {
                      if (!stats || stats.items.length === 0) return null;
                      return (
                        <div key={cat} className="overflow-hidden rounded-lg border border-stone-200">
                          <div className="flex items-center gap-2 bg-stone-100 px-5 py-2.5">
                            <span className="text-sm font-semibold text-stone-700">{TAB_LABELS[cat] ?? cat}</span>
                            <span className="text-xs text-stone-400">· {stats.containerLabel}</span>
                          </div>
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-stone-200 text-xs text-stone-400">
                                <th className="px-5 py-2.5 text-left font-medium">{t("summary_product")}</th>
                                <th className="px-5 py-2.5 text-center font-medium">{t("summary_boxes")}</th>
                                <th className="px-5 py-2.5 text-center font-medium">{t("summary_units")}</th>
                                <th className="px-5 py-2.5 text-center font-medium">{t("summary_total_qty")}</th>
                                <th className="px-5 py-2.5 text-right font-medium">{t("summary_total_price")}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {stats.items.map((item, i) => {
                                const fob = getFobProduct(cat as "실온" | "냉장" | "냉동", item.name);
                                const unitsPerCarton = fob?.unitsPerCarton ?? 0;
                                const unitPrice = fob?.priceMoq4 ?? 0;
                                const productName = fob ? (lang === "ko" ? fob.kor : fob.eng) : item.name;
                                return (
                                  <tr key={item.id} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                                    <td className="px-5 py-3 font-medium text-stone-800">{productName}</td>
                                    <td className="px-5 py-3 text-center text-stone-600">{item.qty}</td>
                                    <td className="px-5 py-3 text-center text-stone-600">{unitsPerCarton} / {t("unit_box")}</td>
                                    <td className="px-5 py-3 text-center text-stone-600">{item.qty * unitsPerCarton}</td>
                                    <td className="px-5 py-3 text-right font-semibold">${(item.qty * unitsPerCarton * unitPrice).toFixed(2)}</td>
                                  </tr>
                                );
                              })}
                              <tr className="border-t border-stone-200 bg-stone-100">
                                <td colSpan={4} className="px-5 py-2.5 text-right text-xs text-stone-500">{t("summary_subtotal")}</td>
                                <td className="px-5 py-2.5 text-right font-bold">
                                  ${stats.items.reduce((s, i) => {
                                    const f = getFobProduct(cat as "실온" | "냉장" | "냉동", i.name);
                                    return s + i.qty * (f?.unitsPerCarton ?? 0) * (f?.priceMoq4 ?? 0);
                                  }, 0).toFixed(2)}
                                </td>
                              </tr>
                              {(() => {
                                const belowMoq = stats.items.filter(item => {
                                  const fob = getFobProduct(cat as "실온" | "냉장" | "냉동", item.name);
                                  const moqNum = parseInt((fob?.moq ?? "0").replace(/\D/g, ""), 10);
                                  return item.qty > 0 && moqNum > 0 && item.qty < moqNum;
                                });
                                return belowMoq.length > 0 ? (
                                  <tr>
                                    <td colSpan={5} className="px-5 py-2 bg-red-50">
                                      <p className="text-xs text-red-600 font-medium">
                                        {t("summary_moq_warning")}{' '}
                                        {belowMoq.map(i => {
                                          const fob = getFobProduct(cat as "실온" | "냉장" | "냉동", i.name);
                                          const productName = fob ? (lang === "ko" ? fob.kor : fob.eng) : i.name;
                                          const moqLocalized = fob?.moq ? localizeCartonsPallet(fob.moq, t) : "";
                                          return `${productName} (${t("summary_min")} ${moqLocalized}, ${t("summary_current")} ${i.qty} ${t("unit_box")})`;
                                        }).join(' · ')}
                                      </p>
                                    </td>
                                  </tr>
                                ) : null;
                              })()}
                            </tbody>
                          </table>
                        </div>
                      );
                    })}
                    <div className="overflow-hidden rounded-lg border border-stone-300">
                      <div className="bg-stone-800 px-6 py-4">
                        <h3 className="text-base font-semibold text-white">{t("summary_grand_title")}</h3>
                      </div>
                      <div className="bg-white px-6 py-5 flex items-end justify-between">
                        <div className="space-y-1.5 text-sm">
                          <div className="flex gap-8">
                            <span className="text-stone-500">{t("summary_total_boxes")}</span>
                            <span className="font-semibold">{totalBoxes} {t("unit_box")}</span>
                          </div>
                          <div className="flex gap-8">
                            <span className="text-stone-500">{t("summary_total_cbm")}</span>
                            <span className="font-semibold">{totalCBM.toFixed(3)} CBM</span>
                          </div>
                          <p className="text-xs text-stone-400 pt-1">
                            {t("summary_disclaimer")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs uppercase tracking-wider text-stone-400 mb-1">{t("summary_grand_total")}</p>
                          <p className="text-3xl font-bold text-stone-900">
                            ${totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* 우: 견적 문의 폼 — 항상 열려있음 */}
              <div className="h-fit overflow-hidden rounded-lg border border-stone-200">
                <div className="rounded-t-lg bg-stone-800 px-6 py-5">
                  <h2 className="text-lg font-semibold text-white">{t("form_title")}</h2>
                  <p className="mt-1 text-xs text-stone-400">{t("form_note")}</p>
                </div>
                {hasAnyStats && (
                  <div className="border-b border-stone-200 bg-stone-50 px-6 py-3">
                    <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500">{t("form_summary_label")}</p>
                    <div className="space-y-0.5 text-xs text-stone-600">
                      {Object.entries(simulatorStats).map(([cat, stats]) => {
                        if (!stats || stats.items.length === 0) return null;
                        return (
                          <div key={cat}>
                            <span className="font-semibold">{TAB_LABELS[cat] ?? cat}</span>: {stats.items.map((i) => {
                              const fob = getFobProduct(cat as "실온" | "냉장" | "냉동", i.name);
                              const name = fob ? (lang === "ko" ? fob.kor : fob.eng) : i.name;
                              return `${name} ${i.qty} ${t("unit_box")}`;
                            }).join(", ")}
                          </div>
                        );
                      })}
                      <div className="mt-1 border-t border-stone-200 pt-1 font-semibold text-stone-700">
                        {t("summary_total_boxes")} {totalBoxes} {t("unit_box")} · {t("summary_total_cbm")} {totalCBM.toFixed(3)} · ${totalAmount.toFixed(2)} USD FOB
                      </div>
                    </div>
                  </div>
                )}
                <div className="space-y-4 px-6 py-5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-stone-600">
                        {t("form_name")} <span className="text-[#C8202A]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder={t("form_name_placeholder")}
                        className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#C8202A]"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-stone-600">{t("form_title_field")}</label>
                      <input
                        type="text"
                        placeholder={t("form_title_placeholder")}
                        className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#C8202A]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-stone-600">
                      {t("form_company")} <span className="text-[#C8202A]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t("form_company_placeholder")}
                      className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#C8202A]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-stone-600">
                      {t("form_email")} <span className="text-[#C8202A]">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="email@company.com"
                      className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#C8202A]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-stone-600">{t("form_phone")}</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#C8202A]"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-stone-600">{t("form_country")}</label>
                      <input
                        type="text"
                        placeholder={t("form_country_placeholder")}
                        className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#C8202A]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-stone-600">{t("form_notes")}</label>
                    <textarea
                      rows={3}
                      placeholder={t("form_notes_placeholder")}
                      className="w-full resize-none rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#C8202A]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => alert(t("form_alert"))}
                    className="w-full rounded-lg bg-[#C8202A] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#a81920]"
                  >
                    {t("form_submit")}
                  </button>
                  <p className="text-center text-xs text-stone-400">
                    {t("form_privacy")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
