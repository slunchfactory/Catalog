import { NextRequest, NextResponse } from "next/server";
import { getLocaleFromAcceptLanguage, isValidLocale } from "./lib/locales";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 루트 접속 시 브라우저 언어 감지 후 /ko, /en 등으로 리다이렉트
  if (pathname === "/") {
    const acceptLanguage = request.headers.get("accept-language");
    const locale = getLocaleFromAcceptLanguage(acceptLanguage);
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // /[lang]/... 형태에서 lang이 지원 언어인지 검사
  const segments = pathname.slice(1).split("/");
  const maybeLang = segments[0];
  if (maybeLang && !isValidLocale(maybeLang)) {
    // 지원하지 않는 언어 경로면 기본 언어로 리다이렉트
    const rest = pathname.slice(maybeLang.length + 1);
    return NextResponse.redirect(new URL(`/ko${rest ? `/${rest}` : ""}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  // 루트 + 모든 첫 세그먼트(언어 후보) 경로에 실행. _next, static 제외
  matcher: ["/", "/((?!_next|api|favicon|.*\\.).*)"],
};
