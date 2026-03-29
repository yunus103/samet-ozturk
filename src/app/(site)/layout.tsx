import { getClient } from "@/sanity/lib/client";
import { layoutQuery, homePageQuery } from "@/sanity/lib/queries";
import { Navbar } from "@/components/layout/Navbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { ScrollProgressBar } from "@/components/layout/ScrollProgressBar";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { JsonLd, organizationJsonLd } from "@/components/seo/JsonLd";
import { draftMode } from "next/headers";
import Link from "next/link";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const isDraft = (await draftMode()).isEnabled;
  const [layout, pageData] = await Promise.all([
    getClient(isDraft).fetch(layoutQuery, {}, { next: { tags: ["layout"] } }),
    getClient(isDraft).fetch(homePageQuery, {}, { next: { tags: ["home"] } }),
  ]);

  return (
    <>
      {/* Global İnteraktif Olmayan Katmanlar */}
      <GrainOverlay />
      <CustomCursor />
      <ScrollProgressBar />

      {/* SEO */}
      <JsonLd data={organizationJsonLd(layout?.settings)} />

      {/* Draft Mode Banner */}
      {isDraft && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 200,
            backgroundColor: "#D4A843",
            color: "#080808",
            textAlign: "center",
            fontSize: "13px",
            padding: "8px",
            fontWeight: 600,
          }}
        >
          Önizleme modu aktif.{" "}
          <Link href="/api/draft/disable" style={{ textDecoration: "underline" }}>
            Çıkmak için tıkla
          </Link>
        </div>
      )}

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
