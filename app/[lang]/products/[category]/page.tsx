import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  CATEGORIES,
  CATEGORY_SLUGS,
  getCategoryBySlug,
  getLocalizedText,
  shortSpec,
} from "@/lib/products";

function getProductImage(categoryId: string, productName: string): string | null {
  const imageMap: Record<string, Record<string, string>> = {
    kimchi: {
      "비건 볶음김치": "/images/products/kimchi/김치캔_bg_tr.png",
      "비건 김치볶음밥": "/images/products/kimchi/김치밀키트_bg_tr.png",
      "비건 김치전": "/images/products/kimchi/김치전%20밀키트.png",
      "비건 김치 칼국수 키트": "/images/products/kimchi/칼국수.png",
    },
    riceball: {
      "비건 김치 주먹밥": "/images/products/rice-ball/vegan-kimchi-riceball.png",
      "비건 간장버터 주먹밥": "/images/products/rice-ball/vegan-soy-butter-riceball.png",
      "비건 불고기 주먹밥": "/images/products/rice-ball/vegan-bulgogi-riceball.png",
      "비건 참치마요 주먹밥": "/images/products/rice-ball/vegan-tuna-mayo-riceball.png",
      "비건 버섯 주먹밥": "/images/products/rice-ball/vegan-mushroom-riceball.png",
    },
    sauce: {
      "슬런치 샐러드 드레싱 5종 테스터": "/images/products/sauce/dressing-tester-5.png",
      "오리엔탈 소스": "/images/products/sauce/oriental-dressing.png",
      "분짜 소스": "/images/products/sauce/buncha-sauce.png",
      "레몬 드레싱": "/images/products/sauce/lemon-dressing.png",
      "비건 랜치": "/images/products/sauce/vegan-ranch.png",
      "발사믹 소스": "/images/products/sauce/balsamic-sauce.png",
    },
    seaweed: {
      "매생이 트러플 리조또 키트": "/images/products/seaweed/maesaengi-truffle-risotto.png",
      "매생이 크림 펜네": "/images/products/seaweed/maesaengi-cream-penne.png",
      "매생이 떡국": "/images/products/seaweed/maesaengi-tteokguk.png",
      "매생이 페스토": "/images/products/seaweed/maesaengi-pesto.png",
      "감태 버터": "/images/products/seaweed/gamtae-butter.png",
    },
    bakery: {
      "비건 말차 케이크": "/images/products/bakery/vegan-matcha-cake.png",
      "비건 단호박 초콜릿 케이크": "/images/products/bakery/vegan-pumpkin-chocolate-cake.png",
      "바질 잠봉뵈르 키트": "/images/products/bakery/basil-jambon-beurre-kit.png",
      "루꼴라 잠봉뵈르 키트": "/images/products/bakery/rucola-jambon-beurre-kit.png",
    },
    pizza: {
      "비건 페퍼로니 피자": "/images/products/pizza/whole-pizza.png",
      "비건 슬라이스 피자": "/images/products/pizza/slice-pizza.png",
    },
    pasta: {
      "시금치 뇨끼 밀키트": "/images/products/pasta/시금치뇨끼.png",
      "감자 뇨끼 밀키트": "/images/products/pasta/감자뇨끼.png",
    },
    dessert: {
      "비건 복숭아 타르트": "/images/products/dessert/복숭아조각.png",
      "비건 블루베리 타르트": "/images/products/dessert/블루베리조각.png",
    },
  };
  return imageMap[categoryId]?.[productName] ?? null;
}

function getCategoryHeroImage(categoryId: string): string | null {
  const heroMap: Record<string, string> = {
    // 한식 (김치)
    kimchi:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=800",
    // 음식/비건 계열
    riceball:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    seaweed:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    // 디저트는 실제 카테고리 대표 이미지 사용
    dessert: "/images/products/dessert/카테고리%20대표%20이미지.jpg",
    bakery:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800",
    // 파스타·피자 계열
    pizza:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800",
    pasta:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800",
    // 소스/병
    sauce:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800",
  };
  return heroMap[categoryId] ?? null;
}

function getPlaceholderProductImage(categoryId: string): string {
  const map: Record<string, string> = {
    kimchi:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=800",
    riceball:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    seaweed:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    bakery:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800",
    dessert:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800",
    pizza:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800",
    pasta:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800",
    sauce:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800",
  };
  return map[categoryId] ?? "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800";
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

  const t = await getTranslations({ locale: lang, namespace: "products" });
  const tDetail = await getTranslations({
    locale: lang,
    namespace: "product_detail",
  });

  return (
    <div className="bg-white">
      {/* Hero 소개 섹션 */}
      <section className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-gray-600 sm:text-lg">
          {t("subtitle")}
        </p>
      </section>

      {/* Sub Navigation */}
      <div className="sticky top-16 z-40 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            className="-mb-px flex justify-center gap-6 overflow-x-auto scrollbar-hide"
            aria-label="카테고리"
          >
            {CATEGORIES.map(({ id }) => (
              <Link
                key={id}
                href={`/${lang}/products/${id}`}
                className={`shrink-0 border-b-2 py-3 text-sm font-medium transition-colors ${
                  id === slug
                    ? "border-[#C8202A] text-[#C8202A]"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                {t(`category_${id}` as "category_kimchi")}
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
              {t(`category_${slug}` as "category_kimchi")}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
              {getLocalizedText(category.desc, lang)}
            </p>
            <p className="mt-2 text-sm text-gray-400">
              {lang === "ko"
                ? `${category.products.length}${tDetail("items")}`
                : `${category.products.length} ${tDetail("items")}`}
            </p>
          </div>

          {/* Right — 카테고리 대표 이미지 */}
          {(() => {
            const heroSrc = getCategoryHeroImage(slug);
            return (
              <div className="mt-8 aspect-video shrink-0 overflow-hidden rounded-2xl bg-gray-100 lg:mt-0 lg:flex-1">
                {heroSrc ? (
                  <img
                    src={heroSrc}
                    alt={t(`category_${slug}` as "category_kimchi")}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="text-sm text-gray-400">
                      카테고리 대표 이미지
                    </span>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </section>

      {/* Product Grid */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 gap-y-6 sm:gap-6 lg:grid-cols-3">
          {category.products.map((product, idx) => {
            const nameKo = getLocalizedText(product.name, "ko");
            const nameDisplay = getLocalizedText(product.name, lang);
            const imgSrc = getProductImage(slug, nameKo);
            return (
              <div
                key={`${slug}-${idx}-${nameKo}`}
                className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
              >
                {/* Thumbnail */}
                {imgSrc ? (
                  <div className="relative aspect-square bg-stone-50">
                    <Image
                      src={imgSrc}
                      alt={nameDisplay}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-stone-200">
                    <img
                      src={getPlaceholderProductImage(slug)}
                      alt={nameDisplay}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                {/* Info */}
                <div className="shrink-0 p-5">
                  <h2 className="text-lg font-bold text-gray-900">
                    {nameDisplay}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {getLocalizedText(product.description, lang)}
                  </p>
                  <p className="mt-3 text-xs text-gray-400">
                    {shortSpec(getLocalizedText(product.spec, lang))}
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
