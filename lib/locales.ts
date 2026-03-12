/** 지원 언어 코드 */
export const SUPPORTED_LOCALES = [
  "ko",
  "en",
  "fr",
  "ja",
  "zh",
  "ar",
  "de",
  "ru"
] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

/** 기본 언어 */
export const DEFAULT_LOCALE: Locale = "ko";

/** 언어 코드 → 표시명 (드롭다운용) */
export const LOCALE_LABELS: Record<Locale, string> = {
  ko: "KO",
  en: "EN",
  fr: "FR",
  ja: "JA",
  zh: "ZH",
  ar: "AR",
  de: "DE",
  ru: "RU"
};

/** 브라우저 Accept-Language와 매칭할 언어 */
const BROWSER_TO_LOCALE: Record<string, Locale> = {
  ko: "ko",
  en: "en",
  fr: "fr",
  ja: "ja",
  "zh-CN": "zh",
  "zh-TW": "zh",
  zh: "zh",
  ar: "ar",
  de: "de",
  ru: "ru"
};

export function getLocaleFromAcceptLanguage(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const parts = acceptLanguage.split(",").map((s) => s.split(";")[0].trim().toLowerCase());
  for (const part of parts) {
    const code = part.slice(0, 2);
    const match = BROWSER_TO_LOCALE[part] ?? BROWSER_TO_LOCALE[code];
    if (match) return match;
  }
  return DEFAULT_LOCALE;
}

export function isValidLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}
