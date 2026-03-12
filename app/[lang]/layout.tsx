import { notFound } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { isValidLocale, type Locale } from "@/lib/locales";
import { NextIntlClientProvider } from "next-intl";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  // [lang] 세그먼트 기준으로 해당 언어 메시지 로드 (Client에서 useTranslations이 올바른 locale 사용)
  const messages = (
    await import(`@/messages/${lang}.json`).catch(() =>
      import("@/messages/ko.json")
    )
  ).default as Record<string, unknown>;

  return (
    <NextIntlClientProvider messages={messages} locale={lang}>
      <div className="flex min-h-screen flex-col overflow-x-hidden">
        <Navigation lang={lang as Locale} />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}

