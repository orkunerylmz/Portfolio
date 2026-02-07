import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orkun Eryılmaz | Portfolio",
  description: "Software Developer — Building digital experiences",
  keywords: ["developer", "portfolio", "software", "web"],
  authors: [{ name: "Orkun Eryılmaz" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${jetbrains.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
