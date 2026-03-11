import { notFound } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { isValidLocale, type Locale } from "@/lib/locales";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation lang={lang as Locale} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

