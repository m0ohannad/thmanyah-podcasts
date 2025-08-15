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
  authors: [{ name: "ثمانية" }],
  creator: "ثمانية",
  publisher: "ثمانية",
  robots: "index, follow",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/favicon.png' }
    ],
    shortcut: '/favicon.ico'
  },
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
