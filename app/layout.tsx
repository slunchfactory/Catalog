import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SLUNCH FACTORY",
  description: "SLUNCH FACTORY - Food Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={dmSans.variable}>
      <body className={`${dmSans.className} min-h-screen bg-white text-[#171717] antialiased`}>
        {children}
      </body>
    </html>
  );
}
