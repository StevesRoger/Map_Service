import type { Metadata } from "next";
import { Open_Sans, Noto_Sans_Khmer } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "../styles/globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const notoSansKhmer = Noto_Sans_Khmer({
  subsets: ["khmer"],
  variable: "--font-noto-sans-khmer",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RokTenh Map API - Map Service Platform",
  description: "Professional map API service platform providing geocoding, routing, and place search services",
  keywords: ["map api", "geocoding", "routing", "place search", "map services"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${openSans.variable} ${notoSansKhmer.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
