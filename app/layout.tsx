import type { Metadata } from "next";
import "@fontsource/baloo-bhaijaan-2/600.css";
import "@fontsource/baloo-bhaijaan-2/700.css";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/500.css";
import "@fontsource/ibm-plex-sans-arabic/600.css";
import "@fontsource/ibm-plex-sans-arabic/700.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hijaa-case-study.dina1-4075.chatgpt.site"),
  title: "هِجاء — حرفًا حرفًا، تبدأ الكلمة",
  description:
    "دراسة حالة تفاعلية لتطبيق هِجاء: تجربة iPad عربية تساعد الأطفال ذوي صعوبات التعلّم على اكتشاف الحروف بالصوت والصورة واللمس.",
  keywords: ["هِجاء", "تعليم الحروف العربية", "صعوبات التعلّم", "UX UI", "تطبيق تعليمي"],
  authors: [{ name: "دينا السويلم" }],
  creator: "دينا السويلم",
  openGraph: {
    title: "هِجاء — حرفًا حرفًا، تبدأ الكلمة",
    description: "تجربة تعليمية عربية متعددة الحواس للأطفال ذوي صعوبات التعلّم.",
    type: "website",
    locale: "ar_SA",
    images: [{
      url: "/assets/hijaa-original/app-icon.jpg",
      width: 1024,
      height: 1024,
      alt: "أيقونة تطبيق هِجاء الأصلية",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "هِجاء — حرفًا حرفًا، تبدأ الكلمة",
    description: "تجربة تعليمية عربية متعددة الحواس.",
    images: ["/assets/hijaa-original/app-icon.jpg"],
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
      <body>{children}</body>
    </html>
  );
}
