import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Onvora - The Developer System for Web3",
    template: "%s - Onvora",
  },
  description:
    "Stop watching tutorials. Start building real protocols. Interactive in-browser Web3 engineering platform with audit-grade assertion tests.",
  metadataBase: new URL("https://onvora.id"),
  applicationName: "Onvora",
  icons: {
    icon: "/assets/brand/onvora-icon.png",
    apple: "/assets/brand/onvora-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Onvora",
    title: "Onvora - The Developer System for Web3",
    description:
      "Stop watching tutorials. Start building real protocols. Built for developers who learn by shipping.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${jakarta.variable} ${jetbrainsMono.variable} h-full dark antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#08090a] text-[#f7f8f8] selection:bg-[#5e6ad2]/30 selection:text-white">
        <a href="#main" className="skip-link">
          Lompat ke konten utama
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
