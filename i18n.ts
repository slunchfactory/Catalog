import { getRequestConfig } from "next-intl/server";

export const locales = ["ko", "en", "fr", "ja", "zh", "ar", "de", "ru"] as const;
export type AppLocale = (typeof locales)[number];
export const defaultLocale: AppLocale = "ko";

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locale ?? defaultLocale;
  const messages = (
    await import(`./messages/${resolvedLocale}.json`).catch(() =>
      import("./messages/ko.json")
    )
  ).default as Record<string, unknown>;

  return {
    locale: resolvedLocale,
    messages,
  };
});

