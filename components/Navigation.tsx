"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import type { Locale } from "@/lib/locales";
import { SUPPORTED_LOCALES, LOCALE_LABELS } from "@/lib/locales";
import { useTranslations } from "next-intl";

const NAV_ITEMS = [
  { href: "about", key: "about" },
  { href: "products", key: "products" },
  { href: "oem", key: "oem" },
  { href: "partnership", key: "partnership" },
  { href: "catering", key: "catering" },
  { href: "fob", key: "fob" },
];

type NavigationProps = {
  lang: Locale;
};

export function Navigation({ lang }: NavigationProps) {
  const tNav = useTranslations("navigation");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // 현재 경로에서 언어 제거한 path (같은 경로로 언어만 교체용)
  const pathWithoutLang = pathname.replace(new RegExp(`^/${lang}`), "") || "/";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[#eeeeee] bg-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* 로고 */}
        <Link href={`/${lang}`} className="relative flex items-center transition-opacity hover:opacity-90">
          <Image
            src="/common/logo.png"
            alt="SLUNCH FACTORY"
            width={160}
            height={40}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>

        {/* 데스크톱 메뉴 */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map(({ href, key }) => {
            const to = `/${lang}/${href}`;
            const isActive = pathname === to || pathname.startsWith(to + "/");
            return (
              <Link
                key={href}
                href={to}
                className={`text-sm font-medium transition-colors ${
                  isActive ? "text-[#C8202A]" : "text-black hover:text-[#C8202A]"
                }`}
              >
                {tNav(key)}
              </Link>
            );
          })}
        </div>

        {/* 언어 선택 + 햄버거 */}
        <div className="flex items-center gap-4">
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-1 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              aria-expanded={langOpen}
              aria-haspopup="listbox"
            >
              {LOCALE_LABELS[lang]}
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {langOpen && (
              <ul
                role="listbox"
                className="absolute right-0 top-full mt-1 min-w-[4rem] rounded border border-gray-200 bg-white py-1 shadow-lg"
              >
                {SUPPORTED_LOCALES.map((locale) => (
                  <li key={locale} role="option">
                    <Link
                      href={`/${locale}${pathWithoutLang === "/" ? "" : pathWithoutLang}`}
                      className={`block px-3 py-2 text-sm hover:bg-gray-100 ${
                        locale === lang ? "bg-[#C8202A]/10 font-medium text-[#C8202A]" : "text-gray-700"
                      }`}
                      onClick={() => setLangOpen(false)}
                    >
                      {LOCALE_LABELS[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="button"
            className="rounded p-2 text-gray-600 hover:bg-gray-100 md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="메뉴 열기"
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* 모바일 메뉴 */}
      {mobileOpen && (
        <div className="border-t border-[#eeeeee] bg-white md:hidden">
          <ul className="flex flex-col px-5 py-4">
            {NAV_ITEMS.map(({ href, key }) => {
              const to = `/${lang}/${href}`;
              const isActive = pathname === to;
              return (
                <li key={href}>
                  <Link
                    href={to}
                    className={`block py-3 text-sm font-medium ${
                      isActive ? "text-[#C8202A]" : "text-black hover:text-[#C8202A]"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {tNav(key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
