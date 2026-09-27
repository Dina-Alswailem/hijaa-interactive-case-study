import type { Metadata } from "next";
import "@fontsource/baloo-bhaijaan-2/600.css";
import "@fontsource/baloo-bhaijaan-2/700.css";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/500.css";
import "@fontsource/ibm-plex-sans-arabic/600.css";
import "@fontsource/ibm-plex-sans-arabic/700.css";
import "./globals.css";

const siteUrl = "https://hijaa-casestudy.dinaalswailem.workers.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Hijaa — Arabic Learning App for Children",
  description:
    "Hijaa is an educational iPad experience designed to help children develop Arabic writing skills through interactive and engaging activities.",
  keywords: ["Hijaa", "Arabic learning", "Arabic writing", "children", "UX UI", "educational app"],
  authors: [{ name: "Dina Alswailem" }],
  creator: "Dina Alswailem",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Hijaa — Arabic Learning App for Children",
    description:
      "An educational iPad experience for developing Arabic writing skills through interactive and engaging activities.",
    url: siteUrl,
    siteName: "Hijaa",
    type: "website",
    locale: "en_US",
    images: [{
      url: `${siteUrl}/og.webp`,
      secureUrl: `${siteUrl}/og.webp`,
      width: 1200,
      height: 630,
      alt: "Hijaa — Arabic Learning App for Children",
      type: "image/webp",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hijaa — Arabic Learning App for Children",
    description:
      "An educational iPad experience for developing Arabic writing skills through interactive activities.",
    images: [`${siteUrl}/og.webp`],
  },
  icons: {
    icon: "/assets/hijaa-original/app-icon.jpg",
    shortcut: "/assets/hijaa-original/app-icon.jpg",
    apple: "/assets/hijaa-original/app-icon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/assets/hijaa-original/app-icon.jpg" type="image/jpeg" />
        <link rel="shortcut icon" href="/assets/hijaa-original/app-icon.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/assets/hijaa-original/app-icon.jpg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
