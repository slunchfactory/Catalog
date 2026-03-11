import Link from "next/link";
import Image from "next/image";

const TRUST_ITEMS = [
  { icon: "👥", text: "매장 방문객 50%+ 외국인" },
  { icon: "📅", text: "Since 2011" },
  { icon: "✓", text: "FSSC 22000" },
  { icon: "🏅", text: "블루리본 수상" },
];

const CARDS = [
  {
    title: "제품",
    copy: "김치부터 해조류까지, 슬런치가 만든 비건 식품 라인업",
    href: "products",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    imageAlt: "비건 식품",
  },
  {
    title: "OEM",
    copy: "우리 공장에서 당신의 제품을 만들어드립니다",
    href: "capability",
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&q=80",
    imageAlt: "OEM 공장",
  },
  {
    title: "케이터링",
    copy: "비건/논비건 경계 없는 미식 경험 설계",
    href: "catering",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    imageAlt: "케이터링",
  },
] as const;

type PageProps = {
  params: Promise<{ lang: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;

  return (
    <div className="bg-white">
      {/* Section 1. Hero */}
      <section className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Vegan Food, More Delicious Than Non-Vegan.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-gray-600 sm:text-lg">
          2011년부터 언어와 문화를 넘어 맛으로 소통해온 한국 No.1 비건 팩토리
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={`/${lang}/products`}
            className="w-full rounded-lg bg-[#C8202A] px-8 py-3.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
          >
            제품 보기
          </Link>
          <Link
            href={`/${lang}/capability`}
            className="w-full rounded-lg border-2 border-[#C8202A] px-8 py-3.5 text-center text-sm font-semibold text-[#C8202A] transition-opacity hover:opacity-90 sm:w-auto"
          >
            OEM 문의
          </Link>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-gray-600">
          {TRUST_ITEMS.map(({ icon, text }) => (
            <span key={text} className="flex items-center gap-2">
              <span className="text-lg" aria-hidden="true">{icon}</span>
              <span>{text}</span>
            </span>
          ))}
        </div>
      </section>

      {/* Section 2. 우리가 하는 것 (3개 카드) */}
      <section className="border-t border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2 className="sr-only">우리가 하는 것</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CARDS.map(({ title, copy, href, image, imageAlt }) => (
              <Link
                key={href}
                href={`/${lang}/${href}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
              >
                <div className="relative h-[200px] w-full shrink-0 bg-gray-100">
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#C8202A]">
                    {title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-gray-600">{copy}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-[#C8202A]">
                    자세히 보기
                    <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3. 마무리 */}
      <section className="border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-center text-xl font-medium text-gray-900 sm:text-2xl">
            맛있게 먹었더니, 알고 보니 비건.
          </p>
          <div className="mt-6 text-center">
            <Link
              href={`/${lang}/about`}
              className="inline-flex items-center text-sm font-semibold text-[#C8202A] hover:underline"
            >
              About Slunch →
            </Link>
          </div>
          <div className="mt-12 rounded-lg border border-dashed border-gray-300 bg-gray-50/50 py-12 text-center">
            <p className="text-sm text-gray-500">파트너 로고 (placeholder — 추후 이미지 교체 예정)</p>
          </div>
        </div>
      </section>
    </div>
  );
}
