import Link from "next/link";
import { getTranslations } from "next-intl/server";

type PageProps = {
  params: Promise<{ lang: string }>;
};

export default async function AboutPage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "about" });

  const stats = [
    { value: "2011", labelKey: "stat_founded", descKey: "stat_founded_desc" },
    { value: "50%+", labelKey: "stat_visitors", descKey: "stat_visitors_desc" },
    { value: "FSSC 22000", labelKey: "stat_cert", descKey: "stat_cert_desc" },
  ];

  return (
    <div className="bg-white">
      {/* Section 1. Hero */}
      <section className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-gray-600 sm:text-lg">
          {t("subtitle")}
        </p>
      </section>

      {/* Section 2. Stats */}
      <section className="border-t border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-6 sm:grid-cols-3">
            {stats.map(({ value, labelKey, descKey }) => (
              <div
                key={labelKey}
                className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
              >
                <p className="text-3xl font-bold text-[#C8202A]">{value}</p>
                <p className="mt-2 text-sm font-semibold text-gray-900">
                  {t(labelKey)}
                </p>
                <p className="mt-1 text-sm text-gray-600">{t(descKey)}</p>
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
              {t("story_title")}
            </h2>
            <div className="mt-8 space-y-6 text-base leading-relaxed text-gray-600">
              <p>{t("story_1")}</p>
              <p>{t("story_2")}</p>
              <p>{t("story_3")}</p>
            </div>

            <p className="mt-12 text-center text-xl font-medium text-gray-900 sm:text-2xl">
              &ldquo;{t("quote")}&rdquo;
            </p>

            <div className="mt-8 text-center">
              <Link
                href={`/${lang}/products`}
                className="inline-flex items-center rounded-lg bg-[#C8202A] px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                {t("cta_products")}
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
