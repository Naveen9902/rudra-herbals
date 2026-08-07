import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontSerif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Rudra Herbals | Botanical Wisdom, Refined",
    template: "%s | Rudra Herbals",
  },
  description: "Clinical-grade Ayurvedic formulations designed for systemic resilience, deep rest, and sustained clarity.",
  keywords: ["Ayurveda", "Herbal Supplements", "Adaptogens", "Wellness", "Clinical Botany"],
  openGraph: {
    title: "Rudra Herbals",
    description: "Botanical Wisdom, Refined.",
    url: "https://rudraherbals.example.com",
    siteName: "Rudra Herbals",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fontSans.variable} ${fontSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
