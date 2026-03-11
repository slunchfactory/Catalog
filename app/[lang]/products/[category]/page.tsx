import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CATEGORIES,
  CATEGORY_SLUGS,
  getCategoryBySlug,
  shortSpec,
} from "@/lib/products";

function getProductImage(categoryId: string, productName: string): string | null {
  const imageMap: Record<string, Record<string, string>> = {
    riceball: {
      "비건 김치 주먹밥": "/images/products/riceball/vegan-kimchi-riceball.png",
      "비건 간장버터 주먹밥": "/images/products/riceball/vegan-soy-butter-riceball.png",
      "비건 불고기 주먹밥": "/images/products/riceball/vegan-bulgogi-riceball.png",
      "비건 참치마요 주먹밥": "/images/products/riceball/vegan-tuna-mayo-riceball.png",
      "비건 버섯 주먹밥": "/images/products/riceball/vegan-mushroom-riceball.png",
    },
  };
  return imageMap[categoryId]?.[productName] ?? null;
}

type PageProps = {
  params: Promise<{ lang: string; category: string }>;
};

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((category) => ({ category }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { lang, category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  return (
    <div className="bg-white">
      {/* Hero 소개 섹션 */}
      <section className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
          슬런치 팩토리 제품
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-gray-600 sm:text-lg">
          FSSC 22000 인증 공장에서 생산되는 프리미엄 비건 식품.
          <br />
          김치부터 베이커리까지, 맛있으니까 비건입니다.
        </p>
        <p className="mt-3 text-sm text-gray-400">
          비건이라서가 아니라, 맛있어서 선택하는 식품
        </p>
      </section>

      {/* Sub Navigation */}
      <div className="sticky top-16 z-40 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            className="-mb-px flex justify-center gap-6 overflow-x-auto scrollbar-hide"
            aria-label="카테고리"
          >
            {CATEGORIES.map(({ id, label }) => (
              <Link
                key={id}
                href={`/${lang}/products/${id}`}
                className={`shrink-0 border-b-2 py-3 text-sm font-medium transition-colors ${
                  id === slug
                    ? "border-[#C8202A] text-[#C8202A]"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Category Header */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="items-center gap-12 lg:flex">
          {/* Left — Text */}
          <div className="lg:flex-1">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {category.label}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
              {category.desc}
            </p>
            <p className="mt-2 text-sm text-gray-400">
              {category.products.length}개 제품
            </p>
          </div>

          {/* Right — Image placeholder */}
          <div className="mt-8 flex aspect-video items-center justify-center rounded-2xl bg-gray-100 lg:mt-0 lg:flex-1">
            <span className="text-sm text-gray-400">카테고리 대표 이미지</span>
          </div>
        </div>
      </section>

      {/* Product Grid — 김치 섹션: 첫 카드만 세로 2칸 */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div
          className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${
            slug === "kimchi" ? "lg:grid-rows-[minmax(260px,1fr)]" : ""
          }`}
        >
          {category.products.map((product, index) => {
            const isKimchiFirst = slug === "kimchi" && index === 0;
            return (
              <div
                key={product.name}
                className={`flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] ${
                  isKimchiFirst ? "lg:row-span-2" : ""
                }`}
              >
                {/* Thumbnail — riceball은 실제 이미지, 나머지는 플레이스홀더 */}
                {(() => {
                  const imgSrc = getProductImage(slug, product.name);
                  return imgSrc ? (
                    <div
                      className={`relative bg-stone-50 ${
                        isKimchiFirst ? "flex-1 min-h-[200px]" : "aspect-square"
                      }`}
                    >
                      <Image
                        src={imgSrc}
                        alt={product.name}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                  ) : (
                    <div
                      className={`flex items-center justify-center bg-gray-100 ${
                        isKimchiFirst ? "flex-1 min-h-[200px]" : "aspect-square"
                      }`}
                    >
                      <span className="text-sm text-gray-400">제품 이미지</span>
                    </div>
                  );
                })()}

                {/* Info */}
                <div className="shrink-0 p-5">
                  <h2 className="text-lg font-bold text-gray-900">
                    {product.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.shortDesc}
                  </p>
                  <p className="mt-3 text-xs text-gray-400">
                    {shortSpec(product.spec)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
