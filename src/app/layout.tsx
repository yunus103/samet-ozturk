import type { Metadata } from "next";
import { Cinzel, DM_Sans, Sacramento, Creepster, New_Rocker, Rubik_Dirt } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
  display: "swap",
});

const sacramento = Sacramento({
  subsets: ["latin"],
  variable: "--font-sacramento",
  weight: "400",
  display: "swap",
});

const creepster = Creepster({
  subsets: ["latin"],
  variable: "--font-creepster",
  weight: "400",
  display: "swap",
});

const newRocker = New_Rocker({
  subsets: ["latin"],
  variable: "--font-new-rocker",
  weight: "400",
  display: "swap",
});

const rubikDirt = Rubik_Dirt({
  subsets: ["latin"],
  variable: "--font-rubik-dirt",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${cinzel.variable} ${dmSans.variable} ${sacramento.variable} ${creepster.variable} ${newRocker.variable} ${rubikDirt.variable}`}>
      <body style={{ backgroundColor: "#080808" }}>{children}</body>
    </html>
  );
}
