import type { Metadata, Viewport } from "next";
import { ibmPlexSansArabic, ibmPlexSans } from "@/fonts";
import "./globals.css";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "بودكاست ثمانية | اكتشف أفضل البرامج الصوتية",
  description: "منصة ثمانية للبودكاست - ابحث واكتشف أفضل البرامج الصوتية من جميع أنحاء العالم",
  keywords: ["بودكاست", "صوتيات", "ثمانية", "فنجان", "برامج صوتية", "عربي"],
  authors: [{ name: "مهند الحطامي" }],
  creator: "مهند الحطامي",
  publisher: "مهند الحطامي",
  robots: "index, follow",
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
  icons: {
    // icon: '/icon',
    icon: '/favicon.ico',
    apple: '/apple-icon',
    shortcut: '/favicon.ico'
  },
  manifest: '/manifest.json',
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://thmanyah-podcasts.com",
    siteName: "بودكاست ثمانية",
    title: "بودكاست ثمانية | اكتشف أفضل البرامج الصوتية",
    description: "منصة ثمانية للبودكاست - ابحث واكتشف أفضل البرامج الصوتية من جميع أنحاء العالم",
  },
  twitter: {
    card: "summary_large_image",
    title: "بودكاست ثمانية | اكتشف أفضل البرامج الصوتية",
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
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="بودكاست ثمانية" />
      </head>
      <body className="font-arabic antialiased">
        {children}
      </body>
    </html>
  );
}
