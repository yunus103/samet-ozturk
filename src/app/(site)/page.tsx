import { Metadata } from "next";
import { getClient } from "@/sanity/lib/client";
import { homePageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { VideosSection } from "@/components/sections/VideosSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { ContactSection } from "@/components/sections/ContactSection";
import { WaveDivider } from "@/components/ui/WaveDivider";

// On-demand revalidation only — webhook triggers revalidateTag("home")
export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getClient().fetch(homePageQuery, {}, { cache: "force-cache", next: { tags: ["home"] } });
  return buildMetadata({
    title: data?.heroFirstName
      ? `${data.heroFirstName} ${data.heroLastName} — Perküsyon Sanatçısı`
      : "Samet Öztürk — Perküsyon Sanatçısı",
    canonicalPath: "/",
    pageSeo: data?.seo,
  });
}

export default async function HomePage() {
  const data = await getClient().fetch(
    homePageQuery,
    {},
    { cache: "force-cache", next: { tags: ["home"] } }
  );

  return (
    <>
      {/* 01 — Hero */}
      <HeroSection data={data} />

      <WaveDivider />

      {/* 02 — Hakkında */}
      <AboutSection data={data} />

      <WaveDivider />

      {/* 03 — Showreel & Videolar */}
      <VideosSection data={data} />

      <WaveDivider />

      {/* 04 — Galeri */}
      <GallerySection data={data} />

      <WaveDivider />

      {/* 05 — İletişim */}
      <ContactSection data={data} />
    </>
  );
}
