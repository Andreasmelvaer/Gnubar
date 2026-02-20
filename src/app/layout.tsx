import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

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
  ],
  openGraph: {
    type: "website",
    locale: "nb_NO",
    alternateLocale: "en_GB",
    siteName: "Gnu Bar",
    title: "Gnu Bar — Stavanger",
    description:
      "Bar og konsertsted i hjertet av Stavanger. Quiz, live musikk, DJ og mer.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gnu Bar Stavanger",
      },
    ],
  },
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className={`${jetbrainsMono.variable} antialiased bg-gnu-cream text-gnu-black`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
