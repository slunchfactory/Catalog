import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const TRUST_ITEMS = [
  { icon: "👥", key: "stat_visitors" },
  { icon: "📅", key: "stat_since" },
  { icon: "✓", key: "stat_fssc" },
  { icon: "🏅", key: "stat_ribbon" },
];

const CARDS = [
  {
    titleKey: "card_products_title" as const,
    copyKey: "card_products_desc" as const,
    href: "products",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
  },
  {
    titleKey: "card_oem_title" as const,
    copyKey: "card_oem_desc" as const,
    href: "capability",
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&q=80",
  },
  {
    titleKey: "card_catering_title" as const,
    copyKey: "card_catering_desc" as const,
    href: "catering",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
  },
] as const;

// public/images/main 폴더 내 콜라보 기업 로고 (실제 파일명 NFD 기준)
const PARTNER_LOGOS = [
  { src: "/images/main/콜라보기업 1.png", name: "Partner 1" },
  { src: "/images/main/콜라보기업 2.png", name: "Partner 2" },
  { src: "/images/main/콜라보기업 3.png", name: "Partner 3" },
  { src: "/images/main/콜라보기업 4.png", name: "Partner 4" },
  { src: "/images/main/콜라보기업 5.png", name: "Partner 5" },
  { src: "/images/main/콜라보기업 6.png", name: "Partner 6" },
  { src: "/images/main/콜라보기업 7.png", name: "Partner 7" },
];

type PageProps = {
  params: Promise<{ lang: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "home" });

  return (
    <div className="bg-white">
      {/* Section 1. Hero */}
      <section className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
          {t("hero_title")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-gray-600 sm:text-lg">
          {t("hero_subtitle")}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={`/${lang}/products`}
            className="w-full rounded-lg bg-[#C8202A] px-8 py-3.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
          >
            {t("cta_products")}
          </Link>
          <Link
            href={`/${lang}/capability`}
            className="w-full rounded-lg border-2 border-[#C8202A] px-8 py-3.5 text-center text-sm font-semibold text-[#C8202A] transition-opacity hover:opacity-90 sm:w-auto"
          >
            {t("cta_oem")}
          </Link>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-gray-600">
          {TRUST_ITEMS.map(({ icon, key }) => (
            <span key={key} className="flex items-center gap-2">
              <span className="text-lg" aria-hidden="true">{icon}</span>
              <span>{t(key)}</span>
            </span>
          ))}
        </div>
      </section>

      {/* Section 2. 우리가 하는 것 (3개 카드) */}
      <section className="border-t border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2 className="sr-only">우리가 하는 것</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CARDS.map(({ titleKey, copyKey, href, image }) => (
              <Link
                key={href}
                href={`/${lang}/${href}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
              >
                <div className="relative h-[200px] w-full shrink-0 bg-gray-100">
                  <Image
                    src={image}
                    alt={t(titleKey)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#C8202A]">
                    {t(titleKey)}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-gray-600">{t(copyKey)}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-[#C8202A]">
                    {t("card_cta")}
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
            {t("brand_quote")}
          </p>
          <div className="mt-6 text-center">
            <Link
              href={`/${lang}/about`}
              className="inline-flex items-center text-sm font-semibold text-[#C8202A] hover:underline"
            >
              {t("about_cta")}
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 py-12">
            {PARTNER_LOGOS.map((logo, i) => (
              <div key={i} className="flex h-16 w-32 items-center justify-center">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-h-full max-w-full object-contain"
                  style={{ filter: "grayscale(100%) brightness(0.6)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
