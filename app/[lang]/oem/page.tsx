import Link from "next/link";

const BREAKTHROUGH_BLOCKS = [
  {
    title: "두부 기반 자체 기술",
    description:
      "콩을 분쇄·압착·성형·진공포장하는 자체 공정으로 단백질이 풍부한 완전식품 두부를 만들고, 이를 모든 비건 제품 개발의 기술적 토대로 삼습니다.",
    icon: (
      <svg className="h-8 w-8 text-[#C8202A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "부산물 활용 기술",
    description:
      "두부 제조 과정에서 발생하는 부산물을 독자 기술로 가공해 비건 햄·치즈·잠봉·소스로 재탄생시킵니다. 달걀·우유·버터 없이 만드는 자원순환 식품 기술입니다.",
    icon: (
      <svg className="h-8 w-8 text-[#C8202A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: "비건 생태계 확장",
    description:
      "피자·잠봉뵈르·타르트 등 다양한 밀키트로 확장된 자체 기술. 기후 변화와 식량 문제에 대응하는 지속가능한 식품 기술입니다.",
    icon: (
      <svg className="h-8 w-8 text-[#C8202A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0h.5a2.5 2.5 0 002.5-2.5V3.935M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
] as const;

const B2B_CARDS = [
  { name: "비건 페퍼로니", shortDesc: "두부 32% 함유, 피자·핫도그에 최적화된 식물성 페퍼로니", bulk: "Bulk 600g", storage: "냉동", shelf: "9개월" },
  { name: "비건 잠봉", shortDesc: "두부 34% 함유, 샌드위치용 식물성 햄", bulk: "Bulk 600g", storage: "냉동", shelf: "9개월" },
  { name: "비건 모짜렐라", shortDesc: "두부 34% 함유, 피자·샌드위치에 잘 녹는 식물성 치즈", bulk: "Bulk 600g", storage: "냉동", shelf: "9개월" },
  { name: "비건 체다", shortDesc: "두부 34% 함유, 나초·맥앤치즈용 식물성 체다 치즈", bulk: "Bulk 600g", storage: "냉동", shelf: "9개월" },
] as const;

const SOUPS = [
  { name: "스위트 펌킨 수프", description: "달콤하고 부드러운 단호박 크림 수프", capacity: "200ml" },
  { name: "토마토 당근 수프", description: "새콤달콤한 토마토와 당근의 건강 수프", capacity: "200ml" },
  { name: "아스파라거스 브로콜리 수프", description: "깔끔하고 고소한 그린 채소 수프", capacity: "200ml" },
] as const;

const SAUCES = [
  { name: "마라 소스", description: "얼얼하고 깊은 중화풍 마라 소스", capacity: "1kg" },
  { name: "쏸차이 소스", description: "새콤하고 시원한 발효 채소 딥핑 소스", capacity: "1kg" },
  { name: "차콜 그릴 소스", description: "숯불향 나는 스모키한 바비큐 소스", capacity: "1kg" },
  { name: "비건 시저 드레싱", description: "고소하고 크리미한 비건 시저 드레싱", capacity: "1kg" },
  { name: "블랙페퍼 소스", description: "굵은 통후추의 묵직하고 알싸한 소스", capacity: "1kg" },
  { name: "바질·루꼴라 페스토", description: "신선한 바질과 루꼴라의 허브 페스토", capacity: "1kg" },
] as const;

const BAKERY_ITEMS = [
  { name: "비건 복숭아 타르트 160g", shortDesc: "황도 복숭아 30% 함유, 비건 타르트 160g", detail: "냉동 / 12개월" },
  { name: "비건 블루베리 타르트 160g", shortDesc: "블루베리·라즈베리·크랜베리 32% 함유 타르트", detail: "냉동 / 12개월" },
  { name: "비건 말차 케이크 850g", shortDesc: "말차 15% 함유, 대용량 850g 냉동 케이크", detail: "냉동 / 12개월" },
  { name: "비건 단호박 가토 쇼콜라 800g", shortDesc: "단호박 30% 함유, 묵직한 초콜릿 케이크 800g", detail: "냉동 / 12개월" },
] as const;

/** 수프·소스용 원형 아이템 (카드 박스 없음) */
function SoupSauceItem({
  name,
  description,
  capacity,
  thumbSize = "sm",
}: {
  name: string;
  description: string;
  capacity: string;
  thumbSize?: "sm" | "lg";
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`mx-auto shrink-0 rounded-full bg-gray-100 ${thumbSize === "lg" ? "h-24 w-24 sm:h-40 sm:w-40" : "h-20 w-20"}`}
      />
      <h3 className="mt-2 text-center text-sm font-semibold text-gray-900">{name}</h3>
      <p className="mt-1 text-center text-xs text-gray-500">{description}</p>
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
}: {
  name: string;
  description?: string;
  detail: string;
  imageClassName?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div
        className={`flex aspect-[4/3] items-center justify-center bg-[#f5f5f5] ${imageClassName}`}
      >
        <span className="text-sm text-gray-500">제품 이미지</span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
        <p className="mt-3 text-xs text-gray-400">{detail}</p>
      </div>
    </div>
  );
}

type PageProps = {
  params: Promise<{ lang: string }>;
};

export default async function OemPage({ params }: PageProps) {
  const { lang } = await params;

  return (
    <div className="bg-white">
      {/* Section 1. Header */}
      <section className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Our Craft, Our Capability
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-gray-600 sm:text-lg">
          우리 공장에서 당신의 제품을 만들어드립니다
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
                key={title}
                className="group relative flex min-h-[560px] flex-col rounded-2xl bg-stone-400 px-8 py-12 text-center transition-colors duration-300 hover:bg-white hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] sm:px-10 sm:py-14"
              >
                {/* 번호 */}
                <p className="font-mono text-base text-white/60 transition-colors duration-300 group-hover:text-gray-300 sm:text-lg">
                  0{idx + 1}
                </p>

                {/* 아이콘 — 중앙 영역 */}
                <div className="flex flex-1 items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 transition-colors duration-300 group-hover:bg-[#C8202A]/10">
                    <div className="text-white transition-colors duration-300 group-hover:text-[#C8202A]">
                      {icon}
                    </div>
                  </div>
                </div>

                {/* 텍스트 — 하단 */}
                <div>
                  <p className="text-sm leading-relaxed text-white/70 transition-colors duration-300 group-hover:text-gray-500">
                    {description}
                  </p>
                  <h3 className="mt-4 text-lg font-bold text-white transition-colors duration-300 group-hover:text-gray-900">
                    {title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              📍 부천 경기도
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
            식물성 소시지 제조법 특허 출원 (2023.08)
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
            핵심 비건 원재료를 안정적으로 공급합니다
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {B2B_CARDS.map((card) => (
              <BulkProductCard
                key={card.name}
                name={card.name}
                description={card.shortDesc}
                detail={`${card.bulk} / ${card.storage} / ${card.shelf}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 4. 뇨끼 Bulk */}
      <section className="border-t border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            뇨끼 Bulk
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <BulkProductCard
              name="감자 뇨끼 Bulk 5kg"
              description="쫄깃한 감자 뇨끼, 5kg 대용량 냉동 공급"
              detail="냉동 / 12개월"
            />
            <BulkProductCard
              name="시금치 뇨끼 Bulk 5kg"
              description="시금치가 들어간 그린 뇨끼, 5kg 대용량 냉동 공급"
              detail="냉동 / 12개월"
            />
          </div>
        </div>
      </section>

      {/* Section 5. 수프 & 소스 Bulk */}
      <section className="border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            수프 & 소스 Bulk
          </h2>

          <h3 className="mt-8 text-lg font-semibold text-gray-900">수프 3종 (200ml)</h3>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {SOUPS.map((item) => (
              <SoupSauceItem
                key={item.name}
                name={item.name}
                description={item.description}
                capacity={item.capacity}
                thumbSize="lg"
              />
            ))}
          </div>

          <h3 className="mt-14 text-lg font-semibold text-gray-900">소스 6종 (1kg)</h3>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {SAUCES.map((item) => (
              <SoupSauceItem
                key={item.name}
                name={item.name}
                description={item.description}
                capacity={item.capacity}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 6. 베이커리 Bulk */}
      <section className="border-t border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            베이커리 Bulk
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BAKERY_ITEMS.map((item) => (
              <BulkProductCard
                key={item.name}
                name={item.name}
                description={item.shortDesc}
                detail={item.detail}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 7. CTA */}
      <section className="border-t border-gray-100 bg-[#C8202A] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            OEM 제조 문의
          </h2>
          <p className="mt-4 text-base text-white/95 sm:text-lg">
            제품 아이디어가 있다면 슬런치 팩토리와 함께 만들어보세요
          </p>
          <div className="mt-8">
            <Link
              href={`/${lang}/quote/oem`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-[#C8202A] transition-opacity hover:opacity-90"
            >
              견적 문의하기
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
