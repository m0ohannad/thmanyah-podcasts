import type { Metadata, Viewport } from "next";
import { ibmPlexSansArabic, ibmPlexSans } from "@/fonts";
import "./globals.css";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "ثمانية بودكاست | اكتشف أفضل البرامج الصوتية",
  description: "منصة ثمانية للبودكاست - ابحث واكتشف أفضل البرامج الصوتية من جميع أنحاء العالم",
  keywords: ["بودكاست", "صوتيات", "ثمانية", "فنجان", "برامج صوتية", "عربي"],
  authors: [{ name: "ثمانية" }],
  creator: "ثمانية",
  publisher: "ثمانية",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://thmanyah-podcasts.com",
    siteName: "ثمانية بودكاست",
    title: "ثمانية بودكاست | اكتشف أفضل البرامج الصوتية",
    description: "منصة ثمانية للبودكاست - ابحث واكتشف أفضل البرامج الصوتية من جميع أنحاء العالم",
  },
  twitter: {
    card: "summary_large_image",
    title: "ثمانية بودكاست | اكتشف أفضل البرامج الصوتية",
    description: "منصة ثمانية للبودكاست - ابحث واكتشف أفضل البرامج الصوتية من جميع أنحاء العالم",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${ibmPlexSansArabic.variable} ${ibmPlexSans.variable}`}>
      <body className="font-arabic antialiased">
        {children}
      </body>
    </html>
  );
}
