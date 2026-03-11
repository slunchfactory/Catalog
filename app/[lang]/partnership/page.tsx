'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
  reverse = false,
  speed = 0.12,
  bgClass = "bg-stone-200",
}: {
  items: string[];
  reverse?: boolean;
  speed?: number;
  bgClass?: string;
}) {
  const { ref, offset } = useScrollParallax(speed);
  const translateX = reverse ? offset : -offset;

  return (
    <div ref={ref} className="w-full overflow-hidden">
      <div
        className="flex gap-3 will-change-transform"
        style={{ transform: `translateX(${translateX}px)` }}
      >
        {items.map((label, i) => (
          <div
            key={i}
            className="flex flex-shrink-0"
          >
            <div className={`h-36 w-56 flex-shrink-0 rounded-xl ${bgClass} sm:h-40 sm:w-64`} />
          </div>
        ))}
      </div>
    </div>
  );
}

const COLLAB_CATEGORIES = [
  {
    title: "Korean Kits",
    heroBg: "bg-stone-200",
    bgClass: "bg-stone-200",
    tagline: "진정한 한국의 맛을 세계로",
    description:
      "한국의 전통 식재료를 현대적인 밀키트로 재해석했습니다. 해외 편의점·호텔 바이어부터 리테일 파트너까지, 슬런치 팩토리의 레시피로 함께 만들어보세요.",
    items: [
      "비건 칼비면 밀키트 (도삭면 + 고추장 소스 + 간장 볶은 표고버섯 + 비건 파마산)",
      "비건 순두부찌개 키트 (냉동 두부 + 버섯 + 채소 + 비건 고추장 베이스)",
      "비건 잡채 키트 (냉동 당면 + 모둠 채소 + 간장 양념)",
      "비건 된장찌개 키트 (된장 베이스 + 두부 + 버섯 + 채소)",
      "비건 떡볶이 키트 (가래떡 + 비건 고추장 소스 + 두부 피시케이크)",
      "비건 삼각김밥 기획전 (해외 편의점·호텔 납품용, 다양한 필링 구성)",
    ],
    marqueeItems: [
      "비건 칼비면 밀키트",
      "비건 순두부찌개 키트",
      "비건 잡채 키트",
      "비건 된장찌개 키트",
      "비건 떡볶이 키트",
      "비건 삼각김밥 기획전",
    ],
    cells: [
      "col-span-2 row-span-1",
      "col-span-1 row-span-1",
      "col-span-1 row-span-1",
      "col-span-1 row-span-1",
      "col-span-2 row-span-1",
      "col-span-1 row-span-1",
    ],
    gridClass: "grid-cols-4 grid-rows-2 h-[280px]",
  },
  {
    title: "Fusion & European Kits",
    heroBg: "bg-amber-100",
    bgClass: "bg-amber-100",
    tagline: "K-푸드와 유럽식의 경계를 허물다",
    description:
      "K-푸드의 감성과 유럽식 조리법이 만나는 교차점. 글로벌 시장을 겨냥한 퓨전 밀키트를 공동 개발합니다.",
    items: [
      "비건 불고기 파스타 (대두 단백 불고기 + 파스타 채소 믹스)",
      "머쉬룸 리조또 키트 (냉동 버섯 믹스 + 비건 파마산 + 리조또 쌀)",
      "라따뚜이 라이스 키트 (클래식 프렌치 라따뚜이 + 밥, K-비빔 옵션 포함)",
    ],
    marqueeItems: ["비건 불고기 파스타", "머쉬룸 리조또 키트", "라따뚜이 라이스 키트"],
    cells: [
      "col-span-2 row-span-2",
      "col-span-1 row-span-1",
      "col-span-1 row-span-1",
      "col-span-2 row-span-1",
    ],
    gridClass: "grid-cols-4 grid-rows-2 h-[280px]",
  },
  {
    title: "Snacks & Sides",
    heroBg: "bg-orange-100",
    bgClass: "bg-green-100",
    tagline: "간편하게 즐기는 비건 스낵",
    description:
      "간편하게 즐길 수 있는 비건 스낵과 사이드. 편의점·케이터링·호텔 어메니티까지 다양한 채널에 납품 가능합니다.",
    items: [
      "비건 만두 (교자 스타일, 채소·버섯 필링)",
      "비건 전 세트 (녹두전·김치전·버섯전, 냉동 즉석 조리)",
      "채소 튀김 세트 (모둠 채소 라이트 배터, 냉동)",
    ],
    marqueeItems: ["비건 만두", "비건 전 세트", "채소 튀김 세트"],
    cells: [
      "col-span-2 row-span-1",
      "col-span-2 row-span-1",
      "col-span-4 row-span-1",
    ],
    gridClass: "grid-cols-4 grid-rows-2 h-[280px]",
  },
  {
    title: "Beverage",
    heroBg: "bg-teal-100",
    bgClass: "bg-sky-100",
    tagline: "희귀 재료로 만드는 프리미엄 스무디",
    description:
      "희귀 슈퍼푸드와 해조류를 활용한 프리미엄 스무디 라인업. 카페·웰니스 브랜드와의 협업을 환영합니다.",
    items: [
      "바나나·망고·데이츠·코코넛칩",
      "케일·파인애플·사과·해조류",
      "파파야·오렌지·파인애플·대추·바질씨",
      "비트·블루베리·배·해조류젤리·히비스커스",
      "블랙베리·체리·무화과·데이츠·라벤더",
    ],
    marqueeItems: [
      "바나나 망고 데이츠 스무디",
      "케일 파인애플 해조류 스무디",
      "파파야 오렌지 바질씨 스무디",
      "비트 블루베리 히비스커스 스무디",
      "블랙베리 체리 무화과 스무디",
    ],
    cells: [
      "col-span-2 row-span-2",
      "col-span-1 row-span-1",
      "col-span-1 row-span-1",
      "col-span-1 row-span-1",
      "col-span-1 row-span-1",
    ],
    gridClass: "grid-cols-4 grid-rows-2 h-[280px]",
  },
] as const;

const OTHERS_ITEMS = [
  { title: "고단백 밀가루 피자", description: "고단백 밀가루 도우 기반, 비건 치즈 토핑" },
  { title: "저당·대체감미료 디저트", description: "혈당 걱정 없이 즐기는 비건 디저트 라인" },
  { title: "식물성 육류·소스 밀키트", description: "대두 단백 기반 식물성 육류 밀키트" },
] as const;

type PageProps = {
  params: { lang: string };
};

export default function PartnershipPage({ params }: PageProps) {
  const { lang } = params;

  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
          레시피부터 양산까지, 한 곳에서
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-gray-600 sm:text-lg">
          슬런치 팩토리는 아이디어 단계부터 함께합니다. 메뉴 기획, 레시피 개발,
          FSSC 22000 인증 공장에서의 양산까지 — 비건 제품을 처음 만드는
          브랜드에게 가장 빠른 길을 제안합니다.
        </p>
        <p className="mt-3 text-sm text-gray-400">
          현재 파트너십 모집 중 · 최소 로트 협의 가능
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
              {cat.tagline}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600">
              {cat.description}
            </p>
          </div>

          {/* 제품 이미지 패럴랙스 (2행 교차) + 하단 제품명 리스트 */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="my-8 space-y-3 overflow-hidden">
              <ParallaxRow
                items={cat.marqueeItems}
                reverse={idx % 2 === 1}
                speed={0.1}
                bgClass={cat.bgClass}
              />
              <ParallaxRow
                items={cat.marqueeItems}
                reverse={idx % 2 === 0}
                speed={0.1}
                bgClass={cat.bgClass}
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {cat.marqueeItems.map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700"
                >
                  {label}
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
            그 밖에도 함께할 수 있어요
          </h2>
          <p className="mt-3 max-w-xl text-base text-gray-600">
            아래 카테고리 외에도 아이디어가 있다면 언제든지 문의해 주세요.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {OTHERS_ITEMS.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
              >
                <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#111111] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            함께 만들고 싶은 제품이 있나요?
          </h2>
          <p className="mt-4 text-base text-white/70">
            슬런치 팩토리의 기술과 레시피로 당신의 아이디어를 현실로
          </p>
          <div className="mt-8">
            <Link
              href={`/${lang}/quote/oem`}
              className="inline-flex items-center rounded-lg bg-[#C8202A] px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              콜라보 문의하기
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
