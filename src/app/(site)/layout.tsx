import { getClient } from "@/sanity/lib/client";
import { layoutQuery, homePageQuery } from "@/sanity/lib/queries";
import { Navbar } from "@/components/layout/Navbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { ScrollProgressBar } from "@/components/layout/ScrollProgressBar";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { JsonLd, organizationJsonLd } from "@/components/seo/JsonLd";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [layout, pageData] = await Promise.all([
    getClient().fetch(layoutQuery, {}, { next: { tags: ["layout"] } }),
    getClient().fetch(homePageQuery, {}, { next: { tags: ["home"] } }),
  ]);

  return (
    <>
      {/* Global İnteraktif Olmayan Katmanlar */}
      <GrainOverlay />
      <CustomCursor />
      <ScrollProgressBar />

      {/* SEO */}
      <JsonLd data={organizationJsonLd(layout?.settings)} />

      {/* Navbar */}
      <Navbar siteName={layout?.settings?.siteName} />

      {/* Sayfa İçeriği */}
      <main>{children}</main>

      {/* WhatsApp Butonu */}
      <WhatsAppButton phoneNumber={layout?.settings?.contactInfo?.whatsappNumber || layout?.settings?.contactInfo?.phone} />

      {/* Footer */}
      <SiteFooter settings={layout?.settings} pageData={pageData} />
    </>
  );
}
