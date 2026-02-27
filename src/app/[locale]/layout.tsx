import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { JetBrains_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo";
import "../globals.css";

export const dynamic = 'force-dynamic';

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const isNorwegian = locale === "no";
  const localeUrl = isNorwegian ? SITE_URL : `${SITE_URL}/en`;
  const ogLocale = isNorwegian ? "nb_NO" : "en_GB";
  const alternateOgLocale = isNorwegian ? "en_GB" : "nb_NO";

  return {
    title: {
      default: t("siteTitle"),
      template: `%s | ${t("siteTitle")}`,
    },
    description: t("siteDescription"),
    keywords: t("siteKeywords").split(", "),
    authors: [{ name: "Gnu Bar", url: SITE_URL }],
    creator: "Gnu Bar",
    publisher: "Gnu Bar",
    formatDetection: {
      email: false,
      address: false,
      telephone: true,
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: [alternateOgLocale],
      siteName: "Gnu Bar",
      title: t("siteTitle"),
      description: t("ogDescription"),
      url: localeUrl,
      images: [
        {
          url: `${SITE_URL}/images/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Gnu Bar Stavanger",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("siteTitle"),
      description: t("ogDescription"),
      images: [`${SITE_URL}/images/og-image.png`],
    },
    icons: {
      icon: [
        { url: "/images/favicon.png", sizes: "any" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
      shortcut: "/images/favicon.png",
    },
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: localeUrl,
      languages: {
        "nb": SITE_URL,
        "en": `${SITE_URL}/en`,
      },
    },
  };
}

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
