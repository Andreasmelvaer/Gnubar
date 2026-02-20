import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { JetBrains_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { routing } from "@/i18n/routing";
import "../globals.css";

export const dynamic = 'force-dynamic';

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Gnu Bar — Stavanger",
    template: "%s | Gnu Bar Stavanger",
  },
  description:
    "Gnu Bar — bar og konsertsted i hjertet av Stavanger. Quiz, live musikk, DJ, Music Bingo og mer. Nedre Strandgate 23.",
  keywords: [
    "bar stavanger",
    "pub stavanger",
    "live musikk stavanger",
    "quiz stavanger",
    "utested stavanger",
    "gnu bar",
    "konsert stavanger",
    "nightlife stavanger",
  ],
  authors: [{ name: "Gnu Bar", url: "https://gnubar.no" }],
  creator: "Gnu Bar",
  publisher: "Gnu Bar",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    alternateLocale: ["en_GB"],
    siteName: "Gnu Bar",
    title: "Gnu Bar — Stavanger",
    description:
      "Bar og konsertsted i hjertet av Stavanger. Quiz, live musikk, DJ og mer.",
    url: "https://gnubar.no",
    images: [
      {
        url: "https://gnubar.no/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gnu Bar Stavanger",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gnu Bar — Stavanger",
    description:
      "Bar og konsertsted i hjertet av Stavanger. Quiz, live musikk, DJ og mer.",
    images: ["https://gnubar.no/images/og-image.png"],
  },
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png",
    shortcut: "/images/favicon.png",
  },
  metadataBase: new URL("https://gnubar.no"),
  alternates: {
    canonical: "https://gnubar.no",
    languages: {
      "no-NO": "https://gnubar.no",
      "en": "https://gnubar.no/en",
    },
  },
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="alternate" hrefLang="no" href="https://gnubar.no" />
        <link rel="alternate" hrefLang="en" href="https://gnubar.no/en" />
        <link rel="alternate" hrefLang="x-default" href="https://gnubar.no" />
      </head>
      <body className={`${jetbrainsMono.variable} antialiased bg-gnu-cream text-gnu-black`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
