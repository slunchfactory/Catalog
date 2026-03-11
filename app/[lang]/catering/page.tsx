import Link from "next/link";

const EVENT_TYPES = [
  {
    title: "소모임 & 프라이빗 다이닝",
    description: "10인 내외의 소규모 모임. 코스 구성부터 테이블 세팅까지 조율합니다.",
    bg: "bg-stone-100",
  },
  {
    title: "전시회 & 팝업",
    description: "브랜드 세계관에 맞는 핑거푸드·뷔페 메뉴. 전시 오프닝, 아트페어 등에 최적화.",
    bg: "bg-amber-50",
  },
  {
    title: "기업 행사 & 컨퍼런스",
    description: "50인 이상 대규모 케이터링. 브레이크타임 스낵부터 풀코스 런치까지.",
    bg: "bg-orange-50",
  },
  {
    title: "브랜드 론칭 & 미디어 행사",
    description: "브랜드 메시지를 음식으로 표현합니다. 포토제닉한 비주얼과 맛을 동시에.",
    bg: "bg-teal-50",
  },
] as const;

const PROCESS_STEPS = [
  { step: "01", title: "행사 목적 파악", description: "행사 성격, 인원, 예산, 식이 제한 사항을 먼저 파악합니다." },
  { step: "02", title: "메뉴 기획 & 제안", description: "행사 목적에 맞는 메뉴를 직접 개발·제안합니다. 기성 메뉴 없이 매번 새로 설계합니다." },
  { step: "03", title: "시식 & 확정", description: "주요 메뉴의 시식 과정을 거쳐 최종 구성을 확정합니다." },
  { step: "04", title: "당일 세팅 & 서비스", description: "조리·배송·세팅까지 일괄 진행합니다." },
] as const;

type PageProps = {
  params: Promise<{ lang: string }>;
};

export default async function CateringPage({ params }: PageProps) {
  const { lang } = await params;

  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
          경계 없는 식탁
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-gray-600 sm:text-lg">
          비건과 논비건이 한 테이블에서 맛으로 연결되는 경험.
          슬런치 팩토리의 케이터링은 취향의 장벽을 허물고
          모두가 즐길 수 있는 단란함을 설계합니다.
        </p>
        <p className="mt-3 text-sm text-gray-400">
          소모임부터 기업 행사까지 · 행사 맞춤 메뉴 개발
        </p>
      </section>

      {/* ── Brand Essence ── */}
      <section className="border-t border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400">OUR PHILOSOPHY</p>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              드러내지 않음으로써 더욱 확장됩니다
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-gray-600">
              <p>
                채식의 건강함은 유지하되, 미각을 자극하는 풍부한 텍스처와 감칠맛으로
                논비건조차 채식임을 인지하지 못한 채 접시를 비우게 만듭니다.
              </p>
              <p>
                우리는 식재료의 본질에 집중합니다. 화려한 수식어 대신 맛 자체로
                말하는 요리 — 그것이 슬런치 팩토리가 케이터링을 대하는 방식입니다.
              </p>
            </div>
            <p className="mt-10 text-xl font-medium text-gray-900 sm:text-2xl">
              &ldquo;맛있게 먹었더니, 알고 보니 비건.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ── 행사 유형 ── */}
      <section className="border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="mb-4 font-mono text-xs tracking-widest text-gray-400">EVENT TYPES</p>
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            어떤 자리든 맞춥니다
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {EVENT_TYPES.map((type) => (
              <div
                key={type.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
              >
                <div className={`mb-5 h-32 w-full rounded-xl ${type.bg}`} />
                <h3 className="text-base font-bold text-gray-900">{type.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 진행 프로세스 ── */}
      <section className="border-t border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="mb-4 font-mono text-xs tracking-widest text-gray-400">PROCESS</p>
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            아이디어에서 식탁까지
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
              >
                <p className="font-mono text-xs tracking-widest text-gray-300">{s.step}</p>
                <h3 className="mt-3 text-base font-bold text-gray-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-gray-100 bg-[#111111] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            행사 케이터링을 준비 중이신가요?
          </h2>
          <p className="mt-4 text-base text-white/70">
            행사 규모와 목적을 알려주시면 메뉴부터 직접 제안드립니다
          </p>
          <div className="mt-8">
            <Link
              href={`/${lang}/quote/catering`}
              className="inline-flex items-center rounded-lg bg-[#C8202A] px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              케이터링 문의하기
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
