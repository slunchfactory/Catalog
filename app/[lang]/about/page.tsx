import Link from "next/link";

const STATS = [
  {
    label: "설립",
    value: "2011",
    description: "한국 최초 비건 식품 전문 팩토리",
  },
  {
    label: "외국인 방문객",
    value: "50%+",
    description: "이태원 매장 기준 방문 고객 비율",
  },
  {
    label: "품질 인증",
    value: "FSSC 22000",
    description: "HACCP 및 국제 식품안전 인증 보유",
  },
] as const;

type PageProps = {
  params: Promise<{ lang: string }>;
};

export default async function AboutPage({ params }: PageProps) {
  const { lang } = await params;

  return (
    <div className="bg-white">
      {/* Section 1. Hero */}
      <section className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
          슬런치 팩토리
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-gray-600 sm:text-lg">
          2011년부터 비건 식품을 만들어온 슬런치 팩토리는
          &ldquo;맛있으니까 비건&rdquo;이라는 믿음 아래,
          언어와 문화를 넘어 전 세계 고객에게 사랑받는 브랜드입니다.
        </p>
      </section>

      {/* Section 2. Stats */}
      <section className="border-t border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-6 sm:grid-cols-3">
            {STATS.map(({ label, value, description }) => (
              <div
                key={label}
                className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
              >
                <p className="text-3xl font-bold text-[#C8202A]">{value}</p>
                <p className="mt-2 text-sm font-semibold text-gray-900">
                  {label}
                </p>
                <p className="mt-1 text-sm text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3. Brand Story */}
      <section className="border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              우리의 이야기
            </h2>
            <div className="mt-8 space-y-6 text-base leading-relaxed text-gray-600">
              <p>
                슬런치 팩토리는 2011년 서울 이태원에서 시작했습니다. 작은
                비건 레스토랑에서 출발해, 지금은 김치, 해조류, 소스류 등
                다양한 비건 식품을 생산하는 전문 팩토리로 성장했습니다.
              </p>
              <p>
                우리의 철학은 단순합니다. 비건이라서 먹는 게 아니라, 맛있어서
                먹는 것. 채식주의자뿐 아니라 누구나 즐길 수 있는 음식을
                만듭니다. 그래서 우리 매장을 찾는 고객의 절반 이상이 비건이
                아닌 일반 소비자이며, 50% 이상이 해외에서 찾아온
                외국인입니다.
              </p>
              <p>
                FSSC 22000과 HACCP 인증을 보유한 자체 공장에서 엄격한 품질
                관리 하에 모든 제품을 생산하며, OEM/ODM 서비스를 통해 글로벌
                파트너들과 함께 성장하고 있습니다.
              </p>
            </div>

            <p className="mt-12 text-center text-xl font-medium text-gray-900 sm:text-2xl">
              &ldquo;맛있게 먹었더니, 알고 보니 비건.&rdquo;
            </p>

            <div className="mt-8 text-center">
              <Link
                href={`/${lang}/products`}
                className="inline-flex items-center rounded-lg bg-[#C8202A] px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                제품 보기
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
