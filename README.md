This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## URL로 업데이트 내용 확인하기

다국어(ko / en / ru) 적용된 페이지는 `/[lang]/경로` 형태입니다. 배포 후 아래 URL로 각 언어별 표시를 확인할 수 있습니다. (localhost 기준: `http://localhost:3000` 뒤에 경로 붙임)

| 페이지 | 한국어 (ko) | 영어 (en) | 러시아어 (ru) |
|--------|-------------|-----------|----------------|
| 홈 | `/ko` | `/en` | `/ru` |
| 제품 (전체) | `/ko/products` | `/en/products` | `/ru/products` |
| 제품 — 김치 | `/ko/products/kimchi` | `/en/products/kimchi` | `/ru/products/kimchi` |
| 제품 — 베이커리 | `/ko/products/bakery` | `/en/products/bakery` | `/ru/products/bakery` |
| 제품 — 디저트 | `/ko/products/dessert` | `/en/products/dessert` | `/ru/products/dessert` |
| 파트너십 | `/ko/partnership` | `/en/partnership` | `/ru/partnership` |
| 케이터링 | `/ko/catering` | `/en/catering` | `/ru/catering` |
| FOB 수출 (단가·시뮬레이터) | `/ko/fob` | `/en/fob` | `/ru/fob` |

- **제품 하위**: 제품명·설명·스펙이 locale에 따라 ko/en/ru로 표시됩니다.
- **FOB**: 단가표, 팔레트 시뮬레이터, 견적 요약·폼 문구가 모두 번역됩니다.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
