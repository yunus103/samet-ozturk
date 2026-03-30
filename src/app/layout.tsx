import type { Metadata } from "next";
import { Cinzel, DM_Sans, Kalam, Alex_Brush } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const kalamFont = Kalam({
  subsets: ["latin"],
  variable: "--font-kalam",
  weight: ["700"],
  display: "swap",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  variable: "--font-alex-brush",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${cinzel.variable} ${dmSans.variable} ${kalamFont.variable} ${alexBrush.variable}`}>
      <body style={{ backgroundColor: "#080808" }}>{children}</body>
    </html>
  );
}
