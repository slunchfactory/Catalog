import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getLocalizedText, type LocaleText } from "@/lib/products";

const EVENT_IMAGES = [
  // 기업 케이터링
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
  // 행사/파티 케이터링
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800",
  // 뷔페 스타일
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800",
  // 도시락/박스 케이터링
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800",
] as const;

const EVENT_TYPES: { title: LocaleText; description: LocaleText; bg: string }[] = [
  {
    title: { ko: "소모임 & 프라이빗 다이닝", en: "Private Dining & Small Gatherings", ru: "Приватный ужин и небольшие встречи" },
    description: {
      ko: "10인 내외의 소규모 모임. 코스 구성부터 테이블 세팅까지 조율합니다.",
      en: "Intimate gatherings of up to 10. We coordinate everything from course structure to table setting.",
      ru: "Камерные встречи до 10 человек. Берём на себя всё — от составления меню до сервировки стола.",
    },
    bg: "bg-stone-100",
  },
  {
    title: { ko: "전시회 & 팝업", en: "Exhibitions & Pop-ups", ru: "Выставки и поп-апы" },
    description: {
      ko: "브랜드 세계관에 맞는 핑거푸드·뷔페 메뉴. 전시 오프닝, 아트페어 등에 최적화.",
      en: "Finger food and buffet menus tailored to your brand world. Perfect for exhibition openings and art fairs.",
      ru: "Фингер-фуд и фуршет в духе вашего бренда. Идеально для открытий выставок и арт-ярмарок.",
    },
    bg: "bg-amber-50",
  },
  {
    title: { ko: "기업 행사 & 컨퍼런스", en: "Corporate Events & Conferences", ru: "Корпоративные мероприятия и конференции" },
    description: {
      ko: "50인 이상 대규모 케이터링. 브레이크타임 스낵부터 풀코스 런치까지.",
      en: "Large-scale catering for 50+ guests. From break-time snacks to full-course lunches.",
      ru: "Кейтеринг для 50+ гостей. От лёгких закусок на перерыв до полноценного обеда.",
    },
    bg: "bg-orange-50",
  },
  {
    title: { ko: "브랜드 론칭 & 미디어 행사", en: "Brand Launches & Media Events", ru: "Запуски брендов и медиа-мероприятия" },
    description: {
      ko: "브랜드 메시지를 음식으로 표현합니다. 포토제닉한 비주얼과 맛을 동시에.",
      en: "We express your brand message through food. Photogenic visuals and flavour, all at once.",
      ru: "Выражаем послание вашего бренда через еду. Фотогеничная подача и вкус — одновременно.",
    },
    bg: "bg-teal-50",
  },
];

const PROCESS_STEPS: { step: string; title: LocaleText; description: LocaleText }[] = [
  {
    step: "01",
    title: { ko: "행사 목적 파악", en: "Understanding the Event", ru: "Анализ мероприятия" },
    description: {
      ko: "행사 성격, 인원, 예산, 식이 제한 사항을 먼저 파악합니다.",
      en: "We start by understanding the nature of the event, headcount, budget, and dietary requirements.",
      ru: "Сначала разбираемся в характере мероприятия, количестве гостей, бюджете и пищевых ограничениях.",
    },
  },
  {
    step: "02",
    title: { ko: "메뉴 기획 & 제안", en: "Menu Planning & Proposal", ru: "Разработка и предложение меню" },
    description: {
      ko: "행사 목적에 맞는 메뉴를 직접 개발·제안합니다. 기성 메뉴 없이 매번 새로 설계합니다.",
      en: "We develop and propose a menu tailored to the event. Every time, from scratch — no off-the-shelf options.",
      ru: "Разрабатываем меню под конкретное мероприятие. Каждый раз с нуля — без готовых шаблонов.",
    },
  },
  {
    step: "03",
    title: { ko: "시식 & 확정", en: "Tasting & Confirmation", ru: "Дегустация и утверждение" },
    description: {
      ko: "주요 메뉴의 시식 과정을 거쳐 최종 구성을 확정합니다.",
      en: "Key dishes go through a tasting session before we finalize the menu.",
      ru: "Ключевые блюда проходят дегустацию перед финальным утверждением меню.",
    },
  },
  {
    step: "04",
    title: { ko: "당일 세팅 & 서비스", en: "Day-of Setup & Service", ru: "Сервис и сетап в день мероприятия" },
    description: {
      ko: "조리·배송·세팅까지 일괄 진행합니다.",
      en: "We handle cooking, delivery, and setup end-to-end.",
      ru: "Берём на себя приготовление, доставку и сервировку — под ключ.",
    },
  },
];

type PageProps = {
  params: Promise<{ lang: string }>;
};

export default async function CateringPage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "catering" });

  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
          {t("hero_title")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-gray-600 sm:text-lg">
          {t("hero_subtitle")}
        </p>
        <p className="mt-3 text-sm text-gray-400">
          {t("hero_note")}
        </p>
      </section>

      {/* ── Brand Essence ── */}
      <section className="border-t border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 font-mono text-xs tracking-widest text-gray-400">OUR PHILOSOPHY</p>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {t("philosophy_title")}
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-gray-600">
              <p>{t("philosophy_body1")}</p>
              <p>{t("philosophy_body2")}</p>
            </div>
            <p className="mt-10 text-xl font-medium text-gray-900 sm:text-2xl">
              {t("philosophy_quote")}
            </p>
          </div>
        </div>
      </section>

      {/* ── 행사 유형 ── */}
      <section className="border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="mb-4 font-mono text-xs tracking-widest text-gray-400">EVENT TYPES</p>
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {t("event_section_title")}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {EVENT_TYPES.map((type, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
              >
                <div className="mb-5 w-full rounded-xl overflow-hidden">
                  <img
                    src={EVENT_IMAGES[idx] ?? EVENT_IMAGES[0]}
                    alt={getLocalizedText(type.title, lang)}
                    className="h-32 w-full object-cover"
                  />
                </div>
                <h3 className="text-base font-bold text-gray-900">{getLocalizedText(type.title, lang)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{getLocalizedText(type.description, lang)}</p>
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
            {t("process_title")}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
              >
                <p className="font-mono text-xs tracking-widest text-gray-300">{s.step}</p>
                <h3 className="mt-3 text-base font-bold text-gray-900">{getLocalizedText(s.title, lang)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{getLocalizedText(s.description, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-gray-100 bg-[#111111] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {t("cta_title")}
          </h2>
          <p className="mt-4 text-base text-white/70">
            {t("cta_subtitle")}
          </p>
          <div className="mt-8">
            <Link
              href={`/${lang}/quote/catering`}
              className="inline-flex items-center rounded-lg bg-[#C8202A] px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {t("cta_button")}
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
